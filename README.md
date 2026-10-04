# TU:bit V2 機器人課程網站

TU:bit V2（MTC V2 麥克納姆輪）機器人的教學網站：從安裝 TubitBlock、組裝接線、PS3／V7RC 遙控、手臂與乒乓球發射器，到 2026 全國 AI 智創機器人競賽專區與競賽路徑規劃器。

目前版本：**v1.6.1**（完整更新紀錄見 [CHANGELOG.md](CHANGELOG.md)，網頁標題旁的版本號也可點開查看）

## 版本更新

### v1.6.1（2026-10-04）
- **全國賽路徑規劃器更新到 v1.4.0**，與程式產生器同步：程式碼改用程式產生器的共用產生核心，兩邊寫法完全相同；「感測元件」改為「套件與感測器設定」（8 種套件，手臂／發射器擇一、PS3／V7RC 擇一）；加入遙控設定與一鍵自動／手動模式（START 自動、SELECT 手動、做完停在 AUTO OK 等裁判確認）；新增撞牆校正、超音波接近、連續發射、砲台旋轉／仰角與快速範本。
- **程式產生器 › 競賽自動化**：7 個範本全部重新編譯檢查（0 錯誤 0 警告），並在兔比積木線上 Arduino IDE 實際編譯成功；BNO 轉正欄位補上「開機車頭＝0°，順時針增加」說明，範本改為「右轉到 90°」。

### v1.6.0（2026-10-04）
- 程式產生器：PS3／V7RC 的「搖桿控制」與「方向鍵控制」分開設定（移動車子、調整瞄準或不使用），新增瞄準速度參數。

### v1.5.0（2026-10-04）
- PS3 組合鍵（按住某鍵＋按鍵）、伺服累加（雲台）、一鍵自動做完後三選一（停在 AUTO OK／重複執行／立刻回手動）。

### v1.4.0（2026-10-03）
- 勾選 PS3 或 V7RC 自動產生 `remoteControl()`；一鍵套用官方手臂車／發射車按鍵配置；一鍵自動／手動模式。

更早的版本（v1.0.0～v1.3.1）請看 [CHANGELOG.md](CHANGELOG.md)。

## 檔案結構

```
index.html          首頁（學習路線、重要日期、官方資源）
start.html          STEP 1 開始使用（控制板、安裝、連線上傳）
wiring.html         STEP 2 組裝與接線（馬達、伺服、超音波、校正）
modules.html        STEP 3 擴充模組（PS3、V7RC、手臂、發射器、BNO055…）
code.html           STEP 4 程式範例（官方 .tb 逐段解說、BNO 轉正）
generator.html      程式產生器（基礎篇、進階篇、競賽自動化）
resources.html      資料下載（官方講義、範例 .tb、雲端備份連結）
competition.html    競賽專區（2026 全國賽規則重點、計分試算）
race-planner/       TU:bit V2 2026全國競賽路徑規劃器 v1.4.0（含自己的 README、CHANGELOG）
planner/            舊網址，自動導向程式產生器（競賽自動化）
assets/site.css     共用樣式（自建輕量 CSS，無框架）
assets/site.js      共用頁首頁尾、版本號、更新紀錄
assets/img/         站內圖片（BNO055 實車接線、PS3 連線步驟、V7RC 設定截圖）
.nojekyll           讓 GitHub Pages 不經 Jekyll 處理
```

## 部署到 GitHub Pages

1. 在 GitHub 建立新的 repository（例如 `tubit-v2-course`），設為 Public。
2. 把本資料夾內**所有檔案與子資料夾**上傳到 repository 根目錄（保留 `assets/`（含 `assets/img/`）、`planner/`、`race-planner/` 資料夾結構）。
   `.nojekyll` 是隱藏檔，網頁上傳看不到時，可用「Add file → Create new file」建立一個空白的 `.nojekyll`。
3. 進入 **Settings → Pages**，Source 選 **Deploy from a branch**，Branch 選 `main`、資料夾選 `/ (root)`，按 Save。
4. 約 1 分鐘後網址會出現在同一頁：`https://你的帳號.github.io/tubit-v2-course/`
   全國賽路徑規劃器在：`https://你的帳號.github.io/tubit-v2-course/race-planner/`

### 更新檔案時要注意

- 每個檔案要放回**原本的位置**：`race-planner/index.html`、`race-planner/README.md`、`race-planner/CHANGELOG.md` 必須放在 `race-planner/` 資料夾裡；根目錄的 `index.html` 是課程首頁、`CHANGELOG.md` 是整站更新紀錄，不能被規劃器的同名檔案蓋掉。
- 下載的壓縮檔請先解壓，**選取資料夾裡面的檔案**再拖進 GitHub，不要把整個資料夾（例如 `tubit-v2-course-site/`）拖進去，否則會多出一層子資料夾，網站仍是舊版。

不需要建置步驟；字型由 Google Fonts 載入，離線時自動改用系統字型。

## 雲端備份

官方講義與範例已複製到 Google 雲端硬碟「TU_bit V2 課程資料備份（官方講義與範例）」資料夾，`resources.html` 的「雲端備份」連結指向這些副本。
要讓校外學生也能開啟，請把 01、02、04、05、06 資料夾的共用設定改為「知道連結的任何人都能檢視」。
03（MTC 麥克納姆輪課程）是官方密碼保護內容，請維持不公開。

## 改版方式

- 改 `assets/site.js` 最上方的 `APP_VERSION` 與 `CHANGELOG`，所有頁面的版本徽章、頁尾、更新紀錄會一起更新；同時在 `CHANGELOG.md` 補一筆。
- 新增 CSS class 時要在 `assets/site.css` 補規則，否則樣式不會出現。

## 圖片

控制板與接線的官方照片直接引用鴻兔科技 TU Wiki（i0.wp.com 圖片網址），沒有複製到 repository；官方更換圖片時請更新網址。

## 資料來源

- 東業創新 × 鴻兔科技官網 <https://trgreat.com/>：TU:bit V2 入門課程 01–07、MTC V2 麥克納姆輪課程、MTC 套件組裝說明 step1–4、擴充積木課程（PS3、V7RC、手臂、發射器）。
- 智創機器人競賽官網 <https://tubitblock.trgreat.com/competition/>：2026 全國 AI 智創機器人競賽－扶輪盃實施計畫。
- 官方範例 .tb 檔（夾爪／射擊 PS3、V7RC BLE、手臂校正、伺服校正、發射器 3.1 校正、BNO 轉正）。

本網站供教學與競賽練習使用；官方講義與範例檔版權屬原作者，網站內以連結方式引用。
