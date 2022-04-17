require("dotenv").config();

import { Provider } from "./providers/Provider";
import { providerConfig } from "./config";
import { PuppeteerManager } from "./providers/PuppeteerManager";
import { Browser } from "puppeteer";

const providers: Provider[] = Object.values(providerConfig);
const puppeteerManager: PuppeteerManager = new PuppeteerManager();
let browser: Browser;

async function start() {
  await initialize();
  loop();

  async function loop() {
    await reload();
    print();
    setTimeout(() => loop(), Number.parseInt(process.env.PRINTER_REFRESH_TIME));
  }
}

async function initialize() {
  console.log("MASTER LIST INITIALIZING...");
  browser = await puppeteerManager.getBrowser();

  for (const provider of providers) {
    // Reuse manager browser if undefined
    provider.options["browser"] = provider.options.useIsolatedBrowser
      ? undefined
      : browser;

    console.log(`Initializing Provider ${provider.getName()}`);
    await provider.initialize();
    console.log(`${provider.getName()} Provider Initialized`);
  }
}

async function reload() {
  console.log("Reloading...");
  for (const provider of providers) {
    await provider.reload();
  }
}

function print() {
  console.clear();

  for (const provider of providers) {
    provider.print();
  }
}

start();
