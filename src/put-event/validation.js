const validator = require('validator');

/**
 * Validation routing for request on putting a new event.
 * 
 * @param {object} requestBody 
 * @returns {string} error message if validation fails. Null if it's valid
 */
const validateRequest = (requestBody) => {
    const errorMessage = "";

    /**
        - calendarId: *string* (required): id of the calendar to retrieve
        - date *date* (required): Date when the event is ocurring. This will be in [RFC3339](https://tools.ietf.org/html/rfc3339) format
        - duration *int* (required): Duration of the event in minutes
        - title *string* (required): Title of the event
        - description *string*: Long description of the event. 
        - location *string*: Location of the event, this field could be used as a link for online events
        
        -> attendees *array*: A list of all the attendees to the event
            - id *string* (required): Id of the attendee (this is usually an email).
    */

    if (!requestBody.calendarId || requestBody.calendarId === "") {
        return "Invalid calendar Id. Calendar ID is required and none was found.";
    }

    if (!validator.isRFC3339(requestBody.date)) {
        return "Invalid date. Date is required and the provided one has to comply with RFC3339.";
    }

    const duration = requestBody.duration;

    if ( typeof duration === "number" && duration % 1 === 0 ) {
        return "Invalid duration. Duration is required and the provided one has to be an integer.";
    }

    if (!requestBody.title || validator.isEmpty(requestBody.title)) {
        return "Invalid title. Title is required";
    }

    if (requestBody.attendees && !Array.isArray(requestBody.attendees)) {
        return "Attendees provided must be a list";
    }

    return null;
}

module.exports = validateRequest;