/**
 * Web config
 * @file Web 配置
 * @author twenty-four K <https://github.com/xiaobinwu>
 */
import packageJSON from '../package.json';

export const baseApi = 'http://47.107.148.74:8087/api';
// export const baseApi = 'http://192.168.47.1:8087/api';
// export const baseApi = 'http://172.20.10.4:8087/api';
export const appApi = `${baseApi}/readIt`;
export const staticApi = 'http://read-it.oss-cn-shenzhen.aliyuncs.com';
export const appName = 'ReadIt';
export const email = 'xiaobin_wu@yahoo.com';
export const version = packageJSON.version;
export const weatherCurUrl = 'https://devapi.qweather.com/v7/weather/now';
export const weather3dUrl = 'https://devapi.qweather.com/v7/weather/3d'; 
export const weatherKey = 'f51675abaa1840548d4fcce778828437'; // https://dev.qweather.com/docs/api/weather/

export const geocodeRegeoKey = 'a39e9f0d5d10460b3e4ae7e735f34733'; // https://console.amap.com/dev/key/app
export const geocodeRegeoUrl = 'https://restapi.amap.com/v3/geocode/regeo';

export const geocodeRegeoAndroidKey = '2a6798dbf79f695cb560bd25be519722';