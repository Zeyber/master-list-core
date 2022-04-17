export const DIVIDER = "~~~~~~~~~~~~~~~~~~~~~~~~~~~~";

export function convertToDate(dateTime: string | Date): Date {
  return new Date(new Date(dateTime).toDateString());
}

export function isToday(date: Date) {
  return (
    new Date(date).toLocaleDateString() === new Date().toLocaleDateString()
  );
}

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
