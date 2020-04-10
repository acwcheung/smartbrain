export class ShapeUtils {
    static addShapeDrawer(type, drawer) {
        if (!this.drawers[type]) {
            this.drawers[type] = drawer;
        }
    }
    static drawShape(context, particle, radius, opacity) {
        if (!particle.shape) {
            return;
        }
        const drawer = this.drawers[particle.shape];
        if (!drawer) {
            return;
        }
        drawer.draw(context, particle, radius, opacity);
    }
}
ShapeUtils.drawers = {};
