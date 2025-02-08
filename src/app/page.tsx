import NavbarPublic from "@/components/navbarPublic";
import FooterPublic from "@/components/footerPublic";

export default function Home() {
  return (
    <div>
      <NavbarPublic />
      {/* BANNER */}
      <div className="relative">
        {/* Dark Overlay */}
        <div className="absolute bg-black opacity-40 w-full h-full top-0"></div>
        <img
          className="h-auto w-auto w-full max-h-[80vh] object-cover"
          src="/images/home_banner.png"
          alt="Site Banner"
        />
      </div>
      <FooterPublic />
    </div>
  );
}
