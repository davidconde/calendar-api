const { ResponseUtil } = require("dcm-lambda-utils");
const eventFetcher = require("./get-events");

exports.lambdaHandler = async (event, context) => {

    const params = {};

    const response = await eventFetcher(params);

    return ResponseUtil.OK(response);
};