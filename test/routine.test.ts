import { WorkerOptions } from 'worker_threads';
import Routine, { go } from '../src/routine';
import 'jest';

jest.mock('worker_threads', () => {
  return {
    Worker: (filename: string, workerData: WorkerOptions) => {
      const wData = workerData.workerData;

      wData.routineFunction(wData.args);

      return {
        filename,
        workerData: wData, // simplify tests
      };
    },
  };
});

describe('run()', () => {
  it('should create a new Worker thread with correct params', () => {
    const routine = new Routine(() => {});

    routine.run('test');

    const worker = routine.getWorker() as any;

    expect(worker).toHaveProperty('filename');
    expect(worker).toHaveProperty('workerData');
    expect(worker.filename).toEqual('./worker-handler.js');
    expect(worker.workerData).toHaveProperty('routineFunction');
    expect(worker.workerData).toHaveProperty('args');
  });
});

describe('getWorker()', () => {
  it('should return a Worker thread', () => {
    const routine = new Routine(() => {});

    routine.run('test');

    const worker = routine.getWorker();

    expect(worker).toBeTruthy();
  });
});

describe('go()', () => {
  it('should run a routine', () => {
    let expectedTrue = false;

    go(() => (expectedTrue = true));

    expect(expectedTrue).toBeTruthy();
  });
});
