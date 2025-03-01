import {
  createSignal,
  ReferenceArray,
  SimpleSignal,
} from "@motion-canvas/core";

type ProxyTarget<T> = {
  (): void;
  array: T[];
  len: SimpleSignal<number>;
};

export function createReactiveRefArray<T>(): ReferenceArray<T> {
  const target = function () {
    // do nothing
  } as ProxyTarget<T>;
  const len = createSignal(0);
  target.array = [];
  target.len = len;
  return new Proxy(target, Handler) as unknown as ReferenceArray<T>;
}

const Handler: ProxyHandler<ProxyTarget<any>> = {
  apply(target, _, argArray) {
    if (argArray.length === 0) {
      return target.array[0];
    }

    target.array.push(...argArray);
    target.len(target.array.length);
  },

  get(target, property, receiver) {
    const value = Reflect.get(target.array, property, receiver);
    if (property === "length") {
      return target.len();
    }
    if (typeof value === "function") {
      return value.bind(target.array);
    }

    return value;
  },

  set(target, property, value, receiver) {
    if (property === "length") {
      target.len(value);
    }
    return Reflect.set(target.array, property, value, receiver);
  },
};
