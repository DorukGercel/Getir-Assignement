const hs = require("http-status");
const Status = require("../definitions/Status");
const RecordDto = require("../dto/RecordDto");

// Handle page not found operations
const handlePageNotFound = (req, res) => {
    dto = new RecordDto(Status.NotFoundErr.code, Status.NotFoundErr.msg, []);
    return res.status(hs.NOT_FOUND).json(dto);
};
  
module.exports = {
    handlePageNotFound
};