import { Worker } from 'worker_threads';

export default class Routine {
  private worker?: Worker = undefined;

  constructor(private routineFunction: any) {}

  run(...args: any[]) {
    // this.routineFunction.apply(this, args);
    this.worker = new Worker('./worker-handler.js', {
      workerData: {
        routineFunction: this.routineFunction.toString(),
        args,
      },
    });
  }

  getWorker() {
    return this.worker;
  }
}

export const go = function(routineFunction: any, ...args: any[]): void {
  new Routine(routineFunction).run(args);
};
