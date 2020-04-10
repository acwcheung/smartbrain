import { Bubbler } from "./Particle/Bubbler";
import { Drawer } from "./Particle/Drawer";
import { Grabber } from "./Particle/Grabber";
import { Repulser } from "./Particle/Repulser";
import { ShapeType } from "../Enums/ShapeType";
import { Updater } from "./Particle/Updater";
import { Utils } from "./Utils/Utils";
import { PolygonMaskType } from "../Enums/PolygonMaskType";
import { Connecter } from "./Particle/Connecter";
import { InteractionManager } from "./Particle/InteractionManager";
import { HoverMode } from "../Enums/Modes/HoverMode";
import { ClickMode } from "../Enums/Modes/ClickMode";
import { RotateDirection } from "../Enums/RotateDirection";
import { ColorUtils } from "./Utils/ColorUtils";
export class Particle {
    constructor(container, position) {
        var _a, _b, _c, _d, _e, _f, _g, _h;
        this.container = container;
        const options = container.options;
        const color = options.particles.color;
        this.size = {};
        this.angle = options.particles.rotate.random ? Math.random() * 360 : options.particles.rotate.value;
        if (options.particles.rotate.direction == RotateDirection.random) {
            const index = Math.floor(Math.random() * 2);
            if (index > 0) {
                this.rotateDirection = RotateDirection.counterClockwise;
            }
            else {
                this.rotateDirection = RotateDirection.clockwise;
            }
        }
        else {
            this.rotateDirection = options.particles.rotate.direction;
        }
        const randomSize = options.particles.size.random;
        const sizeValue = container.retina.sizeValue;
        this.radius = randomSize.enable ? Utils.randomInRange(randomSize.minimumValue, sizeValue) : sizeValue;
        if (options.particles.size.animation.enable) {
            this.size.status = false;
            this.size.velocity = container.retina.sizeAnimationSpeed / 100;
            if (!options.particles.size.animation.sync) {
                this.size.velocity = this.size.velocity * Math.random();
            }
        }
        if (options.particles.rotate.animation.enable) {
            if (!options.particles.rotate.animation.sync) {
                this.angle = Math.random() * 360;
            }
        }
        this.position = this.calcPosition(this.container, position);
        if (options.polygon.enable && options.polygon.type === PolygonMaskType.inline) {
            this.initialPosition = {
                x: this.position.x,
                y: this.position.y,
            };
        }
        this.offset = {
            x: 0,
            y: 0,
        };
        if (options.particles.move.collisions) {
            this.checkOverlap(position);
        }
        if (color instanceof Array) {
            this.color = ColorUtils.colorToRgb(Utils.itemFromArray(color));
        }
        else {
            this.color = ColorUtils.colorToRgb(color);
        }
        const randomOpacity = options.particles.opacity.random;
        const opacityValue = options.particles.opacity.value;
        this.opacity = {
            value: randomOpacity.enable ? Utils.randomInRange(randomOpacity.minimumValue, opacityValue) : opacityValue,
        };
        if (options.particles.opacity.animation.enable) {
            this.opacity.status = false;
            this.opacity.velocity = options.particles.opacity.animation.speed / 100;
            if (!options.particles.opacity.animation.sync) {
                this.opacity.velocity *= Math.random();
            }
        }
        this.initialVelocity = Particle.calculateVelocity(options);
        this.velocity = {
            horizontal: this.initialVelocity.horizontal,
            vertical: this.initialVelocity.vertical,
        };
        this.fill = true;
        this.close = true;
        const shapeType = options.particles.shape.type;
        if (shapeType instanceof Array) {
            this.shape = Utils.itemFromArray(shapeType);
        }
        else {
            this.shape = shapeType;
        }
        if (this.shape === ShapeType.image) {
            const shape = options.particles.shape;
            const index = Utils.arrayRandomIndex(container.images);
            const image = container.images[index];
            const optionsImage = shape.image instanceof Array ? shape.image[index] : shape.image;
            this.image = {
                data: image,
                ratio: optionsImage.width / optionsImage.height,
                replaceColor: optionsImage.replaceColor,
                src: optionsImage.src,
            };
            if (!this.image.ratio) {
                this.image.ratio = 1;
            }
            this.fill = (_a = optionsImage.fill) !== null && _a !== void 0 ? _a : this.fill;
            this.close = (_b = optionsImage.close) !== null && _b !== void 0 ? _b : this.close;
        }
        if (this.shape === ShapeType.polygon) {
            if (options.particles.shape.polygon instanceof Array) {
                this.polygon = Utils.itemFromArray(options.particles.shape.polygon);
            }
            else {
                this.polygon = options.particles.shape.polygon;
            }
            this.fill = (_c = this.polygon.fill) !== null && _c !== void 0 ? _c : this.fill;
            this.close = (_d = this.polygon.close) !== null && _d !== void 0 ? _d : this.close;
        }
        if (options.particles.stroke instanceof Array) {
            this.stroke = Utils.itemFromArray(options.particles.stroke);
        }
        else {
            this.stroke = options.particles.stroke;
        }
        this.strokeColor = typeof this.stroke.color === "string" ?
            ColorUtils.stringToRgb(this.stroke.color) :
            ColorUtils.colorToRgb(this.stroke.color);
        this.shadowColor = typeof options.particles.shadow.color === "string" ?
            ColorUtils.stringToRgb(options.particles.shadow.color) :
            ColorUtils.colorToRgb(options.particles.shadow.color);
        if (this.shape === ShapeType.char || this.shape === ShapeType.character) {
            if (options.particles.shape.character instanceof Array) {
                this.character = Utils.itemFromArray(options.particles.shape.character);
            }
            else {
                this.character = options.particles.shape.character;
            }
            const value = this.character.value;
            this.text = value instanceof Array ? Utils.itemFromArray(value) : value;
            this.fill = (_e = this.character.fill) !== null && _e !== void 0 ? _e : this.fill;
            this.close = (_f = this.character.close) !== null && _f !== void 0 ? _f : this.close;
        }
        const shapeData = options.particles.shape.custom[this.shape];
        if (shapeData) {
            this.shapeData = shapeData instanceof Array ? Utils.itemFromArray(shapeData) : shapeData;
            this.fill = (_g = this.shapeData.fill) !== null && _g !== void 0 ? _g : this.fill;
            this.close = (_h = this.shapeData.close) !== null && _h !== void 0 ? _h : this.close;
        }
        this.updater = new Updater(this.container, this);
        this.bubbler = new Bubbler(this.container, this);
        this.repulser = new Repulser(this.container, this);
        this.drawer = new Drawer(this.container, this);
        this.grabber = new Grabber(this.container, this);
        this.connecter = new Connecter(this.container, this);
        this.interactionManager = new InteractionManager(this.container, this);
    }
    static calculateVelocity(options) {
        const baseVelocity = Utils.getParticleBaseVelocity(options);
        const res = {
            horizontal: 0,
            vertical: 0,
        };
        if (options.particles.move.straight) {
            res.horizontal = baseVelocity.x;
            res.vertical = baseVelocity.y;
            if (options.particles.move.random) {
                res.horizontal *= Math.random();
                res.vertical *= Math.random();
            }
        }
        else {
            res.horizontal = baseVelocity.x + Math.random() - 0.5;
            res.vertical = baseVelocity.y + Math.random() - 0.5;
        }
        return res;
    }
    resetVelocity() {
        const container = this.container;
        const options = container.options;
        const velocity = Particle.calculateVelocity(options);
        this.velocity.horizontal = velocity.horizontal;
        this.velocity.vertical = velocity.vertical;
    }
    update(index, delta) {
        const container = this.container;
        const options = container.options;
        this.updater.update(delta);
        const hoverMode = options.interactivity.events.onHover.mode;
        const clickMode = options.interactivity.events.onClick.mode;
        if (Utils.isInArray(HoverMode.grab, hoverMode)) {
            this.grabber.grab();
        }
        if (Utils.isInArray(HoverMode.connect, options.interactivity.events.onHover.mode)) {
            for (let j = index + 1; j < container.particles.count; j++) {
                const p2 = container.particles.array[j];
                this.connecter.connect(p2);
            }
        }
        if (Utils.isInArray(HoverMode.bubble, hoverMode) || Utils.isInArray(ClickMode.bubble, clickMode)) {
            this.bubbler.bubble();
        }
        if (Utils.isInArray(HoverMode.repulse, hoverMode) || Utils.isInArray(ClickMode.repulse, clickMode)) {
            this.repulser.repulse();
        }
    }
    interact(p2) {
        this.interactionManager.interact(p2);
    }
    draw() {
        this.drawer.draw();
    }
    isOverlapping() {
        const container = this.container;
        const p = this;
        let collisionFound = false;
        let iterations = 0;
        for (const p2 of container.particles.array.filter((t) => t != p)) {
            iterations++;
            const dist = Utils.getDistanceBetweenCoordinates(p.position, p2.position);
            if (dist <= p.radius + p2.radius) {
                collisionFound = true;
                break;
            }
        }
        return {
            collisionFound: collisionFound,
            iterations: iterations,
        };
    }
    checkOverlap(position) {
        const container = this.container;
        const p = this;
        const overlapResult = p.isOverlapping();
        if (overlapResult.iterations >= container.particles.count) {
            container.particles.remove(this);
        }
        else if (overlapResult.collisionFound) {
            p.position.x = position ? position.x : Math.random() * container.canvas.dimension.width;
            p.position.y = position ? position.y : Math.random() * container.canvas.dimension.height;
            p.checkOverlap();
        }
    }
    calcPosition(container, position) {
        var _a, _b;
        const pos = { x: 0, y: 0 };
        const options = container.options;
        if (options.polygon.enable && ((_b = (_a = container.polygon.raw) === null || _a === void 0 ? void 0 : _a.length) !== null && _b !== void 0 ? _b : 0) > 0) {
            if (position) {
                pos.x = position.x;
                pos.y = position.y;
            }
            else {
                const randomPoint = container.polygon.randomPointInPolygon();
                pos.x = randomPoint.x;
                pos.y = randomPoint.y;
            }
        }
        else {
            pos.x = position ? position.x : Math.random() * container.canvas.dimension.width;
            pos.y = position ? position.y : Math.random() * container.canvas.dimension.height;
            if (pos.x > container.canvas.dimension.width - this.radius * 2) {
                pos.x -= this.radius;
            }
            else if (pos.x < this.radius * 2) {
                pos.x += this.radius;
            }
            if (pos.y > container.canvas.dimension.height - this.radius * 2) {
                pos.y -= this.radius;
            }
            else if (pos.y < this.radius * 2) {
                pos.y += this.radius;
            }
        }
        return pos;
    }
}
