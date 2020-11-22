$(function () {
    // const db = firebase.firestore().collection('kadai04');

    //画面の切り替え
    $('.tab a').on('click', function () {
        $(this).parent().addClass('active').siblings('.active').removeClass('active');
        const content = $(this).attr('href');
        $(content).addClass('active').siblings('.active').removeClass('active');
        return false;
    });
    //撮影画面
    let accountval;         //勘定科目のvalue値取得用
    let purchasedateval;    //購入日のvalue値取得用

    $('#select').change(function() {
        // 選択されているvalue属性値を取り出す
        accountval = $('#select').val();
        console.log(accountval); 
        //取得したvalue値を#accountitemsに出力
        $('#accountitems').val(accountval);
        return accountval;
    });
    $('#purchaseday').change(function () { 
        purchasedateval = $('#purchaseday').val();
        console.log(purchasedateval);
        return purchasedateval;
    });
    $('#submit').on('click', function () {
        const data = {
        day: purchasedateval,
        text: accountval,
        memo: $('#textmemo').val(),
    }
    console.log(data);
     });
    
    // db.orderBy('time', 'desc').onSnapshot(function (querySnapshot) {
    //     const dataArray = []; 
    //     querySnapshot.docs.forEach(function (doc) {
    //     const data = {
    //     id: doc.id,
    //     data: doc.data(),
    // }
    // dataArray.push(data);
    //     });
        
    // const tagArray = []; 
    // dataArray.forEach(function (data) {
    // agArray.push(`
    // <li id=${data.id}>
    // <p>${data.data.name}</p>
    // <p>${data.data.text}</p>
    // <p>${data.data.time.seconds}</p>
    // </li>
    // `)
    // })
    // $('#output').html(tagArray);
    // });
    $('#upload_file').on('change', function(){ // ファイルが選択されるたびに動作するイベント
        const strFileInfo = $('#upload_file')[0].files[0]; // ファイルオブジェクトを変数に格納
        
        // 選択されたファイルが画像であれば、処理を継続
        if(strFileInfo && strFileInfo.type.match('image.*')){ 
            $('#preview').remove();  // 表示中のプレビュー画像があれば、削除しておく
            $('#preview_area').append('<img id="preview" width="400" />');  // 横幅400pxの空の画像をプレビューエリアにセット
            fileReader = new FileReader(); // FileReader()メソッドを初期化
            fileReader.onload = function(event){
                $('#preview').attr('src', event.target.result);
            }
            fileReader.readAsDataURL(strFileInfo); // ローカルフォルダから画像ファイルを読込
        }
        $("#submit").click(function(){
            const src = $(this).siblings('#preview_area').find('img').attr('src');
            console.log(src);
        });

    });
    //カレンダーの処理
    $('#datepicker').datepicker({
        showButtonPanel: true,      //カレンダー最下部に「Today」「Done」ボタンを追加
        dateFormat: 'yy/mm/dd',     //表示形式：年/月/日
    });
});