const httpStatus = require("http-status");
const supertest = require("supertest");
const express = require('express');
const RecordModel = require("./../src/models/Record");
const {RecordRoutes, ErrorRoutes} = require("./../src/routes/index")
const {examples} = require("./utils/dummy");
const db = require("./utils/db");
const { Success, BadReqErr, NotFoundErr } = require("../src/definitions/Status");
const app = express();

beforeAll(async () => {
    await db.connect();
    await RecordModel.bulkSave(examples)
    app.use(express.json());
    app.use("/", RecordRoutes);
    app.use(ErrorRoutes);
});
afterAll(async () => {
    await db.close()
});

describe("POST / - Simple True Requests", () => {
    test("Simple True Request - 1 (Fetch Several)", async () => {

        const payload = {
            "startDate": "2009-01-26",
            "endDate": "2011-02-02",
            "minCount": 0,
            "maxCount": 1000  
        };

        await supertest(app)
                .post("/")
                .send(payload)
                .expect("Content-Type", /json/)
                .expect(httpStatus.OK)
                .then((res) => {
                    expect(res.body.code).toBe(Success.code)
                    expect(res.body.msg).toBe(Success.msg)
                    expect(res.body.records.length).toBe(2)
                });
    }),
    test("Simple True Request - 2 (Fetch All)", async () => {

        const payload = {
            "startDate": "2009-01-26",
            "endDate": "2031-02-02",
            "minCount": 0,
            "maxCount": 1000  
        };

        await supertest(app)
                .post("/")
                .send(payload)
                .expect("Content-Type", /json/)
                .expect(httpStatus.OK)
                .then((res) => {
                    expect(res.body.code).toBe(Success.code)
                    expect(res.body.msg).toBe(Success.msg)
                    expect(res.body.records.length).toBe(examples.length)
                });
    }),
    test("Simple True Request - 3 (Fetch Empty - Date)", async () => {

        const payload = {
            "startDate": "2029-01-26",
            "endDate": "2031-02-02",
            "minCount": 0,
            "maxCount": 1000  
        };

        await supertest(app)
                .post("/")
                .send(payload)
                .expect("Content-Type", /json/)
                .expect(httpStatus.OK)
                .then((res) => {
                    expect(res.body.code).toBe(Success.code)
                    expect(res.body.msg).toBe(Success.msg)
                    expect(res.body.records.length).toBe(0)
                });
    }),
    test("Simple True Request - 3 (Fetch Empty - Count)", async () => {

        const payload = {
            "startDate": "2009-01-26",
            "endDate": "2031-02-02",
            "minCount": 999,
            "maxCount": 1000  
        };

        await supertest(app)
                .post("/")
                .send(payload)
                .expect("Content-Type", /json/)
                .expect(httpStatus.OK)
                .then((res) => {
                    expect(res.body.code).toBe(Success.code)
                    expect(res.body.msg).toBe(Success.msg)
                    expect(res.body.records.length).toBe(0)
                });
    })
});

describe("POST /xxx - Wrong Url", () => {
    test("Wrong Url", async () => {

        const payload = {
            "minCount": 0,
            "maxCount": 1000  
        };

        await supertest(app)
                .post("/xxx")
                .send(payload)
                .expect("Content-Type", /json/)
                .then((res) => {
                    expect(res.body.code).toBe(NotFoundErr.code)
                    expect(res.body.msg).toBe(NotFoundErr.msg)
                    expect(res.body.records.length).toBe(0)
                });
    })
})

describe("GET / - Wrong Method", () => {
    test("Wrong Method", async () => {
        await supertest(app)
                .get("/")
                .expect("Content-Type", /json/)
                .then((res) => {
                    expect(res.body.code).toBe(NotFoundErr.code)
                    expect(res.body.msg).toBe(NotFoundErr.msg)
                    expect(res.body.records.length).toBe(0)
                });
    })
})

describe("POST / - Request Error", () => {
    test("Missing Argument - Date", async () => {

        const payload = {
            "minCount": 0,
            "maxCount": 1000  
        };

        await supertest(app)
                .post("/")
                .send(payload)
                .expect("Content-Type", /json/)
                .then((res) => {
                    expect(res.body.code).toBe(BadReqErr.code)
                    expect(res.body.records.length).toBe(0)
                });
    }),
    test("Missing Argument - Count", async () => {

        const payload = {
            "startDate": "2029-01-26",
            "endDate": "2031-02-02"
        };

        await supertest(app)
                .post("/")
                .send(payload)
                .expect("Content-Type", /json/)
                .then((res) => {
                    expect(res.body.code).toBe(BadReqErr.code)
                    expect(res.body.records.length).toBe(0)
                });
    }),
    test("Wrong Field - Extra Field", async () => {

        const payload = {
            "startDate": "2029-01-26",
            "endDate": "2031-02-02",
            "minCount": 0,
            "maxCount": 1000,
            "maxCzzzz": 1000  
        };

        await supertest(app)
                .post("/")
                .send(payload)
                .expect("Content-Type", /json/)
                .then((res) => {
                    expect(res.body.code).toBe(BadReqErr.code)
                    expect(res.body.records.length).toBe(0)
                });
    }),
    test("Wrong Field - Field Name", async () => {

        const payload = {
            "startDate": "2029-01-26",
            "endDate": "2031-02-02",
            "minCount": 0,
            "maxCzzzz": 1000  
        };

        await supertest(app)
                .post("/")
                .send(payload)
                .expect("Content-Type", /json/)
                .then((res) => {
                    expect(res.body.code).toBe(BadReqErr.code)
                    expect(res.body.records.length).toBe(0)
                });
    }),
    test("Wrong Field - Date Field Type", async () => {

        const payload = {
            "startDate": 3,
            "endDate": 5,
            "minCount": 0,
            "maxCzzzz": 1000  
        };

        await supertest(app)
                .post("/")
                .send(payload)
                .expect("Content-Type", /json/)
                .then((res) => {
                    expect(res.body.code).toBe(BadReqErr.code)
                    expect(res.body.records.length).toBe(0)
                });
    }),
    test("Wrong Field - Count Field Type", async () => {

        const payload = {
            "startDate": "2029-01-26",
            "endDate": "2031-02-02",
            "minCount": "0a",
            "maxCount": "1000a"
        };

        await supertest(app)
                .post("/")
                .send(payload)
                .expect("Content-Type", /json/)
                .then((res) => {
                    expect(res.body.code).toBe(BadReqErr.code)
                    expect(res.body.records.length).toBe(0)
                });
    }),
    test("Wrong Field - Date Field Format", async () => {

        const payload = {
            "startDate": "2029/01/26",
            "endDate": "2031/02/02",
            "minCount": 0,
            "maxCount": 1000
        };

        await supertest(app)
                .post("/")
                .send(payload)
                .expect("Content-Type", /json/)
                .then((res) => {
                    expect(res.body.code).toBe(BadReqErr.code)
                    expect(res.body.records.length).toBe(0)
                });
    }),
    test("Wrong Field - Min Count > Max Count", async () => {

        const payload = {
            "startDate": "2029/01/26",
            "endDate": "2031/02/02",
            "minCount": 2000,
            "maxCount": 1000
        };

        await supertest(app)
                .post("/")
                .send(payload)
                .expect("Content-Type", /json/)
                .then((res) => {
                    expect(res.body.code).toBe(BadReqErr.code)
                    expect(res.body.records.length).toBe(0)
                });
    }),
    test("Wrong Field - Start Date > End Date", async () => {

        const payload = {
            "startDate": "2029/01/26",
            "endDate": "2031/02/02",
            "minCount": 1000,
            "maxCount": 2000
        };

        await supertest(app)
                .post("/")
                .send(payload)
                .expect("Content-Type", /json/)
                .then((res) => {
                    expect(res.body.code).toBe(BadReqErr.code)
                    expect(res.body.records.length).toBe(0)
                });
    })
  });