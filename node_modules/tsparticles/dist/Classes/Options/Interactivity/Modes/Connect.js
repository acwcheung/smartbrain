import { ConnectLineLinked } from "./ConnectLineLinked";
export class Connect {
    constructor() {
        this.distance = 80;
        this.lineLinked = new ConnectLineLinked();
        this.radius = 60;
    }
    get line_linked() {
        return this.lineLinked;
    }
    set line_linked(value) {
        this.lineLinked = value;
    }
    load(data) {
        if (data !== undefined) {
            if (data.distance !== undefined) {
                this.distance = data.distance;
            }
            if (data.lineLinked !== undefined) {
                this.lineLinked.load(data.lineLinked);
            }
            else if (data.line_linked !== undefined) {
                this.line_linked.load(data.line_linked);
            }
            if (data.radius !== undefined) {
                this.radius = data.radius;
            }
        }
    }
}
