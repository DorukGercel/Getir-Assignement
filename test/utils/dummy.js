const RecordModel = require("../../src/models/Record");
module.exports = { examples : [
    new RecordModel(
        {
            key: "x",
            createdAt:"2010-08-23",
            counts: [1, 2, 3]
        }
    ),
    new RecordModel(
        {
            key: "y",
            createdAt:"2010-08-23",
            counts: [1, 0, 0]
        }
    ),
    new RecordModel(
        {
            key: "z",
            createdAt:"2021-08-23",
            counts: [1, 2, 3]
        }
    ),
    new RecordModel(
        {
            key: "t",
            createdAt:"2021-08-23",
            counts: [1, 0, 0]
        }
    )
]}