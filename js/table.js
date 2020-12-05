$(function () {
//テーブル表示用にファイアベースのデータ取得
    const db = firebase.firestore().collection('kadai04');
    const dataArray = [];   //データ格納用
    let tableArray = [];    //datatable用

    db.orderBy('day', 'desc').get().then(function (querySnapshot) {
        querySnapshot.docs.forEach(function (doc) {
            data = {
                id: doc.id,
                data: doc.data(),
            };
            dataArray.push(data);
        });
        const promise = new Promise(function (resolve, reject) {
            for (let i = 0; i < dataArray.length; i++) {      //保存しているすべてのデータ表示
                const tabledatatag = {
                    date: dataArray[i].data.day,
                    text: dataArray[i].data.text,
                    amount: dataArray[i].data.amount,
                    memo: dataArray[i].data.memo
                };
                
                tableArray.push(tabledatatag);
            };
            // console.log(tableArray)
            resolve();
        });
        // #datatableにDataTablesを適用 
        promise.then(
            $('#datatable').DataTable({
                destroy: true,
                data: tableArray,       //表示する中身
                columns: [
                    { data: 'date' },
                    { data: 'text' },
                    { data: 'amount' },
                    { data: 'memo' }
                ],
                columnDefs: [{ orderable: false, targets: [1] }], // カラム設定(例 = 2列目はソート機能を停止する)
                pageLength: 10, // 表示行数設定(例 = 10行表示)
                lengthMenu: [[5, 10, 15, 20], [5, 10, 15, 20]], // 表示行数変更設定(例 = 5行/10行/15行/20行)
                sorting: [[0, "DESC"]], // ソート設定(例 = 1列目の降順でソートする)
                oLanguage: {
                /* 日本語化設定 */
                sLengthMenu: "表示 _MENU_ 件", // 表示行数欄(例 = 表示 10 件)
                oPaginate: { // ページネーション欄
                    sNext: "次へ",
                    sPrevious: "前へ"
                },
                sInfo: "_TOTAL_ 件中 _START_件から_END_件 を表示しています", // 現在の表示欄(例 = 100 件中 20件から30件 を表示しています)
                sSearch: "検索 ", // 検索欄(例 = 検索 --)
                sZeroRecords: "表示するデータがありません", // 表示する行がない場合
                sInfoEmpty: "0 件中 0件 を表示しています", // 行が表示されていない場合
                sInfoFiltered: "全 _MAX_ 件から絞り込み" // 検索後に総件数を表示する場合
                }
            })
        );
    });
});