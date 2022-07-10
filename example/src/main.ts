import colorPirate from "../../src/main";

import "./style.css";

const imageContainer = document.getElementById(
  "image-container"
) as HTMLDivElement;
const imageURL = document.getElementById("image-url") as HTMLInputElement;

const paletteContainer = document.getElementById(
  "palette-container"
) as HTMLDivElement;

document.getElementById("submit-image")?.addEventListener("click", async () => {
  imageContainer.style.backgroundImage = `url(${imageURL.value})`;

  const colorPalette = await new colorPirate(imageURL.value, 7).getPalette();

  // Render the palette.
  colorPalette?.forEach((color: any) => {
    const div = document.createElement("div");
    div.style.backgroundColor = `rgb(${color[0]}, ${color[1]}, ${color[2]})`;
    div.className = "palette";
    paletteContainer.appendChild(div);
  });
});
