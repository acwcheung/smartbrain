export class Density {
    constructor() {
        this.enable = false;
        this.area = 800;
    }
    get value_area() {
        return this.area;
    }
    set value_area(value) {
        this.area = value;
    }
    load(data) {
        if (data !== undefined) {
            if (data.enable !== undefined) {
                this.enable = data.enable;
            }
            if (data.area !== undefined) {
                this.area = data.area;
            }
            else if (data.value_area !== undefined) {
                this.value_area = data.value_area;
            }
        }
    }
}
