import { Density } from "./Density";
export class ParticlesNumber {
    constructor() {
        this.density = new Density();
        this.limit = 0;
        this.value = 100;
    }
    get max() {
        return this.limit;
    }
    set max(value) {
        this.limit = value;
    }
    load(data) {
        if (data !== undefined) {
            this.density.load(data.density);
            if (data.max !== undefined) {
                this.max = data.max;
            }
            else if (data.limit !== undefined) {
                this.limit = data.limit;
            }
            if (data.value !== undefined) {
                this.value = data.value;
            }
        }
    }
}
