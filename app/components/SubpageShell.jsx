"use client";
import { usePathname } from "next/navigation";
import SharedNav from "./SharedNav";
import SharedFooter from "./SharedFooter";

export default function SubpageShell({ children }) {
  const pathname = usePathname();
  const isHome = pathname === "/";

  // Homepage renders its own nav/footer inside HomeClient
  // Subpages get the shared nav/footer from here
  if (isHome) {
    return <>{children}</>;
  }

  return (
    <>
      <SharedNav />
      <div style={{ paddingTop: 56 }}>{children}</div>
      <SharedFooter />
    </>
  );
}
