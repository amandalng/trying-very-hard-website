"use client";
import { useState } from "react";
import Link from "next/link";

const Arr=()=><svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"><line x1="5" y1="12" x2="19" y2="12"/><polyline points="12 5 19 12 12 19"/></svg>;

const SectionLabel=({children})=>(
  <p className="c" style={{fontSize:12,fontWeight:700,letterSpacing:"0.15em",textTransform:"uppercase",color:"#F5ACC8",marginBottom:6}}>{children}</p>
);

export default function BlogClient({ posts = [], episodes = [] }) {
  const categories = ["All", ...new Set(posts.map(p => p.category))];
  const [activeCat, setActiveCat] = useState("All");
  const filtered = activeCat === "All" ? posts : posts.filter(p => p.category === activeCat);

  return (
    <div>
      <style>{`
        @media(max-width:768px){
          .blog-grid{grid-template-columns:1fr!important}
        }
      `}</style>

      {/* Hero */}
      <section style={{background:"#1a1a1a",padding:"clamp(40px,6vh,60px) clamp(20px,5vw,80px)"}}>
        <div style={{maxWidth:1200,margin:"0 auto"}}>
          <SectionLabel>Episode Recaps & Reflections</SectionLabel>
          <h1 className="c" style={{fontWeight:700,fontSize:"clamp(28px,5vw,48px)",lineHeight:1.1,color:"#FFF0DD",textTransform:"uppercase"}}>The TVH Journal</h1>
          <p className="c" style={{fontSize:"clamp(14px,1.5vw,16px)",color:"rgba(255,240,221,0.55)",marginTop:16,maxWidth:520,lineHeight:1.7}}>
            Deeper dives, personal reflections, and the stuff that didn't fit in 45 minutes. Written with the same energy we bring to the mic.
          </p>
        </div>
      </section>

      {/* Filters + Grid */}
      <section style={{background:"#FFF0DD",padding:"clamp(32px,5vh,48px) clamp(20px,5vw,80px) clamp(48px,8vh,80px)"}}>
        <div style={{maxWidth:1200,margin:"0 auto"}}>
          <div style={{display:"flex",gap:8,marginBottom:40,flexWrap:"wrap"}}>
            {categories.map(cat=>(
              <button key={cat} onClick={()=>setActiveCat(cat)} className="c" style={{
                padding:"10px 20px",borderRadius:40,border:"none",cursor:"pointer",
                fontWeight:700,fontSize:13,letterSpacing:"0.06em",textTransform:"uppercase",
                background:activeCat===cat?"#1a1a1a":"#fff",
                color:activeCat===cat?"#FFF0DD":"#1a1a1a",
                transition:"all 0.2s",
              }}>{cat}</button>
            ))}
          </div>

          <div className="blog-grid" style={{display:"grid",gridTemplateColumns:"repeat(auto-fill, minmax(320px, 1fr))",gap:20}}>
            {filtered.map((post,i)=>{
              const barColor = post.type === "guest" ? "#FFD200" : "#F5ACC8";
              return (
                <Link key={post.slug} href={`/blog/${post.slug}`} style={{textDecoration:"none",color:"inherit",display:"block"}}>
                  <div style={{background:"#fff",borderRadius:20,overflow:"hidden",transition:"all 0.3s"}}
                    onMouseEnter={e=>{e.currentTarget.style.transform="translateY(-4px)";e.currentTarget.style.boxShadow="0 12px 40px rgba(0,0,0,0.06)"}}
                    onMouseLeave={e=>{e.currentTarget.style.transform="none";e.currentTarget.style.boxShadow="none"}}>
                    <div style={{height:6,background:barColor}}/>
                    <div style={{padding:"24px 28px"}}>
                      <div style={{display:"flex",alignItems:"center",gap:8,marginBottom:12}}>
                        {i===0&&activeCat==="All"&&<span className="c" style={{display:"inline-block",padding:"3px 10px",borderRadius:16,fontSize:10,fontWeight:700,letterSpacing:"0.06em",textTransform:"uppercase",background:"#1a1a1a",color:"#FFF0DD"}}>Latest</span>}
                        <span className="c" style={{display:"inline-block",padding:"3px 10px",borderRadius:16,fontSize:10,fontWeight:700,letterSpacing:"0.06em",textTransform:"uppercase",background:barColor,color:"#1a1a1a"}}>{post.type==="monanda"?"Monanda":(post.guest||post.category)}</span>
                        <span className="c" style={{fontSize:11,color:"#bbb",fontWeight:700,marginLeft:"auto"}}>{post.date}</span>
                      </div>
                      <h3 className="c" style={{fontWeight:700,fontSize:17,lineHeight:1.4,marginBottom:10}}>{post.title}</h3>
                      <p className="c" style={{fontSize:13,lineHeight:1.55,color:"#888",display:"-webkit-box",WebkitLineClamp:3,WebkitBoxOrient:"vertical",overflow:"hidden"}}>{post.excerpt}</p>
                      <p className="c" style={{fontSize:12,fontWeight:700,color:"#F5ACC8",textTransform:"uppercase",letterSpacing:"0.06em",marginTop:16,display:"flex",alignItems:"center",gap:6}}>Read More <Arr/></p>
                    </div>
                  </div>
                </Link>
              );
            })}
          </div>
        </div>
      </section>
    </div>
  );
}
