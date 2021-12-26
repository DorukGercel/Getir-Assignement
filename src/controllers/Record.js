const hs = require("http-status");
const Status = require("../definitions/Status");
const RecordDto = require("../dto/RecordDto");
const {list} = require("../services/Record");

// Handle fetching of records
const fetchRecords = (req, res) => {
  list(req.body.startDate, req.body.endDate, req.body.minCount, req.body.maxCount)
    .then((recordList) => {
      // Record list returned
      if (!recordList) {
        // If empty return internal error
        dto = new RecordDto(Status.InternalErr.code, Status.InternalErr.msg, []);
        return res.status(hs.INTERNAL_SERVER_ERROR).json(dto);
      }
      // Send obtained record list
      dto = new RecordDto(Status.Success.code, Status.Success.msg, recordList);
      return res.status(hs.OK).json(dto);
    })
    .catch((err) => {
      // Send error
      dto = new RecordDto(Status.InternalErr.code, err.message, []);
      return res.status(hs.INTERNAL_SERVER_ERROR).json(dto);
    });
};

module.exports = {
  fetchRecords
};
