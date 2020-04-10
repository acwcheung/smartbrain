import { ClickMode } from "../../../../Enums/Modes/ClickMode";
export class ClickEvent {
    constructor() {
        this.enable = false;
        this.mode = ClickMode.push;
    }
    load(data) {
        if (data !== undefined) {
            if (data.enable !== undefined) {
                this.enable = data.enable;
            }
            if (data.mode !== undefined) {
                this.mode = data.mode;
            }
        }
    }
}
