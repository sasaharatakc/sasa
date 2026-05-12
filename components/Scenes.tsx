const chapters = [
  ['Opening / 暗闇と湯気', '香りで、時間が動き出す。'],
  ['Assam Pour', '琥珀の流れが、記憶を満たしていく。'],
  ['Enter the Liquid', 'カメラは液体の屈折の奥へ潜る。'],
  ['Aroma Particles', 'MALTY / RICH / BOLD / ASSAM'],
  ['Tea Estate', '大地の熱、霧、雨。アッサムの力強さはここから生まれる。'],
  ['Product Showcase', 'アート作品としてのアッサムブラックティー。'],
  ['Emotional Moment', '濃く、深く、やさしく。一杯が、今日を整える。'],
  ['Final CTA', 'アッサムの記憶を、一杯に。']
];

export function VerticalScenes() {
  return (
    <>
      {chapters.map(([title, copy], i) => (
        <section key={title} className="relative h-[260vh] flex items-center px-6 md:px-16" style={{background:i%2? 'linear-gradient(180deg,#120d0a,#090807)': 'linear-gradient(180deg,#050505,#1a120d)'}}>
          <div data-fade className="space-y-5">
            <p className="text-xs tracking-[0.35em] text-amber/80">CHAPTER {String(i + 1).padStart(2, '0')}</p>
            <h2 className="scene-title">{title}</h2>
            <p className="scene-copy">{copy}</p>
          </div>
        </section>
      ))}
    </>
  );
}

export function HorizontalLeafStory() {
  const steps = ['芽吹く','摘み取る','休ませる','揉み込む','深く発酵する','乾かす','香りになる'];
  return <section data-horizontal className="relative h-[520vh] bg-[#070605]"><div data-track className="flex h-screen w-[700vw]">{steps.map((s,i)=><article key={s} className="w-screen h-screen flex items-center justify-center px-10" style={{background:`linear-gradient(120deg, rgba(34,49,39,.7), rgba(154,91,46,.35) ${40+i*8}%)`}}><div data-fade><p className="text-xs tracking-[0.35em]">STEP {String(i+1).padStart(2,'0')}</p><h3 className="scene-title">{s}</h3></div></article>)}</div></section>;
}

export function HorizontalBrewStory() {
  const steps = ['量る','ポットへ','注ぐ','湯気','カップへ','飲む'];
  return <section data-horizontal className="relative h-[430vh] bg-[#0b0807]"><div data-track className="flex h-screen w-[600vw]">{steps.map((s,i)=><article key={s} className="w-screen h-screen flex items-end pb-24 px-10" style={{background:`radial-gradient(circle at ${20+i*12}% 30%, rgba(200,135,47,.35), rgba(6,5,5,1) 55%)`}}><div data-fade><p className="text-xs tracking-[0.35em]">RITUAL {i+1}</p><h3 className="scene-title">{s}</h3></div></article>)}</div></section>;
}
