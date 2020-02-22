React hook to subscribe to a store from `@known-as-bmf/store`.

[![Build Status](https://travis-ci.org/known-as-bmf/react-store.svg?branch=master)](https://travis-ci.org/known-as-bmf/react-store)
[![Known Vulnerabilities](https://snyk.io/test/github/known-as-bmf/react-store/badge.svg?targetFile=package.json)](https://snyk.io/test/github/known-as-bmf/react-store?targetFile=package.json)

## Installation

`npm install --save @known-as-bmf/store @known-as-bmf/react-store`

## Description

This library provides a react hook to subscribe to a store from [`@known-as-bmf/store`](https://github.com/known-as-bmf/store).

## Usage

```ts
import React, { FunctionComponent } from 'react';
import { of, swap } from '@known-as-bmf/store';
import { useStore } from '@known-as-bmf/react-store';

const store = of('Hello world');
const change = () => swap(store, s => `${s}!`);

const MyComponent: FunctionComponent = () => {
  const message = useStore(store);

  return (
    <div>
      <h1>{message}</h1>
      <button onClick={change}>add !</button>
    </div>
  );
};
```

You can also provide a _selector_ to only get part of the state (more info [here](https://github.com/known-as-bmf/store#to-subscribe-to-state-change-use-subscribe)).

```ts
import React, { FunctionComponent } from 'react';
import { of } from '@known-as-bmf/store';
import { useStore } from '@known-as-bmf/react-store';

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
/**
 * Subscribe to a store and re-render when its state changes.
 * @param store The store to subscribe to.
 */
function useStore<S>(store: Store<S>): S;
/**
 * Subscribe to part of a state of a store and re-render when it changes.
 * @param store The store to subscribe to.
 * @param selector The part of the state to subscribe to.
 */
function useStore<S, R>(store: Store<S>, selector: Selector<S, R>): R;
```
