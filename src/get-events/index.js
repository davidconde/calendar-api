const { ResponseUtil } = require("dcm-lambda-utils");
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

    const params = {};

    console.log(event.queryStringParameters)

    const response = await eventFetcher(params);

    return ResponseUtil.OK(response);
};