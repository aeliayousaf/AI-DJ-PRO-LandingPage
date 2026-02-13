import AIDJProScroll from './components/aidjproScroll';

export default function Home() {
  return (
    <main className="bg-[#050505] min-h-screen text-white selection:bg-white selection:text-black">
      <AIDJProScroll />

      {/* Footer / Subsequent content */}
      <section className="h-screen flex items-center justify-center border-t border-white/10 bg-[#0A0A0A]">
        <div className="text-center">
          <h3 className="text-2xl font-light text-white/40 mb-4">AI DJ PRO</h3>
          <p className="text-sm text-white/20">© 2024. All systems operational.</p>
        </div>
      </section>
    </main>
  );
}
