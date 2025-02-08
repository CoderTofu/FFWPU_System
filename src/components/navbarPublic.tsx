/* eslint-disable @next/next/no-img-element */

export default function NavbarPublic() {
  return (
    <div className="bg-[#01438F] text-white p-4 flex justify-between items-center">
      <div>
        <img
          src="/icons/ffwpu_icon.svg"
          className="h-full w-auto"
          alt="Site Icon"
        />
      </div>
      <div className="flex gap-2 font-semibold">
        <a href="/home">Home</a>
        <a href="/about">About Us</a>
        <a href="/contacts">Contacts</a>
      </div>
    </div>
  );
}
