'use client';

const copy = {
  opening: '香りで、時間が動き出す。',
  estate: '大地の熱、霧、雨。アッサムの力強さは、ここから生まれる。',
  emotional: '濃く、深く、やさしく。 一杯が、今日を整える。'
};

export function OpeningScene() {
  return <section className="scene h-[300vh]" id="opening"><SceneInner chapter="01" title="Opening / 暗闇と湯気" copy={copy.opening} /></section>;
}
export function AssamPourHero() {
  return <section className="scene h-[320vh] gradient-amber" id="pour"><SceneInner chapter="02" title="Assam Tea Pour" copy="琥珀の雫が、夜の静けさを満たす。" /></section>;
}
export function LiquidDiveScene() {
  return <section className="scene h-[260vh] liquid" id="liquid"><SceneInner chapter="03" title="Enter the Liquid" copy="液体の中へ。屈折する光、泡、茶葉の影。" /></section>;
}
export function AromaParticleScene() {
  return <section className="scene h-[220vh]" id="aroma"><div className="scene-content" data-fade><p className="chapter">CHAPTER 04</p><h2 className="scene-title">Aroma Particles</h2><p className="scene-copy">香りの粒子が言葉になる。</p><div className="word-cloud"><span>MALTY</span><span>RICH</span><span>BOLD</span><span>ASSAM</span></div></div></section>;
}
export function AssamEstateScene() {
  return <section className="scene h-[300vh] estate" id="estate"><SceneInner chapter="05" title="Assam Tea Estate" copy={copy.estate} /></section>;
}

export function LeafToTeaHorizontalStory() {
  const steps = ['芽吹く','摘み取る','休ませる','揉み込む','深く発酵する','乾かす','香りになる'];
  return <section className="horizontal-shell h-[520vh]" id="leaf-story" data-horizontal><div className="horizontal-track" data-track>{steps.map((step, i)=><article key={step} className="frame"><div data-fade><p className="chapter">STEP {String(i+1).padStart(2,'0')}</p><h3 className="scene-title">{step}</h3></div></article>)}</div></section>;
}

export function BrewingRitualHorizontalStory() {
  const steps = ['量る','ポットに入れる','お湯を注ぐ','湯気が立つ','カップに注ぐ','飲む'];
  return <section className="horizontal-shell h-[420vh]" id="ritual" data-horizontal><div className="horizontal-track ritual" data-track>{steps.map((step, i)=><article key={step} className="frame"><div data-fade><p className="chapter">RITUAL {i+1}</p><h3 className="scene-title">{step}</h3></div></article>)}</div></section>;
}

export function ProductShowcaseScene() {
  return <section className="scene h-[260vh]" id="product"><div className="scene-content" data-fade><p className="chapter">CHAPTER 08</p><h2 className="scene-title">Product / Assam Black Tea</h2><p className="scene-copy">スクロールに合わせて主役缶が浮かび、左右の缶が流れる。</p><div className="product-row"><div className="can"/><div className="can active"/><div className="can"/></div></div></section>;
}

export function EmotionalMomentScene() {
  return <section className="scene h-[210vh]" id="emotion"><SceneInner chapter="09" title="Emotional Moment" copy={copy.emotional} /></section>;
}

export function FinalCTA() {
  return <section className="scene h-[160vh]" id="cta"><div className="scene-content" data-fade><p className="chapter">CHAPTER 10</p><h2 className="scene-title">アッサムの記憶を、一杯に。</h2><div className="cta-row"><button>商品を見る</button><button>茶葉の物語を読む</button></div></div></section>;
}

function SceneInner({ chapter, title, copy }:{chapter:string,title:string,copy:string}) {
  return <div className="scene-content" data-fade><p className="chapter">CHAPTER {chapter}</p><h2 className="scene-title">{title}</h2><p className="scene-copy">{copy}</p></div>;
}
