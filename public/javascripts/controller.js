/* メモ
* $(function()){}
* これなんだけれども、HTMLの読み込みが終わったら動くというjQueryの関数になるみたい。
* HTMLの読み込みが終わらないと、セレクタで要素を探しに行っても見つからないので、この関数内に書く必要がある。
*/
$(function(){
   console.log("よみこんだ");
    
   var connectTo = new ConnectTo();

   //console.log(connectTo.getConnectToFlask());
   //console.log(connectTo.getConnectToMPJG());

    /*socket通信はFlaskで立てているWebサーバーに接続している。
    *node.jsで立てているサーバーではない。
    *socket変数については、関数内で使っちゃったりしてるので、グローバル変数として扱う。
    */
    socket = io.connect('http://' + connectTo.getConnectToFlask() );

    //サーバー側のsocketに接続した場合の動作。クライアント側はとくになし。サーバー側はFlaskのconnectっていうところをみよう。
    socket.on('connect', function () {
    });


    //ストリーミング映像をみるボタンを押した際の処理
    $("#streamingButton").click(function(e){
        //ボタンをおしたらボタンを消す。
        $(this).css('visibility','hidden');
        //src属性を書き換えることで、画像を切り替えられる。
        //srcを書き換えるだけで、ブラウザはサーバー側に再度リクエストを飛ばすんだね。
        var changedSrc = $("#monitor-wrapper > img").attr("src").replace("/images/camera.png","http://" + connectTo.getConnectToMPJG());
        $("#monitor-wrapper > img").attr("src",changedSrc);
    });

    //環境設定ボタンを押した場合の挙動
    //$("#whichConnectTo").click(function(e){
    //    //connectTo.whichConnectTo();
    //    if(connectTo.getState() === "false"){
    //        $(this).text("お外モード");
    //    }else{
    //        $(this).text("自宅モード");
    //    }
    //});

    //環境設定ボタンの表示制御
    if(connectTo.getState() === "WAN"){
        $("#whichConnectToWAN").addClass("active");
        $("#whichConnectToLAN").removeClass("active");
    }

    //ボタン入力の操作
    /*ボタン入力の操作に共通することを、キーボード入力のisSendMessage()の説明に書いているので、
    *時間が開いたら見直そう。
    */

    //コントローラーのボタンを押した際の処理
    $('#wButton').mousedown(function(e) {
        sendMessage("forward")
    })
    .mouseup(function(e){
        sendMessage("break")
    });

    $('#sButton').mousedown(function(e) {
        sendMessage("back")
    })
    .mouseup(function(e){
        sendMessage("break")
    });

    $('#aButton').mousedown(function(e) {
        sendMessage("left")
    });

    $('#dButton').mousedown(function(e) {
        sendMessage("right")
    });

    $('#hButton').mousedown(function(e) {
        sendMessage("crane_left")
    })
    .mouseup(function(e){
        sendMessage("crane_stop")
    });

    $('#jButton').mousedown(function(e) {
        sendMessage("crane_right")
    })
    .mouseup(function(e){
        sendMessage("crane_stop")
    });
});

//キーボード入力での操作

//キー入力に関しては、以下を参考にした。
// http://hakuhin.jp/js/key_board.html

//キーが押された場合のイベント
document.onkeydown = function(e){
    isSendMessage(e.keyCode,"keydown");
};

//キーが離された場合のイベント
document.onkeyup = function(e){
    isSendMessage(e.keyCode,"keyup");
};

//Windowが非アクティブになったら、エンジンが止まるようにkey_codeを決め打ちで送信する。
window.onblur = function () {
    isSendMessage(87,"keyup");
};


/*
*特定のキーのみをサーバー側に通信するようにする関数
*キーボードから操作する場合のみ必要な制御。
*ボタンから操作する場合は、この関数ではなく、SendMessege("命令")を直接呼ぶ。
*/

/*メモ　モーターの仕様をここに書くのはどうかと思うけれども、
* 前と後、およびカメラの左右の回転はDCモーターで制御している。
* DCモーターは回転している状態と、止まっている状態がある。
* 命令として、回転する！と止まる！を明確にする必要がある。
* ここでは、キーボードを押している間は回転！で、離したら止まる！としている。
*
* 一方、左折、右折はサーボモータで実装している。
* サーボモータは、指定した角度分回転する、という仕様であるため、DCモーターと異なり回転しつづけるということはない。
* つまり、曲がれ！という命令だけあればよく、止まるという命令はいらない。
* なので、右折、左折については、キーを話したときのコントロールは書いていない。
*
* 一点、未実装なのが、右折、左折の角度の指定。
* 今は固定で何度とサーバー側で制御している。今後、ボタンの押す流さ？によって右折具合を調整する必要がある。
* 実は、今のレゴカーはハンドルをまっすぐにすることができないのだ。
*/



function isSendMessage(key_code,keykind){

    switch(key_code){
        //前へ進む:W
        case 87:
            if(keykind === "keydown"){
                sendMessage("forward");
            }else{
                sendMessage("break");
            };
            break;
        //後ろ:S
        case 83:
            if(keykind === "keydown"){
                sendMessage("back");
            }else{
                sendMessage("break");
            };
            break;
        //右へ曲がる:D
        case 68:
            if(keykind === "keydown"){
                sendMessage("right");
            };
            break;
        //左へ曲がる:A
        case 65:
            if(keykind === "keydown"){
                sendMessage("left");
            };
            break;
        //左にクレーンを回転:H
        case 72:
            if(keykind === "keydown"){
                sendMessage("crane_left");
            }else{
                sendMessage("crane_stop");
            };
            break;
        //右にクレーンを回転:J
        case 74:
            if(keykind === "keydown"){
                sendMessage("crane_right");
            }else{
                sendMessage("crane_stop");
            };
            break;
        default:
            break;

    }
}

//socket通信
function  sendMessage(message)  {
    console.log(message);
    socket.emit("sendMessage",message);
}



var ConnectTo = function(){
    //this.whichConnectTo();
}

    ConnectTo.prototype.getConnectToFlask = function(){
        return $("#connectTo_FLASK").data("num");
        //return this.FLASK;
    }

    ConnectTo.prototype.getConnectToMPJG = function(){
        return $("#connectTo_MPJG").data("num");
        //return this.MPJG;
    }

    ConnectTo.prototype.getState = function(){
        return $("#state").data("num");
    //    return this.State;
    }


    ConnectTo.prototype.whichConnectTo = function(){
        //var state = $("#whichConnectTo").attr("aria-pressed");
        //if (state === "false"){
        //    //自宅
        //    this.FLASK = $("#connectTo_FLASK_LAN").data("num");
        //    this.MPJG = $("#connectTo_MPJG_LAN").data("num");
        //    this.State = "false";
        //}else{
        //    //外
        //    this.FLASK = $("#connectTo_FLASK_WAN").data("num");
        //    this.MPJG = $("#connectTo_MPJG_WAN").data("num");
        //    this.State = "true";
        //}

    }

