export class Connecter {
    constructor(container, particle) {
        this.container = container;
        this.particle = particle;
    }
    connect(destParticle) {
        const container = this.container;
        const options = container.options;
        const particle = this.particle;
        if (options.interactivity.events.onHover.enable && container.interactivity.status == 'mousemove') {
            const xDiff = Math.abs(particle.position.x - destParticle.position.x);
            const yDiff = Math.abs(particle.position.y - destParticle.position.y);
            const mousePos = container.interactivity.mouse.position || { x: 0, y: 0 };
            const xCoreDiff = Math.abs(particle.position.x - mousePos.x);
            const yCoreDiff = Math.abs(particle.position.y - mousePos.y);
            const distMax = Math.abs(container.retina.connectModeDistance);
            const connectAreaRadius = Math.abs(container.retina.connectModeRadius);
            if (xDiff < distMax && yDiff < distMax && xCoreDiff < connectAreaRadius && yCoreDiff < connectAreaRadius) {
                container.canvas.drawConnectLine(particle, destParticle);
            }
        }
    }
}
