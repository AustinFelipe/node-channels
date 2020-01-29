import Channel from '../src/channel';
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
    let test = await channel.receive();
    expect(test).toBe(10);
  });

  it('should pull undefined', async () => {
    let test = await channel.receive();
    expect(test).toBeUndefined();
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
