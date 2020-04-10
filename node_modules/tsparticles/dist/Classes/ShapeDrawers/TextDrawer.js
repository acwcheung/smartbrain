export class TextDrawer {
    draw(context, particle, radius, opacity) {
        const text = particle.text;
        const character = particle.character;
        if (text === undefined || character === undefined) {
            return;
        }
        const style = character.style;
        const weight = character.weight;
        const size = Math.round(radius) * 2;
        const font = character.font;
        const fill = character.fill;
        context.font = `${style} ${weight} ${size}px "${font}"`;
        const pos = {
            x: -radius / 2,
            y: radius / 2,
        };
        if (fill) {
            context.fillText(text, pos.x, pos.y);
        }
        else {
            context.strokeText(text, pos.x, pos.y);
        }
    }
}
