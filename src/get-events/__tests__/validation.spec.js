const {lambdaHandler} = require("./../index");

describe("Basic validation test suite", () => {

    it("Returns 400 when no calendar id is found", async () => {
        const response = await lambdaHandler({}, null);
        expect(response.statusCode).toBe(400)
    })

    it("Returns 400 when no calendar id is null", async () => {
        const event = {queryStringParameters: { calendaId: null}};
        const response = await lambdaHandler(event, null);
        expect(response.statusCode).toBe(400)
    })

    it("Returns 400 when no calendar id is empty", async () => {
        const event = {queryStringParameters: { calendaId: ""}};
        const response = await lambdaHandler(event, null);
        expect(response.statusCode).toBe(400)
    })
})