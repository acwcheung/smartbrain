import { PolygonDrawerBase } from "./PolygonDrawerBase";
export class TriangleDrawer extends PolygonDrawerBase {
    getSidesData(particle, radius) {
        const side = {
            count: {
                denominator: 2,
                numerator: 3,
            },
            length: radius * 2,
        };
        return side;
    }
    getCenter(particle, radius) {
        const start = {
            x: -radius,
            y: radius / 1.66,
        };
        return start;
    }
}
