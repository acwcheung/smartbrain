import { Color } from "./Color";
export class Stroke {
    constructor() {
        this.color = new Color();
        this.width = 0;
        this.opacity = 1;
        this.color.value = "#ff0000";
    }
    load(data) {
        if (data !== undefined) {
            if (data.color !== undefined) {
                if (typeof this.color === "string") {
                    this.color = data.color;
                }
                else {
                    this.color.load(data.color);
                }
            }
            if (data.width !== undefined) {
                this.width = data.width;
            }
        }
    }
}
