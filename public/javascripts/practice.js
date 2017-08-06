
$(function(){
    console.log("読み込んだ")
    $(".controller_button").click(function(e){
        $(this).css('visibility','hidden');
        //src属性を書き換えることで、画像を切り替えられる。
        //srcを書き換えるだけで、ブラウザはサーバー側に再度リクエストを飛ばすんだね。
        var src = $(".myblock5 > img").attr("src").replace("tekitou1.png","tekitou2.jpg");
        $(".myblock5 > img").attr("src",src);
    });
});