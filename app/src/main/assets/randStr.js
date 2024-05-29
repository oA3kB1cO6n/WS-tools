String.prototype.toArray = function() {
  var arr = [];
  for (let i = 0; i < this.length;) {
    const codePoint = this.codePointAt(i);
    i += codePoint > 0xffff ? 2 : 1;
    arr.push(codePoint);
  }
  return arr
}

Object.defineProperty(String.prototype, 'codePointLength', {
  get() {
    let len = 0;
    for (let i = 0; i < this.length;) {
      const codePoint = this.codePointAt(i);
      i += codePoint > 0xffff ? 2 : 1;
      len++;
    }
    return len;
  },
  enumerable: false,
  configurable: false
});

Array.prototype.removeAll = function(value) {
  for (let i = 0; i < this.length; i++) {
    if (this[i] === value) {
      this.splice(i, 1);
      i--;
    }
  }
  return this
}

const validCode = /^([0-9a-fA-F]|10)?[0-9a-fA-F]{0,4}$/;
const resultTextarea = document.getElementById("resultTextarea");
const customCharEle = document.getElementById("customChar");
const slider = document.getElementById("countSlider");
const counter = document.getElementById("counter");
const countInput = document.getElementById("countInput");
const con = document.getElementById("con");
const addEle = '<span>0x</span><input type="text" class="uni" oninput="inspect(this)"></input><span>-0x</span><input type="text" class="uni" oninput="inspect(this)"></input><button onclick="this.parentNode.remove()" class="rem">×</button>';

const characterSets = {
  includeDigits: "0123456789".toArray(),
  includeLowercase: "abcdefghijklmnopqrstuvwxyz".toArray(),
  includeUppercase: "ABCDEFGHIJKLMNOPQRSTUVWXYZ".toArray(),
  includeSpecialSymbols: '!\"#$%&\'()*+,-./:;<=>?@[]^_`{|}~'.toArray(),
  includeBasicChinese: rangeArr(0x4E00, 0x9FFF),   includeExtendedAChinese: rangeArr(0x3400, 0x4DBF),
  includeExtendedBChinese: rangeArr(0x20000, 0x2A6DF),
  includeExtendedCChinese: rangeArr(0x2A700, 0x2B738),
  includeExtendedDChinese: rangeArr(0x2B740, 0x2B81D),
  includeExtendedEChinese: rangeArr(0x2B820, 0x2CEA1),
  includeExtendedFChinese: rangeArr(0x2CEB0, 0x2EBE0),
  includeExtendedGChinese: rangeArr(0x30000, 0x3134A),
  includeExtendedHChinese: rangeArr(0x31350, 0x323AF),
  includeExtendedIChinese: rangeArr(0x2EBF0, 0x2EE5D),
  includeCompatibleChinese: [...rangeArr(0xF900, 0xFA6D), ...rangeArr(0xFA70, 0xFAD9)],
  includeCompatibleSupplementChinese: rangeArr(0x2F800, 0x2FA1D)
};
const dom = {};

["includeDigits", "includeLowercase", "includeUppercase",
 "includeSpecialSymbols", "includeBasicChinese", "includeExtendedAChinese",
 "includeExtendedBChinese", "includeExtendedCChinese", "includeExtendedDChinese",
 "includeExtendedEChinese", "includeExtendedFChinese", "includeExtendedGChinese",
 "includeExtendedHChinese", "includeExtendedIChinese", "includeCompatibleChinese",
 "includeCompatibleSupplementChinese", "includeCustomChar", "includeCustomInterval",
 "noRepeat"]
   .forEach(name => dom[name] = document.getElementById(name));

function inspect(ele) {
  const inputValue = ele.value;

  if (!validCode.test(inputValue)) {
    ele.value = "";
  }
}

resultTextarea.addEventListener('input', (e) => {
  const textarea = e.target;
  textarea.style.height = "auto";
  textarea.style.height = `${textarea.scrollHeight}px`;
});

function add() {
  const div = document.createElement('div');
  div.innerHTML = addEle;
  con.appendChild(div);
}

function updateInputValue() {
  countInput.value = slider.value;
}

function updateSliderValue() {
  if (+countInput.value > 1000) countInput.value = 1000;
  slider.value = countInput.value;
}

function updateCount() {
  counter.innerText = resultTextarea.value.codePointLength;
}

function generateRandomCharacters() {
  let count = parseInt(countInput.value);
  if (count > 1000) count = 1000;
  const options = {};

  for (const key in dom) {
    if (Object.hasOwnProperty.call(dom, key)) {
      options[key] = dom[key].checked;
    }
  }

  var characters = [];
  characterSets.includeCustomChar = customCharEle.value.toArray();
  for (const option in options) {
    if (options[option] && characterSets[option]) {
        characters.push(...characterSets[option]);
    }
  }
  
  if (options.includeCustomInterval) {
  	[...con.children].forEach((chi) => {
  	  const [inpu, inpu2] = chi.getElementsByTagName('input');
      if (inpu.value && inpu2.value) characters.push(...rangeArr(parseInt(inpu.value, 16), parseInt(inpu2.value, 16)));
  	})
  }
  var result = "";
  
  if (!characters.length){
    result = "";
  } else if (!options.noRepeat) {
    for (let i = 0; i < count; i++) {
      const chart = String.fromCodePoint(characters[getRandomNumber(0,characters.length - 1)]);
      result += chart;
    }
  } else {
    for (let i = 0; i < count && characters.length; i++) {
      const index = characters[getRandomNumber(0, characters.length - 1)];
      const chart = String.fromCodePoint(index);
      result += chart;
      characters.removeAll(index);
    }
  }
  resultTextarea.value = result;
  updateCount();
  resultTextarea.style.height = "auto";
  resultTextarea.style.height = `${resultTextarea.scrollHeight}px`;
}

function rangeArr(start, end) {
  return new Array(end - start + 1).fill(0).map((_, i) => i + start);
}

function getRandomNumber(min, max) {
  if (min > max) return;
  return Math.floor(Math.random() * (max - min + 1)) + min;
}


function copy(text) {
  if (navigator.clipboard) {
    navigator.clipboard.writeText(text);
  } else {
    const input = document.createElement('input');
    input.value = text;
    document.body.appendChild(input);
    input.select();
    document.execCommand('copy');
    document.body.removeChild(input);
  }
}
