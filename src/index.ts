import Channel from 'channel';
import Routine from 'routine';

export const makeChannel = function<TChannelType>() {
  return new Channel<TChannelType>();
};

export const goNode = function(routineFunction: any, ...args: any): void {
  new Routine(routineFunction).run(args);
};

function sum(s: number[], c: Channel<number>) {
  let sum = 0;
  for (const v of s) {
    sum += v;
  }
  c.send(sum);
}
const s = [7, 2, 8, -9, 4, 0];
const c = makeChannel<number>();

goNode(sum, s.slice(0, s.length / 2), c);
goNode(sum, s.slice(s.length / 2), c);

const [x, y] = [c.receive(), c.receive()];

console.log(x, y, x + y);
