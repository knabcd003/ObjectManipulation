import { Camera } from "../lib/webglutils/Camera.js";
import { CanvasAnimation } from "../lib/webglutils/CanvasAnimation.js";
import { MengerSponge } from "./MengerSponge.js";
import { Mat3, Mat4, Vec3 } from "../lib/TSM.js";

/**
 * Might be useful for designing any animation GUI
 */
interface IGUI {
  viewMatrix(): Mat4;
  projMatrix(): Mat4;
  dragStart(me: MouseEvent): void;
  drag(me: MouseEvent): void;
  dragEnd(me: MouseEvent): void;
  onKeydown(ke: KeyboardEvent): void;
}

/**
 * Handles Mouse and Button events along with
 * the the camera.
 */
export class GUI implements IGUI {
  private static readonly rotationSpeed: number = 0.05;
  private static readonly zoomSpeed: number = 0.1;
  private static readonly rollSpeed: number = 0.1;
  private static readonly panSpeed: number = 0.1;

  private camera: Camera;
  private dragging: boolean;
  private fps: boolean;
  private prevX: number;
  private prevY: number;
  private leftClick: boolean;
  private rightClick: boolean;

  private height: number;
  private width: number;

  private sponge: MengerSponge;
  private animation: CanvasAnimation;

  /**
   *
   * @param canvas required to get the width and height of the canvas
   * @param animation required as a back pointer for some of the controls
   * @param sponge required for some of the controls
   */
  constructor(
    canvas: HTMLCanvasElement,
    animation: CanvasAnimation,
    sponge: MengerSponge
  ) {
    this.height = canvas.height;
    this.width = canvas.width;
    this.prevX = 0;
    this.prevY = 0;

    this.sponge = sponge;
    this.animation = animation;

	this.reset();

    this.registerEventListeners(canvas);
  }

  /**
   * Resets the state of the GUI
   */
  public reset(): void {
    this.fps = false;
    this.dragging = false;
    this.leftClick = false;
    this.rightClick = false;
    /* Create camera setup */
    this.camera = new Camera(
      new Vec3([0, 0, -6]),
      new Vec3([0, 0, 0]),
      new Vec3([0, 1, 0]),
      45,
      this.width / this.height, 
      0.1,
      1000.0
    );
  }

  /**
   * Sets the GUI's camera to the given camera
   * @param cam a new camera
   */
  public setCamera(
    pos: Vec3,
    target: Vec3,
    upDir: Vec3,
    fov: number,
    aspect: number,
    zNear: number,
    zFar: number
  ) {
    this.camera = new Camera(pos, target, upDir, fov, aspect, zNear, zFar);
  }

  /**
   * Returns the view matrix of the camera
   */
  public viewMatrix(): Mat4 {
    return this.camera.viewMatrix();
  }

  /**
   * Returns the projection matrix of the camera
   */
  public projMatrix(): Mat4 {
    return this.camera.projMatrix();
  }

  /**
   * Callback function for the start of a drag event.
   * @param mouse
   */
  public dragStart(mouse: MouseEvent): void {
    this.dragging = true;
    this.leftClick = mouse.button == 0;
    this.rightClick = mouse.button == 2;
    this.prevX = mouse.screenX;
    this.prevY = mouse.screenY;
  }

  /**
   * The callback function for a drag event.
   * This event happens after dragStart and
   * before dragEnd.
   * @param mouse
   */
  public drag(mouse: MouseEvent): void {
	  // TODO: Your code here for left and right mouse drag
    if (this.leftClick) {
        const projMatrixI : Mat3 = this.camera.projMatrix().toInverseMat3();
        const viewMatrixI : Mat3 = this.camera.viewMatrix().toInverseMat3();
        const mouse_direction : Vec3 = new Vec3([mouse.screenX - this.prevX, mouse.screenY - this.prevY, 0]);
        const w_mouse_dir : Vec3 = viewMatrixI.multiply(projMatrixI).multiplyVec3(mouse_direction);
        const axis : Vec3 = Vec3.cross(this.camera.forward(), w_mouse_dir);
        this.camera.rotate(axis, 0.05, this.camera.target());
    } else if (this.rightClick) {
        if (mouse.screenY > this.prevY) {
          this.camera.offsetDist(0.1);
        } else if (mouse.screenY < this.prevY) {
          this.camera.offsetDist(-0.1);
        }
      
    }
	  // TODO: Your code here for left and right mouse drag
	  
  }

  /**
   * Callback function for the end of a drag event
   * @param mouse
   */
  public dragEnd(mouse: MouseEvent): void {
    this.dragging = false;
    this.leftClick = false;
    this.rightClick = false;
    this.prevX = 0;
    this.prevY = 0;
  }

  /**
   * Callback function for a key press event
   * @param key
   */
  public onKeydown(key: KeyboardEvent): void {
    /*
       Note: key.code uses key positions, i.e a QWERTY user uses y where
             as a Dvorak user must press F for the same action.
       Note: arrow keys are only registered on a KeyDown event not a
       KeyPress event
       We can use KeyDown due to auto repeating.
     */

	// TOOD: Your code for key handling

    switch (key.code) {
      case "KeyW": {
        if (this.fps) {
          this.camera.setPos(this.camera.pos().add(this.camera.forward().scale(0.1)));
          this.camera.setTarget(this.camera.target().add(this.camera.forward().scale(0.1)));
        } else {
          //offSetDist;
          this.camera.offsetDist(-0.1);
        }
        break;
      }
      case "KeyA": {
        if (this.fps) {
          this.camera.setPos(this.camera.pos().add(this.camera.right().scale(0.1)));
        } else {
          this.camera.setTarget(this.camera.target().add(this.camera.right().scale(0.1)));
        }
        break;
      }
      case "KeyS": {
        if (this.fps) {
          this.camera.setPos(this.camera.pos().subtract(this.camera.forward().scale(0.1)));
          this.camera.setTarget(this.camera.target().subtract(this.camera.forward().scale(0.1)));
        } else {
          this.camera.offsetDist(0.1);
        }
        break;
      }
      case "KeyD": {
        if (this.fps) {
          this.camera.setPos(this.camera.pos().subtract(this.camera.right().scale(0.1)));
        } else {
          this.camera.setTarget(this.camera.target().subtract(this.camera.right().scale(0.1)));
        }
        break;
      }
      case "KeyR": {
        this.reset();
        break;
      }
      case "KeyC": {
        this.fps = !this.fps;
        break;
      }
      case "ArrowLeft": {
        this.camera.roll(0.1, true);
        break;
      }
      case "ArrowRight": {
        this.camera.roll(0.1, false);
        break;
      }
      case "ArrowUp": {
        if (this.fps) {
          this.camera.setPos(this.camera.pos().subtract(this.camera.up().scale(0.1)));
        } else {
          this.camera.setTarget(this.camera.target().subtract(this.camera.up().scale(0.1)));
        }
        break;
      }
      case "ArrowDown": {
        if (this.fps) {
          this.camera.setPos(this.camera.pos().add(this.camera.up().scale(0.1)));
        } else {
          this.camera.setTarget(this.camera.target().add(this.camera.up().scale(0.1)));
        }
        break;
      }
      case "Digit1": {
        this.sponge.setLevel(1);
        break;
      }
      case "Digit2": {
        this.sponge.setLevel(2);
        break;
      }
      case "Digit3": {
        this.sponge.setLevel(3);
        break;
      }
      case "Digit4": {
        this.sponge.setLevel(4);
        break;
      }
      default: {
        console.log("Key : '", key.code, "' was pressed.");
        break;
      }
    }
  }

  /**
   * Registers all event listeners for the GUI
   * @param canvas The canvas being used
   */
  private registerEventListeners(canvas: HTMLCanvasElement): void {
    /* Event listener for key controls */
    window.addEventListener("keydown", (key: KeyboardEvent) =>
      this.onKeydown(key)
    );

    /* Event listener for mouse controls */
    canvas.addEventListener("mousedown", (mouse: MouseEvent) =>
      this.dragStart(mouse)
    );

    canvas.addEventListener("mousemove", (mouse: MouseEvent) =>
      this.drag(mouse)
    );

    canvas.addEventListener("mouseup", (mouse: MouseEvent) =>
      this.dragEnd(mouse)
    );

    /* Event listener to stop the right click menu */
    canvas.addEventListener("contextmenu", (event: any) =>
      event.preventDefault()
    );
  }
}
