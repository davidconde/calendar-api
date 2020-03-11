const buildDynamoUpdateRequest = require("./../build-update-request");

describe("Test building update request", ()=> {

  it("Builds the request", () => {
    const object = {
      key1: "value1",
      key2: true,
      key3: [ "value" ]
    };

    const result = buildDynamoUpdateRequest("id", "sk", object);

    expect(typeof result).toBe("object");
    expect(result.Key.primary_key).toBe("id");
    expect(result.Key.sort_key).toBe("sk");
    
    expect(Object.keys(result.ExpressionAttributeNames).length).toBe(3);
    expect(Object.keys(result.ExpressionAttributeValues).length).toBe(3);

    expect(result.UpdateExpression).toBe("set #attr0 = :attr0, #attr1 = :attr1, #attr2 = :attr2");
  })

})