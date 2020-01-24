export default class Channel<TChannelType> {
  results: TChannelType[] = [];

  send(anyArg: TChannelType) {
    this.results.push(anyArg);
  }
  receive(): any {
    return this.results.shift();
  }
}
