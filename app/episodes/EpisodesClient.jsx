"use client";
import { useState } from "react";
import Link from "next/link";

// ─── ICONS (matching HomeClient) ────────────────────────────
const PlayIcon=()=><svg width="16" height="16" viewBox="0 0 24 24" fill="currentColor"><polygon points="5,3 19,12 5,21"/></svg>;
const YT=({s=16})=><svg width={s} height={s} viewBox="0 0 24 24" fill="currentColor"><path d="M23.5 6.19a3.02 3.02 0 00-2.12-2.14C19.5 3.5 12 3.5 12 3.5s-7.5 0-9.38.55A3.02 3.02 0 00.5 6.19 31.6 31.6 0 000 12c0 1.97.17 3.92.5 5.81a3.02 3.02 0 002.12 2.14c1.88.55 9.38.55 9.38.55s7.5 0 9.38-.55a3.02 3.02 0 002.12-2.14c.33-1.89.5-3.84.5-5.81s-.17-3.92-.5-5.81zM9.75 15.02V8.98L15.5 12l-5.75 3.02z"/></svg>;
const SP=({s=16})=><svg width={s} height={s} viewBox="0 0 24 24" fill="currentColor"><path d="M12 0C5.4 0 0 5.4 0 12s5.4 12 12 12 12-5.4 12-12S18.66 0 12 0zm5.521 17.34c-.24.359-.66.48-1.021.24-2.82-1.74-6.36-2.101-10.561-1.141-.418.122-.779-.179-.899-.539-.12-.421.18-.78.54-.9 4.56-1.021 8.52-.6 11.64 1.32.42.18.479.659.301 1.02zm1.44-3.3c-.301.42-.841.6-1.262.3-3.239-1.98-8.159-2.58-11.939-1.38-.479.12-1.02-.12-1.14-.6-.12-.48.12-1.021.6-1.141C9.6 9.9 15 10.561 18.72 12.84c.361.181.54.78.241 1.2zm.12-3.36C15.24 8.4 8.82 8.16 5.16 9.301c-.6.179-1.2-.181-1.38-.721-.18-.601.18-1.2.72-1.381 4.26-1.26 11.28-1.02 15.721 1.621.539.3.719 1.02.419 1.56-.299.421-1.02.599-1.559.3z"/></svg>;
const AP=({s=16})=><svg width={s} height={s} viewBox="0 0 24 24" fill="currentColor"><path d="M18.71 19.5c-.83 1.24-1.71 2.45-3.05 2.47-1.34.03-1.77-.79-3.29-.79-1.53 0-2 .77-3.27.82-1.31.05-2.3-1.32-3.14-2.53C4.25 17 2.94 12.45 4.7 9.39c.87-1.52 2.43-2.48 4.12-2.51 1.28-.02 2.5.87 3.29.87.78 0 2.26-1.07 3.8-.91.65.03 2.47.26 3.64 1.98-.09.06-2.17 1.28-2.15 3.81.03 3.02 2.65 4.03 2.68 4.04-.03.07-.42 1.44-1.38 2.83M13 3.5c.73-.83 1.94-1.46 2.94-1.5.13 1.17-.34 2.35-1.04 3.19-.69.85-1.83 1.51-2.95 1.42-.15-1.15.41-2.35 1.05-3.11z"/></svg>;
const Arr=()=><svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"><line x1="5" y1="12" x2="19" y2="12"/><polyline points="12 5 19 12 12 19"/></svg>;

const LK = { youtube:"https://www.youtube.com/@TryingVeryHardPod", spotify:"https://open.spotify.com/show/4kQL0nJmPhv38D8io58eMX", apple:"https://podcasts.apple.com/sg/podcast/trying-very-hard-the-podcast/id1878052269" };

const PlatformIcons=({size=36,iconSize=16,links})=>(
  <div style={{display:"flex",gap:size>40?16:8}}>
    <a href={links.youtube||LK.youtube} target="_blank" rel="noopener noreferrer" style={{width:size,height:size,borderRadius:"50%",background:"#FF0000",display:"flex",alignItems:"center",justifyContent:"center",color:"#fff",textDecoration:"none",transition:"transform 0.2s"}}
    onMouseEnter={e=>e.currentTarget.style.transform="scale(1.1)"} onMouseLeave={e=>e.currentTarget.style.transform="scale(1)"}><YT s={iconSize}/></a>
    <a href={links.spotify||LK.spotify} target="_blank" rel="noopener noreferrer" style={{width:size,height:size,borderRadius:"50%",background:"#1DB954",display:"flex",alignItems:"center",justifyContent:"center",color:"#fff",textDecoration:"none",transition:"transform 0.2s"}}
    onMouseEnter={e=>e.currentTarget.style.transform="scale(1.1)"} onMouseLeave={e=>e.currentTarget.style.transform="scale(1)"}><SP s={iconSize}/></a>
    <a href={links.apple||LK.apple} target="_blank" rel="noopener noreferrer" style={{width:size,height:size,borderRadius:"50%",background:"#1a1a1a",display:"flex",alignItems:"center",justifyContent:"center",color:"#FFF0DD",textDecoration:"none",transition:"transform 0.2s"}}
    onMouseEnter={e=>e.currentTarget.style.transform="scale(1.1)"} onMouseLeave={e=>e.currentTarget.style.transform="scale(1)"}><AP s={iconSize}/></a>
  </div>
);

const SectionLabel=({children})=>(
  <p className="c" style={{fontSize:12,fontWeight:700,letterSpacing:"0.15em",textTransform:"uppercase",color:"#F5ACC8",marginBottom:6}}>{children}</p>
);

export default function EpisodesClient({ episodes = [] }) {
  const [filter, setFilter] = useState("all");
  const filtered = filter === "all" ? episodes : episodes.filter(e => e.type === filter);

  return (
    <div>
      <style>{`
        .ep-row{transition:all 0.3s}
        .ep-row:hover{transform:translateY(-3px);box-shadow:0 8px 32px rgba(0,0,0,0.06)}
        @media(max-width:768px){
          .ep-row{flex-direction:column!important;padding:16px!important;gap:16px!important;overflow:hidden!important}
          .ep-thumb{width:100%!important}
          .ep-row h3{font-size:16px!important}
          .ep-row p{font-size:13px!important}
          .ep-bottom{flex-direction:column!important;align-items:flex-start!important;gap:12px!important}
          .filter-row{flex-wrap:wrap!important}
        }
      `}</style>

      {/* Hero banner */}
      <section style={{background:"#1a1a1a",padding:"clamp(40px,6vh,60px) clamp(20px,5vw,80px)"}}>
        <div style={{maxWidth:1200,margin:"0 auto"}}>
          <SectionLabel>Trying Very Hard: The Podcast</SectionLabel>
          <h1 className="c" style={{fontWeight:700,fontSize:"clamp(28px,5vw,48px)",lineHeight:1.1,color:"#FFF0DD",maxWidth:600,textTransform:"uppercase"}}>All Episodes</h1>
          <p className="c" style={{fontSize:"clamp(14px,1.5vw,16px)",color:"rgba(255,240,221,0.55)",marginTop:16,maxWidth:520,lineHeight:1.7}}>
            Honest yaps about ambition, identity, adulthood, and the messy beauty of caring deeply. New episodes every Tuesday.
          </p>
        </div>
      </section>

      {/* Filters + Episodes */}
      <section style={{background:"#FFF0DD",padding:"clamp(32px,5vh,48px) clamp(20px,5vw,80px) clamp(48px,8vh,80px)"}}>
        <div style={{maxWidth:1200,margin:"0 auto"}}>
          <div className="filter-row" style={{display:"flex",gap:8,marginBottom:40,flexWrap:"wrap"}}>
            {[{label:"All Episodes",value:"all"},{label:"Monanda",value:"monanda"},{label:"Guest Episodes",value:"guest"}].map(({label,value})=>(
              <button key={value} onClick={()=>setFilter(value)} className="c" style={{
                padding:"10px 20px",borderRadius:40,border:"none",cursor:"pointer",
                fontWeight:700,fontSize:13,letterSpacing:"0.06em",textTransform:"uppercase",
                background:filter===value?"#1a1a1a":"#fff",
                color:filter===value?"#FFF0DD":"#1a1a1a",
                transition:"all 0.2s",
              }}>{label}</button>
            ))}
          </div>

          <div style={{display:"flex",flexDirection:"column",gap:16}}>
            {filtered.map((ep,i)=>(
              <Link key={ep.slug} href={`/episodes/${ep.slug}`} style={{textDecoration:"none",color:"inherit"}}>
                <div className="ep-row" style={{background:"#fff",borderRadius:20,padding:"clamp(24px,3vw,36px)",display:"flex",gap:28,alignItems:"flex-start"}}>
                  <div className="ep-thumb" style={{flexShrink:0,width:"clamp(180px,24vw,320px)",aspectRatio:"16/9",borderRadius:16,overflow:"hidden",
                    background:ep.thumbnail?`url(${ep.thumbnail}) center/cover no-repeat`:(ep.type==="guest"?"linear-gradient(135deg,#FFD200 0%,#ffe066 100%)":"linear-gradient(135deg,#F5ACC8 0%,#f8c8da 100%)"),
                    display:"flex",alignItems:"center",justifyContent:"center"}}>
                    {!ep.thumbnail&&<div style={{width:48,height:48,borderRadius:"50%",background:"#FFD200",display:"flex",alignItems:"center",justifyContent:"center"}}><PlayIcon/></div>}
                  </div>
                  <div style={{flex:1,minWidth:0}}>
                    <div style={{display:"flex",alignItems:"center",gap:8,marginBottom:10,flexWrap:"wrap"}}>
                      {i===0&&filter==="all"&&<span className="c" style={{display:"inline-block",padding:"4px 12px",borderRadius:20,fontSize:11,fontWeight:700,letterSpacing:"0.06em",textTransform:"uppercase",background:"#1a1a1a",color:"#FFF0DD"}}>Latest</span>}
                      <span className="c" style={{display:"inline-block",padding:"4px 12px",borderRadius:20,fontSize:11,fontWeight:700,letterSpacing:"0.06em",textTransform:"uppercase",background:ep.type==="monanda"?"#F5ACC8":"#FFD200",color:"#1a1a1a"}}>{ep.type==="monanda"?"Monanda":ep.guest}</span>
                    </div>
                    <h3 className="c" style={{fontWeight:700,fontSize:"clamp(16px,2.2vw,24px)",lineHeight:1.25,textTransform:"uppercase",marginBottom:10}}>{ep.title}</h3>
                    <p className="c" style={{fontSize:14,lineHeight:1.6,color:"#777",marginBottom:20}}>{ep.description}</p>
                    <div className="ep-bottom" style={{display:"flex",alignItems:"center",justifyContent:"space-between",flexWrap:"wrap",gap:16}}>
                      <span className="c" style={{display:"flex",alignItems:"center",gap:8,fontSize:13,fontWeight:700,textTransform:"uppercase",letterSpacing:"0.06em",color:"#F5ACC8"}}>Listen Now <Arr/></span>
                      <div onClick={e=>e.preventDefault()}>
                        <PlatformIcons size={36} iconSize={16} links={{youtube:ep.youtube,spotify:ep.spotify,apple:ep.apple}}/>
                      </div>
                    </div>
                    <p className="c" style={{fontSize:12,color:"#bbb",marginTop:10}}>{ep.date} · {ep.duration}</p>
                  </div>
                </div>
              </Link>
            ))}
          </div>
        </div>
      </section>

      {/* Subscribe CTA */}
      <section style={{background:"#1a1a1a",padding:"clamp(40px,5vh,56px) clamp(24px,5vw,80px)"}}>
        <div style={{maxWidth:700,margin:"0 auto",textAlign:"center"}}>
          <p className="c" style={{fontSize:"clamp(18px,2.5vw,26px)",fontWeight:700,textTransform:"uppercase",color:"#FFF0DD",marginBottom:20}}>Like what you hear?</p>
          <div style={{display:"flex",gap:16,justifyContent:"center"}}>
            <a href={LK.youtube} target="_blank" rel="noopener noreferrer" style={{width:48,height:48,borderRadius:"50%",background:"#FF0000",display:"flex",alignItems:"center",justifyContent:"center",color:"#fff",textDecoration:"none",transition:"transform 0.2s"}}
              onMouseEnter={e=>e.currentTarget.style.transform="scale(1.1)"} onMouseLeave={e=>e.currentTarget.style.transform="scale(1)"}><YT s={20}/></a>
            <a href={LK.spotify} target="_blank" rel="noopener noreferrer" style={{width:48,height:48,borderRadius:"50%",background:"#1DB954",display:"flex",alignItems:"center",justifyContent:"center",color:"#fff",textDecoration:"none",transition:"transform 0.2s"}}
              onMouseEnter={e=>e.currentTarget.style.transform="scale(1.1)"} onMouseLeave={e=>e.currentTarget.style.transform="scale(1)"}><SP s={20}/></a>
            <a href={LK.apple} target="_blank" rel="noopener noreferrer" style={{width:48,height:48,borderRadius:"50%",background:"#fff",display:"flex",alignItems:"center",justifyContent:"center",color:"#1a1a1a",textDecoration:"none",transition:"transform 0.2s"}}
              onMouseEnter={e=>e.currentTarget.style.transform="scale(1.1)"} onMouseLeave={e=>e.currentTarget.style.transform="scale(1)"}><AP s={20}/></a>
          </div>
          <p className="c" style={{fontSize:13,color:"rgba(255,240,221,0.4)",marginTop:14}}>Follow us wherever you listen.</p>
        </div>
      </section>
    </div>
  );
}
