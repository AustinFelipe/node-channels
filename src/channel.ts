export default class Channel<TChannelType> {
  private results: TChannelType[] = [];

  send(anyArg: TChannelType) {
    this.results.push(anyArg);
  }

  receive(): TChannelType | undefined {
    return this.results.shift();
  }

  clear(): void {
    this.results = [];
  }

  count(): number {
    return this.results.length;
  }
}
