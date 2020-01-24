import Channel from 'channel';
import Routine from 'routine';

export const makeChannel = function<TChannelType>() {
  return new Channel<TChannelType>();
};

export const goNode = function(routineFunction: any, ...args: any[]): void {
  new Routine(routineFunction).run(args);
};

export { Channel };
export { Routine };
