import { parentPort, workerData } from 'worker_threads';

export interface WorkerThreadOptions {
  routineFunction: string;
  args: any[];
}

export default class WorkerThread {
  constructor(private opts: WorkerThreadOptions, private port: any) {
    this.invokeFunction();
  }

  async invokeFunction() {
    const routine = eval(this.opts.routineFunction);
    const routineObj = routine.apply(this, this.opts.args);

    if (routineObj instanceof Promise) {
      const result = await routineObj;

      return this.port?.postMessage(result);
    }

    return this.port?.postMessage(routineObj);
  }
}

if (workerData.routineFunction && !workerData.isTesting) {
  new WorkerThread(workerData, parentPort);
}
