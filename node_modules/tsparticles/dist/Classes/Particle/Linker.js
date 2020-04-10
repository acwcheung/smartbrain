import { ColorUtils } from "../Utils/ColorUtils";
import { Utils } from "../Utils/Utils";
import { Constants } from "../Utils/Constants";
export class Linker {
    constructor(container, particle) {
        this.container = container;
        this.particle = particle;
    }
    link(p2) {
        const container = this.container;
        const options = container.options;
        const particle = this.particle;
        const pos1 = {
            x: particle.position.x + particle.offset.x,
            y: particle.position.y + particle.offset.y,
        };
        const pos2 = {
            x: p2.position.x + p2.offset.x,
            y: p2.position.y + p2.offset.y,
        };
        const dist = Utils.getDistanceBetweenCoordinates(pos1, pos2);
        const optOpacity = options.particles.lineLinked.opacity;
        const optDistance = container.retina.lineLinkedDistance;
        if (dist <= optDistance) {
            const opacityLine = optOpacity - (dist * optOpacity) / optDistance;
            if (opacityLine > 0) {
                if (!container.particles.lineLinkedColor) {
                    const color = options.particles.lineLinked.color;
                    if (color === Constants.randomColorValue) {
                        if (options.particles.lineLinked.consent) {
                            container.particles.lineLinkedColor = ColorUtils.stringToRgb(color);
                        }
                        else if (options.particles.lineLinked.blink) {
                            container.particles.lineLinkedColor = Constants.randomColorValue;
                        }
                        else {
                            container.particles.lineLinkedColor = "mid";
                        }
                    }
                    else {
                        container.particles.lineLinkedColor = typeof color === "string" ?
                            ColorUtils.stringToRgb(color) :
                            ColorUtils.colorToRgb(color);
                    }
                }
                container.canvas.drawLinkedLine(particle, p2, pos1, pos2, opacityLine);
            }
        }
    }
}
