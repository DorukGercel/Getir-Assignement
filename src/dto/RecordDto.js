// DTO format sent as a response
module.exports = class RecordDto {
    constructor(code, msg, records) {
        this.code = code;
        this.msg = msg;
        this.records = records;
    }
}