'use strict';
/* TU:bit V2 機器人課程網站｜共用頁首、頁尾、版本紀錄
   改版時只改 APP_VERSION 與 CHANGELOG 兩個常數。 */
const APP_VERSION = 'v1.1.0';
const CHANGELOG = [
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
  { href: 'planner/', key: 'planner', label: '路徑規劃器' }
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
