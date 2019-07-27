# force-stdin-tty

> Force stdin to be assigned to /dev/tty

## Install

Using npm:

```sh
npm install --save-dev force-stdin-tty
```

or using yarn:

```sh
yarn add force-stdin-tty --dev
```

## Usage

This package can be used to force git hooks to allow prompts for user input.
If the user is using a UI and not a terminal, you can tell them to use a terminal.
See this [stackoverflow question](https://stackoverflow.com/a/57228660/7381355).

###

```js
import { forceStdinTty } from 'force-stdin-tty';

let overwroteStdin = false;
try {
  overwroteStdin = forceStdinTty();
} catch {
  console.error('Please push your code in a terminal.');
  process.exit(1);
}

if (overwroteStdin) {
  process.stdin.destroy();
}
```

### `husky` support

This package works with [`husky`](https://github.com/typicode/husky).

`husky` initially did add [support for stdin](https://github.com/typicode/husky/pull/415),
but later removed it due to a Windows bug:

[husky changelog](https://github.com/typicode/husky/commit/0f038a531ba80cbc647e1cfb392a27aaba24c2e9)

[husky getScript.ts](https://github.com/typicode/husky/commit/942df811ce1f3f49b4ca901250eb90821776602f)

[husky current code](https://github.com/typicode/husky/blob/449a615d721607a2bd47568b8d1063c1d3b12929/src/installer/getScript.ts#L76-L82)

The `husky` author suggests using the undocumented `~/.huskyrc` to enable prompts
for git hooks. But it isn't ideal because each developer would have to enable it.

See:

[husky#442](https://github.com/typicode/husky/issues/442)

[husky#385](https://github.com/typicode/husky/issues/385)

### TypeScript support

This package supports TypeScript.
