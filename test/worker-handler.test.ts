import 'jest';
import WorkerThread from '../src/worker-handler';

jest.mock('worker_threads', () => {
  return {
    parentPort: {
      postMessage: () => {},
    },
    workerData: {
      routineFunction: () => {},
      args: [],
      isTesting: true,
    },
  };
});

describe('contructor()', () => {
  it('should call routineFunction() and postMessage() back', () => {
    let expectedResult = 0;

    new WorkerThread(
      {
        routineFunction: '(n) => n + 5',
        args: [1],
      },
      {
        postMessage: (message: any) => {
          expectedResult = message;
        },
      }
    );

    expect(expectedResult).toEqual(6);
  });
});
