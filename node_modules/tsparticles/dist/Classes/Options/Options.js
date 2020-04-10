import { Interactivity } from "./Interactivity/Interactivity";
import { Particles } from "./Particles/Particles";
import { PolygonMask } from "./PolygonMask/PolygonMask";
import { BackgroundMask } from "./BackgroundMask/BackgroundMask";
import { Presets } from "../Utils/Presets";
import { Background } from "./Background/Background";
export class Options {
    constructor() {
        this.detectRetina = false;
        this.fpsLimit = 30;
        this.interactivity = new Interactivity();
        this.particles = new Particles();
        this.polygon = new PolygonMask();
        this.backgroundMask = new BackgroundMask();
        this.pauseOnBlur = true;
        this.background = new Background();
    }
    get fps_limit() {
        return this.fpsLimit;
    }
    set fps_limit(value) {
        this.fpsLimit = value;
    }
    get retina_detect() {
        return this.detectRetina;
    }
    set retina_detect(value) {
        this.detectRetina = value;
    }
    load(data) {
        if (data !== undefined) {
            if (data.preset !== undefined) {
                if (data.preset instanceof Array) {
                    for (const preset of data.preset) {
                        this.importPreset(preset);
                    }
                }
                else {
                    this.importPreset(data.preset);
                }
            }
            if (data.background !== undefined) {
                this.background.load(data.background);
            }
            if (data.detectRetina !== undefined) {
                this.detectRetina = data.detectRetina;
            }
            else if (data.retina_detect !== undefined) {
                this.retina_detect = data.retina_detect;
            }
            if (data.fpsLimit !== undefined) {
                this.fpsLimit = data.fpsLimit;
            }
            else if (data.fps_limit !== undefined) {
                this.fps_limit = data.fps_limit;
            }
            if (data.pauseOnBlur !== undefined) {
                this.pauseOnBlur = data.pauseOnBlur;
            }
            this.interactivity.load(data.interactivity);
            this.particles.load(data.particles);
            this.polygon.load(data.polygon);
            this.backgroundMask.load(data.backgroundMask);
        }
    }
    importPreset(preset) {
        const presetOptions = Presets.getPreset(preset);
        if (presetOptions !== undefined) {
            this.load(presetOptions);
        }
    }
}
