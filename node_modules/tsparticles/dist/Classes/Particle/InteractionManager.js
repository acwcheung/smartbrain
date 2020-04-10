import { Linker } from "./Linker";
import { Attracter } from "./Attracter";
import { Collider } from "./Collider";
export class InteractionManager {
    constructor(container, particle) {
        this.container = container;
        this.linker = new Linker(container, particle);
        this.attracter = new Attracter(container, particle);
        this.collider = new Collider(container, particle);
    }
    interact(p2) {
        const container = this.container;
        const options = container.options;
        if (options.particles.lineLinked.enable) {
            this.linker.link(p2);
        }
        if (options.particles.move.attract.enable) {
            this.attracter.attract(p2);
        }
        if (options.particles.move.collisions) {
            this.collider.collide(p2);
        }
    }
}
