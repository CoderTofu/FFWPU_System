export default function FooterPublic() {
  return (
    <div className="bg-[#01438F] text-white p-8 px-[100px] flex justify-center md:justify-between items-center">
      <div className="flex gap-4 items-center">
        <img
          src="/icons/ffwpu_icon.svg"
          className="h-full w-auto hidden md:block"
          alt="Site Icon"
        />
        <h4 className="hidden md:block">
          Family Federation For World Peace and Unification
        </h4>
      </div>
      <div>
        <h4>© 2025</h4>
      </div>
    </div>
  );
}
