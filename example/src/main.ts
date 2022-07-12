import colorPirate from "../../src/main";

import "./style.css";

const imageContainer = document.getElementById(
  "image-container"
) as HTMLDivElement;
const imageURL = document.getElementById("image-url") as HTMLInputElement;

const paletteContainer = document.getElementById(
  "palette-container"
) as HTMLDivElement;

function createHolder(colors: string[]) {
  const div = document.createElement("div");
  div.style.backgroundColor = `rgb(${colors[0]}, ${colors[1]}, ${colors[2]})`;
  div.className = "palette";
  paletteContainer.appendChild(div);
}

document.getElementById("submit-image")?.addEventListener("click", async () => {
  imageContainer.style.backgroundImage = `url(${imageURL.value})`;

  const color_pirate = new colorPirate(imageURL.value);
  const colors = await color_pirate.getPalette(1);

  // Render the palette.
  colors?.forEach((color: any) => {
    createHolder(color);
  });
});
