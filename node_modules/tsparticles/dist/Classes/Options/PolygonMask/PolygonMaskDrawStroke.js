import { Color } from "../Particles/Color";
import { ColorUtils } from "../../Utils/ColorUtils";
export class PolygonMaskDrawStroke {
    constructor() {
        this.color = new Color();
        this.width = 0.5;
        this.opacity = 1;
    }
    load(data) {
        var _a, _b;
        if (data !== undefined) {
            if (data.color !== undefined) {
                if (typeof data.color === "string") {
                    this.color = data.color;
                    this.opacity = (_a = ColorUtils.stringToAlpha(data.color)) !== null && _a !== void 0 ? _a : this.opacity;
                }
                else {
                    const color = data.color;
                    this.color = new Color();
                    this.color.load(color);
                    if (typeof color.value === "string") {
                        this.opacity = (_b = ColorUtils.stringToAlpha(color.value)) !== null && _b !== void 0 ? _b : this.opacity;
                    }
                }
            }
            if (data.opacity !== undefined) {
                this.opacity = data.opacity;
            }
            if (data.width !== undefined) {
                this.width = data.width;
            }
        }
    }
}
