"use client";
import { useState, useRef } from "react";

const AMANDA_HEADSHOT = "/images/amanda-headshot.jpg";
const MONICA_HEADSHOT = "/images/monica-headshot.jpg";


const LK = { youtube:"https://www.youtube.com/@TryingVeryHardPod", spotify:"https://open.spotify.com/show/4kQL0nJmPhv38D8io58eMX", apple:"https://podcasts.apple.com/sg/podcast/trying-very-hard-the-podcast/id1878052269", instagram:"https://www.instagram.com/tryingveryhardpod/", tiktok:"https://www.tiktok.com/@tryingveryhardpod" };

const HOSTS = [
  { name:"Amanda", color:"#F5ACC8", img:AMANDA_HEADSHOT, instagram:"https://www.instagram.com/mandypants__/", linkedin:"https://www.linkedin.com/in/amandaleahng/", website:"https://somitherapy.com/", bio:"Equal parts rigor, wit, and wildly contagious curiosity. Amanda is an integrative mind-body therapist and the founder of Somi Therapy, helping people who think too much, feel too much, and achieve too much — then wonder why they're exhausted. She draws from psychology, neuroscience, trauma theory, coaching, and somatic practice, because surface-level has never been her thing. Before becoming a therapist, she spent years in strategy roles across education, microfinance, and consulting. She's the friend who makes you believe in yourself — and now you get to have her in your ears." },
  { name:"Monica", color:"#FFD200", img:MONICA_HEADSHOT, instagram:"https://www.instagram.com/monica.pranatajaya/", linkedin:"https://www.linkedin.com/in/monicapranatajaya/", website:null, bio:"One of the coolest, sharpest, and strongest women you'll meet — and she'll hype you up, call out your bullshit, and ask the one question that cuts right to the truth. Monica is the co-founder of Nona Woman, a platform breaking period stigma and creating space for women in Indonesia to feel seen, heard, and educated. She holds an MBA from London Business School and has worked across EY-Parthenon, public health innovation, startups, and product marketing. She's generous, smart, hilarious, and made of what we suspect is 0% body fat and 100% discipline." },
];

const PlayIcon=()=><svg width="16" height="16" viewBox="0 0 24 24" fill="currentColor"><polygon points="5,3 19,12 5,21"/></svg>;
const MicI=({s=24})=><svg width={s} height={s} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M12 1a3 3 0 0 0-3 3v8a3 3 0 0 0 6 0V4a3 3 0 0 0-3-3z"/><path d="M19 10v2a7 7 0 0 1-14 0v-2"/><line x1="12" y1="19" x2="12" y2="23"/><line x1="8" y1="23" x2="16" y2="23"/></svg>;
const UserI=({s=24})=><svg width={s} height={s} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M20 21v-2a4 4 0 0 0-4-4H8a4 4 0 0 0-4 4v2"/><circle cx="12" cy="7" r="4"/></svg>;
const YT=({s=20})=><svg width={s} height={s} viewBox="0 0 24 24" fill="currentColor"><path d="M23.5 6.19a3.02 3.02 0 00-2.12-2.14C19.5 3.5 12 3.5 12 3.5s-7.5 0-9.38.55A3.02 3.02 0 00.5 6.19 31.6 31.6 0 000 12c0 1.97.17 3.92.5 5.81a3.02 3.02 0 002.12 2.14c1.88.55 9.38.55 9.38.55s7.5 0 9.38-.55a3.02 3.02 0 002.12-2.14c.33-1.89.5-3.84.5-5.81s-.17-3.92-.5-5.81zM9.75 15.02V8.98L15.5 12l-5.75 3.02z"/></svg>;
const SP=({s=20})=><svg width={s} height={s} viewBox="0 0 24 24" fill="currentColor"><path d="M12 0C5.4 0 0 5.4 0 12s5.4 12 12 12 12-5.4 12-12S18.66 0 12 0zm5.521 17.34c-.24.359-.66.48-1.021.24-2.82-1.74-6.36-2.101-10.561-1.141-.418.122-.779-.179-.899-.539-.12-.421.18-.78.54-.9 4.56-1.021 8.52-.6 11.64 1.32.42.18.479.659.301 1.02zm1.44-3.3c-.301.42-.841.6-1.262.3-3.239-1.98-8.159-2.58-11.939-1.38-.479.12-1.02-.12-1.14-.6-.12-.48.12-1.021.6-1.141C9.6 9.9 15 10.561 18.72 12.84c.361.181.54.78.241 1.2zm.12-3.36C15.24 8.4 8.82 8.16 5.16 9.301c-.6.179-1.2-.181-1.38-.721-.18-.601.18-1.2.72-1.381 4.26-1.26 11.28-1.02 15.721 1.621.539.3.719 1.02.419 1.56-.299.421-1.02.599-1.559.3z"/></svg>;
const AP=({s=20})=><svg width={s} height={s} viewBox="0 0 24 24" fill="currentColor"><path d="M18.71 19.5c-.83 1.24-1.71 2.45-3.05 2.47-1.34.03-1.77-.79-3.29-.79-1.53 0-2 .77-3.27.82-1.31.05-2.3-1.32-3.14-2.53C4.25 17 2.94 12.45 4.7 9.39c.87-1.52 2.43-2.48 4.12-2.51 1.28-.02 2.5.87 3.29.87.78 0 2.26-1.07 3.8-.91.65.03 2.47.26 3.64 1.98-.09.06-2.17 1.28-2.15 3.81.03 3.02 2.65 4.03 2.68 4.04-.03.07-.42 1.44-1.38 2.83M13 3.5c.73-.83 1.94-1.46 2.94-1.5.13 1.17-.34 2.35-1.04 3.19-.69.85-1.83 1.51-2.95 1.42-.15-1.15.41-2.35 1.05-3.11z"/></svg>;
const IG=({s=20})=><svg width={s} height={s} viewBox="0 0 24 24" fill="currentColor"><path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zM12 0C8.741 0 8.333.014 7.053.072 2.695.272.273 2.69.073 7.052.014 8.333 0 8.741 0 12c0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98C8.333 23.986 8.741 24 12 24c3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98C15.668.014 15.259 0 12 0zm0 5.838a6.162 6.162 0 100 12.324 6.162 6.162 0 000-12.324zM12 16a4 4 0 110-8 4 4 0 010 8zm6.406-11.845a1.44 1.44 0 100 2.881 1.44 1.44 0 000-2.881z"/></svg>;
const LI=({s=20})=><svg width={s} height={s} viewBox="0 0 24 24" fill="currentColor"><path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433a2.062 2.062 0 01-2.063-2.065 2.064 2.064 0 112.063 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z"/></svg>;
const TK=({s=20})=><svg width={s} height={s} viewBox="0 0 24 24" fill="currentColor"><path d="M19.59 6.69a4.83 4.83 0 01-3.77-4.25V2h-3.45v13.67a2.89 2.89 0 01-2.88 2.5 2.89 2.89 0 01-2.89-2.89 2.89 2.89 0 012.89-2.89c.28 0 .54.04.79.1v-3.5a6.37 6.37 0 00-.79-.05A6.34 6.34 0 003.15 15.2a6.34 6.34 0 0010.86 4.46 6.3 6.3 0 001.86-4.49V8.72a8.26 8.26 0 004.83 1.56V6.83a4.84 4.84 0 01-1.11-.14z"/></svg>;
const Arr=()=><svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"><line x1="5" y1="12" x2="19" y2="12"/><polyline points="12 5 19 12 12 19"/></svg>;
const Pers=({s=52})=><svg width={s} height={s} viewBox="0 0 24 24" fill="none" stroke="rgba(0,0,0,0.12)" strokeWidth="1.2"><path d="M20 21v-2a4 4 0 00-4-4H8a4 4 0 00-4 4v2"/><circle cx="12" cy="7" r="4"/></svg>;
const MenuI=()=><svg width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round"><line x1="3" y1="6" x2="21" y2="6"/><line x1="3" y1="12" x2="21" y2="12"/><line x1="3" y1="18" x2="21" y2="18"/></svg>;
const CloseI=()=><svg width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round"><line x1="18" y1="6" x2="6" y2="18"/><line x1="6" y1="6" x2="18" y2="18"/></svg>;

// Shared platform circle icons — used in episode cards, subscribe, mini-subscribe
const PlatformIcons=({size=36,iconSize=16,links,dark=false})=>(
  <div style={{display:"flex",gap:size>40?16:8,justifyContent:"center"}}>
    <a href={links.youtube||LK.youtube} target="_blank" rel="noopener noreferrer" style={{width:size,height:size,borderRadius:"50%",background:"#FF0000",display:"flex",alignItems:"center",justifyContent:"center",color:"#fff",textDecoration:"none",transition:"all 0.2s"}}
    onMouseEnter={e=>{e.currentTarget.style.transform="scale(1.1)"}} onMouseLeave={e=>{e.currentTarget.style.transform="scale(1)"}}><YT s={iconSize}/></a>
    <a href={links.spotify||LK.spotify} target="_blank" rel="noopener noreferrer" style={{width:size,height:size,borderRadius:"50%",background:"#1DB954",display:"flex",alignItems:"center",justifyContent:"center",color:"#fff",textDecoration:"none",transition:"all 0.2s"}}
    onMouseEnter={e=>{e.currentTarget.style.transform="scale(1.1)"}} onMouseLeave={e=>{e.currentTarget.style.transform="scale(1)"}}><SP s={iconSize}/></a>
    <a href={links.apple||LK.apple} target="_blank" rel="noopener noreferrer" style={{width:size,height:size,borderRadius:"50%",background:dark?"#fff":"#1a1a1a",display:"flex",alignItems:"center",justifyContent:"center",color:dark?"#1a1a1a":"#FFF0DD",textDecoration:"none",transition:"all 0.2s"}}
    onMouseEnter={e=>{e.currentTarget.style.transform="scale(1.1)"}} onMouseLeave={e=>{e.currentTarget.style.transform="scale(1)"}}><AP s={iconSize}/></a>
  </div>
);

// Shared section label — used above every section heading (#1 fix: consistent)
const SectionLabel=({children})=>(
  <p className="c" style={{fontSize:12,fontWeight:700,letterSpacing:"0.15em",textTransform:"uppercase",color:"#F5ACC8",marginBottom:6}}>{children}</p>
);

// Shared social icon style for host cards (#6 fix: consistent with footer)
const SocialIcon=({href,children})=>(
  <a href={href} target="_blank" rel="noopener noreferrer" style={{width:36,height:36,borderRadius:10,background:"rgba(0,0,0,0.04)",color:"#1a1a1a",display:"flex",alignItems:"center",justifyContent:"center",textDecoration:"none",transition:"all 0.2s"}}
  onMouseEnter={e=>{e.currentTarget.style.background="rgba(0,0,0,0.1)"}} onMouseLeave={e=>{e.currentTarget.style.background="rgba(0,0,0,0.04)"}}>{children}</a>
);

export default function HomeClient({ episodes = [] }){
  const [menuOpen,setMenuOpen]=useState(false);
  const [form,setForm]=useState({firstName:"",lastName:"",email:"",phone:"",company:"",website:"",type:"",message:""});
  const [sent,setSent]=useState(false);
  const go=(id)=>{setMenuOpen(false);document.getElementById(id)?.scrollIntoView({behavior:"smooth"})};
  const sub=async(e)=>{e.preventDefault();try{await fetch("https://formspree.io/f/xeepqpvr",{method:"POST",headers:{"Content-Type":"application/json"},body:JSON.stringify(form)});setSent(true);setTimeout(()=>setSent(false),4000);setForm({firstName:"",lastName:"",email:"",phone:"",company:"",website:"",type:"",message:""});}catch(err){alert("Something went wrong. Please try again!")}};
  const eps=episodes.slice(0,5);
  const NAV=["subscribe","episodes","blog","about","contact"];

  // Episode card — 16:9 thumbnail with YouTube image or colored placeholder
  const EpCard=({ep,isLatest})=>(
    <div className="ep-row" style={{background:"#fff",borderRadius:20,padding:"clamp(24px,3vw,36px)",display:"flex",gap:28,alignItems:"flex-start"}}>
      <div className="ep-thumb" style={{flexShrink:0,width:"clamp(180px,24vw,320px)",aspectRatio:"16/9",borderRadius:16,overflow:"hidden",position:"relative",
        background:ep.thumbnail?`url(${ep.thumbnail}) center/cover no-repeat`:(ep.type==="guest"?"linear-gradient(135deg,#FFD200 0%,#ffe066 100%)":"linear-gradient(135deg,#F5ACC8 0%,#f8c8da 100%)"),
        display:"flex",alignItems:"center",justifyContent:"center"}}>
        {!ep.thumbnail&&<div style={{width:48,height:48,borderRadius:"50%",background:"#FFD200",display:"flex",alignItems:"center",justifyContent:"center"}}><PlayIcon/></div>}
      </div>
      <div style={{flex:1,minWidth:0}}>
        <div style={{display:"flex",alignItems:"center",gap:8,marginBottom:10,flexWrap:"wrap"}}>
          {isLatest&&<span className="c tag-latest">Latest</span>}
          <span className="c" style={{display:"inline-block",padding:"4px 12px",borderRadius:20,fontSize:11,fontWeight:700,letterSpacing:"0.06em",textTransform:"uppercase",background:ep.type==="monanda"?"#F5ACC8":"#FFD200",color:"#1a1a1a"}}>{ep.type==="monanda"?"Monanda":ep.guest}</span>
        </div>
        <h3 className="c" style={{fontWeight:700,fontSize:"clamp(16px,2.2vw,24px)",lineHeight:1.25,textTransform:"uppercase",marginBottom:10}}>{ep.title}</h3>
        <p className="c" style={{fontSize:14,lineHeight:1.6,color:"#777",marginBottom:20}}>{ep.description}</p>
        <div className="ep-bottom" style={{display:"flex",alignItems:"center",justifyContent:"space-between",flexWrap:"wrap",gap:16}}>
          <a href={ep.youtube} target="_blank" rel="noopener noreferrer" className="c" style={{display:"flex",alignItems:"center",gap:8,fontSize:13,fontWeight:700,textTransform:"uppercase",letterSpacing:"0.06em",color:"#F5ACC8",textDecoration:"none"}}>Listen Now <Arr/></a>
          <PlatformIcons size={36} iconSize={16} links={{youtube:ep.youtube,spotify:ep.spotify,apple:ep.apple}}/>
        </div>
        <p className="c" style={{fontSize:12,color:"#bbb",marginTop:10}}>{ep.date} · {ep.duration}</p>
      </div>
    </div>
  );

  return(
    <div style={{width:"100%",height:"100vh",overflow:"auto",background:"#FFF0DD"}}>
      <style>{`
        
        
        
        
        
        *{box-sizing:border-box;margin:0;padding:0}
        ::selection{background:#F5ACC8;color:#1a1a1a}
        .c{font-family:'Montserrat',sans-serif}
        
        .nl{font-size:13px;font-weight:700;letter-spacing:0.1em;text-transform:uppercase;color:#1a1a1a;text-decoration:none;padding:6px 0;cursor:pointer;background:none;border:none;font-family:'Montserrat',sans-serif;position:relative}
        .nl::after{content:'';position:absolute;bottom:-2px;left:0;width:0;height:2px;background:#F5ACC8;transition:width 0.3s}
        .nl:hover::after{width:100%}
        .cap{display:inline-flex;align-items:center;gap:8px;padding:13px 28px;border-radius:40px;font-size:13px;font-weight:700;text-transform:uppercase;letter-spacing:0.06em;text-decoration:none;cursor:pointer;transition:all 0.25s ease;border:none;font-family:'Montserrat',sans-serif}
        .cap:hover{transform:translateY(-2px);box-shadow:0 6px 20px rgba(0,0,0,0.12)}
        .cap-y{background:#FFD200;color:#1a1a1a}.cap-y:hover{background:#f0c600}
        .cap-b{background:#1a1a1a;color:#FFF0DD}.cap-b:hover{background:#333}
        .cap-w{background:#fff;color:#1a1a1a}.cap-w:hover{background:#f5f5f5}
        .cap-sm{padding:8px 18px;font-size:12px}
        .tag-latest{display:inline-block;padding:4px 12px;border-radius:20px;font-size:11px;font-weight:700;letter-spacing:0.06em;text-transform:uppercase;background:#1a1a1a;color:#FFF0DD}
        .ff{width:100%;padding:16px 20px;border:3px solid rgba(0,0,0,0.06);border-radius:14px;font-size:15px;font-family:'Montserrat',sans-serif;background:#fff;transition:border-color 0.2s;color:#1a1a1a}
        .ff:focus{outline:none;border-color:#F5ACC8}
        .ff::placeholder{color:#aaa}
        .mob-ov{position:fixed;inset:0;z-index:1000;background:#FFF0DD;display:flex;flex-direction:column;align-items:center;justify-content:center;gap:28px}
        @keyframes pulse{0%,100%{opacity:1;transform:scale(1)}50%{opacity:.5;transform:scale(1.4)}}
        @keyframes fadeUp{from{opacity:0;transform:translateY(24px)}to{opacity:1;transform:translateY(0)}}
        .fu{animation:fadeUp 0.7s ease forwards}.fu1{animation-delay:.15s;opacity:0}.fu2{animation-delay:.3s;opacity:0}.fu3{animation-delay:.45s;opacity:0}
        @media(max-width:768px){
          .desk{display:none!important}
          .hero-split{flex-direction:column!important}
          .hero-img{min-height:45vh!important;flex:none!important}
          .hero-text{padding:32px 20px 48px!important;text-align:center!important;align-items:center!important}
          .hero-text h1{font-size:28px!important}
          .hero-text p{max-width:100%!important}
          .hero-text>div:first-child{align-self:center!important}
          .hero-btns{justify-content:center!important}
          .ep-row{flex-direction:column!important;padding:16px!important;gap:16px!important;overflow:hidden!important}
          .ep-thumb{width:100%!important}
          .ep-row h3{font-size:16px!important;word-wrap:break-word!important;overflow-wrap:break-word!important}
          .ep-row p{font-size:13px!important;word-wrap:break-word!important;overflow-wrap:break-word!important}
          .ep-bottom{flex-direction:column!important;align-items:flex-start!important;gap:12px!important}
          .blog-grid{grid-template-columns:1fr!important;padding:0!important}
          .blog-grid>a{margin:0!important}
          .blog-grid>a>div{margin:0 0!important}
          .hg{grid-template-columns:1fr!important}
          .frow{flex-direction:column!important}
          .ftin{flex-direction:column!important;gap:32px!important;text-align:center!important;align-items:center!important}
          .csplit{flex-direction:column!important}
          .ft-cols{flex-direction:column!important;gap:32px!important;text-align:center!important;align-items:center!important}
          .ft-cols>div{text-align:center!important}
          .ft-cols button{text-align:center!important}
          .sec-head{flex-direction:column!important;align-items:flex-start!important;gap:16px!important}
        }
        @media(min-width:769px) and (max-width:1024px){
          .ep-thumb{width:200px!important}
          .hg{gap:16px!important}
          .blog-grid{grid-template-columns:1fr 1fr!important}
        }
        @media(min-width:769px){.mob{display:none!important}}
      `}</style>

      {/* TUESDAY */}
      <div className="c" style={{background:"#FFD200",color:"#1a1a1a",padding:"10px 20px",textAlign:"center",fontSize:12,fontWeight:700,letterSpacing:"0.12em",textTransform:"uppercase",display:"flex",alignItems:"center",justifyContent:"center",gap:10}}>
        <span style={{width:8,height:8,borderRadius:"50%",background:"#1DB954",display:"inline-block",animation:"pulse 2s ease infinite"}}/>
        New episode drops every Tuesday
      </div>

      {/* HERO */}
      <section id="home" style={{minHeight:"calc(100vh - 38px)",display:"flex",flexDirection:"column",background:"#FFF0DD"}}>
        <nav className="c" style={{padding:"14px clamp(24px,5vw,80px)"}}>
          <div style={{maxWidth:1200,margin:"0 auto",display:"flex",alignItems:"center",justifyContent:"space-between"}}>
            <div style={{cursor:"pointer"}} onClick={()=>go("home")}>
              <img src="/images/nav-logo.png" alt="Trying Very Hard" style={{height:36,borderRadius:8}}/>
            </div>
            <div className="desk" style={{display:"flex",gap:32}}>
              {NAV.map(s=>(<button key={s} className="nl" onClick={()=>go(s)}>{s}</button>))}
            </div>
            <button className="mob" onClick={()=>setMenuOpen(true)} style={{background:"none",border:"none",cursor:"pointer"}}><MenuI/></button>
          </div>
        </nav>
        <div className="hero-split" style={{flex:1,display:"flex",minHeight:0,position:"relative"}}>
          <div className="hero-img" style={{flex:"0 0 52%",position:"relative",minHeight:"100%"}}>
            <div style={{position:"absolute",inset:0,background:"url('/images/hero-banner.jpg') center 5% / cover no-repeat"}}/>
            <div className="desk" style={{position:"absolute",top:0,right:0,bottom:0,width:"120px",background:"linear-gradient(to right, transparent, #FFF0DD)"}}/>
          </div>
          <div className="hero-text" style={{flex:1,display:"flex",flexDirection:"column",justifyContent:"center",padding:"clamp(40px,5vh,80px) clamp(32px,4vw,64px)"}}>
            <h1 className="c fu fu1" style={{fontWeight:700,fontSize:"clamp(26px,3.5vw,44px)",lineHeight:1.15,textTransform:"uppercase",marginBottom:20,maxWidth:520}}>Honest yaps that call out & celebrate our inner tryhards.</h1>
            <p className="c fu fu2" style={{fontSize:"clamp(14px,1.5vw,17px)",lineHeight:1.7,color:"#666",maxWidth:460,marginBottom:32}}>Two best friends navigating adulthood, ambition, identity, and the messy beauty of caring deeply and trying hard — with microphones.</p>
            <div className="hero-btns fu fu3" style={{display:"flex",gap:14,flexWrap:"wrap"}}>
              <button className="cap cap-y" onClick={()=>go("episodes")}><PlayIcon/> Listen Now</button>
              <button className="cap cap-b" onClick={()=>go("subscribe")}>Subscribe</button>
            </div>
            <p className="c fu fu3" style={{marginTop:24,fontSize:12,color:"#aaa",fontWeight:700,letterSpacing:"0.08em",textTransform:"uppercase"}}>Hosted by Amanda & Monica</p>
          </div>
        </div>
      </section>

      {menuOpen&&(<div className="mob-ov"><button onClick={()=>setMenuOpen(false)} style={{position:"absolute",top:20,right:20,background:"none",border:"none",cursor:"pointer"}}><CloseI/></button>{NAV.map(s=>(<button key={s} className="c" style={{fontSize:28,fontWeight:700,textTransform:"uppercase",letterSpacing:"0.08em",background:"none",border:"none",cursor:"pointer",color:"#1a1a1a"}} onClick={()=>go(s)}>{s}</button>))}</div>)}

      {/* 1. SUBSCRIBE (#1 fix: added section label) */}
      <section id="subscribe" style={{background:"#1a1a1a",padding:"clamp(56px,8vh,88px) clamp(24px,5vw,80px)"}}>
        <div style={{maxWidth:800,margin:"0 auto",textAlign:"center"}}>
          <p className="c" style={{fontSize:12,fontWeight:700,letterSpacing:"0.15em",textTransform:"uppercase",color:"#F5ACC8",marginBottom:6}}>Listen & Follow</p>
          <h2 className="c" style={{fontWeight:700,fontSize:"clamp(24px,3.5vw,40px)",textTransform:"uppercase",marginBottom:12,color:"#FFF0DD"}}>Subscribe Now on Your Favorite Platform</h2>
          <p className="c" style={{fontSize:14,color:"rgba(255,240,221,0.5)",marginBottom:36}}>Never miss an episode. New conversations every Tuesday.</p>
          <PlatformIcons size={56} iconSize={24} links={LK} dark={true}/>
        </div>
      </section>

      {/* 2. EPISODES */}
      <section id="episodes" style={{background:"#FFF0DD",padding:"clamp(72px,10vh,120px) clamp(24px,5vw,80px)"}}>
        <div style={{maxWidth:1200,margin:"0 auto"}}>
          <div className="sec-head" style={{display:"flex",justifyContent:"space-between",alignItems:"flex-end",marginBottom:40,flexWrap:"wrap",gap:12}}>
            <div>
              <SectionLabel>Latest Episodes</SectionLabel>
              <h2 className="c" style={{fontWeight:700,fontSize:"clamp(28px,4vw,44px)",lineHeight:1.1,textTransform:"uppercase"}}>Come Sit With Us</h2>
            </div>
            <a href="/episodes" className="cap cap-b" style={{fontSize:12,padding:"10px 24px"}}>All Episodes <Arr/></a>
          </div>
          <div style={{display:"flex",flexDirection:"column",gap:16}}>
            {eps.map((ep,i)=>(<EpCard key={ep.id} ep={ep} isLatest={i===0}/>))}
          </div>
        </div>
      </section>

      {/* 3. MINI SUBSCRIBE (#7 fix: black bg for separation) */}
      <section style={{background:"#1a1a1a",padding:"clamp(40px,5vh,56px) clamp(24px,5vw,80px)"}}>
        <div style={{maxWidth:700,margin:"0 auto",textAlign:"center"}}>
          <p className="c" style={{fontSize:"clamp(18px,2.5vw,26px)",fontWeight:700,textTransform:"uppercase",color:"#FFF0DD",marginBottom:20}}>Like what you hear?</p>
          <PlatformIcons size={44} iconSize={20} links={LK} dark={true}/>
          <p className="c" style={{fontSize:13,color:"rgba(255,240,221,0.4)",marginTop:14}}>Follow us wherever you listen.</p>
        </div>
      </section>

      {/* 4. BLOG (#5 fix: CTA matches episode style) */}
      <section id="blog" style={{background:"#FFF0DD",padding:"clamp(72px,10vh,120px) clamp(24px,5vw,80px)"}}>
        <div style={{maxWidth:1200,margin:"0 auto"}}>
          <div className="sec-head" style={{display:"flex",justifyContent:"space-between",alignItems:"flex-end",marginBottom:40,flexWrap:"wrap",gap:12}}>
            <div>
              <SectionLabel>The TVH Journal</SectionLabel>
              <h2 className="c" style={{fontWeight:700,fontSize:"clamp(28px,4vw,44px)",lineHeight:1.1,textTransform:"uppercase"}}>Episode Recaps & Reflections</h2>
            </div>
            <a href="/blog" className="cap cap-b" style={{fontSize:12,padding:"10px 24px"}}>All Posts <Arr/></a>
          </div>
          <div className="blog-grid" style={{display:"grid",gridTemplateColumns:"repeat(3,1fr)",gap:20}}>
            {eps.slice(0,3).map(ep=>(
              <a key={ep.id} href={`/blog/${ep.title.toLowerCase().replace(/[^a-z0-9]+/g,"-").replace(/-$/,"")}`} style={{textDecoration:"none",color:"inherit",display:"block"}}>
                <div style={{background:"#fff",borderRadius:20,overflow:"hidden",transition:"all 0.3s"}}
                  onMouseEnter={e=>{e.currentTarget.style.transform="translateY(-4px)";e.currentTarget.style.boxShadow="0 12px 40px rgba(0,0,0,0.06)"}}
                  onMouseLeave={e=>{e.currentTarget.style.transform="none";e.currentTarget.style.boxShadow="none"}}>
                  <div style={{height:6,background:ep.type==="monanda"?"#F5ACC8":"#FFD200"}}/>
                  <div style={{padding:"24px 28px"}}>
                    <div style={{display:"flex",alignItems:"center",gap:8,marginBottom:12}}>
                      <span className="c" style={{display:"inline-block",padding:"3px 10px",borderRadius:16,fontSize:10,fontWeight:700,letterSpacing:"0.06em",textTransform:"uppercase",background:ep.type==="monanda"?"#F5ACC8":"#FFD200",color:"#1a1a1a"}}>{ep.type==="monanda"?"Monanda":ep.guest}</span>
                      <span className="c" style={{fontSize:11,color:"#bbb",fontWeight:700,marginLeft:"auto"}}>{ep.date}</span>
                    </div>
                    <h3 className="c" style={{fontWeight:700,fontSize:17,lineHeight:1.4,marginBottom:10}}>{ep.blogTitle}</h3>
                    <p className="c" style={{fontSize:13,lineHeight:1.55,color:"#888",display:"-webkit-box",WebkitLineClamp:3,WebkitBoxOrient:"vertical",overflow:"hidden",wordWrap:"break-word",overflowWrap:"break-word"}}>{ep.description}</p>
                    <p className="c" style={{fontSize:12,fontWeight:700,color:"#F5ACC8",textTransform:"uppercase",letterSpacing:"0.06em",marginTop:16,display:"flex",alignItems:"center",gap:6}}>Read More <Arr/></p>
                  </div>
                </div>
              </a>
            ))}
          </div>
        </div>
      </section>

      {/* 5. ABOUT */}
      <section id="about" style={{background:"#FFF0DD",padding:"clamp(72px,10vh,120px) clamp(24px,5vw,80px)"}}>
        <div style={{maxWidth:1200,margin:"0 auto"}}>
          <div style={{textAlign:"center",marginBottom:20}}>
            <SectionLabel>Who We Are</SectionLabel>
            <h2 className="c" style={{fontWeight:700,fontSize:"clamp(28px,4vw,44px)",textTransform:"uppercase",marginBottom:16}}>The Tryhards Behind the Pod</h2>
            <p className="c" style={{fontSize:15,lineHeight:1.7,color:"#666",maxWidth:560,margin:"0 auto"}}>
              We're Amanda and Monica — a therapist and a startup founder, two third culture kids in Singapore, and best friends who think too much, laugh too hard, and care too deeply. This podcast is our attempt to do it out loud.
            </p>
          </div>
          <div className="hg" style={{display:"grid",gridTemplateColumns:"1fr 1fr",gap:24}}>
            {HOSTS.map(h=>(
              <div key={h.name} style={{background:"#fff",borderRadius:24,padding:"clamp(28px,3vw,44px)",textAlign:"center"}}>
                <div style={{marginBottom:20}}>
                  {h.img?<img src={h.img} alt={h.name} style={{width:150,height:150,borderRadius:"50%",objectFit:"cover",display:"block",margin:"0 auto",border:`4px solid ${h.color}`}}/>
                  :<div style={{width:150,height:150,borderRadius:"50%",background:`linear-gradient(135deg,${h.color}20,${h.color}10)`,border:`4px solid ${h.color}35`,display:"flex",alignItems:"center",justifyContent:"center",margin:"0 auto"}}><Pers s={56}/></div>}
                </div>
                <div className="c" style={{fontSize:28,fontWeight:700,color:"#1a1a1a",textTransform:"uppercase",letterSpacing:"0.04em",marginBottom:8}}>{h.name}</div>
                <div style={{display:"flex",gap:8,justifyContent:"center",marginBottom:16}}>
                  <SocialIcon href={h.instagram}><IG s={16}/></SocialIcon>
                  <SocialIcon href={h.linkedin}><LI s={16}/></SocialIcon>
                  {h.website&&<SocialIcon href={h.website}><svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><circle cx="12" cy="12" r="10"/><line x1="2" y1="12" x2="22" y2="12"/><path d="M12 2a15.3 15.3 0 0 1 4 10 15.3 15.3 0 0 1-4 10 15.3 15.3 0 0 1-4-10 15.3 15.3 0 0 1 4-10z"/></svg></SocialIcon>}
                </div>
                <p className="c" style={{fontSize:15,lineHeight:1.7,color:"#555",textAlign:"left"}}>{h.bio}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* 6. CONTACT */}
      <section id="contact" style={{background:"#FFF0DD",padding:"clamp(72px,10vh,120px) clamp(24px,5vw,80px)"}}>
        <div style={{maxWidth:1200,margin:"0 auto"}}>
          <div className="csplit" style={{display:"flex",gap:"clamp(32px,4vw,64px)",flexWrap:"wrap",alignItems:"flex-start"}}>
            <div style={{flex:"1 1 280px"}}>
              <SectionLabel>Get In Touch</SectionLabel>
              <h2 className="c" style={{fontWeight:700,fontSize:"clamp(26px,3.5vw,40px)",lineHeight:1.1,textTransform:"uppercase",marginBottom:16}}>Want to Collaborate, Be a Sponsor, or Just Say Hi?</h2>
              <p className="c" style={{fontSize:15,lineHeight:1.7,color:"#666"}}>Guest pitches, brand partnerships, episode ideas, or a message that starts with "I just listened to your episode and..." — all welcome.</p>
            </div>
            <div style={{flex:"1 1 360px"}}>
              {sent?(
                <div style={{background:"#fff",borderRadius:20,padding:40,textAlign:"center"}}>
                  <div style={{fontSize:40,marginBottom:8,color:"#FFD200"}}>{"\u2605"}</div>
                  <p className="c" style={{fontWeight:700,fontSize:22,textTransform:"uppercase"}}>Message Received!</p>
                  <p className="c" style={{fontSize:14,color:"#888",marginTop:8}}>We'll get back to you soon!</p>
                </div>
              ):(
                <form onSubmit={sub} style={{background:"#fff",borderRadius:20,padding:"clamp(24px,3vw,36px)",display:"flex",flexDirection:"column",gap:18}}>
                  <div className="frow" style={{display:"flex",gap:14}}>
                    <div style={{flex:1}}>
                      <label className="c" style={{fontSize:12,fontWeight:700,display:"block",marginBottom:6}}>First Name <span style={{color:"#F5ACC8"}}>*</span></label>
                      <input className="ff c" value={form.firstName} onChange={e=>setForm({...form,firstName:e.target.value})} required/>
                    </div>
                    <div style={{flex:1}}>
                      <label className="c" style={{fontSize:12,fontWeight:700,display:"block",marginBottom:6}}>Last Name <span style={{color:"#F5ACC8"}}>*</span></label>
                      <input className="ff c" value={form.lastName} onChange={e=>setForm({...form,lastName:e.target.value})} required/>
                    </div>
                  </div>
                  <div className="frow" style={{display:"flex",gap:14}}>
                    <div style={{flex:1}}>
                      <label className="c" style={{fontSize:12,fontWeight:700,display:"block",marginBottom:6}}>Email <span style={{color:"#F5ACC8"}}>*</span></label>
                      <input className="ff c" type="email" value={form.email} onChange={e=>setForm({...form,email:e.target.value})} required/>
                    </div>
                    <div style={{flex:1}}>
                      <label className="c" style={{fontSize:12,fontWeight:700,display:"block",marginBottom:6}}>Phone Number</label>
                      <input className="ff c" type="tel" value={form.phone} onChange={e=>setForm({...form,phone:e.target.value})}/>
                    </div>
                  </div>
                  <div className="frow" style={{display:"flex",gap:14}}>
                    <div style={{flex:1}}>
                      <label className="c" style={{fontSize:12,fontWeight:700,display:"block",marginBottom:6}}>Company / Brand</label>
                      <input className="ff c" value={form.company} onChange={e=>setForm({...form,company:e.target.value})}/>
                    </div>
                    <div style={{flex:1}}>
                      <label className="c" style={{fontSize:12,fontWeight:700,display:"block",marginBottom:6}}>Website / Social / Relevant Link</label>
                      <input className="ff c" type="url" value={form.website} onChange={e=>setForm({...form,website:e.target.value})}/>
                    </div>
                  </div>
                  <div>
                    <label className="c" style={{fontSize:12,fontWeight:700,display:"block",marginBottom:6}}>What would you like to connect about? <span style={{color:"#F5ACC8"}}>*</span></label>
                    <select className="ff c" value={form.type} onChange={e=>setForm({...form,type:e.target.value})} required style={{color:form.type===""?"#aaa":"#1a1a1a"}}>
                      <option value="" disabled>Select one</option>
                      <option value="guest">I'd love to be a guest (or suggest someone!)</option>
                      <option value="sponsor">Sponsorship or brand partnership</option>
                      <option value="collab">Collaboration idea</option>
                      <option value="media">Media or press inquiry</option>
                      <option value="other">Something else / just saying hi 👋</option>
                    </select>
                  </div>
                  <div>
                    <label className="c" style={{fontSize:12,fontWeight:700,display:"block",marginBottom:6}}>Tell us more</label>
                    <textarea className="ff c" rows={4} placeholder="Share any details, links, or what you're hoping for." value={form.message} onChange={e=>setForm({...form,message:e.target.value})} style={{resize:"vertical"}}/>
                  </div>
                  <button type="submit" className="cap cap-b" style={{alignSelf:"flex-start"}}>Send Message <Arr/></button>
                </form>
              )}
            </div>
          </div>
        </div>
      </section>

      {/* FOOTER (#2 fix: nav order matches page flow) */}
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
                {NAV.map(s=>(
                  <button key={s} className="c" onClick={()=>go(s)} style={{background:"none",border:"none",cursor:"pointer",color:"#FFF0DD",opacity:0.6,fontSize:14,fontWeight:700,textTransform:"uppercase",letterSpacing:"0.06em",textAlign:"left",padding:0,fontFamily:"'Montserrat',sans-serif",transition:"opacity 0.2s"}}
                  onMouseEnter={e=>e.currentTarget.style.opacity="1"} onMouseLeave={e=>e.currentTarget.style.opacity="0.6"}>{s}</button>
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
                {[{icon:<IG s={16}/>,url:LK.instagram},{icon:<TK s={16}/>,url:LK.tiktok},{icon:<YT s={16}/>,url:LK.youtube}].map((s,i)=>(
                  <a key={i} href={s.url} target="_blank" rel="noopener noreferrer" style={{width:36,height:36,borderRadius:10,background:"rgba(255,255,255,0.06)",color:"rgba(255,240,221,0.5)",display:"flex",alignItems:"center",justifyContent:"center",textDecoration:"none",transition:"all 0.2s"}}
                  onMouseEnter={e=>{e.currentTarget.style.background="#F5ACC8";e.currentTarget.style.color="#1a1a1a"}} onMouseLeave={e=>{e.currentTarget.style.background="rgba(255,255,255,0.06)";e.currentTarget.style.color="rgba(255,240,221,0.5)"}}>
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
    </div>
  );
}
