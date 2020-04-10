var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
import { Loader } from "./Classes/Loader";
import { ShapeUtils } from "./Classes/Utils/ShapeUtils";
import { ShapeType } from "./Enums/ShapeType";
import { LineDrawer } from "./Classes/ShapeDrawers/LineDrawer";
import { CircleDrawer } from "./Classes/ShapeDrawers/CircleDrawer";
import { SquareDrawer } from "./Classes/ShapeDrawers/SquareDrawer";
import { TriangleDrawer } from "./Classes/ShapeDrawers/TriangleDrawer";
import { StartDrawer } from "./Classes/ShapeDrawers/StarDrawer";
import { PolygonDrawer } from "./Classes/ShapeDrawers/PolygonDrawer";
import { TextDrawer } from "./Classes/ShapeDrawers/TextDrawer";
import { ImageDrawer } from "./Classes/ShapeDrawers/ImageDrawer";
import { Presets } from "./Classes/Utils/Presets";
class Main {
    constructor() {
        if (typeof window !== "undefined" && window) {
            window.customRequestAnimationFrame = (() => {
                return window.requestAnimationFrame ||
                    window.webkitRequestAnimationFrame ||
                    window.mozRequestAnimationFrame ||
                    window.oRequestAnimationFrame ||
                    window.msRequestAnimationFrame ||
                    ((callback) => window.setTimeout(callback, 1000 / 60));
            })();
            window.customCancelRequestAnimationFrame = (() => {
                return window.cancelAnimationFrame ||
                    window.webkitCancelRequestAnimationFrame ||
                    window.mozCancelRequestAnimationFrame ||
                    window.oCancelRequestAnimationFrame ||
                    window.msCancelRequestAnimationFrame ||
                    clearTimeout;
            })();
        }
        const squareDrawer = new SquareDrawer();
        const textDrawer = new TextDrawer();
        ShapeUtils.addShapeDrawer(ShapeType.line, new LineDrawer());
        ShapeUtils.addShapeDrawer(ShapeType.circle, new CircleDrawer());
        ShapeUtils.addShapeDrawer(ShapeType.edge, squareDrawer);
        ShapeUtils.addShapeDrawer(ShapeType.square, squareDrawer);
        ShapeUtils.addShapeDrawer(ShapeType.triangle, new TriangleDrawer());
        ShapeUtils.addShapeDrawer(ShapeType.star, new StartDrawer());
        ShapeUtils.addShapeDrawer(ShapeType.polygon, new PolygonDrawer());
        ShapeUtils.addShapeDrawer(ShapeType.char, textDrawer);
        ShapeUtils.addShapeDrawer(ShapeType.character, textDrawer);
        ShapeUtils.addShapeDrawer(ShapeType.image, new ImageDrawer());
    }
    init() {
        if (typeof window !== "undefined" && window) {
            const tsParticles = this;
            window.particlesJS = (tagId, params) => {
                tsParticles.load(tagId, params);
            };
            window.particlesJS.load = (tagId, pathConfigJson, callback) => {
                tsParticles.loadJSON(tagId, pathConfigJson).then((container) => {
                    if (container) {
                        callback(container);
                    }
                });
            };
            window.particlesJS.setOnClickHandler = (callback) => {
                tsParticles.setOnClickHandler(callback);
            };
            window.pJSDom = () => {
                return window.tsParticles.dom();
            };
        }
    }
    loadFromArray(tagId, params, index) {
        return __awaiter(this, void 0, void 0, function* () {
            return Loader.loadFromArray(tagId, params, index);
        });
    }
    load(tagId, params) {
        return __awaiter(this, void 0, void 0, function* () {
            return Loader.load(tagId, params);
        });
    }
    loadJSON(tagId, pathConfigJson) {
        return Loader.loadJSON(tagId, pathConfigJson);
    }
    setOnClickHandler(callback) {
        Loader.setOnClickHandler(callback);
    }
    dom() {
        return Loader.dom();
    }
    domItem(index) {
        return Loader.domItem(index);
    }
    addShape(shape, drawer) {
        let customDrawer;
        if (typeof drawer === "function") {
            customDrawer = {
                draw: drawer,
            };
        }
        else {
            customDrawer = drawer;
        }
        ShapeUtils.addShapeDrawer(shape, customDrawer);
    }
    addPreset(preset, options) {
        Presets.addPreset(preset, options);
    }
}
const tsParticles = new Main();
export { tsParticles };
