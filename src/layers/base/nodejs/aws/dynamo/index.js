const AWS = require("./../aws");

const buildDynamoUpdateRequest = require("./build-update-request");
const buildDynamoSaveRequest = require("./build-save-request")

const getDynamoClient = () => {
    return new AWS.DynamoDB.DocumentClient({ region: process.env.AWS_REGION });
};

const getObject = (expression, maps) => {
    const query = {
        TableName: process.env.CALENDAR_API_DYNAMO_TABLE,
        KeyConditionExpression: expression,
        ExpressionAttributeValues: maps
    };

    const client = getDynamoClient();
    return client.query(query).promise();
}

const saveObject = (pk, sk, object) => {
    const client = getDynamoClient();

    const request = buildDynamoSaveRequest(pk, sk, object);
    return client.put(request).promise();
}

const updateObject = (pk, sk, object) => {
  const client = getDynamoClient();

  const request = buildDynamoUpdateRequest(pk, sk, object);
  return client.update(request).promise();
}

module.exports = {saveObject, getObject, updateObject};