export default function GlobalAtmosphere() {
  return (
    <>
      <div className="fixed inset-0 pointer-events-none z-40 opacity-40" style={{background:'radial-gradient(circle at 50% 20%, rgba(200,135,47,.18), transparent 42%)'}}/>
      <div className="fixed inset-0 pointer-events-none z-50" style={{background:'repeating-radial-gradient(circle at 20% 10%, rgba(255,255,255,.05) 0 1px, transparent 1px 80px)'}}/>
      <div className="fixed inset-0 pointer-events-none z-30 opacity-20" style={{background:'linear-gradient(180deg, transparent 0%, rgba(255,255,255,.08) 45%, transparent 100%)',filter:'blur(30px)'}}/>
    </>
  );
}
