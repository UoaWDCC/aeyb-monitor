/* This interface outlines the information of each Weekly instance and each Event instance */

export interface Weekly{
    // each weekly instance will have a collection of event
    // for each event instance, load the information from id
    listOfEvents: Array<Events>;
}

// have an event loader then parse it into type Event before storing in the array 
// for deployment 
type Events = {
    // additional information depending on API
    title: string
    description: string
    time: string
    attendance: null //array of profiles once merged with profile page
    status: EventStatus // user specific input
}

export enum EventStatus{
    PENDING = "#F4CCCC",
    RESPONDED = "#D9D2E9"
}