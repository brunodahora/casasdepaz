export const colors = {
  darkPurple: "#2F007C",
  darkGreen: "#194411",
  gray: "#D8D8D8",
  gradientStart: "#9DB51D",
  gradientEnd: "#43A82E",
  gradient: ["#9DB51D", "#43A82E"],
  green: "#43A82E",
  lightBlue: "#007AFF",
  red: "#DE1520",
  purple: "#7F39F3",
  transparentGreen: "#1944114D",
  white: "#fff"
};

export const fontWeight = {
  light: 200,
  medium: 500,
  bold: 700
};

export const emailRegex = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;

export const env = {
  sentry: {
    dsn: "https://7104b61206b740ebabec386dc1cc736c@sentry.io/2154589",
    authToken:
      "2748c61216434d69a0fd6288e827e1d141f5c34d67a244d989915d4c2479212c"
  },
  firebase: {
    apiKey: "AIzaSyBhxZZK4wkF-V-srkUsTVyibgklvsHybjc",
    authDomain: "casas-de-paz-pib.firebaseapp.com",
    databaseURL: "https://casas-de-paz-pib.firebaseio.com",
    projectId: "casas-de-paz-pib",
    storageBucket: "casas-de-paz-pib.appspot.com"
  }
};
