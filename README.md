# Art-Net パケット生成ツール

DMX(照明機材を制御するための通信プロトコル)を UDP/IP 上で扱うための通信プロトコル Art-Net のパケットを Web 上で生成するツールです。

# Usage

上部にある Input から、Universe を指定し、フェーダーを操作した後、Create Packet ボタンを押下することで、生成結果がグリッドで表示されます。
パケットのデータは、Unit8Array 形式で console に出力されます。
