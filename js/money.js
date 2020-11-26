$(function () {

    const db = firebase.firestore().collection('kadai04');

    //画面の切り替え
    $('.tab a').on('click', function () {
        $(this).parent().addClass('active').siblings('.active').removeClass('active');
        const content = $(this).attr('href');
        $(content).addClass('active').siblings('.active').removeClass('active');
        return false;
    });

    //アップロード画面
    let accountval;         //勘定科目のvalue値取得用
    let purchasedateval;    //購入日のvalue値取得用
    let imgfile;            //画像のscr取得用
    const dataArray = [];
    let data;

    $('#upload_file').on('change', function(){ // ファイルが選択されるたびに作動
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
    });
    
    //#selectで選択された項目に応じて、value値を#accountitemsに出力
    $('#select').change(function() {
        // 選択されているvalue属性値を取り出し、変数accountvalに格納
        accountval = $('#select').val();
        //取得したvalue値を#accountitemsに出力
        $('#accountitems').val(accountval);
        return accountval;
    });

    //#purchasedayで選択された日付を変数purchasedatevalに格納
    $('#purchaseday').change(function () { 
        purchasedateval = $('#purchaseday').val();
        console.log(purchasedateval)
        return purchasedateval;
    });

    //送信処理
    $('#submit').on('click', function () {
        imgfile = $(this).siblings('.imgform').find('#preview').attr('src');
        const data = {
            day: purchasedateval,
            text: accountval,
            amount:$('#amountmaney').val(),
            memo: $('#textmemo').val(),
            img: imgfile
        }
        db.add(data);
        //送信後、各エリアの表示を削除
        $('#preview').remove();
        $('#upload_file').val('');
        $('#select').val('');
        $('#accountitems').val('');
        $('#amountmaney').val('');
        $('#purchaseday').val('');
        $('#textmemo').val('');
     });
    
    // データをリアルタイムに取得する処理
    db.orderBy('day', 'desc').onSnapshot(function (querySnapshot) {
        querySnapshot.docs.forEach(function (doc) {
             data = {
                id : doc.id,
                data : doc.data(),
            };
            dataArray.push(data);
        });
        const moneyArray = [];
        //メニュー画面（最近の５件表示）
        for (let i = 0; i < 5; i++) {
            const moneyTag = `
            <tr>
                <td>${dataArray[i].data.day}</td>
                <td>${dataArray[i].data.text}</td>
                <td>${dataArray[i].data.amount}</td>
            </tr>
            `;
            moneyArray.push(moneyTag);
            // console.log(dataArray[i].data);
            };
        
        $('.fivetable').append(moneyArray);
    });
    
    //カレンダーの処理
    $('.datepicker').datepicker({
        dateFormat: 'yy-mm-dd',     //表示形式：年-月-日
        onSelect: function(dateText, inst) {
            const date1 = dateText; 
            for (let i = 0; i < dataArray.length; i++) {
                if (date1 == dataArray[i].data.day) {   //選択された日付と保存されたデータの日付を判定
                    const tagArray = [];
                    dataArray.forEach(function (data) {     //同じであれば表示
                        const tag = `
                            <li id = "${data.id}">
                            <p>${data.data.day}</p>
                            <p>${data.data.text}</p>
                            <p>${data.data.amount}</p>
                            <img id="decodeimg" width="400" src= ${data.data.img} />
                            <p>${data.data.memo}</p>
                            </li>
                        `;
                        tagArray.push(tag);
                    });
                $('.calendarmemo').html(tagArray[i]);
                 };
             };
        }
    });
});