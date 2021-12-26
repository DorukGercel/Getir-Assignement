const Joi = require("@hapi/joi").extend(require("@hapi/joi-date"));

const ValidQueryBody = Joi.object({
  startDate: Joi.date().format("YYYY-MM-DD").required(),
  endDate: Joi.date().format("YYYY-MM-DD").min(Joi.ref("startDate")).required(),
  minCount: Joi.number().required(),
  maxCount: Joi.number().min(Joi.ref("minCount")).required()
});

module.exports = {
  ValidQueryBody
};
