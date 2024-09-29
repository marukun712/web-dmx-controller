import { ArtNetPacket } from "./artnet.js";

const channels = [];

function onFaderChange(event) {
  const channel = event.srcElement.attributes[4].value;
  const value = event.target.value;

  document.getElementById(`text-${channel}`).innerText = value;

  //変更されたチャンネルと値を配列で管理
  channels.push({ channel: channel, value: value });
}

//パケットデータの生成
function createArtNetPacket() {
  const universe = document.getElementById(`universe`).value;

  const artnet = new ArtNetPacket(universe);
  const data = new Uint8Array(512);

  channels.forEach((channel) => {
    const channelIndex = parseInt(channel.channel);
    if (channelIndex >= 0 && channelIndex <= 512) {
      data[channelIndex - 1] = parseInt(channel.value); //DMXのチャンネル番号が1から始まるため、-1する
    }
  });

  artnet.setData(data);

  const packet = artnet.getPacket();

  displayArray(packet, universe);
  console.log(packet);
}

//生成結果をグリッドで表す
function displayArray(array) {
  const display = document.getElementById("arrayDisplay");
  document.getElementById(
    "resultText"
  ).innerHTML = `Universe:${universe.value}<br/>生成結果:`;
  display.innerHTML = "";
  array.forEach((value, index) => {
    const cell = document.createElement("div");
    cell.className = "cell";
    cell.textContent = value;
    cell.style.backgroundColor = `rgb(${value}, ${value}, ${value})`;
    cell.style.color = value > 128 ? "black" : "white";
    display.appendChild(cell);
  });
}

//512個のフェーダーを追加
function addFader() {
  for (let i = 1; i <= 512; i++) {
    document.getElementById("faders").insertAdjacentHTML(
      "beforeend",
      `
        <div class="fader mx-12">
          <p>${i}</p>

          <input
            type="range"
            min="0"
            max="255"
            value="0"
            id=${i}
            orient="vertical"
          />

          <p id="text-${i}">0</p>
        </div>
        `
    );

    document.getElementById(i).addEventListener("change", onFaderChange);
  }
}

function main() {
  addFader();
  document
    .getElementById("create")
    .addEventListener("click", createArtNetPacket);
}

main();
