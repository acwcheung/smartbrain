import { ShapeType } from "../../../../Enums/ShapeType";
import { CharacterShape } from "./CharacterShape";
import { ImageShape } from "./ImageShape";
import { PolygonShape } from "./PolygonShape";
export class Shape {
    constructor() {
        this.character = new CharacterShape();
        this.image = new ImageShape();
        this.polygon = new PolygonShape();
        this.type = ShapeType.circle;
        this.custom = {};
    }
    get images() {
        if (this.image instanceof Array) {
            return this.image;
        }
        return [];
    }
    set images(value) {
        this.image = value;
    }
    get stroke() {
        return [];
    }
    set stroke(value) {
    }
    load(data) {
        if (data !== undefined) {
            if (data.custom !== undefined)
                for (const customShape in data.custom) {
                    const item = data.custom[customShape];
                    if (item !== undefined) {
                        if (item instanceof Array) {
                            this.custom[customShape] = item.filter(t => t !== undefined).map((s) => {
                                return s;
                            });
                        }
                        else {
                            this.custom[customShape] = item;
                        }
                    }
                }
            if (data.character !== undefined) {
                if (data.character instanceof Array) {
                    this.character = data.character.map((s) => {
                        const tmp = new CharacterShape();
                        tmp.load(s);
                        return tmp;
                    });
                }
                else {
                    if (this.character instanceof Array) {
                        this.character = new CharacterShape();
                    }
                    this.character.load(data.character);
                }
            }
            if (data.image !== undefined) {
                if (data.image instanceof Array) {
                    this.image = data.image.map((s) => {
                        const tmp = new ImageShape();
                        tmp.load(s);
                        return tmp;
                    });
                }
                else {
                    if (this.image instanceof Array) {
                        this.image = new ImageShape();
                    }
                    this.image.load(data.image);
                }
            }
            if (data.polygon !== undefined) {
                if (data.polygon instanceof Array) {
                    this.polygon = data.polygon.map((s) => {
                        const tmp = new PolygonShape();
                        tmp.load(s);
                        return tmp;
                    });
                }
                else {
                    if (this.polygon instanceof Array) {
                        this.polygon = new PolygonShape();
                    }
                    this.polygon.load(data.polygon);
                }
            }
            if (data.type !== undefined) {
                this.type = data.type;
            }
        }
    }
}
