/* eslint-disable @next/next/no-img-element */

export default function FooterPublic() {
  return (
    <div className="bg-[#01438F] text-white p-4 flex justify-between items-center">
      <div>
        <img
          src="/icons/ffwpu_icon.svg"
          className="h-full w-auto"
          alt="Site Icon"
        />
      </div>
      <div>
        <a className="block text-sm" href="/home">
          Home
        </a>
        <a className="block text-sm" href="/about">
          About Us
        </a>
        <a className="block text-sm" href="/contacts">
          Contacts
        </a>
      </div>
    </div>
  );
}
