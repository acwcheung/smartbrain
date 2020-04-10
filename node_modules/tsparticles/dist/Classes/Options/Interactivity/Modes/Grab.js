import { GrabLineLinked } from "./GrabLineLinked";
export class Grab {
    constructor() {
        this.distance = 100;
        this.lineLinked = new GrabLineLinked();
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
        }
    }
}
