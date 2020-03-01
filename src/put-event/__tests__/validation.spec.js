const {lambdaHandler} = require("./../index");

describe("Basic validation test suite", () => {

    it("Returns 400 when no calendar id is found", async () => {
        const response = await lambdaHandler({}, null);
        expect(response.statusCode).toBe(400)
    })

    it("Returns 400 when no calendar id is null", async () => {
        const event = {body: JSON.stringify({ calendarId: null})};
        const response = await lambdaHandler(event, null);
        expect(response.statusCode).toBe(400)
    })

    it("Returns 400 when no calendar id is empty", async () => {
        const event = {body: JSON.stringify({ calendarId: ""})};
        const response = await lambdaHandler(event, null);
        expect(response.statusCode).toBe(400)
    })

    it("Returns 400 when date is invalid", async () => {
        const event = {body: JSON.stringify({ calendarId: "some-id", date: ""})};
        const response = await lambdaHandler(event, null);
        expect(response.statusCode).toBe(400)
    })

    it("Returns 400 when duration is invalid", async () => {
        const event = {body: JSON.stringify({ calendarId: "some-id", date: "1985-04-12T23:20:50.52Z", duration: ""})};
        const response = await lambdaHandler(event, null);
        expect(response.statusCode).toBe(400)
    })

    it("Returns 400 when title is invalid", async () => {
        const event = {body: JSON.stringify({ calendarId: "some-id", date: "1985-04-12T23:20:50.52Z", duration: 10, title: ""})};
        const response = await lambdaHandler(event, null);
        expect(response.statusCode).toBe(400)
    })    
})