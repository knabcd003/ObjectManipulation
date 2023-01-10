import { Mat4 } from "../lib/TSM.js";
const SQTHIRD = Math.pow((1.0 / 3.0), (1.0 / 2.0));
const THIRD = 1.0 / 3.0;
let pos_offset = 0;
let ind_offset = 0;
/**
 * Represents a Menger Sponge
 */
export class MengerSponge {
    constructor(level) {
    }
    /**
     * Returns true if the sponge has changed.
     */
    isDirty() {
        return true;
    }
    setClean() {
    }
    setLevel(level) {
        this.level = level;
        this.positions = new Float32Array(4 * 8 * (Math.pow(20, (level - 1))));
        this.normals = new Float32Array(4 * 8 * (Math.pow(20, (level - 1))));
        this.indices = new Uint32Array(3 * 2 * 6 * (Math.pow(20, (level - 1))));
        for (let i = 0; i < this.level; i++) {
            //this.drawCube();
        }
    }
    drawCube() {
    }
    /* Returns a flat Float32Array of the sponge's vertex positions */
    positionsFlat() {
        // TODO: right now this makes a single triangle. Make the cube fractal instead.
        //return this.positions;
        // console.log("giving positiongs");
        return new Float32Array([
            -0.5, 0.5, -0.5, 1.0,
            0.5, 0.5, -0.5, 1.0,
            0.5, -0.5, -0.5, 1.0,
            -0.5, -0.5, -0.5, 1.0,
            0.5, 0.5, 0.5, 1.0,
            -0.5, 0.5, 0.5, 1.0,
            -0.5, -0.5, 0.5, 1.0,
            0.5, -0.5, 0.5, 1.0,
            0.5, 0.5, -0.5, 1.0,
            -0.5, 0.5, -0.5, 1.0,
            -0.5, 0.5, 0.5, 1.0,
            0.5, 0.5, 0.5, 1.0,
            -0.5, -0.5, -0.5, 1.0,
            0.5, -0.5, -0.5, 1.0,
            0.5, -0.5, 0.5, 1.0,
            -0.5, -0.5, 0.5, 1.0,
            -0.5, 0.5, 0.5, 1.0,
            -0.5, 0.5, -0.5, 1.0,
            -0.5, -0.5, -0.5, 1.0,
            -0.5, -0.5, 0.5, 1.0,
            0.5, 0.5, -0.5, 1.0,
            0.5, 0.5, 0.5, 1.0,
            0.5, -0.5, 0.5, 1.0,
            0.5, -0.5, -0.5, 1.0
        ]);
    }
    /**
     * Returns a flat Uint32Array of the sponge's face indices
     */
    indicesFlat() {
        // TODO: right now this makes a single triangle. Make the cube fractal instead.
        return new Uint32Array([0, 1, 2,
            2, 3, 0,
            4, 5, 6,
            6, 7, 4,
            8, 9, 10,
            10, 11, 8,
            12, 13, 14,
            14, 15, 12,
            16, 17, 18,
            18, 19, 16,
            20, 21, 22,
            22, 23, 20
        ]);
    }
    /**
     * Returns a flat Float32Array of the sponge's normals
     */
    normalsFlat() {
        // TODO: right now this makes a single triangle. Make the cube fractal instead.
        return new Float32Array([0.0, 0.0, 1.0, 0.0,
            0.0, 0.0, 1.0, 0.0,
            0.0, 0.0, 1.0, 0.0,
            0.0, 0.0, 1.0, 0.0,
            0.0, 0.0, -1.0, 0.0,
            0.0, 0.0, -1.0, 0.0,
            0.0, 0.0, -1.0, 0.0,
            0.0, 0.0, -1.0, 0.0,
            0.0, 1.0, 0.0, 0.0,
            0.0, 1.0, 0.0, 0.0,
            0.0, 1.0, 0.0, 0.0,
            0.0, 1.0, 0.0, 0.0,
            0.0, -1.0, 0.0, 0.0,
            0.0, -1.0, 0.0, 0.0,
            0.0, -1.0, 0.0, 0.0,
            0.0, -1.0, 0.0, 0.0,
            1.0, 0.0, 0.0, 0.0,
            1.0, 0.0, 0.0, 0.0,
            1.0, 0.0, 0.0, 0.0,
            1.0, 0.0, 0.0, 0.0,
            -1.0, 0.0, 0.0, 0.0,
            -1.0, 0.0, 0.0, 0.0,
            -1.0, 0.0, 0.0, 0.0,
            -1.0, 0.0, 0.0, 0.0
        ]);
    }
    /**
     * Returns the model matrix of the sponge
     */
    uMatrix() {
        // TODO: change this, if it's useful
        const ret = new Mat4().setIdentity();
        return ret;
    }
}
//# sourceMappingURL=MengerSponge.js.map