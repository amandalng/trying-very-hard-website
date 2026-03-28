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

      {/* Episode context */}
      {episode && (
        <div style={{maxWidth:720,margin:"0 auto",padding:"28px clamp(20px,5vw,40px) 36px"}}>
          <p className="c" style={{fontSize:14,color:"#aaa",marginBottom:20,lineHeight:1.6,fontStyle:"italic"}}>
            This post picks up where the episode leaves off. If you haven't listened yet, here's your chance — we'll wait.
          </p>
          <div style={{display:"flex",gap:8}}>
            <a href={episode.youtube} target="_blank" rel="noopener noreferrer" style={{width:40,height:40,borderRadius:"50%",background:"#FF0000",display:"flex",alignItems:"center",justifyContent:"center",color:"#fff",textDecoration:"none",transition:"transform 0.2s"}}
              onMouseEnter={e=>e.currentTarget.style.transform="scale(1.1)"} onMouseLeave={e=>e.currentTarget.style.transform="scale(1)"}><svg width="16" height="16" viewBox="0 0 24 24" fill="currentColor"><path d="M23.5 6.19a3.02 3.02 0 00-2.12-2.14C19.5 3.5 12 3.5 12 3.5s-7.5 0-9.38.55A3.02 3.02 0 00.5 6.19 31.6 31.6 0 000 12c0 1.97.17 3.92.5 5.81a3.02 3.02 0 002.12 2.14c1.88.55 9.38.55 9.38.55s7.5 0 9.38-.55a3.02 3.02 0 002.12-2.14c.33-1.89.5-3.84.5-5.81s-.17-3.92-.5-5.81zM9.75 15.02V8.98L15.5 12l-5.75 3.02z"/></svg></a>
            <a href={episode.spotify} target="_blank" rel="noopener noreferrer" style={{width:40,height:40,borderRadius:"50%",background:"#1DB954",display:"flex",alignItems:"center",justifyContent:"center",color:"#fff",textDecoration:"none",transition:"transform 0.2s"}}
              onMouseEnter={e=>e.currentTarget.style.transform="scale(1.1)"} onMouseLeave={e=>e.currentTarget.style.transform="scale(1)"}><svg width="16" height="16" viewBox="0 0 24 24" fill="currentColor"><path d="M12 0C5.4 0 0 5.4 0 12s5.4 12 12 12 12-5.4 12-12S18.66 0 12 0zm5.521 17.34c-.24.359-.66.48-1.021.24-2.82-1.74-6.36-2.101-10.561-1.141-.418.122-.779-.179-.899-.539-.12-.421.18-.78.54-.9 4.56-1.021 8.52-.6 11.64 1.32.42.18.479.659.301 1.02zm1.44-3.3c-.301.42-.841.6-1.262.3-3.239-1.98-8.159-2.58-11.939-1.38-.479.12-1.02-.12-1.14-.6-.12-.48.12-1.021.6-1.141C9.6 9.9 15 10.561 18.72 12.84c.361.181.54.78.241 1.2zm.12-3.36C15.24 8.4 8.82 8.16 5.16 9.301c-.6.179-1.2-.181-1.38-.721-.18-.601.18-1.2.72-1.381 4.26-1.26 11.28-1.02 15.721 1.621.539.3.719 1.02.419 1.56-.299.421-1.02.599-1.559.3z"/></svg></a>
            <a href={episode.apple} target="_blank" rel="noopener noreferrer" style={{width:40,height:40,borderRadius:"50%",background:"#1a1a1a",display:"flex",alignItems:"center",justifyContent:"center",color:"#FFF0DD",textDecoration:"none",transition:"transform 0.2s"}}
              onMouseEnter={e=>e.currentTarget.style.transform="scale(1.1)"} onMouseLeave={e=>e.currentTarget.style.transform="scale(1)"}><svg width="16" height="16" viewBox="0 0 24 24" fill="currentColor"><path d="M18.71 19.5c-.83 1.24-1.71 2.45-3.05 2.47-1.34.03-1.77-.79-3.29-.79-1.53 0-2 .77-3.27.82-1.31.05-2.3-1.32-3.14-2.53C4.25 17 2.94 12.45 4.7 9.39c.87-1.52 2.43-2.48 4.12-2.51 1.28-.02 2.5.87 3.29.87.78 0 2.26-1.07 3.8-.91.65.03 2.47.26 3.64 1.98-.09.06-2.17 1.28-2.15 3.81.03 3.02 2.65 4.03 2.68 4.04-.03.07-.42 1.44-1.38 2.83M13 3.5c.73-.83 1.94-1.46 2.94-1.5.13 1.17-.34 2.35-1.04 3.19-.69.85-1.83 1.51-2.95 1.42-.15-1.15.41-2.35 1.05-3.11z"/></svg></a>
          </div>
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
