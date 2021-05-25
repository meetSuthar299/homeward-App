/**
 * https://material.io/design/color/the-color-system.html
 * https://material.io/resources/color/#!/?view.left=0&view.right=0&primary.color=0277BD&secondary.color=F9A825
 * https://reactnavigation.org/docs/themes
 */

const colors = {
  primaryColor: '#0277bd',
  primaryLightColor: '#58a5f0',
  primaryDarkColor: '#004c8c',

  secondaryColor: '#455a64',
  secondaryLightColor: '#718792',
  secondaryDarkColor: '#1c313a',

  primaryTextColor: '#ffffff',
  secondaryTextColor: '#ffffff'
};

export default theme = {
  light: {
    isDark: false,
    ...colors,
    backgroundTextColor: '#121212',
    backgroundColor: '#ffffff',
    secondaryBackgroundColor: '#F5F5F5'
  },
  dark: {
    isDark: true,
    ...colors,
    backgroundTextColor: '#ffffff',
    backgroundColor: '#121212',
    secondaryBackgroundColor: '#222222'
  }
};
