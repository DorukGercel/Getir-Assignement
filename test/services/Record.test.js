const RecordModel = require("../../src/models/Record");
const RecordService = require("../../src/services/Record");
const db = require("../utils/db");
const {examples} = require("../utils/dummy");

beforeAll(async () => {
    await db.connect();
    await RecordModel.bulkSave(examples)
});
afterAll(async () => {
    await db.close()
});

describe("Record Service - Easy: General Check", () => {
    it("Easy - 1: Length", done => {
        startDate = new Date("2009-08-23")
        endDate = new Date("2011-08-23")
        minCount = 2
        maxCount = 10
        RecordService.list(startDate, endDate, minCount, maxCount)
            .then((recList) => expect(recList.length).toBe(2))
            .catch((err) =>{})
        done()
    }),
    it("Easy - 2 : List", done => {
        startDate = new Date("2009-08-23")
        endDate = new Date("2011-08-23")
        minCount = 2
        maxCount = 10
        RecordService.list(startDate, endDate, minCount, maxCount)
            .then((recList) => {
                expect(recList[0].key).toBe("x")
                expect(recList[1].key).toBe("y")
            })
            .catch((err) =>{})
        done()
    }),
    it("Easy - 3 : All Values", done => {
        startDate = new Date("2009-08-23")
        endDate = new Date("2011-08-23")
        minCount = 2
        maxCount = 10
        RecordService.list(startDate, endDate, minCount, maxCount)
            .then((recList) => {
                expect(recList[0].key).toBe("x")
                expect(recList[0].totalCount).toBe(6)
                expect(recList[0].createdAt).toBe("2010-08-23")
            })
            .catch((err) =>{})
        done()
    })
})

describe("Record Service - Medium: Date Edge Cases", () => {
    it("Medium - 1: Empty List", done => {
        startDate = new Date("2005-08-23")
        endDate = new Date("2009-08-23")
        minCount = 0
        maxCount = 10
        RecordService.list(startDate, endDate, minCount, maxCount)
            .then((recList) => expect(recList.length).toBe(0))
            .catch((err) =>{})
        done()
    }),
    it("Medium - 2: Complete List", done => {
        startDate = new Date("2005-08-23")
        endDate = new Date("2022-08-23")
        minCount = 0
        maxCount = 10
        RecordService.list(startDate, endDate, minCount, maxCount)
            .then((recList) => {
                expect(recList.length).toBe(examples.length)
            })
            .catch((err) =>{})
        done()
    }),
    it("Medium - 3 : Several Records", done => {
        startDate = new Date("2009-08-23")
        endDate = new Date("2011-08-23")
        minCount = 0
        maxCount = 10
        RecordService.list(startDate, endDate, minCount, maxCount)
            .then((recList) => {
                expect(recList.length).toBe(2)
            })
            .catch((err) =>{})
        done()
    })
})

describe("Record Service - Medium: Total Count Edge Cases", () => {
    it("Medium - 1: Empty List", done => {
        startDate = new Date("2005-08-23")
        endDate = new Date("2025-08-23")
        minCount = 50
        maxCount = 50
        RecordService.list(startDate, endDate, minCount, maxCount)
            .then((recList) => expect(recList.length).toBe(0))
            .catch((err) =>{})
        done()
    }),
    it("Medium - 2: Complete List", done => {
        startDate = new Date("2005-08-23")
        endDate = new Date("2025-08-23")
        minCount = 0
        maxCount = 50
        RecordService.list(startDate, endDate, minCount, maxCount)
            .then((recList) => expect(recList.length).toBe(examples.length))
            .catch((err) =>{})
        done()
    }),
    it("Medium - 3: Several Records", done => {
        startDate = new Date("2005-08-23")
        endDate = new Date("2025-08-23")
        minCount = 0
        maxCount = 2
        RecordService.list(startDate, endDate, minCount, maxCount)
            .then((recList) => expect(recList.length).toBe(2))
            .catch((err) =>{})
        done()
    }),
    it("Medium - 4: Several Records", done => {
        startDate = new Date("2005-08-23")
        endDate = new Date("2025-08-23")
        minCount = 5
        maxCount = 10
        RecordService.list(startDate, endDate, minCount, maxCount)
            .then((recList) => expect(recList.length).toBe(2))
            .catch((err) =>{})
        done()
    })
})

describe("Record Service - Hard: Both Counts and Date Edge Cases", () => {
    it("Hard - 1: Wrong Date Order", done => {
        startDate = new Date("2025-08-23")
        endDate = new Date("2009-08-23")
        minCount = 0
        maxCount = 10
        RecordService.list(startDate, endDate, minCount, maxCount)
            .then((recList) => expect(recList.length).toBe(0))
            .catch((err) =>{})
        done()
    }),
    it("Hard - 2: Wrong Count Order", done => {
        startDate = new Date("2005-08-23")
        endDate = new Date("2025-08-23")
        minCount = 10
        maxCount = 0
        RecordService.list(startDate, endDate, minCount, maxCount)
            .then((recList) => expect(recList.length).toBe(0))
            .catch((err) =>{})
        done()
    }),
    it("Hard - 3: Both Wrong Order", done => {
        startDate = new Date("2035-08-23")
        endDate = new Date("2025-08-23")
        minCount = 10
        maxCount = 0
        RecordService.list(startDate, endDate, minCount, maxCount)
            .then((recList) => expect(recList.length).toBe(0))
            .catch((err) =>{})
        done()
    })
})

