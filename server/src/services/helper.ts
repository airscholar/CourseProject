import { Request } from "express";
import { getAllUrlObj } from "./../models/url.model";
import UAParser from "ua-parser-js";

export const computeLinkStats = (req: Request) => {
  var parser = new UAParser();
  var ua = req.headers["user-agent"] ? req.headers["user-agent"] : "";

  var browserName = parser.setUA(ua).getBrowser().name;

  if (browserName === undefined && /Postman/.test(ua)) {
    browserName = "Postman";
  }
  var linkStats = {
    browserName: browserName,
    ip: req.connection.remoteAddress,
    // ip: req.headers["x-forwarded-for"] ? forwardedHeader.split(",")[0] : req.connection.remoteAddress,
    url: req.originalUrl,
    userAgent: ua,
    referrer: req.headers.referer,
    OSName: parser.getOS().name,
    date: new Date(),
  };

  return linkStats;
  //   return browserName;
};
