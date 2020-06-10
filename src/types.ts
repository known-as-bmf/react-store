export type PartialSwap<S> = (mutationFn: (current: S) => S) => void;

export type StoreHookResult<S, R> = [R, PartialSwap<S>];
