import winston from "winston";
import { computeLinkStats } from "./../services/helper";
import { getUrlData } from "./../models/url.model";
import parseUrl from "url-parse";
import validUrl from "valid-url";
import { getAllUrlObj, shortenUrl } from "../models/url.model";
import { StatusCodes } from "http-status-codes";
import { NextFunction, Request, Response } from "express";
import asyncHandler from "express-async-handler";
import { response } from "../services/response";
import env from "../config/env.config";
import { constants } from "../services/constants";
import HttpException from "../services/error.exception";

export const httpEncodeURL = asyncHandler(async (req: Request, res: Response, next: NextFunction) => {
  const { url } = req.body;

  if (!validUrl.isUri(url)) {
    throw new HttpException(StatusCodes.BAD_REQUEST, constants.INVALID_URL_MESSAGE);
  }

  const existing = retrieveExistingUrl(req, res, url, true);

  if (existing) {
    return response.success(res, StatusCodes.CREATED, { message: "URL Shortened successfully", results: existing });
  }

  const shortenedUrl = shortenUrl(url);

  if (!shortenedUrl) return response.fail(res, StatusCodes.BAD_REQUEST, { message: constants.INVALID_URL_MESSAGE, results: constants.SHORTURL_IN_USE });

  var resp = formatResponse(req, shortenedUrl);

  return response.success(res, StatusCodes.CREATED, { message: "URL Shortened successfully", results: resp });
});

const retrieveExistingUrl = (req: Request, res: Response, url: string, fullStats: boolean = false, shortResponse: boolean = true) => {
  const _dbUrl = getAllUrlObj();

  var existing: Link | undefined;
  if (fullStats) {
    existing = _dbUrl.find(data => data.target === url);
  } else {
    existing = _dbUrl.find(data => data.short_url === url);
  }

  if (!existing) return null;

  return shortResponse ? formatResponse(req, existing) : existing;
};

const formatResponse = (req: Request, shortenedUrl: any) => {
  var resp = {
    target: shortenedUrl.target,
    address: shortenedUrl.address,
    short_url: shortenedUrl.short_url,
  };

  return resp;
};

export const httpDecodeURL = asyncHandler(async (req: Request, res: Response, next: NextFunction) => {
  var { url } = req.body;

  const parsedUrl = parseUrl(url, true);

  if (["http:", "https:", "ftp:"].indexOf(parsedUrl.protocol) === -1 || !parsedUrl.hostname || !parsedUrl.pathname || !parsedUrl.protocol) {
    throw new HttpException(StatusCodes.BAD_REQUEST, constants.INVALID_URL_MESSAGE);
  }

  const existing = retrieveExistingUrl(req, res, parsedUrl.pathname.split("/")[1], false);

  if (!existing) {
    throw new HttpException(StatusCodes.NOT_FOUND, constants.URL_NOT_FOUND);
  }

  return response.success(res, StatusCodes.OK, {
    message: "URL Decoded Successfully!",
    results: formatResponse(req, existing),
  });
});

export const httpGetURL = asyncHandler(async (req: Request, res: Response, next: NextFunction) => {
  const { urlPath } = req.params;

  if (!urlPath) {
    return response.fail(res, StatusCodes.BAD_REQUEST, { message: constants.INVALID_URL_MESSAGE, results: {} });
  }

  const existing = retrieveExistingUrl(req, res, urlPath, false, false);

  if (!existing) {
    throw new HttpException(StatusCodes.NOT_FOUND, constants.URL_NOT_FOUND);
  }
  return response.success(res, StatusCodes.OK, { message: "Retrieved successfully", results: existing });
});

export const httpListURL = asyncHandler(async (req: Request, res: Response, next: NextFunction) => {
  // const urls = getAllUrlObj().map(url => {
  //   const resp = formatResponse(req, url);
  //   return resp;
  // });

  response.success(res, StatusCodes.OK, { message: "Retrieved Successfully!", results: getAllUrlObj() });
});

export const httpVisitUrl = (req: Request, res: Response, next: NextFunction, _getUrlData = getUrlData, _dbUrl = getAllUrlObj) => {
  const { urlPath } = req.params;

  try {
    const existing = retrieveExistingUrl(req, res, urlPath, false);
    if (!existing) {
      throw new HttpException(StatusCodes.NOT_FOUND, constants.URL_NOT_FOUND);
    }
    const urlIdx = _getUrlData(existing);
    const linkStats = computeLinkStats(req);

    extractLinkStats(linkStats, urlIdx, _dbUrl);

    return res.status(StatusCodes.PERMANENT_REDIRECT).redirect(existing.target);
  } catch (err: any) {
    winston.error(err);

    throw new HttpException(StatusCodes.BAD_REQUEST, constants.INVALID_URL_MESSAGE);
  }
};

const extractLinkStats = (linkStats: any, urlIdx: number, _dbUrl: any) => {
  //increment user visit
  _dbUrl()[urlIdx].visit_count += 1;

  switch (linkStats.browserName) {
    case "Chrome":
      _dbUrl()[urlIdx].visit_count_chrome += 1;
      break;
    case "Firefox":
      _dbUrl()[urlIdx].visit_count_firefox += 1;
      break;
    case "Safari":
      _dbUrl()[urlIdx].visit_count_safari += 1;
      break;
    case "Mobile Safari":
      _dbUrl()[urlIdx].visit_count_safari += 1;
    // case "Opera":
    //   _dbUrl()[urlIdx].visit_count_opera += 1;
    //   break;
    case "Edge":
      _dbUrl()[urlIdx].visit_count_edge += 1;
      break;
    case "Internet Explorer":
      _dbUrl()[urlIdx].visit_count_ie += 1;
      break;
    default:
      _dbUrl()[urlIdx].visit_count_other += 1;
  }

  switch (linkStats.OSName) {
    case "Windows":
      _dbUrl()[urlIdx].os_windows += 1;
      break;
    case "Windows Phone":
      _dbUrl()[urlIdx].os_windows += 1;
      break;
    case "Mac OS":
      _dbUrl()[urlIdx].os_macos += 1;
      break;
    case "iOS":
      _dbUrl()[urlIdx].os_ios += 1;
      break;
    case "Android":
      _dbUrl()[urlIdx].os_android += 1;
      break;
    case "Linux":
      _dbUrl()[urlIdx].os_linux += 1;
      break;
    default:
      _dbUrl()[urlIdx].os_other += 1;
  }
  _dbUrl()[urlIdx].total_visit_count += 1;
};
