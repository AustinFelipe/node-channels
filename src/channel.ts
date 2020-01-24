export default class Channel<TChannelType> {
  results: any[] = [];

  send(anyArg: any) {
    this.results.push(anyArg);
  }
  receive(): any {
    return this.results.shift();
  }
}
