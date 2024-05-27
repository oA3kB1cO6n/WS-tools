const toggleButton = document.getElementById('toggleTo1');
const toggle2Button = document.getElementById('toggleTo2');
const toggle3Button = document.getElementById('toggleTo3');
const toggle4Button = document.getElementById('toggleTo4');
const toggle5Button = document.getElementById('toggleTo5');
if (toggleButton) {
  toggleButton.textContent = "切换至手速测试器页面";
  toggleButton.onclick = () => {
    window.location.href = 'CPS.html';
  }
}
if (toggle2Button) {
  toggle2Button.textContent = "切换至音频FFT页面";
  toggle2Button.onclick = () => {
    window.location.href = 'audio.html';
  }
}
if (toggle3Button) {
  toggle3Button.textContent = "切换至84-30画的汉字页面";
  toggle3Button.onclick = () => {
    window.location.href = 'strokes.html';
  }
}
if (toggle4Button) {
  toggle4Button.textContent = "切换至字符显示器页面";
  toggle4Button.onclick = () => {
    window.location.href = 'display.html';
  }
}
if (toggle5Button) {
  toggle5Button.textContent = "切换至随机字符生成器页面";
  toggle5Button.onclick = () => {
    window.location.href = 'randStr.html';
  }
}