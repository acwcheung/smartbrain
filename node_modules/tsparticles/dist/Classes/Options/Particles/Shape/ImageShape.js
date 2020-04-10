export class ImageShape {
    constructor() {
        this.height = 100;
        this.replaceColor = true;
        this.src = "";
        this.width = 100;
        this.fill = true;
        this.close = true;
    }
    get replace_color() {
        return this.replaceColor;
    }
    set replace_color(value) {
        this.replaceColor = value;
    }
    load(data) {
        if (data !== undefined) {
            if (data.height !== undefined) {
                this.height = data.height;
            }
            if (data.replaceColor !== undefined) {
                this.replaceColor = data.replaceColor;
            }
            else if (data.replace_color !== undefined) {
                this.replace_color = data.replace_color;
            }
            if (data.src !== undefined) {
                this.src = data.src;
            }
            if (data.width !== undefined) {
                this.width = data.width;
            }
        }
    }
}
