import { Color } from "./Color";
export class LineLinkedShadow {
    constructor() {
        this.blur = 5;
        this.color = new Color();
        this.enable = false;
        this.color.value = "lime";
    }
    load(data) {
        if (data !== undefined) {
            if (data.blur !== undefined) {
                this.blur = data.blur;
            }
            if (data.color !== undefined) {
                if (typeof this.color === "string") {
                    this.color = data.color;
                }
                else {
                    this.color.load(data.color);
                }
            }
            if (data.enable !== undefined) {
                this.enable = data.enable;
            }
        }
    }
}
