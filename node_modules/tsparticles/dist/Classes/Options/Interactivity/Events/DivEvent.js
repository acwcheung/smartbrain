import { DivMode } from "../../../../Enums/Modes/DivMode";
export class DivEvent {
    constructor() {
        this.elementId = "repulse-div";
        this.enable = false;
        this.mode = DivMode.repulse;
    }
    get el() {
        return this.elementId;
    }
    set el(value) {
        this.elementId = value;
    }
    load(data) {
        if (data !== undefined) {
            if (data.elementId !== undefined) {
                this.elementId = data.elementId;
            }
            else if (data.el !== undefined) {
                this.el = data.el;
            }
            if (data.enable !== undefined) {
                this.enable = data.enable;
            }
            if (data.mode !== undefined) {
                this.mode = data.mode;
            }
        }
    }
}
