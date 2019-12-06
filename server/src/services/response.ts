import { Response } from "express";

interface SendResponse {
  message: string;
  results: any;
}

interface SendErrorResponse {
  statusCode: number;
  message: string;
  results?: any;
}

export const response = {
  success: (res: Response, status: number, data: { message: string; results: any }) => {
    const responseObj: SendResponse = {
      message: data.message,
      results: data.results,
    };
    return res.status(status).json(responseObj);
  },
  fail: (res: Response, status: number, data: { message: string; results: any }) => {
    const responseObj: SendResponse = {
      message: data.message,
      results: data.results,
    };
    return res.status(status).json(responseObj);
  },
  error: (res: Response, status: number, data?: any) => {
    const responseObj: SendErrorResponse = {
      statusCode: data.statusCode,
      message: data.message,
      results: data.results,
    };
    return res.status(status).json(responseObj);
  },
};
