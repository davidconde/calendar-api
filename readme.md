# Serverless Calendar API

This is intended to use as a serverless calendar API. Should be enough to spin in your own AWS account with your infrastructure. Will be taking some inspiration from the [Google calendar API](https://developers.google.com/calendar/v3/reference/events) and some of its documentation. 

Data will be stored using DynamoDB using one table. For more information about single table design with Dynamo DB check [here](https://www.alexdebrie.com/posts/dynamodb-single-table/) or if you have some time to [watch this video](https://youtu.be/jzeKPKpucS0) by [Rick Houligan](https://twitter.com/houlihan_rick). 


The API will be supporting 4 main queries:

- getEvents: Gets all the events for a given calendar in a specified period. 
- putEvent: Adds a new event into a given calendar
- deleteEvent: Deletes an event for a given calendar
- clear: Clears a calendar

# putEvent

Allows to put a new event for a given calendar. 

*ENDPOINT*: PUT /events

## Request 

To be able to save a new event, the request will need the following fields:

 - calendarId: *string* (required): id of the calendar to retrieve
 - date *date* (required): Date when the event is ocurring. This will be in [RFC3339](https://tools.ietf.org/html/rfc3339) format
 - duration *int* (required): Duration of the event in minutes
 - title *string* (required): Title of the event
 - description *string*: Long description of the event. 
 - location *string*: Location of the event, this field could be used as a link for online events
 - attendees *array*: A list of all the attendees to the event
   - id *string* (required): Id of the attendee (this is usually an email).
   - displayName *string*: Display name of the attendee
 - passcode *string*: passcode for the event (if one is needed)
 - reminders *array*: A list of reminders to be sent for this event to the organiser
   - method *string* (required): Delivery method for the reminder (SMS|EMAIL)
   - minutes *int* (required): How many minutes before the event this will be delivered 

## Response

Once the new event has been saved, the response will be the following:

 - done: *bool*: Indicates if the request was successfully completed or not.
 - result *object*: If successful, the result will contain the following:
    - id *string*: Id of the event recently created
 - error *string*: If not successful, contains an error message indicating why.

# getEvents

API to get upcoming events for a given calendar. 

*ENDPOINT*: GET /event

## Request

Request will have the following fields:

 - calendarId: *string* (required): id of the calendar to retrieve
 - startDate: *date* (required): Starting date for the search. Any appointment that starts after or on this date will be returned on the search.
 - endDate: *date* (required): Ending date for the search. Any appointment that ends before or on this endDate will be returned on the search.


## Response

The events will contain the following fields:

 - id *string*: Id for the event. This is generated when creating a new event
 - date *date*: Date when the event is ocurring. This will be in [RFC3339](https://tools.ietf.org/html/rfc3339) format
 - duration *int*: Duration of the event in minutes
 - title *string*: Title of the event
 - description *string*: Long description of the event. 
 - location *string*: Location of the event, this field could be used as a link for online events
 - organiser *object*: Organiser of the event
   - id *string*: Id of the organiser (this is usually an email).
   - displayName *string*: Name of the organiser
 - attendees *array*: A list of all the attendees to the event
   - id *string*: Id of the attendee (this is usually an email).
   - displayName *string*: Display name of the attendee
   - self *bool*: This is the person who made the API call
 - passcode *string*: passcode for the event (if one is needed)
 - reminders *array*: A list of reminders to be sent for this event to the organiser
   - method *string*: Delivery method for the reminder (SMS|EMAIL)
   - minutes *int*: How many minutes before the event this will be delivered
