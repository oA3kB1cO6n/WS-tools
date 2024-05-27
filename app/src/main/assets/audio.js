const audioEle = document.querySelector("audio");
const seleEle = document.querySelector("#sele");
const cvs = document.querySelector("#cvs");
const ctx = cvs.getContext("2d");
const spaceWidth = .5;

seleEle.addEventListener("change", (event) => {
  const selectedFile = event.target.files[0];
  if (!selectedFile.type.startsWith('audio/')) {
    alert("只能上传音频文件");
    return;
  }

  if (selectedFile) {
    const reader = new FileReader();
    
    reader.addEventListener("load", () => {
      const dataURL = reader.result;
      audioEle.src = dataURL;
    });
    
    reader.readAsDataURL(selectedFile);
  }
});

let isInit = false;
let dataArray, analyser;

audioEle.onplay = () => {
  if (isInit) {
    return;
  }
  
  const audCtx = new AudioContext();
  const source = audCtx.createMediaElementSource(audioEle);
  
  analyser = audCtx.createAnalyser();
  
  source.connect(analyser);
  analyser.connect(audCtx.destination);
  analyser.fftSize = 256;
  
  dataArray = new Uint8Array(analyser.frequencyBinCount);
  
  isInit = true;
}

function draw() {
  requestAnimationFrame(draw);

  const { width, height } = cvs;
  ctx.clearRect(0, 0, width, height);
  ctx.fillStyle = "#505080";

  if (!isInit) {
    return;
  }
  
  analyser.getByteFrequencyData(dataArray);

  const len = dataArray.length / 1.5;
  const barWidth = width / len / 2;
  for (let i = 0; i < len; i++) {
    const data = dataArray[i];
    const barHeight = data / 255 * height;
    const x = i * barWidth + width/2;
    const x2 = width/2 - (i+1)*barWidth;
    let y = height - barHeight;
    ctx.fillRect(x, y, barWidth - spaceWidth, barHeight);
    ctx.fillRect(x2, y, barWidth - spaceWidth, barHeight);
  }
}
draw();
