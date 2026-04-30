const canvas = document.getElementById("storyCanvas");
const ctx = canvas.getContext("2d");
const scoreEl = document.getElementById("score");
const industryAvgEl = document.getElementById("industryAvg");
const volumeEl = document.getElementById("volume");
const dangerEl = document.getElementById("danger");
const feedEl = document.getElementById("feed");
const rankingEl = document.getElementById("ranking");
const phaseTrackEl = document.getElementById("phaseTrack");
const samplePostsEl = document.getElementById("samplePosts");
const segmentCopyEl = document.getElementById("segmentCopy");
const quickForm = document.getElementById("quickForm");
const formMessage = document.getElementById("formMessage");
const shareLinkEl = document.getElementById("shareLink");
const copyLinkBtn = document.getElementById("copyLink");
const shareMessageEl = document.getElementById("shareMessage");

const phases = ["火種", "拡散", "AI検知", "可視化", "対応"];
const segmentCopy = {
  enterprise: "全社横断のレピュテーション監視と初動体制を、AIで高速化します。",
  store: "店舗口コミ・SNS炎上を早期把握し、売上影響前に一次対応できます。"
};

const feedTemplates = {
  火種: "掲示板投稿: 苦情ワード検知",
  拡散: "SNS拡散: 同時投稿が増加",
  AI検知: "AI検知: 危険語の連鎖を捕捉",
  可視化: "ダッシュボード更新: 危険度上昇",
  対応: "対応案生成: 初動テンプレを提示"
};

const samplePosts = [
  "X: 『対応が遅い』という投稿が15分で84リポスト",
  "口コミ: 星1レビューが同一時間帯に連続増加",
  "掲示板: 商品名＋不具合のスレッドが急伸",
  "検索: ブランド名＋炎上の関連クエリが上昇"
];

const rankingSeeds = ["接客対応", "品質不具合", "配送遅延", "価格表記", "広告表現"];

let w = 0;
let h = 0;
let t = 0;
let phaseIndex = 0;
let phaseTimer = 0;
let currentSegment = "enterprise";

const particles = Array.from({ length: 210 }, () => ({
  x: Math.random(),
  y: Math.random(),
  vx: (Math.random() - 0.5) * 0.0016,
  vy: (Math.random() - 0.5) * 0.0016,
  risk: Math.random() < 0.2
}));

function resize() {
  const dpr = window.devicePixelRatio || 1;
  w = canvas.clientWidth = canvas.offsetWidth;
  h = canvas.clientHeight = canvas.offsetHeight;
  canvas.width = w * dpr;
  canvas.height = h * dpr;
  ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
}

function updateShareLink() {
  const url = new URL(window.location.href);
  url.searchParams.set("segment", currentSegment);
  url.searchParams.set("phase", String(phaseIndex));
  shareLinkEl.value = url.toString();
}

function applyStateToUrl() {
  const url = new URL(window.location.href);
  url.searchParams.set("segment", currentSegment);
  url.searchParams.set("phase", String(phaseIndex));
  history.replaceState({}, "", `${url.pathname}?${url.searchParams.toString()}`);
  updateShareLink();
}

function hydrateFromUrl() {
  const params = new URLSearchParams(window.location.search);
  const segment = params.get("segment");
  const phase = Number(params.get("phase"));
  if (segment === "enterprise" || segment === "store") currentSegment = segment;
  if (Number.isInteger(phase) && phase >= 0 && phase < phases.length) phaseIndex = phase;
}

function syncSegmentUi() {
  document.querySelectorAll(".tab").forEach((btn) => {
    btn.classList.toggle("active", btn.dataset.segment === currentSegment);
  });
  segmentCopyEl.textContent = segmentCopy[currentSegment] || segmentCopy.enterprise;
}

window.addEventListener("resize", resize);
resize();
hydrateFromUrl();

function renderPhaseTrack() {
  phaseTrackEl.innerHTML = "";
  phases.forEach((phase, idx) => {
    const pill = document.createElement("span");
    pill.className = `phase-pill ${idx === phaseIndex ? "active" : ""}`;
    pill.textContent = `${idx + 1}. ${phase}`;
    phaseTrackEl.appendChild(pill);
  });
}

function renderSamplePosts() {
  samplePostsEl.innerHTML = "";
  samplePosts.forEach((item) => {
    const li = document.createElement("li");
    li.textContent = item;
    samplePostsEl.appendChild(li);
  });
}

function updateFeed(phase) {
  const li = document.createElement("li");
  li.textContent = `${new Date().toLocaleTimeString("ja-JP")} | ${phase}: ${feedTemplates[phase]}`;
  feedEl.prepend(li);
  while (feedEl.children.length > 5) feedEl.removeChild(feedEl.lastChild);
}

function renderRanking(baseScore) {
  rankingEl.innerHTML = "";
  rankingSeeds.forEach((label, idx) => {
    const value = Math.min(99, baseScore + idx * 6 + Math.floor(Math.sin(t * 2 + idx) * 5));
    const li = document.createElement("li");
    li.textContent = `${label}：危険度 ${value}`;
    rankingEl.appendChild(li);
  });
}

function animate() {
  t += 0.016;
  phaseTimer += 0.016;
  if (phaseTimer > 4) {
    phaseTimer = 0;
    phaseIndex = (phaseIndex + 1) % phases.length;
    updateFeed(phases[phaseIndex]);
    renderPhaseTrack();
    applyStateToUrl();
  }
  const phase = phases[phaseIndex];

  ctx.fillStyle = "rgba(3,7,18,0.32)";
  ctx.fillRect(0, 0, w, h);

  if (phase === "AI検知") {
    const y = ((t * 90) % h);
    const grad = ctx.createLinearGradient(0, y - 22, 0, y + 22);
    grad.addColorStop(0, "rgba(34,211,238,0)");
    grad.addColorStop(0.5, "rgba(34,211,238,0.4)");
    grad.addColorStop(1, "rgba(34,211,238,0)");
    ctx.fillStyle = grad;
    ctx.fillRect(0, y - 22, w, 44);
  }

  particles.forEach((p) => {
    p.x += p.vx;
    p.y += p.vy;
    if (p.x < 0 || p.x > 1) p.vx *= -1;
    if (p.y < 0 || p.y > 1) p.vy *= -1;

    const px = p.x * w;
    const py = p.y * h;
    const spreadBoost = phase === "拡散" && Math.sin(t * 2 + px * 0.01) > 0.9;
    const isRisk = p.risk || spreadBoost;

    ctx.beginPath();
    ctx.arc(px, py, isRisk ? 2.8 : 1.7, 0, Math.PI * 2);
    ctx.fillStyle = isRisk ? "rgba(244,63,94,0.9)" : "rgba(148,163,184,0.72)";
    ctx.fill();

    if (phase === "拡散" || phase === "可視化") {
      const nx = px + Math.sin(t + py * 0.01) * 26;
      const ny = py + Math.cos(t + px * 0.01) * 26;
      ctx.strokeStyle = isRisk ? "rgba(244,63,94,0.2)" : "rgba(148,163,184,0.08)";
      ctx.beginPath();
      ctx.moveTo(px, py);
      ctx.lineTo(nx, ny);
      ctx.stroke();
    }
  });

  const base = 32 + phaseIndex * 11;
  const score = base + Math.floor(Math.sin(t * 3) * 6);
  const industry = 45 + Math.floor(Math.cos(t * 1.2) * 3);
  scoreEl.textContent = String(score);
  industryAvgEl.textContent = String(industry);
  volumeEl.textContent = String(150 + phaseIndex * 42 + Math.floor(Math.sin(t * 2.3) * 12));
  dangerEl.textContent = String(7 + phaseIndex * 2);
  renderRanking(score);

  requestAnimationFrame(animate);
}

document.querySelectorAll(".tab").forEach((btn) => {
  btn.addEventListener("click", () => {
    currentSegment = btn.dataset.segment || "enterprise";
    syncSegmentUi();
    applyStateToUrl();
  });
});

copyLinkBtn.addEventListener("click", async () => {
  try {
    await navigator.clipboard.writeText(shareLinkEl.value);
    shareMessageEl.textContent = "確認リンクをコピーしました。";
  } catch {
    shareMessageEl.textContent = "コピーに失敗しました。手動でリンクをコピーしてください。";
  }
});

quickForm.addEventListener("submit", (event) => {
  event.preventDefault();
  const company = document.getElementById("company").value.trim();
  const email = document.getElementById("email").value.trim();
  if (!company || !email) {
    formMessage.textContent = "会社名とメールアドレスを入力してください。";
    return;
  }
  formMessage.textContent = `受付完了: ${company}（${email}）に診断URLを送信しました。`;
  quickForm.reset();
});

syncSegmentUi();
renderPhaseTrack();
renderSamplePosts();
updateFeed(phases[phaseIndex]);
applyStateToUrl();
animate();
