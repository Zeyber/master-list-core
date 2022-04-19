import * as puppeteer from "puppeteer";

export const puppeteer_options = {
  width: 1280,
  height: 720,
};

/**
 * Arguments to reduce usage of puppeteer instances.
 */
export const minimal_args = [
  "--autoplay-policy=user-gesture-required",
  "--disable-accelerated-2d-canvas",
  "--disable-background-networking",
  "--disable-background-timer-throttling",
  "--disable-backgrounding-occluded-windows",
  "--disable-breakpad",
  "--disable-client-side-phishing-detection",
  "--disable-component-update",
  "--disable-default-apps",
  "--disable-dev-shm-usage",
  "--disable-domain-reliability",
  "--disable-extensions",
  "--disable-features=AudioServiceOutOfProcess",
  "--disable-gpu",
  "--disable-hang-monitor",
  "--disable-infobars",
  "--disable-ipc-flooding-protection",
  "--disable-notifications",
  "--disable-offer-store-unmasked-wallet-cards",
  "--disable-popup-blocking",
  "--disable-print-preview",
  "--disable-prompt-on-repost",
  "--disable-renderer-backgrounding",
  "--disable-setuid-sandbox",
  "--disable-site-isolation-trials",
  "--disable-speech-api",
  "--disable-sync",
  "--disable-web-security",
  "--hide-scrollbars",
  "--ignore-gpu-blacklist",
  "--ignore-certificate-errors",
  "--ignore-certificate-errors-spki-list",
  "--log-level=3", // fatal only
  "--metrics-recording-only",
  "--mute-audio",
  "--no-default-browser-check",
  "--no-first-run",
  "--no-experiments",
  "--no-pings",
  "--no-sandbox",
  "--no-zygote",
  "--password-store=basic",
  "--use-gl=swiftshader",
  "--use-mock-keychain",
];

/**
 * Returns a preconfigured browser by calling puppeteer's `launch()` method.
 */
export function getBrowser(): Promise<puppeteer.Browser> {
  return puppeteer.launch({
    executablePath: process.env.FACEBOOK_CHROME_PATH,
    headless: true,
    args: [
      ...minimal_args,
      `--window-size=${puppeteer_options.width},${puppeteer_options.height}`,
    ],
    defaultViewport: {
      width: puppeteer_options.width,
      height: puppeteer_options.height,
    },
  });
}

/**
 * Helper function to click a button element containing given text.
 */
export async function clickButton(
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
export async function clickLink(
  text: string,
  page: puppeteer.Page = this.page
): Promise<void> {
  await page.waitForXPath(`//a[contains(., '${text}')]`);
  const link = await page.$x(`//a[contains(., '${text}')]`);
  return link[0].click();
}
