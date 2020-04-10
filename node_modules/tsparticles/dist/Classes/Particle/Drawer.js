export class Drawer {
    constructor(container, particle) {
        this.container = container;
        this.particle = particle;
    }
    draw() {
        const container = this.container;
        const particle = this.particle;
        container.canvas.drawParticle(particle);
    }
}
