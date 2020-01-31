import Channel, { makeChannel } from '../src/channel';
import 'jest';

describe('send()', () => {
  let channel = new Channel<number>();

  beforeEach(() => {
    channel.clear();
  });

  it('should push into channel registries', () => {
    channel.send(1);
    expect(channel.count()).toBe(1);
  });
});

describe('receive()', () => {
  let channel = new Channel<number>();

  beforeEach(() => {
    channel.clear();
  });

  it('should pull correct value', async () => {
    channel.send(10);
    const test = await channel.receive();
    expect(test).toBe(10);
  });

  it('should pull undefined', async () => {
    const test = await channel.receive();
    expect(test).toBeUndefined();
  });

  it('should pull multiple results', async () => {
    const tests = [10, 11, 12, 13];
    for (const test of tests) {
      channel.send(test);
    }
    for (const test of tests) {
      expect(await channel.receive()).toBe(test);
    }
  });
});

describe('clear()', () => {
  let channel = new Channel<number>();

  it('should clear array', () => {
    channel.send(1);
    expect(channel.count()).toBe(1);
  });
});

describe('count()', () => {
  let channel = new Channel<number>();

  beforeEach(() => {
    channel.clear();
  });

  it('should count equals one', () => {
    channel.send(1);
    expect(channel.count()).toBe(1);
  });

  it('should count more than one', () => {
    channel.send(1);
    channel.send(1);
    channel.send(1);
    expect(channel.count()).toBe(3);
  });
});

describe('makeChannel()', () => {
  it('should create typed Channel class', () => {
    const channel = makeChannel<string>();
    const expectedType = new Channel<string>();
    expect(typeof channel).toEqual(typeof expectedType);
  });
});
