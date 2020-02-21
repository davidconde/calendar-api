const {lambdaHandler} = require("./../index");

describe("Basic validation test suite", () => {

    it("Returns 400 when no calendar id is found", async () => {
        const response = await lambdaHandler({}, null);
        expect(response.statusCode).toBe(400)
    })

    it("Returns 400 when no calendar id is null", async () => {
        const event = {queryStringParameters: { calendarId: null}};
        const response = await lambdaHandler(event, null);
        expect(response.statusCode).toBe(400)
    })

    it("Returns 400 when no calendar id is empty", async () => {
        const event = {queryStringParameters: { calendarId: ""}};
        const response = await lambdaHandler(event, null);
        expect(response.statusCode).toBe(400)
    })

    it("Returns 400 when startDate is invalid", async () => {
        const event = {queryStringParameters: { calendarId: "some-id", startDate: ""}};
        const response = await lambdaHandler(event, null);
        expect(response.statusCode).toBe(400)
    })

    it("Returns 200 when startDate is valid", async () => {
        const event = {queryStringParameters: { calendarId: "some-id", startDate: "2020-02-20T20:00:00.00Z"}};
        const response = await lambdaHandler(event, null);
        expect(response.statusCode).toBe(200)
    })

    it("Returns 400 when endDate is invalid", async () => {
        const event = {queryStringParameters: { calendarId: "some-id", endDate: ""}};
        const response = await lambdaHandler(event, null);
        expect(response.statusCode).toBe(400)
    })

    it("Returns 200 when endDate is valid", async () => {
        const event = {queryStringParameters: { calendarId: "some-id", endDate: "2020-02-20T20:00:00.00Z"}};
        const response = await lambdaHandler(event, null);
        expect(response.statusCode).toBe(200)
    })
})