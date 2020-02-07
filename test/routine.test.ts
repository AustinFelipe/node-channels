import { WorkerOptions } from 'worker_threads';
import Routine, { go } from '../src/routine';
import 'jest';

jest.mock('worker_threads', () => {
  return {
    Worker: (filename: string, workerData: WorkerOptions) => {
      const wData = workerData.workerData;

      console.log(wData);
      let a: any = undefined;
      eval(`a=${wData.routineFunction}`);
      if (a) a(wData.args[0]);

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

    go((e: any) => {
      console.log(e);
      e[0] = true;
      return e;
    }, expectedTrue);

    expect(expectedTrue).toBeTruthy();
  });
});
