"use client";
import { useState } from "react";
import { usePathname } from "next/navigation";
import Link from "next/link";

const MenuI=()=><svg width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round"><line x1="3" y1="6" x2="21" y2="6"/><line x1="3" y1="12" x2="21" y2="12"/><line x1="3" y1="18" x2="21" y2="18"/></svg>;
const CloseI=()=><svg width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round"><line x1="18" y1="6" x2="6" y2="18"/><line x1="6" y1="6" x2="18" y2="18"/></svg>;

// Nav items: some go to subpages, some anchor to homepage sections
const NAV_ITEMS = [
  { label: "subscribe", href: "/#subscribe" },
  { label: "episodes", href: "/episodes" },
  { label: "blog", href: "/blog" },
  { label: "about", href: "/#about" },
  { label: "contact", href: "/#contact" },
];

export default function SharedNav() {
  const [menuOpen, setMenuOpen] = useState(false);
  const pathname = usePathname();
  const isHome = pathname === "/";

  return (
    <>
      <nav className="c" style={{
        position: isHome ? "relative" : "fixed",
        top: 0, left: 0, right: 0, zIndex: 100,
        padding: "14px clamp(24px,5vw,80px)",
        background: isHome ? "transparent" : "rgba(255,240,221,0.92)",
        backdropFilter: isHome ? "none" : "blur(12px)",
        WebkitBackdropFilter: isHome ? "none" : "blur(12px)",
        borderBottom: isHome ? "none" : "1px solid rgba(0,0,0,0.06)",
      }}>
        <div style={{maxWidth:1200,margin:"0 auto",display:"flex",alignItems:"center",justifyContent:"space-between"}}>
          <Link href="/" style={{cursor:"pointer"}}>
            <img src="/images/nav-logo.png" alt="Trying Very Hard" style={{height:36,borderRadius:8}}/>
          </Link>
          <div className="desk" style={{display:"flex",gap:32}}>
            {NAV_ITEMS.map(item => (
              <Link key={item.label} href={item.href} className="nl" style={{
                fontSize:13,fontWeight:700,letterSpacing:"0.1em",textTransform:"uppercase",
                color:"#1a1a1a",textDecoration:"none",padding:"6px 0",position:"relative",
              }}>{item.label}</Link>
            ))}
          </div>
          <button className="mob" onClick={()=>setMenuOpen(true)} style={{background:"none",border:"none",cursor:"pointer"}}><MenuI/></button>
        </div>
      </nav>

      {menuOpen && (
        <div style={{position:"fixed",inset:0,zIndex:1000,background:"#FFF0DD",display:"flex",flexDirection:"column",alignItems:"center",justifyContent:"center",gap:28}}>
          <button onClick={()=>setMenuOpen(false)} style={{position:"absolute",top:20,right:20,background:"none",border:"none",cursor:"pointer"}}><CloseI/></button>
          {NAV_ITEMS.map(item => (
            <Link key={item.label} href={item.href} onClick={()=>setMenuOpen(false)} style={{
              fontSize:28,fontWeight:700,textTransform:"uppercase",letterSpacing:"0.08em",
              color:"#1a1a1a",textDecoration:"none",
            }}>{item.label}</Link>
          ))}
        </div>
      )}
    </>
  );
}
