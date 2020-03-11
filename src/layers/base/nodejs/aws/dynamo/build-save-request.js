const buildDynamoSaveRequest = (pk, sk, object) => {
  const item = {
      primary_key: pk,
      sort_key: sk,
      ...object
  };

  return {
      TableName: process.env.CALENDAR_API_DYNAMO_TABLE,
      Item: item,
      ReturnValues: 'NONE',
      ReturnConsumedCapacity: 'TOTAL'
  };
}

module.exports = buildDynamoSaveRequest; 