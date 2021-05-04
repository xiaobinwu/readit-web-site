/**
 * Storage service
 * @file 本地存储服务
 * @author twenty-four K <https://github.com/xiaobinwu>
 */

import Cookies from 'js-cookie';


export const get = <T>(key: string, defaultValue = undefined, type = 'session'): T => {
    if (key) {
        try {
          let storageValue;
          switch (type) {
            case 'session':
              storageValue = sessionStorage.getItem(key);
              break;
            case 'local':
              storageValue = localStorage.getItem(key);
              break;
            default:
              storageValue = Cookies.get(key);
          }
          if (storageValue) {
            return JSON.parse(storageValue);
          }
          return defaultValue as unknown as T;
        } catch (error) {
          return defaultValue as unknown as T;
        }
    }
    return undefined as unknown as T;
};

export const set = (key: string, value: any, type = 'session', options = {}): void => {
    if (!key) {
        return;
      }
      if (typeof value !== 'string') {
        value = JSON.stringify(value);
      }
      switch (type) {
        case 'session':
          sessionStorage.setItem(key, value);
          break;
        case 'local':
          localStorage.setItem(key, value);
          break;
        default:
          Cookies.set(key, value, options);
      }
};

export const remove = (key: string, type = 'session', options = {}): void => {
    if (!key) {
        return;
      }
      switch (type) {
        case 'session':
          sessionStorage.removeItem(key);
          break;
        case 'local':
          localStorage.removeItem(key);
          break;
        default:
          Cookies.remove(key, options);
    }
};

export default {
    get,
    set,
    remove
};
