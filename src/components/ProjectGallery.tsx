import { useEffect, useRef, useState } from 'react';
import { projects, type PortfolioImage } from '../data/projects';

type WorkImage = PortfolioImage & { projectId: string; projectName: string };
const allImages: WorkImage[] = projects.flatMap(project =>
  project.images.map(image => ({ ...image, projectId: project.id, projectName: project.name }))
);
const asset = (src: string) => `${import.meta.env.BASE_URL.replace(/\/$/, '')}/${src}`;
const chip = 'rounded-full border px-4 py-2 text-xs transition-colors focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-[#7344df]';

export default function ProjectGallery() {
  const [project, setProject] = useState(projects[0]?.id ?? 'all');
  const [category, setCategory] = useState('all');
  const [version, setVersion] = useState('all');
  const [selected, setSelected] = useState<WorkImage | null>(null);
  const dialog = useRef<HTMLDialogElement>(null);
  const scroller = useRef<HTMLDivElement>(null);
  const closeButton = useRef<HTMLButtonElement>(null);
  const lastTrigger = useRef<HTMLButtonElement | null>(null);
  const activeProject = projects.find(item => item.id === project);
  const scopedImages = allImages.filter(image => project === 'all' || image.projectId === project);
  const categories = [...new Map(scopedImages.map(image => [image.category, image.categoryLabel])).entries()]
    .sort((a, b) => (activeProject?.categories.indexOf(a[0]) ?? 0) - (activeProject?.categories.indexOf(b[0]) ?? 0));
  const versions = [...new Map(scopedImages.map(image => [image.version, image.versionLabel])).entries()]
    .sort((a, b) => (activeProject?.versions.indexOf(a[0]) ?? 0) - (activeProject?.versions.indexOf(b[0]) ?? 0));
  const orderedImages = [...scopedImages].sort((a, b) => {
    const owner = projects.find(item => item.id === a.projectId);
    return a.projectId.localeCompare(b.projectId) || (owner?.versions.indexOf(a.version) ?? 0) - (owner?.versions.indexOf(b.version) ?? 0);
  });
  const filtered = orderedImages.filter(image => (category === 'all' || image.category === category) && (version === 'all' || image.version === version));
  const selectedIndex = selected ? filtered.findIndex(image => image.id === selected.id) : -1;

  useEffect(() => {
    if (!selected) return;
    const modal = dialog.current;
    if (!modal) return;
    const previousOverflow = document.body.style.overflow;
    document.body.style.overflow = 'hidden';
    if (!modal.open) modal.showModal();
    closeButton.current?.focus();
    return () => {
      document.body.style.overflow = previousOverflow;
      if (modal.open) modal.close();
      lastTrigger.current?.focus();
    };
  }, [Boolean(selected)]);

  useEffect(() => { scroller.current?.scrollTo({ top: 0 }); }, [selected?.id]);

  const move = (direction: number) => {
    const image = filtered[selectedIndex + direction];
    if (image) setSelected(image);
  };

  return (
    <section id="work" className="mb-[52px] scroll-mt-6">
      <div className="mb-7 flex items-end justify-between gap-4">
        <div><p className="mb-2 text-[10px] tracking-[3px] text-[#7955b0]">SELECTED WORK / 01</p><h2 className="text-3xl">设计作品集</h2></div>
        <span className="text-xs text-muted">从整体体验，到每一处细节</span>
      </div>
      <div aria-label="按项目筛选" className="mb-5 flex flex-wrap items-center gap-3">
        {[['all', '全部项目'], ...projects.map(item => [item.id, item.name])].map(([value, label]) => <button key={value} type="button" aria-pressed={project === value} onClick={() => { setProject(value); setCategory('all'); setVersion('all'); }} className={`${chip} ${project === value ? 'border-[#5d2bc0] bg-[#5d2bc0] text-white' : 'border-line bg-white hover:border-[#7344df]'}`}>{label}</button>)}
        <span className="text-xs text-muted">{projects.length} 个项目 · 更多作品陆续更新</span>
      </div>
      <div className="relative mb-7 overflow-hidden rounded-2xl p-7 text-white sm:p-10" style={{ backgroundColor: activeProject?.theme.background ?? '#332446' }}>
        <span aria-hidden="true" className="absolute -top-16 -right-12 size-64 rounded-full border-[45px] border-[#ffd84a]/15" />
        <p className="relative mb-4 text-[10px] tracking-[3px] text-[#e1d0ff]">{activeProject?.subtitle ?? 'SELECTED DESIGN PROJECTS'}</p>
        <div className="relative flex flex-wrap items-end justify-between gap-5"><div><h3 className="m-0 text-4xl font-black italic tracking-tight text-[#ffdc39] sm:text-5xl" style={{ color: activeProject?.theme.accent ?? '#ffdc39' }}>{activeProject?.name.toUpperCase() ?? 'ALL PROJECTS'}</h3><p className="mt-3 max-w-xl text-sm leading-7 text-[#eee4ff]">{activeProject?.description ?? '按项目与业务浏览设计作品，每一个项目都保留独立的视觉风格和设计版本。'}</p></div><div className="rounded-xl border border-white/20 px-5 py-4"><strong className="text-3xl text-[#ffdc39]">{scopedImages.length}</strong><span className="ml-2 text-xs text-[#eee4ff]">张设计稿 · {versions.length} 个版本</span></div></div>
        <div className="relative mt-5 flex flex-wrap items-center gap-2 text-[10px] text-[#eee4ff]">
          {(activeProject?.tags ?? ['UI DESIGN', 'SELECTED WORK']).map(tag => <span key={tag} className="rounded-full bg-white/10 px-3 py-1.5">{tag}</span>)}
          {activeProject?.url && <a href={activeProject.url} target="_blank" rel="noreferrer" className="ml-auto rounded-full border border-white/30 bg-white px-4 py-2 font-semibold text-[#4d219c] transition-colors hover:bg-[#ffdc39] max-[640px]:ml-0">访问线上项目 ↗</a>}
        </div>
      </div>
      <div className="mb-4 flex flex-wrap gap-2" aria-label="按业务筛选">
        {[['all', '全部业务'], ...categories].map(([value, label]) => <button key={value} type="button" onClick={() => setCategory(value)} aria-pressed={category === value} className={`${chip} ${category === value ? 'border-[#5d2bc0] bg-[#eee6ff] text-[#5122a5]' : 'border-line bg-white hover:border-[#a78acb]'}`}>{label}<span className="ml-1.5 opacity-60">{scopedImages.filter(image => (value === 'all' || image.category === value) && (version === 'all' || image.version === version)).length}</span></button>)}
      </div>
      <div className="mb-6 flex flex-wrap items-center gap-2 border-b border-line pb-5 text-xs" aria-label="按设计版本筛选">
        <span className="mr-2 text-muted">设计版本</span>{[['all', '全部版本'], ...versions].map(([value, label]) => <button key={value} type="button" onClick={() => setVersion(value)} aria-pressed={version === value} className={`rounded-md px-3 py-2 ${version === value ? 'bg-[#ffe680] text-[#523b00]' : 'text-muted hover:bg-[#eee6ff]'}`}>{label}</button>)}
        <span role="status" className="ml-auto text-muted">共 {filtered.length} 张 · 点击查看完整长图</span>
      </div>
      {filtered.length ? <div className="columns-1 gap-4 min-[520px]:columns-2 min-[900px]:columns-3 min-[1400px]:columns-4 min-[1900px]:columns-5 min-[2400px]:columns-6 sm:gap-5">
        {filtered.map((image, index) => <button key={image.id} type="button" onClick={event => { lastTrigger.current = event.currentTarget; setSelected(image); }} className="group mb-5 block w-full break-inside-avoid overflow-hidden rounded-xl border border-[#e3d9ee] bg-white text-left shadow-sm transition-shadow hover:shadow-lg focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-[#7344df]" aria-label={`查看完整设计图：${image.projectName} ${image.title}，${image.versionLabel}`}>
          <div className="relative overflow-hidden bg-[#f1edf8]" style={{ height: Math.round(Math.max(210, Math.min(610, 290 * image.height / image.width))) }}>
            <img src={asset(image.thumbnail)} alt={`${image.projectName} ${image.versionLabel}：${image.title}`} width={image.width} height={image.height} loading={index < 3 ? 'eager' : 'lazy'} decoding="async" className="h-full w-full object-cover object-top" />
            <span className="absolute right-3 bottom-3 rounded-full bg-[#3e147f]/90 px-3 py-1.5 text-[10px] text-white">查看整图 ↗</span>
          </div>
          <div className="p-4"><div className="mb-2 flex items-center justify-between gap-2 text-[10px]"><span className="text-[#7955b0]">{image.projectName} · {image.categoryLabel}</span><span className="rounded bg-[#fff2ba] px-2 py-1 text-[#705610]">{image.versionLabel}</span></div><h3 className="m-0 text-sm leading-6 group-hover:text-[#6435b7]">{image.title}</h3></div>
        </button>)}
      </div> : <div className="rounded-xl border border-dashed border-[#bfa8dc] px-6 py-16 text-center"><p className="text-sm text-muted">这个业务在当前版本下暂无设计图。</p><button type="button" className="mt-4 text-sm text-[#6435b7] underline" onClick={() => { setCategory('all'); setVersion('all'); }}>查看全部作品</button></div>}
      <dialog ref={dialog} aria-labelledby="preview-title" onCancel={event => { event.preventDefault(); setSelected(null); }} onClose={() => setSelected(null)} onKeyDown={event => { if (event.key === 'ArrowLeft') { event.preventDefault(); move(-1); } if (event.key === 'ArrowRight') { event.preventDefault(); move(1); } }} className="fixed inset-0 m-auto h-[94dvh] max-h-none w-[96vw] max-w-[1440px] overflow-hidden rounded-xl border-0 bg-[#171022] p-0 text-white backdrop:bg-black/80">
        {selected && <div className="flex h-full flex-col"><div className="flex shrink-0 items-center justify-between gap-3 border-b border-white/10 px-4 py-3"><div className="min-w-0"><h2 id="preview-title" className="truncate text-sm">{selected.title}</h2><p className="mt-1 text-[10px] text-white/60">{selected.versionLabel} · {selected.width} × {selected.height} · {selectedIndex + 1} / {filtered.length}</p></div><div className="flex shrink-0 items-center gap-2"><a href={asset(selected.src)} target="_blank" rel="noreferrer" className="hidden rounded bg-white/10 px-3 py-2 text-xs sm:block">打开原图 ↗</a><button ref={closeButton} type="button" onClick={() => setSelected(null)} className="rounded bg-white/15 px-3 py-2 text-xs" aria-label="关闭图片预览">关闭 ✕</button></div></div><div ref={scroller} className="min-h-0 flex-1 overflow-auto overscroll-contain p-3 sm:p-6"><img key={selected.id} src={asset(selected.src)} alt={`${selected.projectName} ${selected.title}完整设计图`} width={selected.width} height={selected.height} className="mx-auto block h-auto w-full max-w-[1200px]" /></div><div className="flex shrink-0 items-center justify-between gap-2 border-t border-white/10 px-4 py-3 text-xs"><button type="button" disabled={selectedIndex <= 0} onClick={() => move(-1)} className="rounded bg-white/10 px-4 py-2 disabled:opacity-30">← 上一张</button><span className="text-[10px] text-white/60">上下滚动查看整图 · Esc 关闭</span><button type="button" disabled={selectedIndex >= filtered.length - 1} onClick={() => move(1)} className="rounded bg-[#ffdc39] px-4 py-2 text-[#3e147f] disabled:opacity-30">下一张 →</button></div></div>}
      </dialog>
    </section>
  );
}
