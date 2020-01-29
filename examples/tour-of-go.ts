import { Channel, makeChannel, goNode } from 'node-channels';

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

Promise.all([c.receive, c.receive]).then(values => {
  console.log(values[0], values[1], values[0] + values[1]);
});
