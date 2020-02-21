const fakeData = require("./sample.json");

const eventFetcher = async (params) => {
    return fakeData;
}

module.exports = eventFetcher;