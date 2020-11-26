$(function () {
    // //#datatableにDataTablesを適用
    // $(function ($) {
    //      // デフォルトの設定を変更（日本語化）
    //     $.extend( $.fn.dataTable.defaults, { 
    //         language: {
    //             url: "http://cdn.datatables.net/plug-ins/9dcbecd42ad/i18n/Japanese.json"
    //         } 
    //     }); 
    //     $("#datatable").DataTable(); 
    //  });

    //テーブル表示用にファイアベースのデータ取得
    const db = firebase.firestore().collection('kadai04');
    const dataArray = [];   //データ格納用

    db.orderBy('day', 'desc').onSnapshot(function (querySnapshot) {
        querySnapshot.docs.forEach(function (doc) {
             data = {
                id : doc.id,
                data : doc.data(),
            };
            dataArray.push(data);
        });
        const tableArray = [];
        //メニュー画面（最近の５件表示）
        for (let i = 0; i<dataArray.length; i++) {
            const tableTag = `
            <tr>
                <td>${dataArray[i].data.day}</td>
                <td>${dataArray[i].data.text}</td>
                <td>${dataArray[i].data.amount}</td>
                <td>${dataArray[i].data.memo}</td>
            </tr>
            `;
            tableArray.push(tableTag);
            };
        $('.table').append(tableArray)
    });



});