# 🌊 VTuber Webサイトテンプレート【深海歌姫】Deep Sea Diva
**Template by The Firmament**

---

## 📁 ファイル構成

```
vtuber-deepsea-template/
├── index.html   ← メインページ
├── style.css    ← デザイン・色設定
├── script.js    ← Canvasアニメーション
└── README.md    ← このファイル
```

---

## 🚀 まずここから！カスタマイズ3ステップ

### Step 1｜名前を変える（index.html）

`index.html` をテキストエディタで開いて、
「YOUR NAME」を全部自分の名前に置き換える。

```html
<!-- 変更前 -->
<span class="logo-name">YOUR NAME</span>

<!-- 変更後（例） -->
<span class="logo-name">深海マリン</span>
```

**Ctrl+H（Windows）/ Cmd+H（Mac）で一括置換が便利！**

---

### Step 2｜アバター画像を差し替える（index.html）

```html
<!-- 変更前（プレースホルダー） -->
<div class="avatar-placeholder">🌊</div>

<!-- 変更後（自分の画像） -->
<img src="avatar.png" style="width:100%;height:100%;object-fit:cover;object-position:top;">
```

画像ファイルは index.html と同じフォルダに置いてください。

---

### Step 3｜キャッチコピーを変える（index.html）

```html
<!-- ここを自分のコピーに変更 -->
<p class="hero-tagline">
    深海の底から、あなたへ歌う。<br>この声が、闇を照らす光になる。
</p>
```

---

## 🎨 色のカスタマイズ（style.css）

`style.css` の一番上の `:root` を変えるだけで全体の色が変わります。

```css
:root {
    --cyan:  #00E5FF;    /* ← 深海シアン（メインアクセント） */
    --deep:  #0A3A5C;    /* ← 深海の青 */
    --bg:    #030D18;    /* ← 漆黒の深海（背景） */
    --pearl: #E8F4F8;    /* ← 真珠白（テキスト） */
}
```

例：シアンをグリーンにしたい場合
```css
--cyan: #00FFB3;
```

---

## ✏️ テキスト一覧（変更箇所まとめ）

| 場所 | 変更内容 |
|------|---------|
| ナビ ロゴ | YOUR NAME → 自分の名前 |
| Hero タイトル | YOUR NAME → 自分の名前 |
| Hero キャッチコピー | 深海の底から〜 → 自分のコピー |
| Hero タグ | 深海歌姫 / 歌ってみた / ASMR配信 → 自分のジャンル |
| About 自己紹介文 | index.html の about セクション |
| フッター | YOUR NAME → 自分の名前 |
| SNSリンク | href="#" → 自分のURL |

---

## 🌊 アニメーション仕様

- **気泡**：深海の泡がゆらゆら浮かび上がる
- **海流**：揺らめく光の筋が流れる
- **発光粒子**：深海生物の発光をイメージした粒子
- **水面反射**：上部に揺れる水面エフェクト
- **スクロール**：各セクションがフェードインで登場

---

## 🌐 公開方法（ConoHa WING の場合）

1. ConoHa WING にログイン
2. ファイルマネージャーを開く
3. `public_html` フォルダに以下をアップロード
   - index.html
   - style.css
   - script.js
   - アバター画像（avatar.png など）
4. ブラウザで自分のドメインにアクセスして確認

---

## ❓ よくある質問

**Q. 気泡の数を減らしたい（重い）**
A. script.js の気泡生成数を減らしてください。
```js
const BUBBLE_COUNT = 20;  // 40→20に減らす
```

**Q. 発光色を変えたい**
A. style.css の `--cyan` の色を変更してください。
サイアン以外の色でも深海っぽい雰囲気が出ます。

**Q. ASMRタグを自分のジャンルに変えたい**
A. index.html の `<span class="htag">` の中身を変更してください。

---

## 📬 サポート

わからないことがあれば何でも聞いてください。

- **X（Twitter）**：[@The_Firmament](https://x.com/VtIv6QFOKe80553)
- **BOOTH ショップ**：[The Firmament](https://denkyuch.booth.pm/)

初期設定サポート（ConoHaへのアップロードまで一緒にやります）は別途ご相談ください。

---

© 2026 Template by The Firmament  
商用利用・改変OK / 再配布・転売NG
