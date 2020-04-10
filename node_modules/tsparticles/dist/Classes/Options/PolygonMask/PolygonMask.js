import { PolygonMaskType } from "../../../Enums/PolygonMaskType";
import { Draw } from "./Draw";
import { Move } from "./Move";
import { PolygonInline } from "./PolygonInline";
export class PolygonMask {
    constructor() {
        this.draw = new Draw();
        this.enable = false;
        this.inline = new PolygonInline();
        this.move = new Move();
        this.scale = 1;
        this.type = PolygonMaskType.none;
        this.url = "";
    }
    get inlineArrangement() {
        return this.inline.arrangement;
    }
    set inlineArrangement(value) {
        this.inline.arrangement = value;
    }
    load(data) {
        if (data !== undefined) {
            this.draw.load(data.draw);
            if (data.inline !== undefined) {
                this.inline.load(data.inline);
            }
            else if (data.inlineArrangement !== undefined) {
                this.inlineArrangement = data.inlineArrangement;
            }
            this.move.load(data.move);
            if (data.scale !== undefined) {
                this.scale = data.scale;
            }
            if (data.type !== undefined) {
                this.type = data.type;
            }
            if (data.enable !== undefined) {
                this.enable = data.enable;
            }
            else {
                this.enable = this.type !== PolygonMaskType.none;
            }
            if (data.url !== undefined) {
                this.url = data.url;
            }
        }
    }
}
