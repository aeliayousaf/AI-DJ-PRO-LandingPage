import AIDJProScroll from './components/aidjproScroll';
import ContentSections from './components/ContentSections';

export default function Home() {
  return (
    <main className="bg-[#050505] min-h-screen text-white selection:bg-white selection:text-black">
      <AIDJProScroll />
      <div className="overflow-x-hidden w-full">
        <ContentSections />
      </div>
    </main>
  );
}
