const buildAttributeMap = (object) => {

  let i = 0;
  let attrNames = {};
  let attrValues = {};

  for (let [key, value] of Object.entries(object)) {
    const paramName = `attr${i}`;
    i++;

    attrNames[`#${paramName}`] = key;
    attrValues[`:${paramName}`] = value;
  }

  return {
    names: attrNames,
    values: attrValues
  };
}

const buildUpdateExpression = (attributeNames, attributeValues) => {
  const names = Object.keys(attributeNames);
  const values = Object.keys(attributeValues);
  let expression = "set ";

  for (let i = 0; i < names.length; i++) {
    expression += `${names[i]} = ${values[i]}`;

    if (i + 1 < names.length) {
      expression += ", ";
    }
  }

  return expression;
};

const buildDynamoUpdateRequest = (pk, sk, object) => {

  attributeMap = buildAttributeMap(object);

  return {
    TableName: process.env.CALENDAR_API_DYNAMO_TABLE,
    Key: { "primary_key" : pk, "sort_key": sk },
    UpdateExpression: buildUpdateExpression(attributeMap.names, attributeMap.values),
    ExpressionAttributeNames: attributeMap.names,
    ExpressionAttributeValues: attributeMap.values
  }
}

module.exports = buildDynamoUpdateRequest;