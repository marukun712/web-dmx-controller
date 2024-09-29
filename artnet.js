//Art-Netのパケットを作成するクラス
export class ArtNetPacket {
  static ARTNET_ID = [0x41, 0x72, 0x74, 0x2d, 0x4e, 0x65, 0x74, 0x00];
  static OPCODE_OUTPUT = 0x5000;

  sequence = 0;
  universe = 0;
  data = new Uint8Array(512);

  constructor(universe) {
    this.universe = universe;
  }

  setData(data) {
    this.data = data;
  }

  getPacket() {
    const buffer = new ArrayBuffer(18 + 512);
    const view = new DataView(buffer);
    const unit8 = new Uint8Array(buffer);

    unit8.set(ArtNetPacket.ARTNET_ID, 0);
    view.setUint16(8, ArtNetPacket.OPCODE_OUTPUT, true);

    view.setUint16(10, 14, false);
    view.setUint8(12, this.sequence++);
    if (this.sequence > 255) this.sequence = 1;
    view.setUint8(13, 0);
    view.setUint16(14, this.universe, true);
    view.setUint16(16, 512, false);
    unit8.set(this.data, 18);

    return unit8;
  }
}
