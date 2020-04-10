import { PolygonDrawerBase } from "./PolygonDrawerBase";
export class StartDrawer extends PolygonDrawerBase {
    getSidesData(particle, radius) {
        var _a, _b;
        const sides = (_b = (_a = particle.polygon) === null || _a === void 0 ? void 0 : _a.sides) !== null && _b !== void 0 ? _b : 5;
        const side = {
            count: {
                denominator: 2,
                numerator: sides,
            },
            length: radius * 2 * 2.66 / (sides / 3),
        };
        return side;
    }
    getCenter(particle, radius) {
        var _a, _b;
        const sides = (_b = (_a = particle.polygon) === null || _a === void 0 ? void 0 : _a.sides) !== null && _b !== void 0 ? _b : 5;
        const start = {
            x: -radius * 2 / (sides / 4),
            y: -radius / (2 * 2.66 / 3.5),
        };
        return start;
    }
}
