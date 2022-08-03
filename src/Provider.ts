import { Browser } from "puppeteer";

export interface ProviderOptions {
  /**
   * How the given provider should be referred to.
   */
  providerName?: string;
  /**
   * Puppeteer Browser instance to be reused
   */
  browser?: Browser;
}

export class Provider {
  /**
   * Persisted settings from constructer call.
   */
  settings: ProviderOptions | any;

  /**
   *  Data loaded from `reload()` call.
   */
  items: string[] = [];

  constructor(public options: ProviderOptions) {
    this.settings = options;
  }

  /**
   * Setup provider to receive data.
   *
   * Example: Log into an API; Load a webpage with puppeteer;
   */
  initialize(fn: Function = () => {}): Promise<boolean> {
    return new Promise((resolve, reject) => {
      try {
        setTimeout(async () => {
          await fn();
          resolve(true);
        }, 0);
      } catch (e: any) {
        reject(e);
      }
    });
  }

  /**
   * Receive new data and write to items array.
   *
   * Example: Get data from an API call; Read a webpage's DOM for changes;
   */
  reload(fn: Function = () => {}): Promise<void> {
    return new Promise(async (resolve) => {
      try {
        this.items = await fn();
        resolve();
      } catch (e: any) {
        // Suppress error to keep application running
        resolve();
      }
    });
  }
}
