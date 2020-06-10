import { renderHook, act } from '@testing-library/react-hooks';

import { useNewStore } from '../src';

describe('useNewStore', () => {
  it('should be a function', () => {
    expect(useNewStore).toBeDefined();
    expect(useNewStore).toBeInstanceOf(Function);
  });

  it.each([undefined, null, false, true, 0, '', [], {}, () => 'test'])(
    'should return the initial state on first render',
    (initialState) => {
      const { result } = renderHook(() => useNewStore(initialState));

      expect(result.current).toBeDefined();
      expect(result.current).toBeInstanceOf(Array);
      expect(result.current).toHaveLength(2);
      expect(result.current[0]).toBe(initialState);
    }
  );

  it('should return a swap function', () => {
    const initialState = 1;
    const { result } = renderHook(() => useNewStore(initialState));

    expect(result.current).toBeDefined();
    expect(result.current).toBeInstanceOf(Array);
    expect(result.current).toHaveLength(2);
    expect(result.current[0]).toBe(initialState);
    expect(result.current[1]).toBeInstanceOf(Function);

    const swap = result.current[1];

    void act(() => swap((s) => s + 1));

    expect(result.current).toBeDefined();
    expect(result.current).toBeInstanceOf(Array);
    expect(result.current).toHaveLength(2);
    expect(result.current[0]).toBe(initialState + 1);
    expect(result.current[1]).toBe(swap);
  });
});
