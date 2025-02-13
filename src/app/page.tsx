import NavbarPublic from "@/components/navbarPublic";
import FooterPublic from "@/components/footerPublic";
import ChatbotWidget from "./../components/chatbotWidget";

export default function Home() {
  return (
    <div className="relative">
      <NavbarPublic />

      {/* BANNER */}
      <section className="relative">
        {/* Dark Overlay */}
        <div className="absolute bg-black bg-opacity-40 w-full h-full top-0 flex items-center pl-8 lg:pl-16">
          <div className="max-w-[1500px]">
            <h2 className="text-white text-4xl sm:text-6xl lg:text-7xl font-bold">
              FAMILY FEDERATION FOR WORLD PEACE AND UNIFICATION
            </h2>
            <p className="mt-4 text-lg md:text-xl lg:text-2xl text-gray-400">
              Empowering Youth for a Better World
            </p>
          </div>
        </div>
        {/* Message Content */}
        <img
          className="h-auto w-full max-h-[80vh] min-h-[600px] object-cover"
          src="/images/home_banner.png"
          alt="Site Banner"
        />
      </section>

      {/* Core Beliefs */}
      <section className="my-16">
        {/* Header */}
        <div className="md:px-20 mb-10 ">
          <h2 className="pl-5 text-3xl lg:text-4xl font-bold text-[#01438F] border-b-4 pb-8 border-[#BE9231]">
            CORE BELIEFS
          </h2>
        </div>
        {/* Beliefs Section */}
        <div className="flex-col flex lg:flex-row bg-[#D3B778] py-24 px-[100px] gap-10">
          <div className="flex justify-center flex-col">
            <img
              src="/icons/pray_icon.svg"
              alt="Pray Icon"
              className="h-[200px] mb-4"
            />
            <h3 className="text-center mb-4 text-white text-3xl">
              God as Our Heavenly Parent
            </h3>
            <p className="text-[#01438F] text-center font-light">
              We believe God is our loving Heavenly Parent, both father and
              mother, desiring a deep relationship with us. Our mission is to
              restore this connection and build one global family with God.
            </p>
          </div>
          <div className="flex justify-center flex-col">
            <img
              src="/icons/family_icon.svg"
              alt="Pray Icon"
              className="h-[200px] mb-4"
            />
            <h3 className="text-center mb-4 text-white text-3xl">
              True Parents & Divine Principle
            </h3>
            <p className="text-[#01438F] text-center font-light">
              True Parents embody God’s heart and love, leading us toward
              spiritual growth. The Divine Principle guides us in realizing our
              purpose and contributing to God’s dream of a harmonious world.
            </p>
          </div>
          <div className="flex justify-center flex-col">
            <img
              src="/icons/love_icon.svg"
              alt="Pray Icon"
              className="h-[200px] mb-4"
            />

            <h3 className="text-center mb-4 text-white text-3xl">
              The Marriage Blessing
            </h3>
            <p className="text-[#01438F] text-center font-light">
              The Marriage Blessing is a sacred tradition that strengthens
              marriages and families by dedicating them to God. It is a path to
              creating a world of lasting love and unity.
            </p>
          </div>
        </div>
      </section>

      {/* Chat Bot */}
      <section className="px-5 sm:p-0 my-16 flex justify-around flex-col sm:flex-row items-center">
        <div className="">
          <h3 className="text-4xl  lg:text-6xl font-bold text-[#BE9231]">
            Got Any Questions?
          </h3>
          <p className="font-light text-lg lg:text-xl mt-4">
            Our chatbot would be glad to answer your queries.
          </p>
        </div>
        <div className="mt-10 md:mt-0 shadow-2xl p-8 rounded-2xl">
          <img
            className="h-[150px] md:h-[150px]"
            src="/icons/chatbot_icon.svg"
            alt="Chatbot"
          />
        </div>
      </section>
      <ChatbotWidget />
      <FooterPublic />
    </div>
  );
}
