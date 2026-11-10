import ProjectGallery from "./ProjectGallery";

const principles = [
  {
    id: "clarity",
    number: "01",
    tag: "清晰的表达",
    title: "让信息更容易被理解",
    text: "通过有序的布局、明确的层级与恰当的留白，让用户自然找到重点，让每一次浏览都更轻松。",
  },
  {
    id: "details",
    number: "02",
    tag: "细腻的视觉",
    title: "在细节里，建立舒适的感受",
    text: "关注色彩、字体与间距之间的关系，让视觉语言保持一致，也让界面拥有自己的气质。",
  },
  {
    id: "experience",
    number: "03",
    tag: "以体验为出发点",
    title: "好看之外，也要好用",
    text: "从用户的实际需求出发，思考每一个操作与反馈，让设计帮助人们更顺畅地完成目标。",
  },
];

export default function Home() {
  return (
    <main className="w-full px-[clamp(18px,3vw,72px)]">
      <header className="flex flex-wrap items-center justify-between gap-5 border-b border-line py-[30px] max-[620px]:items-start">
        <a
          className="text-[22px] font-extrabold tracking-[2px] max-[761px]:text-xl [&_span]:mt-1.5 [&_span]:block [&_span]:text-[9px] [&_span]:font-normal [&_span]:tracking-[3px] max-[761px]:[&_span]:text-[7px] max-[761px]:[&_span]:tracking-[1px]"
          href="#"
        >
          田芳<span>TIAN FANG · UI DESIGNER</span>
        </a>
        <nav
          className="flex flex-wrap justify-end gap-x-[30px] gap-y-3 text-sm max-[761px]:gap-x-[15px] max-[761px]:text-xs max-[620px]:w-full max-[620px]:justify-start [&_a:hover]:underline"
          aria-label="主导航"
        >
          <a href="#work">作品</a>
          <a href="#approach">设计理念</a>
          <a href="#about">关于我</a>
          <a href="mailto:xhua0531@163.com">联系我</a>
        </nav>
      </header>
      <section className="relative overflow-hidden pt-[85px] pb-20 max-[761px]:py-[55px] [&>p]:text-sm [&>p]:leading-8 [&>p]:text-muted">
        <div className="flex items-center gap-[9px] text-xs tracking-[2px] [&>span]:size-[7px] [&>span]:rounded-full [&>span]:bg-[#79965b]">
          <span /> UI 设计师 · 5 年设计经验
        </div>
        <h1 className="my-6 text-[clamp(32px,4.3vw,48px)] font-bold leading-[1.4] tracking-[-2px]">
          你好，我是田芳。
          <br />
          用设计，让体验
          <span className="bg-[linear-gradient(transparent_58%,#dce9a4_58%,#dce9a4_90%,transparent_90%)]">
            更美好。
          </span>
        </h1>
        <p>
          专注界面里的秩序、美感与细节。
          <br />
          希望用清晰的视觉表达，让每一次交互都自然、舒适。
        </p>
        <a
          className="mt-[22px] inline-flex items-center gap-[35px] rounded bg-ink px-[22px] py-4 text-[13px] text-white hover:bg-[#3e594b]"
          href="#about"
        >
          认识一下我 <span>↗</span>
        </a>
        <div
          className="absolute right-0 top-[100px] h-80 w-[290px] overflow-hidden rounded-t-[150px] rounded-b-lg bg-[#e9eddf] max-[761px]:relative max-[761px]:top-auto max-[761px]:right-auto max-[761px]:mt-[35px] max-[761px]:h-[180px] max-[761px]:w-full max-[761px]:rounded-lg"
          aria-hidden="true"
        >
          <div className="absolute top-[55px] left-[105px] size-[84px] rounded-full bg-[#e8bc72] max-[761px]:top-[25px] max-[761px]:left-[65%]" />
          <div className="absolute top-[174px] left-[-100px] h-[230px] w-[360px] rotate-[-23deg] rounded-[50%] bg-[#adc0a0] max-[761px]:top-[75px] max-[761px]:w-full" />
          <div className="absolute top-[215px] left-[50px] h-[230px] w-[360px] rotate-20 rounded-[50%] bg-[#6b8970] max-[761px]:top-[115px] max-[761px]:left-[30%] max-[761px]:w-full" />
          <span className="absolute bottom-[25px] left-7 text-[10px] tracking-[3px] text-white">
            DESIGN WITH CARE.
          </span>
        </div>
      </section>
      <ProjectGallery />
      <section id="approach">
        <div className="flex items-center justify-between border-b border-line pb-[22px] [&>span]:text-[11px] [&>span]:text-muted max-[761px]:[&>span]:text-[10px]">
          <h2>我理解的设计</h2>
          <span>DESIGN APPROACH</span>
        </div>
        {principles.map((item) => (
          <article
            className="grid scroll-mt-5 grid-cols-[65px_1fr_30px] gap-5 border-b border-line py-8 max-[761px]:grid-cols-[30px_1fr] max-[761px]:gap-[15px] [&_p]:m-0 [&_p]:max-w-[680px] [&_p]:text-[13px] [&_p]:leading-[1.9] [&_p]:text-muted"
            key={item.id}
            id={item.id}
          >
            <div className="pt-1 font-serif text-[28px] text-[#9ba493]">
              {item.number}
            </div>
            <div>
              <span className="rounded-[3px] bg-[#e7eddd] px-2 py-[5px] text-[10px] text-[#5c7358]">
                {item.tag}
              </span>
              <h3>{item.title}</h3>
              <p>{item.text}</p>
            </div>
            <span
              className="pt-[30px] text-[23px] max-[761px]:hidden"
              aria-hidden="true"
            >
              ↗
            </span>
          </article>
        ))}
      </section>
      <section
        id="about"
        className="my-[55px] flex items-center gap-[25px] rounded-md bg-[#eceee4] p-[30px] max-[761px]:items-start max-[761px]:gap-4 max-[761px]:p-[22px] [&_h2]:text-[17px] [&_p]:my-[13px] [&_p]:text-[13px] [&_p]:leading-[1.8] [&_p]:text-[#687566]"
      >
        <span
          className="text-[48px] text-[#718361] max-[761px]:mt-1 max-[761px]:text-4xl"
          aria-hidden="true"
        >
          ✳
        </span>
        <div>
          <h2>关于田芳</h2>
          <div className="mt-4 flex flex-wrap gap-2 [&>span]:rounded-full [&>span]:border [&>span]:border-[#cbd3c1] [&>span]:px-2.5 [&>span]:py-[5px] [&>span]:text-[11px] [&>span]:text-[#596d55]">
            <span>UI 设计师</span>
            <span>5 年设计经验</span>
            <span>2000.05.31</span>
          </div>
          <p>
            我是田芳，一名拥有 5 年设计经验的 UI
            设计师。喜欢观察日常生活中的色彩、形状与秩序，也希望把这些细微的感受带进界面设计。
          </p>
          <p>
            对我来说，设计是在美感与实用之间寻找恰好的平衡。愿每一个认真打磨的细节，都能让使用产品的人多一份轻松。
          </p>
          <a
            className="mt-4 inline-flex items-center gap-3 rounded-full border border-[#aebba3] bg-white/60 px-4 py-2 text-xs text-[#3f5947] transition-colors hover:border-[#718361] hover:bg-white"
            href="mailto:xhua0531@163.com"
          >
            <span aria-hidden="true">✉</span>
            xhua0531@163.com
          </a>
        </div>
      </section>
      <footer className="flex flex-wrap justify-between gap-3 border-t border-line pt-[25px] pb-[35px] text-[11px] text-muted">
        <span>© 田芳 · 个人设计作品集</span>
        <span>认真设计，也认真感受生活。</span>
      </footer>
    </main>
  );
}
