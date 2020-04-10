import { ParticlesSizeAnimation } from "./ParticlesSizeAnimation";
import { RandomSize } from "./RandomSize";
export class ParticlesSize {
    constructor() {
        this.animation = new ParticlesSizeAnimation();
        this.random = new RandomSize;
        this.value = 3;
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
