import { PolygonMaskDrawStroke } from "./PolygonMaskDrawStroke";
export class Draw {
    constructor() {
        this.enable = false;
        this.stroke = new PolygonMaskDrawStroke();
    }
    get lineWidth() {
        return 0;
    }
    set lineWidth(value) {
    }
    get lineColor() {
        return "";
    }
    set lineColor(value) {
    }
    load(data) {
        var _a;
        if (data !== undefined) {
            if (data.enable !== undefined) {
                this.enable = data.enable;
            }
            const stroke = (_a = data.stroke) !== null && _a !== void 0 ? _a : {
                color: data.lineColor,
                width: data.lineWidth
            };
            this.stroke.load(stroke);
        }
    }
}
