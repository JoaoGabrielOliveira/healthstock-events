export default class EventModel {
    id;
    origin;
    host;
    message;
    /**
     * Diz qual o level do evento disparado!
     * @type {"info" | "warn" | "error" | "debug"}
     */
    level;
    data;

    constructor(response){
        this.id = Math.random() * 1000;

        this.host = response.host;
        this.origin = response.origin;
        this.message = response.message;
        this.data = response.data;

        if(["info", "warn", "error", "debug"].includes(response.level))
            this.level = response.level;
        else
            throw Error('Log level is not recognizing!');
    }
}