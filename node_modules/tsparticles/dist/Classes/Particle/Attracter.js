export class Attracter {
    constructor(container, particle) {
        this.container = container;
        this.particle = particle;
    }
    attract(p2) {
        const container = this.container;
        const options = container.options;
        const particle = this.particle;
        const dx = particle.position.x - p2.position.x;
        const dy = particle.position.y - p2.position.y;
        const dist = Math.sqrt(dx * dx + dy * dy);
        if (dist <= container.retina.lineLinkedDistance) {
            const ax = dx / (options.particles.move.attract.rotate.x * 1000);
            const ay = dy / (options.particles.move.attract.rotate.y * 1000);
            particle.velocity.horizontal -= ax;
            particle.velocity.vertical -= ay;
            p2.velocity.horizontal += ax;
            p2.velocity.vertical += ay;
        }
    }
}
