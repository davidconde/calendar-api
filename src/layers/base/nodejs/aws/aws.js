const getAWS = () => {
    const AWS = require("aws-sdk");
    const useXRay = process.env.CALENDAR_API_USE_XRAY;

    if (useXRay) {
        const AWSXRay = require('aws-xray-sdk');
        return AWSXRay.captureAWS(AWS);
    }
        
    return AWS;
}

module.exports = getAWS();