import { nanoid } from "nanoid";
import env from "../config/env.config";

//in memory
const urlDB: Link[] = [];

export const shortenUrl = (longUrl: string, _urlDB = urlDB) => {
  const shortenedPath: string = nanoid(6);
  const newUrlItem: Link = {
    address: `${env.APP_PROTOCOL}://${env.APP_DOMAIN}:${env.PORT}/${shortenedPath}`,
    target: longUrl,
    short_url: shortenedPath,
    created_at: new Date(),
    visit_count: 0,
    total_visit_count: 0,
    visit_count_chrome: 0,
    visit_count_edge: 0,
    visit_count_firefox: 0,
    visit_count_ie: 0,
    // visit_count_opera: 0,
    visit_count_other: 0,
    visit_count_safari: 0,
    os_android: 0,
    os_ios: 0,
    os_linux: 0,
    os_macos: 0,
    os_other: 0,
    os_windows: 0,
  };

  _urlDB.push(newUrlItem);
  return newUrlItem;
};

export const getUrlData = (urlObj: any, _urlDB = urlDB) => {
  return _urlDB.findIndex(item => item.short_url == urlObj.short_url);
};

export const getAllUrlObj = (_urlDB = urlDB) => {
  return _urlDB;
};

export const clearAllUrlObj = (_urlDB = urlDB) => {
  _urlDB = [];
};
