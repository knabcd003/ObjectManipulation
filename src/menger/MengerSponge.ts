import { Mat3, Mat4, Vec3, Vec4 } from "../lib/TSM.js";

const SQTHIRD = (1.0/3.0)**(1.0/2.0);
const THIRD = 1.0/3.0;

let pos_offset = 0;
let ind_offset = 0;

/* A potential interface that students should implement */
interface IMengerSponge {
  setLevel(level: number): void;
  isDirty(): boolean;
  setClean(): void;
  normalsFlat(): Float32Array;
  indicesFlat(): Uint32Array;
  positionsFlat(): Float32Array;
}

/**
 * Represents a Menger Sponge
 */
export class MengerSponge implements IMengerSponge {  

  level: number;

  positions: Float32Array;
  normals: Float32Array;
  indices: Uint32Array;
  constructor(level: number) {
	  
  }

  /**
   * Returns true if the sponge has changed.
   */
  public isDirty(): boolean {
       return true;
  }

  public setClean(): void {
  }
  
  public setLevel(level: number)
  {
      this.level = level;
      this.positions = new Float32Array(4 * 8 * (20**(level - 1)));
      this.normals = new Float32Array(4 * 8 * (20**(level - 1)));
      this.indices = new Uint32Array(3 * 2 * 6 * (20**(level - 1)));

      for(let i = 0; i < this.level; i ++) {
        //this.drawCube();
      }
  }

  public drawCube() {

  }

  /* Returns a flat Float32Array of the sponge's vertex positions */
  public positionsFlat(): Float32Array {
	  // TODO: right now this makes a single triangle. Make the cube fractal instead.

    //return this.positions;
    // console.log("giving positiongs");
    return new Float32Array([
      -0.5, 0.5, -0.5, 1.0, //top right //back face
       0.5, 0.5, -0.5, 1.0, //top left
       0.5, -0.5, -0.5, 1.0, //bottom left
       -0.5, -0.5, -0.5, 1.0, //bottom right
       0.5, 0.5, 0.5, 1.0, //top right  //back face
       -0.5, 0.5, 0.5, 1.0, //top left
       -0.5, -0.5, 0.5, 1.0, //bottom left
       0.5, -0.5, 0.5, 1.0, //bottom right
       0.5, 0.5, -0.5, 1.0, //top right  //top face
       -0.5, 0.5, -0.5, 1.0, //top left
       -0.5, 0.5, 0.5, 1.0, //bottom left
       0.5, 0.5, 0.5, 1.0, //top right
       -0.5, -0.5, -0.5, 1.0, //top right  //bottom face
       0.5, -0.5, -0.5, 1.0, //top left
       0.5, -0.5, 0.5, 1.0, //bottom left
       -0.5, -0.5, 0.5, 1.0, //top right
       -0.5, 0.5, 0.5, 1.0, //right face
       -0.5, 0.5, -0.5, 1.0,
       -0.5, -0.5, -0.5, 1.0,
       -0.5, -0.5, 0.5, 1.0,
       0.5, 0.5, -0.5, 1.0, //left face
       0.5, 0.5, 0.5, 1.0,
       0.5, -0.5, 0.5, 1.0,
       0.5, -0.5, -0.5, 1.0
      ])
  }

  /**
   * Returns a flat Uint32Array of the sponge's face indices
   */
  public indicesFlat(): Uint32Array {
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
                          ])
  }

  /**
   * Returns a flat Float32Array of the sponge's normals
   */
  public normalsFlat(): Float32Array {
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
                           ])
    }

  /**
   * Returns the model matrix of the sponge
   */
  public uMatrix(): Mat4 {

    // TODO: change this, if it's useful
    const ret : Mat4 = new Mat4().setIdentity();

    return ret;    
  }
  
}