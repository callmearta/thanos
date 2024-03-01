const btn = document.querySelector("button");
class Thanos {
  constructor(element) {
    this.element = element;
    this.canvases = [];
    this.createMainCanvas();
    this.drawInitialImage();
  }
  createMainCanvas() {
    this.mainCanvas = document.createElement("canvas");
    this.mainCtx = this.mainCanvas.getContext("2d", {
      willReadFrequently: true,
      alpha: true,
    });
    this.width = this.element.getBoundingClientRect().width;
    this.height = this.element.getBoundingClientRect().height;
    this.mainCanvas.width = this.width;
    this.mainCanvas.height = this.height;
    this.mainCanvas.classList.add("canvas");
  }
  drawInitialImage() {
    const scale = 1;
    domtoimage
      .toPng(this.element, {
        quality: 2,
        width: this.element.clientWidth * scale,
        height: this.element.clientHeight * scale,
        style: {
          transform: "scale(" + scale + ")",
          transformOrigin: "top left",
        },
      })
      .then((imgData) => {
        const image = new Image();
        image.src = imgData;
        image.onload = () => {
          this.mainCtx.drawImage(image, 0, 0);
          this.mainImageData = this.mainCtx.getImageData(
            0,
            0,
            this.width,
            this.height
          );
          this.createEmptyImageData();
          this.createCanvases();
        };
      });
  }
  randomNumber(min, max) {
    return Math.floor(Math.random() * (max - min + 1) + min);
  }
  createCanvases() {
    Array(10)
      .fill(1)
      .forEach((_, i) => {
        const newCanvas = document.createElement("canvas");
        const ctx = newCanvas.getContext("2d", {
          willReadFrequently: true,
        });
        newCanvas.width = this.width;
        newCanvas.height = this.height;
        newCanvas.style.pointerEvents = "none";
        newCanvas.style.position = "absolute";
        newCanvas.style.top =
          this.element.getBoundingClientRect().top + 0.5 + "px";
        newCanvas.style.left = this.element.getBoundingClientRect().left + "px";
        newCanvas.style.borderRadius = window
          .getComputedStyle(this.element)
          .getPropertyValue("border-radius");
        newCanvas.style.opacity = 0;
        newCanvas.classList.add("canvas");
        ctx.putImageData(
          new ImageData(this.emptyImageData, this.width, this.height),
          0,
          0
        );
        this.canvases.push(newCanvas);
      });
    this.paintCanvases();
  }
  paintCanvases() {
    for (let i = 0; i < this.mainImageData.data.length; i += 4) {
      const randomNumber = this.randomNumber(0, this.canvases.length - 1);
      const canvas = this.canvases[randomNumber];
      const ctx = canvas.getContext("2d", {
        willReadFrequently: true,
      });

      const data = ctx.getImageData(0, 0, this.width, this.height);
      data.data[i] = this.mainImageData.data[i];
      data.data[i + 1] = this.mainImageData.data[i + 1];
      data.data[i + 2] = this.mainImageData.data[i + 2];
      data.data[i + 3] = this.mainImageData.data[i + 3];

      ctx.putImageData(data, 0, 0);
    }
    this.appendCanvases();
  }
  appendCanvases() {
    this.canvases.forEach((canvas) => {
      document.body.appendChild(canvas);
    });
  }
  createEmptyImageData() {
    this.emptyImageData = new Uint8ClampedArray(this.mainImageData.data);
    this.emptyImageData.forEach((_, i) => (this.emptyImageData[i] = 0));
  }
  explode() {
    this.element.style.transition = "all .1s ease-in";
    this.element.style.willChange = "opacity, transform";
    this.element.style.opacity = 0;
    this.element.style.transformOrigin = "left bottom";
    this.canvases.forEach((canvas, i) => {
      canvas.style.opacity = 1;
      setTimeout(() => {
        canvas.style.transition = `all ${0.8 + i * 0.15}s ease-in`;
        canvas.style.willChange = "opacity, transform";
        canvas.style.transformOrigin = "left bottom";
        canvas.style.opacity = 0;
        canvas.style.transform = `translate(-30px, -100px) rotate(8deg)`;
      }, 1);
    });
  }
}

window.onload = () => {
  const messageNode = document.querySelector(".center");
  const thanos = new Thanos(messageNode);
  btn.addEventListener("click", function (e) {
    e.preventDefault();
    thanos.explode();
  });
};
