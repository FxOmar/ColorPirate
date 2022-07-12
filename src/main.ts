// eslint-disable-next-line @typescript-eslint/ban-ts-comment
// @ts-ignore
import * as quantize from "quantize";

/**
 * Image Color palette generator.
 *
 * @param {string} imagePath
 */
export default class colorPirate {
  protected imageURL: string;

  constructor(imageURL: string) {
    this.imageURL = imageURL;
  }

  /**
   * Load image from the URL.
   *
   * @param {string} imageURL Image URL.
   *
   * @returns {Promise<HTMLImageElement>}
   **/
  private loadImage(imageURL: string): Promise<HTMLImageElement> {
    return new Promise((resolve, reject) => {
      const image = new Image();

      image.crossOrigin = "anonymous";

      image.onload = () => resolve(image);

      image.onerror = () => reject(new Error("Could not load image"));

      image.src = imageURL;
    });
  }

  /**
   * Create an image canvas from the image URL.
   *
   * @returns {ImageData}
   *
   * @memberof ImageColorPicker
   *
   * @throws {Error} If the image could not be loaded.
   **/
  private async createImageCanvas() {
    const image = await this.loadImage(this.imageURL);

    const canvas = document.createElement("canvas");

    const ctx = canvas.getContext("2d");

    canvas.width = image.width;
    canvas.height = image.height;

    if (ctx) {
      ctx.drawImage(image, 0, 0);
      return ctx.getImageData(0, 0, image.width, image.height);
    }

    throw new Error("Could not create image canvas.");
  }

  /**
   * Get the image data from the image.
   *
   * @param {ImageData} imageData
   * @param {number} pixelCount
   * @param {number} quality
   *
   * @returns {ImageData}
   **/
  private createPixelArray(
    imageData: ImageData,
    pixelCount: number,
    quality: number = 1
  ) {
    const pixelArray = [];

    const data = imageData.data;

    let i = pixelCount,
      offset;

    while ((i = i - quality)) {
      offset = i * 4;

      const pixel = [
        data[offset + 0], // red
        data[offset + 1], // green
        data[offset + 2], // blue
        data[offset + 3], // alpha
      ];

      // If pixel is mostly opaque and not white
      if (typeof pixel[3] === "undefined" || pixel[3] >= 125) {
        if (!(pixel[0] > 250 && pixel[1] > 250 && pixel[2] > 250)) {
          pixelArray.push(pixel);
        }
      }
    }

    return pixelArray;
  }

  /**
   * Get image pixels data.
   *
   * @returns {Array<Number>} Array of pixels data.
   *
   * @memberof ImageColorPicker
   **/
  private async getImageData() {
    const imageCanvas: ImageData | null = await this.createImageCanvas();

    if (imageCanvas) {
      return this.createPixelArray(
        imageCanvas,
        imageCanvas.width * imageCanvas.height,
        10
      );
    }

    throw new Error("Could not create image canvas.");
  }

  /**
   * Generate a color palette from the image.
   *
   * @param paletteSize Number of colors to be used in the quantization
   * @returns {Promise<Array<Number[]>>}
   *
   * @memberof ImageColorPicker
   *
   * @example new ImageColorPicker().getPalette("https://example.com/image.jpg", 2, 20);
   **/
  public async getPalette(
    paletteSize: Number = 6
  ): Promise<Array<Number[]> | undefined> {
    if (paletteSize <= 1) {
      throw new Error("Palette size must be greater than 1.");
    }

    try {
      const data = await this.getImageData();

      if (data) {
        const palette = quantize(data, paletteSize);
        const paletteColors = palette.palette();

        return paletteColors;
      }
    } catch (err) {
      console.error(err);
      throw new Error("Could not create palette. Something went wrong.");
    }
  }

  /**
   * Get the dominant color from the image.
   *
   * @returns {Promise<Array<Number>>}
   *
   * @memberof ImageColorPicker
   *
   * @example new ImageColorPicker("https://example.com/image.jpg").getColor();
   * @throws {Error} If the image could not be loaded.
   **/
  public async getColor(): Promise<Array<Number> | undefined> {
    try {
      const paletteColors = await this.getPalette(2);

      // check paletteColors is an array.
      if (Array.isArray(paletteColors)) {
        const dominantColor = paletteColors[0];

        return dominantColor;
      }
    } catch (err) {
      console.error(err);
      throw new Error("Could not create palette. Something went wrong.");
    }
  }
}
