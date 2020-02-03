export const colors = {
  white: "#fff",
  purple: "#7F39F3",
  darkPurple: "#2F007C",
  gradientStart: "#B2269D",
  gradientEnd: "#8438EC",
  gradient: ["#B2269D", "#8438EC"]
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
    apiKey: "AIzaSyBsJVYi9OBviT0-6DgfySQzFJi7cXcMPj0"
  }
};
