"use client";

import { Swiper, SwiperSlide } from "swiper/react";
import { Autoplay, EffectFade } from "swiper/modules";
import "swiper/css";
import "swiper/css/effect-fade";

import ChatbotWidget from "@/components/ChatbotWidget";

export default function Home() {
  const bannerImages = [
    { src: "1", label: "Family Federation for World Peace and Unification", sub: "Empowering Youth for a Better World" },
    { 
      src: "2", 
      label: "We unite in the spirit of peace to build a brighter tomorrow.", 
      sub: "Building global unity through service." 
    },
    { 
      src: "3", 
      label: "Love is the foundation for a world of hope, harmony, and happiness.", 
      sub: "Creating a future centered on families." 
    }
  ];

  return (
    <div className="relative" id="random_id">
      {/* BANNER */}
      <section className="relative overflow-hidden bg-black">
        <Swiper
          modules={[Autoplay, EffectFade]}
          autoplay={{ delay: 5000, disableOnInteraction: false }}
          effect="fade"
          loop={true}
          className="relative h-[80vh] min-h-[600px]"
        >
          {bannerImages.map((banner, index) => (
            <SwiperSlide key={index} className="relative">
              {/* Background image */}
              <img
                src={`/images/banners/${banner.src}.png`}
                alt={`Banner ${index + 1}`}
                className="h-full w-full object-cover"
              />

              {/* Overlay */}
              <div className="absolute inset-0 bg-black bg-opacity-40 z-10 flex items-center justify-between px-10 lg:px-20">
                {/* Left Text */}
                <div className="max-w-[1000px] z-20">
                  <h2 className="text-white text-3xl sm:text-5xl lg:text-6xl font-bold leading-tight drop-shadow-md mb-6">
                    {banner.label}
                  </h2>
                  <p className="inline-block bg-[#FFD700] text-[#000] px-4 py-2 rounded-sm font-light italic text-2xl">
                    {banner.sub}
                  </p>
                </div>

              </div>
            </SwiperSlide>
          ))}
        </Swiper>
      </section>

      {/* Core Beliefs */}
      <section className="my-16">
        {/* Header */}
        <div className="md:px-20 mb-10 ">
          <h2 className="pl-5 text-3xl lg:text-4xl font-bold text-[#0176B2] border-b-4 pb-8 border-[#BE9231]">
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
            <p className="text-[#0176B2] text-center font-light">
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
            <p className="text-[#0176B2] text-center font-light">
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
            <p className="text-[#0176B2] text-center font-light">
              The Marriage Blessing is a sacred tradition that strengthens
              marriages and families by dedicating them to God. It is a path to
              creating a world of lasting love and unity.
            </p>
          </div>
        </div>
      </section>

      {/* Chat Bot */}
      <section className="min-h-[400px] my-24 px-6 md:px-20 flex flex-col-reverse sm:flex-row items-center justify-center gap-10 bg-[#F5F5F5] rounded-3xl shadow-inner py-16">
        {/* Chatbot Icon */}
        <div className="w-full sm:w-auto flex justify-center">
          <div className="bg-white p-8 rounded shadow-xl">
            <img
              src="/icons/chatbot_icon.svg"
              alt="Chatbot"
              className="h-[120px] w-[120px] sm:h-[150px] sm:w-[150px]"
            />
          </div>
        </div>

        {/* Text */}
        <div className="text-center sm:text-left w-full sm:max-w-xl">
          <h3 className="text-4xl sm:text-5xl font-bold text-[#BE9231] leading-snug">
            Got Any Questions?
          </h3>
          <p className="font-light text-lg sm:text-xl text-gray-700 mt-4">
            Our chatbot is ready to help you with your concerns and inquiries.
          </p>
          <p className="mt-2 text-base text-gray-500">
            Click the chat icon below to start a conversation.
          </p>
        </div>
      </section>

      <ChatbotWidget />
    </div>
  );
}