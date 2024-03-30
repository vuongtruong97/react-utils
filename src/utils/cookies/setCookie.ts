type CookieOptions = {
  name: string;
  value: string;
  days?: number;
};

export const setCookie = ({ name, value, days }: CookieOptions): void => {
  let expires = '';
  if (days) {
    const date = new Date();
    date.setTime(date.getTime() + days * 24 * 60 * 60 * 1000);
    expires = '; expires=' + date.toUTCString();
  }
  document.cookie = name + '=' + (value || '') + expires + '; path=/';
};
