# legocar_express
レゴカーのコントローラー部分をnode.js + expressで実装

## 準備するもの
### ルートディレクトリに.envファイルを作成  

PORT = node.jsのポート  
NODE_FLASK_IP_WAN = ラズパイのIP(ローカルIP):Flaskのポート/legocar  
NODE_MPJG_IP_WAN =  ラズパイのIP(ローカルIP):mjpg-streamerのポート/?action=stream  
NODE_FLASK_IP_LAN = ラズパイのIP(グローバルIP):Flaskのポート/legocar  
NODE_MPJG_IP_LAN =  ラズパイのIP(グローバルIP):mjpg-streamerのポート/?action=stream  
