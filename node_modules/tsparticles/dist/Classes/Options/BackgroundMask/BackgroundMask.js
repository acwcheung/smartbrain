import { BackgroundMaskCover } from "./BackgroundMaskCover";
export class BackgroundMask {
    constructor() {
        this.cover = new BackgroundMaskCover();
        this.enable = false;
    }
    load(data) {
        if (data !== undefined) {
            if (data.cover !== undefined) {
                this.cover.load(data.cover);
            }
            if (data.enable !== undefined) {
                this.enable = data.enable;
            }
        }
    }
}
