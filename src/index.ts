import fs from 'fs';
import tty from 'tty';

export const forceStdinTty = () => {
  if (process.stdin.isTTY) {
    return false;
  }

  // Use `O_NOCTTY` to not take control of spawned processes?
  const { O_RDONLY, O_NOCTTY } = fs.constants;
  const fd = fs.openSync('/dev/tty', O_RDONLY + O_NOCTTY);

  // @ts-ignore: `ReadStream` in @types/node incorrectly expects an object.
  // https://github.com/DefinitelyTyped/DefinitelyTyped/pull/37174
  const stdin = new tty.ReadStream(fd);

  // Use `Object.defineProperty()` because `process.stdin` has no setter.
  // Taken from node.js source:
  // https://github.com/nodejs/node/blob/6271ef005eb311c819b7ab041e09f50e4155ec1e/lib/internal/bootstrap/node.js#L354-L358
  Object.defineProperty(process, 'stdin', {
    configurable: true,
    enumerable: true,
    get: () => stdin,
  });

  return true;
};
