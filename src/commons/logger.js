const debugDict = {
  "debug": 0,
  "info": 1,
  "warn": 2,
  "error": 3
};

class Logger {

  constructor(levelName) {
    this.level = debugDict[levelName] || 2;
  }

  debug(msg) {
    console.debug(`\ndebug: \n${msg}\n`);
  }

  info(msg) {
    if(this.level >= 1) {
      console.info(`--------info---------`);
      console.info(msg);
      console.info(`--------end---------`);
    }
  }

  wran(msg) {
    if(this.level >= 2) {
      console.warn(`\nwarn: \n${msg}\n`);
    }
  }

  error(msg) {
    console.error(`\nerror: \n${msg}\n`);
  }
}

export default new Logger(process.env.NODE_ENV == "production" ? "warn" : "debug");