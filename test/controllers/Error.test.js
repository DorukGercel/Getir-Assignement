const {createRequest, createResponse} = require("node-mocks-http");
const httpStatus = require("http-status");
const RecordModel = require("../../src/models/Record");
const ErrorController = require("../../src/controllers/Error");
const { NOT_FOUND } = require("http-status");
const { NotFoundErr } = require("../../src/definitions/Status");

describe("Error Controller", () => {
    it("Response Status", async () => {
        const res = createResponse({
            eventEmitter: require('events').EventEmitter
        });
        await ErrorController.handlePageNotFound({}, res)
        expect(res._getStatusCode()).toBe(NOT_FOUND);
    }),
    it("Response Fields", async () => {
        const res = createResponse({
            eventEmitter: require('events').EventEmitter
        });
        await ErrorController.handlePageNotFound({}, res)
        expect(res._getJSONData().code).toBe(NotFoundErr.code);
        expect(res._getJSONData().msg).toBe(NotFoundErr.msg);
    }),
    it("Response Records", async () => {
        const res = createResponse({
            eventEmitter: require('events').EventEmitter
        });
        await ErrorController.handlePageNotFound({}, res)
        expect(res._getJSONData().records.length).toBe(0);
    })
})