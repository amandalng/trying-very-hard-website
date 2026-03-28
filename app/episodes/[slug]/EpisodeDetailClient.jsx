"use client";
import Link from "next/link";

const YT=({s=16})=><svg width={s} height={s} viewBox="0 0 24 24" fill="currentColor"><path d="M23.5 6.19a3.02 3.02 0 00-2.12-2.14C19.5 3.5 12 3.5 12 3.5s-7.5 0-9.38.55A3.02 3.02 0 00.5 6.19 31.6 31.6 0 000 12c0 1.97.17 3.92.5 5.81a3.02 3.02 0 002.12 2.14c1.88.55 9.38.55 9.38.55s7.5 0 9.38-.55a3.02 3.02 0 002.12-2.14c.33-1.89.5-3.84.5-5.81s-.17-3.92-.5-5.81zM9.75 15.02V8.98L15.5 12l-5.75 3.02z"/></svg>;
const SP=({s=16})=><svg width={s} height={s} viewBox="0 0 24 24" fill="currentColor"><path d="M12 0C5.4 0 0 5.4 0 12s5.4 12 12 12 12-5.4 12-12S18.66 0 12 0zm5.521 17.34c-.24.359-.66.48-1.021.24-2.82-1.74-6.36-2.101-10.561-1.141-.418.122-.779-.179-.899-.539-.12-.421.18-.78.54-.9 4.56-1.021 8.52-.6 11.64 1.32.42.18.479.659.301 1.02zm1.44-3.3c-.301.42-.841.6-1.262.3-3.239-1.98-8.159-2.58-11.939-1.38-.479.12-1.02-.12-1.14-.6-.12-.48.12-1.021.6-1.141C9.6 9.9 15 10.561 18.72 12.84c.361.181.54.78.241 1.2zm.12-3.36C15.24 8.4 8.82 8.16 5.16 9.301c-.6.179-1.2-.181-1.38-.721-.18-.601.18-1.2.72-1.381 4.26-1.26 11.28-1.02 15.721 1.621.539.3.719 1.02.419 1.56-.299.421-1.02.599-1.559.3z"/></svg>;
const AP=({s=16})=><svg width={s} height={s} viewBox="0 0 24 24" fill="currentColor"><path d="M18.71 19.5c-.83 1.24-1.71 2.45-3.05 2.47-1.34.03-1.77-.79-3.29-.79-1.53 0-2 .77-3.27.82-1.31.05-2.3-1.32-3.14-2.53C4.25 17 2.94 12.45 4.7 9.39c.87-1.52 2.43-2.48 4.12-2.51 1.28-.02 2.5.87 3.29.87.78 0 2.26-1.07 3.8-.91.65.03 2.47.26 3.64 1.98-.09.06-2.17 1.28-2.15 3.81.03 3.02 2.65 4.03 2.68 4.04-.03.07-.42 1.44-1.38 2.83M13 3.5c.73-.83 1.94-1.46 2.94-1.5.13 1.17-.34 2.35-1.04 3.19-.69.85-1.83 1.51-2.95 1.42-.15-1.15.41-2.35 1.05-3.11z"/></svg>;
const Arr=()=><svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"><line x1="5" y1="12" x2="19" y2="12"/><polyline points="12 5 19 12 12 19"/></svg>;
const BackArr=()=><svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><line x1="19" y1="12" x2="5" y2="12"/><polyline points="12 19 5 12 12 5"/></svg>;

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

// Generate tags from episode description keywords
function generateTags(episode) {
  if (episode.tags) return episode.tags;
  const keywords = ["mental health","therapy","stigma","friendship","ambition","success","career","identity","reading","BookTok","hobbies","music","creativity","vulnerability","adulthood","burnout","Asian","self-care","productivity"];
  const combined = ((episode.title||"")+" "+(episode.description||"")).toLowerCase();
  return keywords.filter(k => combined.includes(k.toLowerCase()));
}

// Generate discussed topics from description
function generateTopics(episode) {
  if (episode.discussedTopics) return episode.discussedTopics;
  return (episode.description||"").split(/[.!?]+/).filter(s=>s.trim().length>15).slice(0,6).map(s=>s.trim());
}

// Extract Spotify episode ID for episode-specific embed
function getSpotifyEmbedUrl(episode) {
  // If the episode has a specific Spotify link with episode ID, use it
  if (episode.spotify && episode.spotify.includes("/episode/")) {
    const match = episode.spotify.match(/\/episode\/([a-zA-Z0-9]+)/);
    if (match) return `https://open.spotify.com/embed/episode/${match[1]}?utm_source=generator&theme=0`;
  }
  // Fallback to show-level embed
  return `https://open.spotify.com/embed/show/4kQL0nJmPhv38D8io58eMX?utm_source=generator&theme=0`;
}

export default function EpisodeDetailClient({ episode, episodes = [] }) {
  const epIndex = episodes.findIndex(e => e.slug === episode.slug);
  const prevEp = epIndex < episodes.length - 1 ? episodes[epIndex + 1] : null;
  const nextEp = epIndex > 0 ? episodes[epIndex - 1] : null;
  const tags = generateTags(episode);
  const topics = generateTopics(episode);

  return (
    <div style={{background:"#fff"}}>
      <style>{`
        @media(max-width:768px){
          .prev-next{flex-direction:column!important;gap:20px!important}
          .prev-next a{max-width:100%!important;text-align:left!important;margin-left:0!important}
        }
      `}</style>

      {/* Back */}
      <div style={{maxWidth:800,margin:"0 auto",padding:"24px clamp(20px,5vw,40px) 0"}}>
        <Link href="/episodes" className="c" style={{display:"flex",alignItems:"center",gap:6,fontSize:13,color:"#aaa",textDecoration:"none",fontWeight:700,textTransform:"uppercase",letterSpacing:"0.06em",transition:"color 0.2s"}}>
          <BackArr/> All Episodes
        </Link>
      </div>

      {/* Header */}
      <div style={{maxWidth:800,margin:"0 auto",padding:"32px clamp(20px,5vw,40px) 0"}}>
        <div style={{display:"flex",alignItems:"center",gap:8,marginBottom:16,flexWrap:"wrap"}}>
          <span className="c" style={{display:"inline-block",padding:"4px 12px",borderRadius:20,fontSize:11,fontWeight:700,letterSpacing:"0.06em",textTransform:"uppercase",background:episode.type==="monanda"?"#F5ACC8":"#FFD200",color:"#1a1a1a"}}>{episode.type==="monanda"?"Monanda":episode.guest}</span>
          <span className="c" style={{fontSize:13,color:"#aaa"}}>{episode.duration}</span>
          <span className="c" style={{fontSize:13,color:"#aaa"}}>{episode.date}</span>
        </div>
        <h1 className="c" style={{fontWeight:700,fontSize:"clamp(24px,4vw,40px)",lineHeight:1.2,textTransform:"uppercase",marginBottom:20}}>{episode.title}</h1>
        <p className="c" style={{fontSize:"clamp(14px,1.5vw,16px)",color:"#666",lineHeight:1.8,marginBottom:24,overflowWrap:"break-word"}}>{episode.description}</p>

        {/* Tags */}
        {tags.length > 0 && (
          <div style={{display:"flex",gap:6,flexWrap:"wrap",marginBottom:24}}>
            {tags.map((t,i) => <span key={i} style={{display:"inline-block",padding:"4px 12px",borderRadius:40,background:"rgba(245,172,200,0.15)",color:"#3D3830",fontSize:12,fontWeight:500}}>{t}</span>)}
          </div>
        )}

        {/* Platform buttons */}
        <PlatformIcons size={44} iconSize={20} links={{youtube:episode.youtube,spotify:episode.spotify,apple:episode.apple}}/>
      </div>

      {/* Spotify player */}
      <div style={{maxWidth:800,margin:"0 auto",padding:"40px clamp(20px,5vw,40px)"}}>
        <iframe style={{borderRadius:12,width:"100%",border:"none"}}
          src={getSpotifyEmbedUrl(episode)}
          height="152" allow="autoplay; clipboard-write; encrypted-media; fullscreen; picture-in-picture" loading="lazy"/>
      </div>

      {/* Topics Discussed */}
      {topics.length > 0 && (
        <div style={{maxWidth:800,margin:"0 auto",padding:"0 clamp(20px,5vw,40px) 32px"}}>
          <p style={{fontSize:12,textTransform:"uppercase",letterSpacing:"0.15em",fontWeight:700,color:"#F5ACC8",marginBottom:16}}>In This Episode We Talk About</p>
          <div style={{display:"flex",flexDirection:"column",gap:0}}>
            {topics.map((topic,i) => (
              <div key={i} style={{display:"flex",alignItems:"center",gap:12,padding:"11px 0",borderBottom:i<topics.length-1?"1px solid rgba(0,0,0,0.06)":"none"}}>
                <span style={{color:"#F5ACC8",fontSize:10,lineHeight:1}}>●</span>
                <span style={{fontSize:14,color:"#444",lineHeight:1.4}}>{topic}</span>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* Blog post link */}
      <div style={{maxWidth:800,margin:"0 auto",padding:"0 clamp(20px,5vw,40px) 20px"}}>
        <Link href={`/blog/${episode.slug}`} style={{textDecoration:"none"}}>
          <div style={{background:"rgba(245,172,200,0.1)",borderRadius:16,padding:"24px 32px",display:"flex",justifyContent:"space-between",alignItems:"center",transition:"background 0.2s",border:"1px solid rgba(245,172,200,0.2)"}}
            onMouseEnter={e=>e.currentTarget.style.background="rgba(245,172,200,0.18)"}
            onMouseLeave={e=>e.currentTarget.style.background="rgba(245,172,200,0.1)"}>
            <div>
              <SectionLabel>Read the journal entry</SectionLabel>
              <p className="c" style={{fontSize:15,fontWeight:600,color:"#1a1a1a"}}>{episode.blogTitle || episode.title}</p>
            </div>
            <Arr/>
          </div>
        </Link>
      </div>

      {/* Prev / Next — simple text links */}
      <div className="prev-next" style={{maxWidth:800,margin:"0 auto",padding:"40px clamp(20px,5vw,40px) 48px",display:"flex",justifyContent:"space-between",alignItems:"flex-start",gap:24}}>
        {prevEp ? (
          <Link href={`/episodes/${prevEp.slug}`} style={{textDecoration:"none",textAlign:"left",maxWidth:"45%"}}>
            <p style={{fontSize:11,textTransform:"uppercase",letterSpacing:"0.08em",color:"#aaa",marginBottom:4,fontWeight:700}}>← Previous</p>
            <p style={{fontSize:14,fontWeight:600,color:"#1a1a1a",lineHeight:1.4,transition:"color 0.2s"}}
              onMouseEnter={e=>e.currentTarget.style.color="#F5ACC8"}
              onMouseLeave={e=>e.currentTarget.style.color="#1a1a1a"}>{prevEp.title}</p>
          </Link>
        ) : <div/>}
        {nextEp ? (
          <Link href={`/episodes/${nextEp.slug}`} style={{textDecoration:"none",textAlign:"right",maxWidth:"45%",marginLeft:"auto"}}>
            <p style={{fontSize:11,textTransform:"uppercase",letterSpacing:"0.08em",color:"#aaa",marginBottom:4,fontWeight:700}}>Next →</p>
            <p style={{fontSize:14,fontWeight:600,color:"#1a1a1a",lineHeight:1.4,transition:"color 0.2s"}}
              onMouseEnter={e=>e.currentTarget.style.color="#F5ACC8"}
              onMouseLeave={e=>e.currentTarget.style.color="#1a1a1a"}>{nextEp.title}</p>
          </Link>
        ) : <div/>}
      </div>

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
