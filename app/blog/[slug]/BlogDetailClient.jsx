"use client";
import Link from "next/link";

const BackArr=()=><svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><line x1="19" y1="12" x2="5" y2="12"/><polyline points="12 19 5 12 12 5"/></svg>;
const BookIcon=()=><svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M4 19.5A2.5 2.5 0 016.5 17H20"/><path d="M6.5 2H20v20H6.5A2.5 2.5 0 014 19.5v-15A2.5 2.5 0 016.5 2z"/></svg>;

const SectionLabel=({children})=>(
  <p className="c" style={{fontSize:12,fontWeight:700,letterSpacing:"0.15em",textTransform:"uppercase",color:"#F5ACC8",marginBottom:6}}>{children}</p>
);

export default function BlogDetailClient({ post, episode }) {
  if (!post) return null;
  const paragraphs = (post.body || '').split("\n\n");

  return (
    <div style={{background:"#fff"}}>
      <style>{`
        @media(max-width:768px){
          .blog-body h2{font-size:1.1rem!important}
          .blog-body p{font-size:0.92rem!important}
        }
      `}</style>

      {/* Back */}
      <div style={{maxWidth:720,margin:"0 auto",padding:"24px clamp(20px,5vw,40px) 0"}}>
        <Link href="/blog" className="c" style={{display:"flex",alignItems:"center",gap:6,fontSize:13,color:"#aaa",textDecoration:"none",fontWeight:700,textTransform:"uppercase",letterSpacing:"0.06em",transition:"color 0.2s"}}
          onMouseEnter={e=>e.currentTarget.style.color="#1a1a1a"} onMouseLeave={e=>e.currentTarget.style.color="#aaa"}>
          <BackArr/> The TVH Journal
        </Link>
      </div>

      {/* Header */}
      <div style={{maxWidth:720,margin:"0 auto",padding:"32px clamp(20px,5vw,40px) 0"}}>
        <div style={{display:"flex",alignItems:"center",gap:10,marginBottom:16}}>
          <span style={{padding:"4px 12px",borderRadius:40,background:"#FFD200",color:"#1a1a1a",fontSize:11,fontWeight:700,letterSpacing:"0.04em",textTransform:"uppercase"}}>{post.category}</span>
          <span className="c" style={{fontSize:13,color:"#aaa"}}>{post.date}</span>
          <span className="c" style={{display:"flex",alignItems:"center",gap:4,fontSize:13,color:"#aaa"}}><BookIcon/> {post.readTime}</span>
        </div>
        <h1 className="c" style={{fontWeight:700,fontSize:"clamp(24px,4vw,36px)",lineHeight:1.25,marginBottom:12,textTransform:"uppercase"}}>{post.title}</h1>
        <p className="c" style={{fontSize:"clamp(14px,1.5vw,16px)",color:"#888",lineHeight:1.7,marginBottom:8}}>{post.excerpt}</p>
        <div style={{display:"flex",alignItems:"center",gap:8,marginTop:16,marginBottom:8}}>
          <span className="c" style={{fontSize:13,color:"#aaa"}}>By Amanda & Monica</span>
        </div>
      </div>

      {/* Spotify player */}
      {episode && (
        <div style={{maxWidth:720,margin:"0 auto",padding:"28px clamp(20px,5vw,40px) 36px"}}>
          <p className="c" style={{fontSize:14,color:"#aaa",marginBottom:16,lineHeight:1.6,fontStyle:"italic"}}>
            This post picks up where the episode leaves off. If you haven't listened yet, here's your chance — we'll wait.
          </p>
          <iframe style={{borderRadius:12,width:"100%",border:"none"}}
            src="https://open.spotify.com/embed/show/4kQL0nJmPhv38D8io58eMX?utm_source=generator&theme=0"
            height="152" allow="autoplay; clipboard-write; encrypted-media; fullscreen; picture-in-picture" loading="lazy"/>
        </div>
      )}

      {/* Body */}
      <article className="blog-body" style={{maxWidth:720,margin:"0 auto",padding:"16px clamp(20px,5vw,40px) 40px",overflowWrap:"break-word"}}>
        {paragraphs.map((para, i) => {
          if (para.startsWith("**") && para.endsWith("**")) {
            return <h2 key={i} className="c" style={{fontSize:"clamp(1.1rem,2.5vw,1.3rem)",fontWeight:700,color:"#1a1a1a",marginTop:36,marginBottom:12,lineHeight:1.35}}>{para.replace(/\*\*/g,"")}</h2>;
          }
          return <p key={i} className="c" style={{fontSize:"clamp(14px,1.5vw,16px)",lineHeight:1.85,color:"#555",marginBottom:20}}>{para}</p>;
        })}
      </article>

      {/* Back to journal */}
      <div style={{maxWidth:720,margin:"0 auto",padding:"20px clamp(20px,5vw,40px) 60px",textAlign:"center"}}>
        <Link href="/blog" className="cap cap-w" style={{display:"inline-flex"}}>← Back to Journal</Link>
      </div>
    </div>
  );
}
