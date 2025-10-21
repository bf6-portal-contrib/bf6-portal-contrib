type GateEventMap = {
  [K in keyof typeof mod.EventHandlerSignatures]: Parameters<(typeof mod.EventHandlerSignatures)[K]>;
};

type Listeners = {
  [K in keyof GateEventMap]?: Array<(...args: GateEventMap[K]) => void>;
}

export class Gate {
  static listeners: Listeners = {};

  static subscribe<K extends keyof GateEventMap>(
    eventName: K,
    listener: (...args: GateEventMap[K]) => void
  ): void {
    Gate.listeners[eventName] = Gate.listeners[eventName] ?? [];
    Gate.listeners[eventName]!.push(listener);
  }

  static unsubscribe<K extends keyof GateEventMap>(
    eventName: K,
    listener: (...args: GateEventMap[K]) => void
  ): void {
    if (!Gate.listeners[eventName]) return;

    Gate.listeners[eventName] = Gate.listeners[eventName]!.filter(
      (l) => l !== listener
    ) as Listeners[K];
  }

  static pack<K extends keyof GateEventMap>(eventName: K) {
    return (...args: GateEventMap[K]) => {
      Gate.listeners[eventName]?.forEach((listener) => {
        (listener as (...args: GateEventMap[K]) => void)(...args);
      });
    };
  }
};