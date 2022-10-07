export default class EventModel {
    id;
    origin;
    host;
    message;
    data;

    constructor(response){
        this.id = Math.random() * 1000;

        this.host = response.host;
        this.origin = response.origin;
        this.message = response.message;
        this.data = response.data;
    }
}