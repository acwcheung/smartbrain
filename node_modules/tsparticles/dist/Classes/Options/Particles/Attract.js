export class Attract {
    constructor() {
        this.enable = false;
        this.rotate = {
            x: 3000,
            y: 3000,
        };
    }
    get rotateX() {
        return this.rotate.x;
    }
    set rotateX(value) {
        this.rotate.x = value;
    }
    get rotateY() {
        return this.rotate.y;
    }
    set rotateY(value) {
        this.rotate.y = value;
    }
    load(data) {
        var _a, _b;
        if (data !== undefined) {
            if (data.enable !== undefined) {
                this.enable = data.enable;
            }
            if (((_a = data.rotate) === null || _a === void 0 ? void 0 : _a.x) !== undefined) {
                this.rotate.x = data.rotate.x;
            }
            else if (data.rotateX !== undefined) {
                this.rotateX = data.rotateX;
            }
            if (((_b = data.rotate) === null || _b === void 0 ? void 0 : _b.y) !== undefined) {
                this.rotate.y = data.rotate.y;
            }
            else if (data.rotateY !== undefined) {
                this.rotateY = data.rotateY;
            }
        }
    }
}
