const RecordModel = require("../models/Record");

// Performs required query operation
const list = (startDate, endDate, minCount, maxCount) => {
  return RecordModel.aggregate([
      {"$match" : {
          "createdAt" : {"$gte" : startDate, "$lte" : endDate}    
      }
      },
      {
        "$project" : {
          "_id":0,
          "key":1,
          "createdAt":1,
          "totalCount" : {
            "$sum" : "$counts"
          }
        }
      },
      {"$match" : {
          "totalCount" : {"$gte" : minCount, "$lte" : maxCount}    
        }
      }
  ]).exec();
}

module.exports = {
  list
};