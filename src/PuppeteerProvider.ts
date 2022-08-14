import { Browser, Page } from "puppeteer";
import { Provider, ProviderOptions } from "./Provider";
import { getBrowser } from "./puppeteer.utils";

export interface PuppeteerProviderOptions extends ProviderOptions {
  /**
   *  Puppeteer Browser instance to be used. Creates a new Browser if empty.
   */
  browser?: Browser;
}

/**
 * Use an existing or set up a new Puppeteer instance for use with `Provider`.
 */
export class PuppeteerProvider extends Provider {
  browser: Browser;
  page: Page;

  constructor(public options: PuppeteerProviderOptions) {
    super(options);
  }

  initialize(fn: Function = () => {}): Promise<boolean> {
    return super.initialize(async () => {
      this.browser = this.options?.browser || (await getBrowser());
      this.page = await this.browser.newPage();

      // Disable timeout for slower devices
      this.page.setDefaultNavigationTimeout(0);
      this.page.setDefaultTimeout(0);

      await fn();
    });
  }
}
