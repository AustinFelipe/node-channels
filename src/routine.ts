export default class Routine {
  constructor(private routineFunction: any) {}

  run(...args: any[]) {
    this.routineFunction.apply(this, args);
  }
}
