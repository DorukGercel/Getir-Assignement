const httpStatus = require("http-status");
const Status = require("../definitions/Status");
const RecordDto = require("../dto/RecordDto");

const validate = (schema, src) => (req, res, next) => {
    // Check the input from the request
    schema.validateAsync(req[src])
                      .then((value) => {
                          Object.assign(req.body, value);
                          return next();
                      })
                      .catch((err) => {
                          const errorMessage = err.details.map((detail) => detail.message).join(", ");
                          dto = new RecordDto(Status.BadReqErr.code, errorMessage, [])
                          return res.status(httpStatus.BAD_REQUEST).json(dto);
                      })  
};

module.exports = validate;