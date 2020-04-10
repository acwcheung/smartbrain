import { OpacityAnimation } from "./OpacityAnimation";
import { RandomOpacity } from "./RandomOpacity";
export class Opacity {
    constructor() {
        this.animation = new OpacityAnimation();
        this.random = new RandomOpacity();
        this.value = 1;
    }
    get anim() {
        return this.animation;
    }
    set anim(value) {
        this.animation = value;
    }
    load(data) {
        if (data !== undefined) {
            if (data.animation !== undefined) {
                this.animation.load(data.animation);
            }
            else if (data.anim !== undefined) {
                this.anim.load(data.anim);
            }
            if (data.random !== undefined) {
                const random = this.random;
                if (typeof data.random === "boolean") {
                    random.enable = data.random;
                }
                else {
                    random.load(data.random);
                }
            }
            if (data.value !== undefined) {
                this.value = data.value;
            }
        }
    }
}
