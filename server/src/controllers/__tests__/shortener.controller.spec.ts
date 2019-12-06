import dotenv from "dotenv";
dotenv.config();
import { clearAllUrlObj, getAllUrlObj } from "../../models/url.model";
import request from "supertest";
import { StatusCodes } from "http-status-codes";
import { app } from "../../app";
import { constants } from "../../services/constants";

const url = {
  google: "https://www.google.com",
  cnn: "https://www.cnn.com",
  invalid: "http://localhost:4000/invalid",
  invalidURL: "invalid",
};

beforeEach(async () => {
  await request(app).post("/api/encode").send({ url: url.google });
});

afterEach(() => {
  clearAllUrlObj();
});

describe("General", () => {
  it("should have an encoded url in the in memory database", async () => {
    expect(getAllUrlObj().length).toBe(1);
    expect(getAllUrlObj()[0].target).toBe(url.google);
  });
});

describe("Retrieval", () => {
  it("should return a 200 with list of encoded urls in the system", async () => {
    expect(getAllUrlObj().length).toBe(1);
    await request(app).post("/api/encode").send({ url: url.cnn });

    const response = await request(app).get("/api/list");

    expect(response.status).toBe(StatusCodes.OK);
    expect(response.body.results.length).toBe(2);
    expect(response.body.results[0].target).toBe(url.google);
    expect(response.body.results[1].target).toBe(url.cnn);
  });
});

describe("Shortener Encode", () => {
  it("should return a 201 with short url", async () => {
    const response = await request(app).post("/api/encode").send({ url: url.cnn });
    expect(response.status).toBe(StatusCodes.CREATED);
    expect(response.body.results.target).toBe(url.cnn);
    expect(response.body.results.address).toBeDefined();
  });

  it("should return a 422 error when no url is supplied", async () => {
    const response = await request(app).post("/api/encode");
    expect(response.status).toBe(StatusCodes.UNPROCESSABLE_ENTITY);
    expect(response.body.errors[0].msg).toBe(constants.URL_IS_REQUIRED);
  });

  it("should return a 400 error when invalid URL is supplied", async () => {
    const response = await request(app).post("/api/encode").send({ url: url.invalidURL });
    expect(response.status).toBe(StatusCodes.BAD_REQUEST);
    expect(response.body.message).toBe(constants.INVALID_URL_MESSAGE);
  });
});

describe("Shortener Decode", () => {
  it("should return a 200 with decoded url", async () => {
    const encodeResponse = await request(app).post("/api/encode").send({ url: url.cnn });

    const response = await request(app).post("/api/decode").send({ url: encodeResponse.body.results.address });

    expect(response.status).toBe(StatusCodes.OK);
    expect(response.body.results.target).toBe(url.cnn);
  });

  it("should return a 422 error when no url is supplied", async () => {
    const response = await request(app).post("/api/decode");
    expect(response.status).toBe(StatusCodes.UNPROCESSABLE_ENTITY);
    expect(response.body.errors[0].msg).toBe(constants.URL_IS_REQUIRED);
  });

  it("should return a 400 error when invalid URL is supplied", async () => {
    const response = await request(app).post("/api/decode").send({ url: url.invalidURL });
    expect(response.status).toBe(StatusCodes.BAD_REQUEST);
    expect(response.body.message).toBe(constants.INVALID_URL_MESSAGE);
  });

  it("should return a 404 if the short url is not found", async () => {
    const response = await request(app).get("/api/decode").send({ url: url.invalid });
    expect(response.status).toBe(StatusCodes.NOT_FOUND);
  });
});

describe("Shortener redirection", () => {
  it("should return a 302 and redirect an encoded url to its destination", async () => {
    const encodeResponse = await request(app).post("/api/encode").send({ url: url.google });

    const response = await request(app).get(`/${encodeResponse.body.results.short_url}`);
    expect(response.status).toBe(StatusCodes.MOVED_TEMPORARILY);
    expect(response.header.location).toBe(url.google);
  });

  it("should return a 404 if the short url is not found", async () => {
    const response = await request(app).get("/api/notfound");
    expect(response.status).toBe(StatusCodes.NOT_FOUND);
  });
});

describe("Shortener Statistics", () => {
  it("should return a 200 and generate statistics on the generated short url", async () => {
    const destUrl = getAllUrlObj()[1].short_url;
    await request(app).get(`/${destUrl}`);

    const response = await request(app).get(`/api/statistics/${destUrl}`);
    expect(response.status).toBe(StatusCodes.OK);
    expect(response.body.results.total_visit_count).toBe(1);
    expect(response.body.results.visit_count_other).toBe(1);
  });

  it("should return a 404 if the short url is not found", async () => {
    const response = await request(app).get("/api/statistics/notfound");
    expect(response.status).toBe(StatusCodes.NOT_FOUND);
  });
});
