export default function GlobalAtmosphere() {
  return (
    <>
      <div className="fixed inset-0 pointer-events-none z-30 opacity-45" style={{ background: 'radial-gradient(circle at 50% 10%, rgba(200,135,47,.18), transparent 48%)' }} />
      <div className="fixed inset-0 pointer-events-none z-40 opacity-20" style={{ background: 'linear-gradient(180deg, transparent, rgba(255,255,255,.08), transparent)', filter: 'blur(40px)' }} />
      <div className="fixed inset-0 pointer-events-none z-50" style={{ background: 'repeating-radial-gradient(circle at 30% 20%, rgba(255,255,255,.06) 0 1px, transparent 1px 90px)' }} />
    </>
  );
}
