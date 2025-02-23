import ChatbotWidget from "../../../components/ChatbotWidget";

export default function About() {
  return (
    <div className="relative">
      <section className="relative">
        {/* Dark Overlay */}
        <div className="absolute bg-black bg-opacity-40 w-full h-full top-0 flex flex-col justify-center items-center text-center px-5">
          <h2 className="text-white text-3xl sm:text-5xl md:text-6xl lg:text-7xl font-bold [text-shadow:0_3px_0_rgb(0_0_0/40%)]">
            ABOUT US
          </h2>
        </div>

        <img
          className="h-[50vh] sm:h-[60vh] md:h-[70vh] lg:h-[80vh] w-full object-cover"
          src="/images/about_banner.png"
          alt="Site Banner"
        />
      </section>

      {/* Our Story */}
      <section className="my-16 px-5 sm:px-10 md:px-20">
        {/* Header */}
        <div className="mb-10">
          <h2 className="text-3xl lg:text-4xl font-bold text-[#01438F] border-b-4 pb-8 border-[#BE9231]">
            OUR STORY
          </h2>
        </div>

        <div className="text-2xl max-w-[1168px] mx-auto text-justify leading-relaxed tracking-normal px-8 md:px-16">
          <p>
            The Family Federation is a global movement that, like its birthplace
            South Korea, has experienced remarkable growth. Sun Myung Moon, its
            founder, was called by Jesus Christ to his mission in 1935, during
            Korea’s harsh Japanese occupation. After Korea’s liberation in 1945,
            he faced brutal persecution under North Korea’s communist regime,
            enduring imprisonment and torture. Despite these hardships, he
            continued preaching and, during the Korean War, founded the
            Unification Church with a small group of followers. By 1996, the
            Family Federation had expanded worldwide.
          </p>

          <p className="mt-10">
            The Divine Principle, Father Moon’s core teachings, was originally
            written for Christians but later broadened to a wider audience. The
            Family Federation became the first movement of its kind founded by a
            couple—Father and Mother Moon. Since Father Moon’s passing in 2012,
            Mother Moon has continued spreading their vision, gaining
            recognition from major religious groups.
          </p>
        </div>

        <div className="flex flex-wrap justify-center gap-8 mt-20 drop-shadow-2xl">
          <div className="card w-full sm:w-[442px] bg-white rounded-3xl">
            <div className="img-area flex justify-center">
              <img
                src="/images/sun myung moon.png"
                alt="Sun Myung Moon"
                className="rounded-lg w-full sm:w-[442px] h-auto"
              />
            </div>

            <div className="text-area">
              <p className="mt-4 mb-4 text-center text-2xl sm:text-3xl font-semibold">
                Sun Myung Moon
              </p>
            </div>
          </div>

          <div className="card w-full sm:w-[442px] bg-white rounded-3xl">
            <div className="img-area flex justify-center">
              <img
                src="/images/hak moon.png"
                alt="Hak Moon"
                className="rounded-lg w-full sm:w-[442px] h-auto"
              />
            </div>

            <div className="text-area">
              <p className="mt-4 mb-4 text-center text-2xl sm:text-3xl font-semibold">
                Hak Ja Han Moon
              </p>
            </div>
          </div>
        </div>

        {/* Mission & Vision */}
        <div className="mb-10 mt-[90px]">
          <h2 className="text-3xl lg:text-4xl font-bold text-[#01438F] border-b-4 pb-8 border-[#BE9231]">
            MISSION & VISION
          </h2>
        </div>

        <div className="text-2xl mx-auto text-left sm:text-justify">
          <p>
            The Family Federation for World Peace and Unification strives to
            build a peaceful world, not a new religion. Our vision is a global
            family where people of all faiths live in harmony, recognizing God
            as our Heavenly Parent. A better future and lasting peace depend on
            renewing the family, the foundation of society. Strong families
            shape future generations, and at their core is the married couple.
          </p>

          <p className="mt-10">
            Our goal is a world where all people live in love and harmony—with
            themselves, their families, and their communities—creating a future
            of peace, freedom, and happiness for all.
          </p>
        </div>
      </section>

      <ChatbotWidget />
    </div>
  );
}
