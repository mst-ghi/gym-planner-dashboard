import Cookies from 'js-cookie';

export const prefix = '__gym_dash-';

export type CookiesKeyProps = 'work-key' | 'acc-tkn' | 'ref-tkn' | 'exp-tkn';

export const deleteAbleCookies = [
  `${prefix}work-key`,
  `${prefix}acc-tkn`,
  `${prefix}ref-tkn`,
  `${prefix}exp-tkn`,
];

export const getExactCookieName = (keyName: CookiesKeyProps) => {
  return `${prefix}${keyName}`;
};

export const getCookieFromCtxRequest = (
  keyName: CookiesKeyProps,
  cookies: { [key: string]: string },
) => {
  if (cookies) {
    return cookies[getExactCookieName(keyName)];
  }
  return undefined;
};

export const setCookie = (
  keyName: CookiesKeyProps,
  value: unknown,
  options: object | undefined = undefined,
) => {
  let data: string;
  if (typeof value === 'string') {
    data = value;
  } else {
    data = JSON.stringify(value);
  }
  Cookies.set(`${prefix}${keyName}`, data, {
    secure: process.env.NODE_ENV === 'production',
    expires: 365,
    ...options,
  });
};

export const getCookie = (
  keyName: CookiesKeyProps,
  type: 'as-string' | 'as-json' = 'as-string',
) => {
  const value = Cookies.get(`${prefix}${keyName}`);
  if (value && type === 'as-json') {
    return JSON.parse(value);
  }
  return value;
};

export const getCookieFrom = (
  serverSideCookies: { [key: string]: string },
  keyName: CookiesKeyProps,
  type: 'as-string' | 'as-json' = 'as-string',
) => {
  if (!serverSideCookies) return null;
  const value = serverSideCookies[`${prefix}${keyName}`];
  if (value && type === 'as-json') {
    return JSON.parse(value);
  }
  return value;
};

export const removeCookie = (keyName: CookiesKeyProps) => {
  return Cookies.remove(`${prefix}${keyName}`);
};

export const removeAllCookies = () => {
  return Object.keys(Cookies.get()).forEach((cookieName) => {
    if (deleteAbleCookies.includes(cookieName)) {
      Cookies.remove(cookieName);
    }
  });
};
