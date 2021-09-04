import isDev from "./services/isDev";

export const settings = {
  api: isDev() ? 'http://127.0.0.1:8000' : 'https://dev.ivanstanojevic.me',
};
