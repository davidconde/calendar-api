const { ResponseUtil, BodyParser } = require("dcm-lambda-utils");
const eventPoster = require("./put-event");
const validateRequest = require("./validation");

exports.lambdaHandler = async (event, context) => {

    const body = BodyParser(event);

    if (body === null) {
        return ResponseUtil.Error(400, "Invalid request");
    }

    const validationResult = validateRequest(body);

    if (validationResult !== null) {
        return ResponseUtil.Error(400, validationResult);
    }

    const params = {};
    const response = await eventPoster(params);

    return ResponseUtil.OK(response);
};