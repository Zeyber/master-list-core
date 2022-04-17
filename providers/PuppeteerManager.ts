import * as puppeteer from "puppeteer";
import { minimal_args } from "../helpers";

const options = {
  width: 1280,
  height: 720,
};

export class PuppeteerManager {
  getBrowser(): Promise<puppeteer.Browser> {
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
}
