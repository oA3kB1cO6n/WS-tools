var countdown = 30;
var timer;
var startTime;
var timeElement = document.getElementById('time');
var clicksElement = document.getElementById('clicks');
var startButton = document.getElementById('start');
var clickButton = document.getElementById('click');
var recoverButton = document.getElementById('recover');
var counter = 0;

function updateCountdown() {
  timer = requestAnimationFrame(updateCountdown);
  timeElement.innerHTML = countdown.toFixed(2);
  if (countdown <= 0) {
    cancelAnimationFrame(timer);
    clickButton.disabled = true;
    recoverButton.disabled = false;
    var result = document.createElement('p');
    result.innerHTML = 'CPS: ' + counter/30;
    document.body.appendChild(result);
  }
  clicksElement.innerHTML ='点击数：' + counter
  countdown = 30 - (Date.now() - startTime)/1000;
}

clickButton.onclick = () => {counter++;}

startButton.onclick = () => {
  startTime = Date.now();
  updateCountdown();
  clickButton.disabled = false;
  startButton.disabled = true;
}

recoverButton.onclick = () => {
  location.reload();
  recoverButton.disabled = true;
}