const { ResponseUtil } = require("dcm-lambda-utils");
const validator = require('validator');
const eventFetcher = require("./get-events");

exports.lambdaHandler = async (event, context) => {
    if (! (event && event.queryStringParameters)) {
        return ResponseUtil.Error(400, "Invalid calendar ID received")
    }
    
    const {
        calendarId,
        startDate,
        endDate
    } = event.queryStringParameters;

    if (!calendarId) {
        return ResponseUtil.Error(400, "Invalid calendar ID received")
    }

    if (typeof startDate !== "undefined" && !validator.isRFC3339(startDate)) {
        return ResponseUtil.Error(400, "Invalid start date received. Please use a valid RFC3339 date.")
    }

    if (typeof endDate !== "undefined" && !validator.isRFC3339(endDate)) {
        return ResponseUtil.Error(400, "Invalid end date received. Please use a valid RFC3339 date.")
    }

    const params = {
        calendarId, 
        startDate,
        endDate
    };

    const response = await eventFetcher(params);

    return ResponseUtil.OK(response);
};