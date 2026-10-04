'use strict';
/* TU:bit V2 機器人課程網站｜共用頁首、頁尾、版本紀錄
   改版時只改 APP_VERSION 與 CHANGELOG 兩個常數。 */
const APP_VERSION = 'v1.6.1';
const CHANGELOG = [
  { version: 'v1.6.1', date: '2026-10-04', desc: '2026全國競賽路徑規劃器更新到 v1.4.0：程式碼改用程式產生器的共用核心產生，套件與感測器、遙控、一鍵自動／手動模式設定與程式產生器相同；新增撞牆校正、超音波接近、連續發射與快速範本。程式產生器競賽自動化 7 個範本全部重新編譯檢查，BNO 轉正欄位補上「順時針增加」說明。' },
  { version: 'v1.6.0', date: '2026-10-04', desc: '程式產生器：PS3 與 V7RC 的「搖桿控制」與「方向鍵控制」分開設定，各自可選移動車子、調整瞄準（手臂／砲台／雲台伺服）或不使用；新增瞄準速度參數與 aimPan()／aimTilt()；V7RC 右側 8 方向鍵也可選旋轉（官方）、移動、瞄準；方向鍵與按鍵對應重複時提醒。' },
  { version: 'v1.5.0', date: '2026-10-04', desc: '程式產生器：PS3 加入組合鍵（例如按住 ○ 時方向鍵改調雲台、砲台或手臂，一鍵套用），按鍵對應每列可設「按住」鍵、新增「伺服累加（雲台）」動作；PS3 按鍵觸發增為 4 組、可設組合鍵並等放開才結束；一鍵自動做完後可選停在 AUTO OK 等手動鍵、重複執行直到按手動鍵、或立刻回手動。' },
  { version: 'v1.4.0', date: '2026-10-03', desc: '程式產生器：PS3／V7RC 勾選後自動產生遙控程式（前進後退、左右平移、旋轉直接對應搖桿或方向鍵，速度／旋轉速度／死區可調），按鍵對應表可一鍵套用官方手臂車、發射車配置並逐鍵修改；新增一鍵自動／手動模式（自動鍵、手動鍵可選 PS3 START／SELECT、V7RC 按鈕或控制板 A／B，自動途中可中止、做完停在 AUTO OK 等裁判確認、OLED 顯示模式、手把震動提示）與兩個全國賽範本；修正 L2 說明為「MTC 角度移動」（依官方 .tb）。' },
  { version: 'v1.3.1', date: '2026-10-03', desc: '擴充模組加入圖解：PS3 連線五步驟（官方講義圖片：輸入 MAC、上傳、長按 PS 鈕連線、搖桿按鈕、序列埠確認）與 V7RC 設定（控制中心選 GAME ADV、GAME ADV 通道 1～4 說明）；BNO055 I2C 接線圖依實車線色確認排針順序為 SCL、SDA、V、G；程式產生器 V7RC 按鈕加上方向箭頭與 GAME ADV 提醒。' },
  { version: 'v1.3.0', date: '2026-10-03', desc: '首頁加入「兔比積木 TU:bitBlock 線上積木」入口；程式產生器進階篇新增 BNO055（顯示角度、轉正）、PS3 手把（搖桿遙控、按鍵觸發、震動）、V7RC（藍牙／Wi-Fi 遙控、按鈕觸發）、MTC Robot（X Y 旋轉、角度移動、弧線、車體參數）、IR 靠牆校正（新版積木：MTC 模式、腳位 前33 後32 左前35 左後34 右前39 右後36），皆依兔比積木擴充原始碼並以線上 Arduino IDE 編譯通過；組裝與接線新增 BNO055 I2C 接線（VIN 接 V、GND 接 G，接反會燒毀）與 IR 靠牆校正接線。' },
  { version: 'v1.2.0', date: '2026-10-03', desc: '控制板與接線改以鴻兔科技 TU Wiki 官方圖片為主（電源、按鈕、GPIO、OLED、馬達、編碼器、伺服、超音波、紅外線），並新增編碼器馬達、伺服馬達、套件腳位接線示意圖；程式產生器分為基礎篇、進階篇（水平雲台、手臂 ATARM、發射器 PPGUN、超音波）、競賽自動化（撞牆校正、BNO 轉正、超音波接近、夾取／放置組合、連續發射）；原路徑規劃器更名為「TU:bit V2 2026全國競賽路徑規劃器」移到競賽專區（race-planner/），舊 planner/ 網址導向程式產生器。' },
  { version: 'v1.1.0', date: '2026-10-03', desc: '新增「程式產生器」：勾選按鈕 A／B、開機、重複執行等觸發條件與馬達、MTC 移動、伺服、OLED、等待動作，自動產生 TubitBlock（OpenBlock）格式的 Arduino 程式碼；新增「資料下載」頁，整理官方講義與範例 .tb 並附雲端備份連結；首頁移除重要日期公告。程式碼寫法依兔比積木擴充原始碼（TuBitCore、TuMTC、Adafruit_SH110X）。' },
  { version: 'v1.0.0', date: '2026-10-03', desc: '首版：開始使用、組裝與接線、擴充模組（PS3、V7RC、手臂、發射器、BNO055、超音波）、程式範例、2026 全國 AI 智創機器人競賽專區（含計分試算），並收錄競賽路徑規劃器 v1.3.2。內容已對照鴻兔科技官網、官方講義與 2026 全國賽實施計畫。' }
];

const NAV = [
  { href: 'index.html', key: 'home', label: '首頁' },
  { href: 'start.html', key: 'start', label: '開始使用' },
  { href: 'wiring.html', key: 'wiring', label: '組裝與接線' },
  { href: 'modules.html', key: 'modules', label: '擴充模組' },
  { href: 'code.html', key: 'code', label: '程式範例' },
  { href: 'generator.html', key: 'generator', label: '程式產生器' },
  { href: 'resources.html', key: 'resources', label: '資料下載' },
  { href: 'competition.html', key: 'competition', label: '競賽專區' },
  { href: 'race-planner/', key: 'planner', label: '全國賽路徑規劃' }
];

function esc(v) {
  return (v === null || v === undefined ? '' : String(v))
    .replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/>/g, '&gt;')
    .replace(/"/g, '&quot;').replace(/'/g, '&#39;');
}

function applyTheme(t) {
  try { if (t) localStorage.setItem('tubit-site-theme', t); } catch (e) {}
  if (t === 'light' || t === 'dark') document.documentElement.setAttribute('data-theme', t);
  else document.documentElement.removeAttribute('data-theme');
}
(function initTheme() {
  let t = null;
  try { t = localStorage.getItem('tubit-site-theme'); } catch (e) {}
  if (t === 'light' || t === 'dark') document.documentElement.setAttribute('data-theme', t);
})();

function renderChrome() {
  const page = document.body.dataset.page || '';
  const header = document.getElementById('site-header');
  if (header) {
    header.className = 'topbar';
    header.innerHTML =
      '<div class="topbar-in">' +
        '<a class="brand" href="index.html"><span class="brand-mark">TU</span>TU:bit V2 機器人課程</a>' +
        '<button class="version-badge" type="button" id="verBtn" title="更新紀錄">' + esc(APP_VERSION) + '</button>' +
        '<button class="theme-btn" type="button" id="themeBtn" title="切換深色／淺色">◐</button>' +
        '<button class="nav-toggle" type="button" id="navToggle" aria-expanded="false" aria-controls="mainNav">選單</button>' +
        '<nav class="nav" id="mainNav" aria-label="主選單">' +
          NAV.map(n => '<a href="' + n.href + '"' + (n.key === page ? ' aria-current="page"' : '') + '>' + esc(n.label) + '</a>').join('') +
        '</nav>' +
      '</div>';
  }
  const footer = document.getElementById('site-footer');
  if (footer) {
    footer.className = 'footer';
    const onPages = /github\.io$/.test(location.hostname);
    footer.innerHTML =
      '<div class="footer-in">' +
        '<span>TU:bit V2 機器人課程 ' + esc(APP_VERSION) + '｜車城國小資訊教育　教學與競賽練習用</span>' +
        '<span class="env">' + (onPages ? '✅ 目前運行於 GitHub Pages 正式環境（' + esc(APP_VERSION) + '）' : '本機預覽（' + esc(APP_VERSION) + '）') + '</span>' +
        '<span>官方資源：<a href="https://trgreat.com/" target="_blank" rel="noopener">東業創新 × 鴻兔科技</a></span>' +
      '</div>';
  }
  const dlg = document.createElement('dialog');
  dlg.id = 'logDlg';
  dlg.innerHTML = '<h3>更新紀錄</h3>' +
    CHANGELOG.map((c, i) => '<div class="log-item"><b>' + esc(c.version) + '</b>' + (i === 0 ? '<span class="newest">最新</span>' : '') +
      ' <span class="muted">（' + esc(c.date) + '）</span><div>' + esc(c.desc) + '</div></div>').join('') +
    '<div class="btns"><button class="btn" type="button" id="logClose">關閉</button></div>';
  document.body.appendChild(dlg);

  const on = (id, ev, fn) => { const el = document.getElementById(id); if (el) el.addEventListener(ev, fn); };
  on('verBtn', 'click', () => dlg.showModal());
  on('logClose', 'click', () => dlg.close());
  dlg.addEventListener('click', e => { if (e.target === dlg) dlg.close(); });
  on('navToggle', 'click', e => {
    const nav = document.getElementById('mainNav');
    const open = nav.classList.toggle('open');
    e.currentTarget.setAttribute('aria-expanded', open ? 'true' : 'false');
  });
  on('themeBtn', 'click', () => {
    const cur = document.documentElement.getAttribute('data-theme');
    const dark = cur ? cur === 'dark' : window.matchMedia('(prefers-color-scheme: dark)').matches;
    applyTheme(dark ? 'light' : 'dark');
  });
}

/* 分頁切換：<div class="tabs" data-tabs="group"> 內的 button[data-tab] 對應 [data-panel] */
function initTabs() {
  document.querySelectorAll('.tabs[data-tabs]').forEach(bar => {
    const group = bar.dataset.tabs;
    const btns = [...bar.querySelectorAll('button[data-tab]')];
    const show = key => {
      btns.forEach(b => b.setAttribute('aria-selected', b.dataset.tab === key ? 'true' : 'false'));
      document.querySelectorAll('[data-panel-group="' + group + '"]').forEach(p => p.classList.toggle('hidden', p.dataset.panel !== key));
    };
    btns.forEach(b => b.addEventListener('click', () => show(b.dataset.tab)));
    if (btns[0]) show(btns[0].dataset.tab);
  });
}

document.addEventListener('DOMContentLoaded', () => {
  renderChrome();
  initTabs();
});
