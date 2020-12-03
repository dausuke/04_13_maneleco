$(function () {
//テーブル表示用にファイアベースのデータ取得
    const db = firebase.firestore().collection('kadai04');
    const dataArray = [];   //データ格納用
    let tableArray = [];

    db.orderBy('day', 'desc').onSnapshot(function (querySnapshot) {
        querySnapshot.docs.forEach(function (doc) {
            data = {
                id: doc.id,
                data: doc.data(),
            };
            dataArray.push(data);
        });
        console.log(dataArray)
            
        for (let i = 0; i < dataArray.length; i++) {      //保存しているすべてのデータ表示
        //    const tabletag = [dataArray[i].data.day,dataArray[i].data.text,dataArray[i].data.amount,dataArray[i].data.memo]
            // tableArray.push(dataArray[i].data.day)
            // tableArray.push(dataArray[i].data.text)
            // tableArray.push(dataArray[i].data.amount)
            // tableArray.push(dataArray[i].data.memo)
        const tableTag = `
            <tbody>
                <tr>
                    <td>${dataArray[i].data.day}</td>
                    <td>${dataArray[i].data.text}</td>
                    <td>${dataArray[i].data.amount}</td>
                    <td>${dataArray[i].data.memo}</td>
                </tr>
            </tbody>
            `;
                 tableArray.push(tableTag);
            };
             $('.table').append(tableArray)
        });
    // console.log(tableArray)
    // #datatableにDataTablesを適用 
    // $(window).on('load', function () { 
    //     $('#datatable').DataTable({
    //         // data: tableArray,
    //         columnDefs: [{ orderable: false, targets: [1] }], // カラム設定(例 = 2列目はソート機能を停止する)
    //         pageLength: 10, // 表示行数設定(例 = 10行表示)
    //         lengthMenu: [[5, 10, 15, 20], [5, 10, 15, 20]], // 表示行数変更設定(例 = 5行/10行/15行/20行)
    //         sorting: [[0, "DESC"]], // ソート設定(例 = 1列目の降順でソートする)
    //         oLanguage: {
    //             /* 日本語化設定 */
    //             sLengthMenu: "表示 _MENU_ 件", // 表示行数欄(例 = 表示 10 件)
    //             oPaginate: { // ページネーション欄
    //                 sNext: "次へ",
    //                 sPrevious: "前へ"
    //             },
    //             sInfo: "_TOTAL_ 件中 _START_件から_END_件 を表示しています", // 現在の表示欄(例 = 100 件中 20件から30件 を表示しています)
    //             sSearch: "検索 ", // 検索欄(例 = 検索 --)
    //             sZeroRecords: "表示するデータがありません", // 表示する行がない場合
    //             sInfoEmpty: "0 件中 0件 を表示しています", // 行が表示されていない場合
    //             sInfoFiltered: "全 _MAX_ 件から絞り込み" // 検索後に総件数を表示する場合
    //         }
    //     });
    // }); 
    
});