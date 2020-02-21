React hook to subscribe to a store from `@known-as-bmf/store`.

## Installation

`npm install --save @known-as-bmf/store @known-as-bmf/react-store`

## Description

This library provides a react hook to subscribe to a store from [`@known-as-bmf/store`](https://github.com/known-as-bmf/store).

## Usage

```ts
import React, { FunctionComponent } from 'react';
import { of } from '@known-as-bmf/store';

const store = of({
  preferences: { theme: 'dark', lang: 'fr' },
  lastOnline: '2020-02-21T18:22:33.343Z',
  someArray: [],
});

const MyComponent: FunctionComponent = () => {
  const state = useStore(store);

  return <h1 className={state.preferences.theme}>Hello world!</h1>;
};
```

You can also provide a _selector_ to only get part of the state (more info [here](https://github.com/known-as-bmf/store#to-subscribe-to-state-change-use-subscribe)).

```ts
import React, { FunctionComponent } from 'react';
import { of } from '@known-as-bmf/store';

const store = of({
  preferences: { theme: 'dark', lang: 'fr' },
  lastOnline: '2020-02-21T18:22:33.343Z',
  someArray: [],
});

const MyComponent: FunctionComponent = () => {
  const theme = useStore(store, s => s.preferences.theme);

  return <h1 className={theme}>Hello world!</h1>;
};
```

## API

```ts
function useStore<S>(store: Store<S>): S;
function useStore<S, R>(store: Store<S>, selector: Selector<S, R>): R;
```
