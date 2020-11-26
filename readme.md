# MoneyRecord(マネレコ)
デプロイ先：https://dausuke.github.io/04_13_maneleco/

## プロダクトの紹介
- 店をやっている先輩に頼まれて作りました。
- レシートの写真を保存し、購入理由から勘定科目を自動で選択。
- カレンダーと購入日を紐づけてカレンダーの日付を選択するとその日のレシートのデータ表示。
- 個人事業主版家計簿アプリのイメージで作成しました。

## 工夫した点
- 先輩からの要望で使いやすく、感覚的にわかるようにしてほしいといわれたので、シンプルな見た目と使いやすさを意識しました。
- 自分で勘定科目を調べる必要がないように選択された項目に応じて自動入力。

## 苦戦した点
- Datatableプラグインを使用したかったのですが、うまくいかず、取り急ぎHTMLのtableタグで全表示させてます。
- カレンダーと購入日の紐づけ。変数スコープの関係でデータが取れず、1日使いました。変数宣言するタイミング難しいです。
