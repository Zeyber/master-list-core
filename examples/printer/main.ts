require("dotenv").config();

import { Provider } from "../../providers/Provider";
import { providerConfig } from "./config";
import { colours } from "./colors";
import { CHECKMARK, DIVIDER } from "./input";
import { getBrowser } from "../../providers/puppeteer.utils";

const providers: Provider[] = Object.values(providerConfig);

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
  const browser = await getBrowser();

  for (const provider of providers) {
    // Reuse manager browser if undefined
    provider.options["browser"] = provider.options.useIsolatedBrowser
      ? undefined
      : browser;

    console.log(`Initializing Provider ${provider.settings.providerName}`);
    await provider.initialize();
    console.log(`${provider.settings.providerName} Provider Initialized`);
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
    printItems(provider);
  }
}

/**
 * Print loaded items.
 */
function printItems(provider: Provider) {
  let toPrint: string = "";
  toPrint += DIVIDER + "\n";
  if (this.items?.length) {
    toPrint += `${provider.settings.providerName} (${provider.items.length})`;
    this.items.forEach((item) => {
      toPrint += `\n- ${item}`;
    });
  } else {
    toPrint += getCheckedLabel();
  }

  console.log(toPrint);
}

/**
 * Get string that shows provider tasks as "done".
 */
function getCheckedLabel(name?: string): string {
  return `${colours.fg.green} [${CHECKMARK}] ${
    name ?? this.settings.providerName
  } ${colours.fg.white}`;
}

start();
