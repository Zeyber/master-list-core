import { Browser } from "puppeteer";

export interface ProviderOptions {
  delayInit?: number;
  refreshInterval?: number;
  providerName?: string;
  browser?: Browser;
  useIsolatedBrowser?: boolean;
}

export interface ProviderConfig {
  [key: string]: Provider;
}

export class Provider {
  items: string[] = [];
  settings: ProviderOptions | any;

  constructor(public options: ProviderOptions) {
    this.settings = options;
  }

  /**
   * Setup provider to receive data.
   */
  initialize(fn: Function = () => {}, delayInit?: number): Promise<boolean> {
    return new Promise((resolve, reject) => {
      try {
        setTimeout(async () => {
          await fn();
          resolve(true);
        }, delayInit ?? 0);
      } catch (e: any) {
        reject(e);
      }
    });
  }

  /**
   * Receive new data and write to items array.
   */
  reload(fn: Function = () => {}): Promise<void> {
    return new Promise(async (resolve, reject) => {
      try {
        this.items = await fn();
        resolve();
      } catch (e: any) {
        reject(e);
      }
    });
  }
}
