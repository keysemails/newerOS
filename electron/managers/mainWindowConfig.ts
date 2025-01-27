const DEFAULT_MIN_WIDTH = 400
const DEFAULT_MIN_HEIGHT = 600

export const mainWindowConfig: Electron.BrowserWindowConstructorOptions = {
  skipTaskbar: false,
  minWidth: DEFAULT_MIN_WIDTH,
  minHeight: DEFAULT_MIN_HEIGHT,
  show: true,
  // we want to go frameless on windows and linux
  // transparent: process.platform === 'darwin',
  frame: true,
  vibrancy: 'fullscreen-ui',
  // visualEffectState: 'active',
  // backgroundMaterial: 'acrylic',
  fullscreenable: true,
  trafficLightPosition: {
    x: 16,
    y: 10,
  },
}
