import 'jest';
import Channel, { makeChannel } from '../src/channel';
import { go } from '../src/routine';

describe('real case tests', () => {
  it('should return correct value from channel', async () => {
    const channel = makeChannel<number>();
    const testFunc = (toAdd: number[], c: Channel<number>) => {
      c.send(toAdd.reduce((p, cur) => p + cur));
    };

    go(testFunc, [1, 2, 3], channel);

    const result = await channel.receive();

    expect(result).toEqual(6);
  });
});
