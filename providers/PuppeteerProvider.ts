import { minimal_args } from "../helpers";
import { Provider, ProviderOptions } from "./Provider";
import * as puppeteer from "puppeteer";

const options = {
  width: 1280,
  height: 720,
};

export class PuppeteerProvider extends Provider {
  browser: puppeteer.Browser;
  page: puppeteer.Page;

  constructor(options?: ProviderOptions) {
    super(options);
  }

  initialize(fn: Function = () => {}): Promise<boolean> {
    return super.initialize(async () => {
      this.browser = this.options?.browser || (await this.newBrowser());
      this.page = await this.newPage();

      // Disable timeout for slower devices
      this.page.setDefaultNavigationTimeout(0);
      this.page.setDefaultTimeout(0);

      await fn();
    });
  }

  newBrowser(): Promise<puppeteer.Browser> {
    return puppeteer.launch({
      executablePath: process.env.FACEBOOK_CHROME_PATH,
      headless: true,
      args: [
        ...minimal_args,
        `--window-size=${options.width},${options.height}`,
      ],
      defaultViewport: {
        width: options.width,
        height: options.height,
      },
    });
  }

  newPage(): Promise<puppeteer.Page> {
    return this.browser.newPage();
  }

  /**
   * Helper function to click a button element containing given text.
   */
  async clickButton(
    text: string,
    page: puppeteer.Page = this.page
  ): Promise<void> {
    await page.waitForXPath(`//button[contains(., '${text}')]`);
    const button = await page.$x(`//button[contains(., '${text}')]`);
    return button[0].click();
  }

  /**
   * Helper function to click a link element containing given text.
   */
  async clickLink(
    text: string,
    page: puppeteer.Page = this.page
  ): Promise<void> {
    await page.waitForXPath(`//a[contains(., '${text}')]`);
    const link = await page.$x(`//a[contains(., '${text}')]`);
    return link[0].click();
  }
}
