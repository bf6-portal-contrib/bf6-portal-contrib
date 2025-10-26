const order = ["debug", "info", "warn", "error"];

const log = (
  context: string,
  level: "debug" | "info" | "warn" | "error",
  message: string
) => {
  if (order.indexOf(level) < order.indexOf(Log.level)) return;

  const date = new Date().toISOString();
  const lvl = level.toUpperCase();
  console.log(`${date} [${context}] ${lvl}: ${message}`);
};

export class Log {
  static level = "debug";

  static debug(context: string, message: string) {
    log(context, "debug", message);
  }

  static info(context: string, message: string) {
    log(context, "info", message);
  }

  static warn(context: string, message: string) {
    log(context, "warn", message);
  }

  static error(context: string, message: string) {
    log(context, "error", message);
  }
}
