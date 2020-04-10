export class PolygonShape {
    constructor() {
        this.close = true;
        this.fill = true;
        this.sides = 5;
    }
    get nb_sides() {
        return this.sides;
    }
    set nb_sides(value) {
        this.sides = value;
    }
    load(data) {
        if (data !== undefined) {
            if (data.sides !== undefined) {
                this.sides = data.sides;
            }
            else if (data.nb_sides !== undefined) {
                this.nb_sides = data.nb_sides;
            }
        }
    }
}
