const { ResponseUtil } = require("dcm-lambda-utils");
const eventPoster = require("./post-event");

exports.lambdaHandler = async (event, context) => {

    const params = {};

    const response = await eventPoster(params);

    return ResponseUtil.OK(response);
};