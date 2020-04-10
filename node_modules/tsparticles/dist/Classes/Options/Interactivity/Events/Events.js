import { ClickEvent } from "./ClickEvent";
import { DivEvent } from "./DivEvent";
import { HoverEvent } from "./HoverEvent";
export class Events {
    constructor() {
        this.onClick = new ClickEvent();
        this.onDiv = new DivEvent();
        this.onHover = new HoverEvent();
        this.resize = true;
    }
    get onclick() {
        return this.onClick;
    }
    set onclick(value) {
        this.onClick = value;
    }
    get ondiv() {
        return this.onDiv;
    }
    set ondiv(value) {
        this.onDiv = value;
    }
    get onhover() {
        return this.onHover;
    }
    set onhover(value) {
        this.onHover = value;
    }
    load(data) {
        if (data !== undefined) {
            if (data.onClick !== undefined) {
                this.onClick.load(data.onClick);
            }
            else if (data.onclick !== undefined) {
                this.onclick.load(data.onclick);
            }
            if (data.onDiv !== undefined) {
                this.onDiv.load(data.onDiv);
            }
            else if (data.ondiv !== undefined) {
                this.ondiv.load(data.ondiv);
            }
            if (data.onHover !== undefined) {
                this.onHover.load(data.onHover);
            }
            else if (data.onhover !== undefined) {
                this.onhover.load(data.onhover);
            }
            if (data.resize !== undefined) {
                this.resize = data.resize;
            }
        }
    }
}
