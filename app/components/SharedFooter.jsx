"use client";
import Link from "next/link";

const YT=({s=16})=><svg width={s} height={s} viewBox="0 0 24 24" fill="currentColor"><path d="M23.5 6.19a3.02 3.02 0 00-2.12-2.14C19.5 3.5 12 3.5 12 3.5s-7.5 0-9.38.55A3.02 3.02 0 00.5 6.19 31.6 31.6 0 000 12c0 1.97.17 3.92.5 5.81a3.02 3.02 0 002.12 2.14c1.88.55 9.38.55 9.38.55s7.5 0 9.38-.55a3.02 3.02 0 002.12-2.14c.33-1.89.5-3.84.5-5.81s-.17-3.92-.5-5.81zM9.75 15.02V8.98L15.5 12l-5.75 3.02z"/></svg>;
const IG=({s=16})=><svg width={s} height={s} viewBox="0 0 24 24" fill="currentColor"><path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zM12 0C8.741 0 8.333.014 7.053.072 2.695.272.273 2.69.073 7.052.014 8.333 0 8.741 0 12c0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98C8.333 23.986 8.741 24 12 24c3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98C15.668.014 15.259 0 12 0zm0 5.838a6.162 6.162 0 100 12.324 6.162 6.162 0 000-12.324zM12 16a4 4 0 110-8 4 4 0 010 8zm6.406-11.845a1.44 1.44 0 100 2.881 1.44 1.44 0 000-2.881z"/></svg>;
const TK=({s=16})=><svg width={s} height={s} viewBox="0 0 24 24" fill="currentColor"><path d="M19.59 6.69a4.83 4.83 0 01-3.77-4.25V2h-3.45v13.67a2.89 2.89 0 01-2.88 2.5 2.89 2.89 0 01-2.89-2.89 2.89 2.89 0 012.89-2.89c.28 0 .54.04.79.1v-3.5a6.37 6.37 0 00-.79-.05A6.34 6.34 0 003.15 15.2a6.34 6.34 0 0010.86 4.46 6.3 6.3 0 001.86-4.49V8.72a8.26 8.26 0 004.83 1.56V6.83a4.84 4.84 0 01-1.11-.14z"/></svg>;

const LK = {
  youtube:"https://www.youtube.com/@TryingVeryHardPod",
  spotify:"https://open.spotify.com/show/4kQL0nJmPhv38D8io58eMX",
  apple:"https://podcasts.apple.com/sg/podcast/trying-very-hard-the-podcast/id1878052269",
  instagram:"https://www.instagram.com/tryingveryhardpod/",
  tiktok:"https://www.tiktok.com/@tryingveryhardpod",
};

const NAV_ITEMS = [
  { label: "subscribe", href: "/#subscribe" },
  { label: "episodes", href: "/episodes" },
  { label: "blog", href: "/blog" },
  { label: "about", href: "/#about" },
  { label: "contact", href: "/#contact" },
];

export default function SharedFooter() {
  return (
    <footer style={{background:"#1a1a1a",color:"#FFF0DD",padding:"clamp(48px,6vh,72px) clamp(24px,5vw,80px)"}}>
      <div style={{maxWidth:1200,margin:"0 auto"}}>
        <div className="ft-cols" style={{display:"flex",justifyContent:"space-between",gap:48,marginBottom:40}}>
          <div style={{flex:"1 1 300px"}}>
            <div style={{marginBottom:12}}>
              <img src="/images/footer-logo.png" alt="Trying Very Hard" style={{height:48}}/>
            </div>
            <p className="c" style={{fontSize:14,lineHeight:1.7,opacity:0.5,maxWidth:320}}>A podcast about the effort behind the outcome — and why that effort matters.</p>
          </div>
          <div style={{flex:"0 0 auto"}}>
            <p className="c" style={{fontSize:11,fontWeight:700,letterSpacing:"0.15em",textTransform:"uppercase",opacity:0.3,marginBottom:12}}>Navigate</p>
            <div style={{display:"flex",flexDirection:"column",gap:8}}>
              {NAV_ITEMS.map(item=>(
                <Link key={item.label} href={item.href} className="c" style={{color:"#FFF0DD",opacity:0.6,fontSize:14,fontWeight:700,textTransform:"uppercase",letterSpacing:"0.06em",textDecoration:"none",transition:"opacity 0.2s"}}
                  onMouseEnter={e=>e.currentTarget.style.opacity="1"} onMouseLeave={e=>e.currentTarget.style.opacity="0.6"}>{item.label}</Link>
              ))}
            </div>
          </div>
          <div style={{flex:"0 0 auto"}}>
            <p className="c" style={{fontSize:11,fontWeight:700,letterSpacing:"0.15em",textTransform:"uppercase",opacity:0.3,marginBottom:12}}>Listen</p>
            <div style={{display:"flex",flexDirection:"column",gap:8}}>
              {[{n:"YouTube",u:LK.youtube},{n:"Spotify",u:LK.spotify},{n:"Apple Podcasts",u:LK.apple}].map(p=>(
                <a key={p.n} href={p.u} target="_blank" rel="noopener noreferrer" className="c" style={{color:"#FFF0DD",opacity:0.6,fontSize:14,fontWeight:700,textDecoration:"none",transition:"opacity 0.2s"}}
                  onMouseEnter={e=>e.currentTarget.style.opacity="1"} onMouseLeave={e=>e.currentTarget.style.opacity="0.6"}>{p.n}</a>
              ))}
            </div>
          </div>
          <div style={{flex:"0 0 auto"}}>
            <p className="c" style={{fontSize:11,fontWeight:700,letterSpacing:"0.15em",textTransform:"uppercase",opacity:0.3,marginBottom:12}}>Follow</p>
            <div style={{display:"flex",gap:10}}>
              {[{icon:<IG/>,url:LK.instagram},{icon:<TK/>,url:LK.tiktok},{icon:<YT/>,url:LK.youtube}].map((s,i)=>(
                <a key={i} href={s.url} target="_blank" rel="noopener noreferrer" style={{width:36,height:36,borderRadius:10,background:"rgba(255,255,255,0.06)",color:"rgba(255,240,221,0.5)",display:"flex",alignItems:"center",justifyContent:"center",textDecoration:"none",transition:"all 0.2s"}}
                  onMouseEnter={e=>{e.currentTarget.style.background="#F5ACC8";e.currentTarget.style.color="#1a1a1a"}}
                  onMouseLeave={e=>{e.currentTarget.style.background="rgba(255,255,255,0.06)";e.currentTarget.style.color="rgba(255,240,221,0.5)"}}>
                  {s.icon}
                </a>
              ))}
            </div>
          </div>
        </div>
        <div style={{borderTop:"1px solid rgba(255,255,255,0.06)",paddingTop:24,display:"flex",justifyContent:"center",alignItems:"center"}}>
          <p className="c" style={{fontSize:12,opacity:0.3}}>&copy; {new Date().getFullYear()} Amanda & Monica. All rights reserved.</p>
        </div>
      </div>
    </footer>
  );
}
