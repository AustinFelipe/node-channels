export default class Channel<TChannelType> {
  private results: TChannelType[] = [];

  send(anyArg: TChannelType) {
    this.results.push(anyArg);
  }

  receive(): Promise<TChannelType | undefined> {
    return new Promise(res => {
      let result = this.results.shift();

      res(result);
    });
  }

  clear(): void {
    this.results = [];
  }

  count(): number {
    return this.results.length;
  }
}
