const { ResponseUtil } = require("dcm-lambda-utils");

exports.lambdaHandler = async (event, context) => {

    const response = {
        alive: true
    };

    return ResponseUtil.OK(response);
};