'use client';

export default function FooterPublic() {
  return (
    <footer className="bg-white shadow-xl px-[100px] py-8 flex flex-col sm:flex-row justify-between items-center text-black">
      {/* Left: Logo and Label */}
      <div className="flex gap-4 items-center">
        <img src="/icons/ffwpu_icon.svg" alt="FFWPU Logo" className="h-12 w-auto" />
        <div className="text-[#1C5CA8] averia-font italic leading-tight">
          <h1 className="text-[18px] font-semibold">FFWPU</h1>
          <h1 className="text-[18px] font-semibold">PHILIPPINES</h1>
        </div>
      </div>

      {/* Right: Contact Info */}
      <div className="flex flex-col items-center sm:items-end mt-6 sm:mt-0 text-right text-sm font-instrument">
        <p className="font-bold text-[12px]">CONTACT US</p>
        <p className="text-[14px] mt-1">0932 924 1833</p>
        <p className="text-[13px] mt-1">umphils@gmail.com</p>
        <a
          href="https://facebook.com/ffwpu"
          target="_blank"
          rel="noopener noreferrer"
          className="mt-2"
        >
          <img src="/icons/facebook.svg" alt="Facebook" className="h-5 w-5" />
        </a>
      </div>
    </footer>
  );
}
