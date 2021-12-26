const {createRequest, createResponse} = require("node-mocks-http");
const httpStatus = require("http-status");
const RecordModel = require("../../src/models/Record");
const RecordController = require("../../src/controllers/Record");
const db = require("../utils/db");
const {examples} = require("../utils/dummy");
const { Success } = require("../../src/definitions/Status");


beforeAll(async () => {
    await db.connect();
    await RecordModel.bulkSave(examples)
});
afterAll(async () => {
    await db.close()
});

describe("Record Controller", () => {
    // General Test Data for Controller
    const startDate = new Date("2009-08-23")
    const endDate = new Date("2011-08-23")
    const minCount = 2
    const maxCount = 10
    const req = createRequest(
        {
            method: "POST",
            url: "/",
            body: {    
                startDate: startDate,
                endDate: endDate,
                minCount: minCount,
                maxCount: maxCount
            }
    })

    it("Response Status", done => {
        const res = createResponse({
            eventEmitter: require('events').EventEmitter
        });

        RecordController.fetchRecords(req, res)

        res.on('send', () => {
            expect(res._getStatusCode()).toBe(httpStatus.OK);
            done();
        });
    }),
    it("Response Fields", done => {
        const res = createResponse({
            eventEmitter: require('events').EventEmitter
        });

        RecordController.fetchRecords(req, res)

        res.on('send', () => {
            expect(res._getJSONData().code).toBe(Success.code);
            expect(res._getJSONData().msg).toBe(Success.msg);
            done();
        });
    }),
    it("Response Records", done => {
        const res = createResponse({
            eventEmitter: require('events').EventEmitter
        });
        RecordController.fetchRecords(req, res)

        res.on('send', () => {
            expect(res._getJSONData().records.length).toBe(1);
            expect(res._getJSONData().records[0].key).toBe("x");
            expect(res._getJSONData().records[0].totalCount).toBe(6);
            done();
        });
    })
})