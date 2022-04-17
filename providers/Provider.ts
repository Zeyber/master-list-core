import { Browser } from "puppeteer";
import { colours } from "../colors";
import { DIVIDER } from "../helpers";
import { CHECKMARK } from "../input";

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

  /**
   * Print loaded items.
   */
  print() {
    let toPrint: string = "";
    toPrint += DIVIDER + "\n";
    if (this.items?.length) {
      toPrint += `${this.settings.providerName} (${this.items.length})`;
      this.items.forEach((item) => {
        toPrint += `\n- ${item}`;
      });
    } else {
      toPrint += this.getCheckedLabel();
    }

    console.log(toPrint);
  }

  /**
   * Get string that shows provider tasks as "done".
   */
  getCheckedLabel(name?: string): string {
    return `${colours.fg.green} [${CHECKMARK}] ${
      name ?? this.settings.providerName
    } ${colours.fg.white}`;
  }

  getName(): string {
    return this.settings.providerName;
  }
}
