"use client";

import { motion } from "framer-motion";
import ChatbotWidget from "@/components/ChatbotWidget";

const cardVariants = {
  hidden: { opacity: 0, scale: 0.8, y: 50 },
  visible: { opacity: 1, scale: 1, y: 0, transition: { duration: 1 } },
};

const fadeUpVariants = {
  hidden: { opacity: 0, y: 50 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.8, ease: "easeOut" } },
};

const fadeUpLoadVariants = {
  hidden: { opacity: 0, y: 50 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.8, ease: "easeOut" } },
};

export default function Home() {
  return (
    <div className="relative bg-white">
      {/* Landing */}
      <section
        className="w-full min-h-screen flex flex-col justify-center items-center relative overflow-hidden"
        id="home"
      >
        {/* Slogan */}
        <motion.div
          initial="hidden"
          animate="visible"
          variants={{
            visible: {
              transition: {
                staggerChildren: 0.2,
              },
            },
          }}
          className="relative z-10 space-y-4 w-full px-[100px] py-[200px]"
        >
          <motion.h1
            variants={fadeUpLoadVariants}
            className="text-8xl md:text-18xl font-extrabold text-[#1C5CA8] leading-tight font-instrument"
          >
            Family Federation for World Peace and Unification
          </motion.h1>

          <motion.p
            variants={fadeUpLoadVariants}
            className="text-xl md:text-4lg text-gray-700 font-instrument"
          >
            Empowering youth for a better world!
          </motion.p>
        </motion.div>

        {/* Core Beliefs Section */}
        <section className="relative z-10 py-20 px-6 flex flex-col items-center w-full">
          <motion.div
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, amount: 0.3 }}
            variants={{
              visible: {
                transition: {
                  staggerChildren: 0.25,
                },
              },
            }}
            className="max-w-[1600px] w-full bg-white p-8 py-12 rounded-lg shadow-2xl"
          >
            {/* Heading */}
            <motion.h2
              variants={cardVariants}
              className="text-4xl md:text-6xl font-bold text-[#1C5CA8] text-center mb-16 font-instrument"
            >
              Core Beliefs
            </motion.h2>

            {/* Cards */}
            <div className="flex flex-wrap justify-center gap-6 md:gap-8">
              {/* Card 1 */}
              <motion.div
                variants={cardVariants}
                className="rounded-xl overflow-hidden shadow-md relative group w-[380px] md:w-[420px]"
              >
                <img
                  src="/images/corebelief/corebelief1.png"
                  alt="Heavenly Parent"
                  className="w-full h-[440px] object-cover"
                />
                <div className="absolute inset-0 bg-black bg-opacity-30 transition-all duration-500 ease-out group-hover:bg-opacity-50"></div>{" "}
                <div className="absolute inset-0 flex flex-col justify-between p-8 text-white">
                  <h3 className="text-3xl font-semibold font-instrument">
                    God as our Heavenly Parent
                  </h3>
                  <p className="text-base font-instrument">
                    We believe God is our loving Heavenly Parent, seeking a
                    close bond with us. Our mission is to rebuild that
                    connection and unite as one global family.
                  </p>
                </div>
              </motion.div>

              {/* Card 2 */}
              <motion.div
                variants={cardVariants}
                className="rounded-xl overflow-hidden shadow-md relative group w-[380px] md:w-[420px]"
              >
                <img
                  src="/images/corebelief/corebelief2.png"
                  alt="True Parents"
                  className="w-full h-[440px] object-cover"
                />
                <div className="absolute inset-0 bg-black bg-opacity-30 group-hover:bg-opacity-50 transition-all duration-500 ease-out"></div>
                <div className="absolute inset-0 flex flex-col justify-between p-8 text-white">
                  <h3 className="text-3xl font-semibold font-instrument">
                    True Parents and Divine Principle
                  </h3>
                  <p className="text-base font-instrument">
                    True Parents show God's love and guide our spiritual growth.
                    The Divine Principle helps us live our purpose and build a
                    peaceful world.
                  </p>
                </div>
              </motion.div>

              {/* Card 3 */}
              <motion.div
                variants={cardVariants}
                className="rounded-xl overflow-hidden shadow-md relative group w-[380px] md:w-[420px]"
              >
                <img
                  src="/images/corebelief/corebelief3.png"
                  alt="Marriage Blessing"
                  className="w-full h-[440px] object-cover"
                />
                <div className="absolute inset-0 bg-black bg-opacity-30 group-hover:bg-opacity-50 transition-all duration-500 ease-out"></div>
                <div className="absolute inset-0 flex flex-col justify-between p-8 text-white">
                  <h3 className="text-3xl font-semibold font-instrument">
                    The Marriage Blessing
                  </h3>
                  <p className="text-base font-instrument">
                    The Marriage Blessing is a sacred vow to God that
                    strengthens families and builds a world of love and unity.
                  </p>
                </div>
              </motion.div>
            </div>
          </motion.div>
        </section>

        {/* Absolute Pane Design */}
        <div className="pane w-screen h-screen absolute top-0"></div>
      </section>

      <section
        className="relative z-10 py-20 px-6 flex flex-col items-center w-full"
        id="about"
      >
        <motion.div
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, amount: 0.2 }}
          variants={{
            visible: {
              transition: {
                staggerChildren: 0.2,
              },
            },
          }}
          className="max-w-[1600px] w-full bg-white px-8 md:px-16 py-12 rounded-lg shadow-2xl flex flex-col lg:flex-row gap-x-6 gap-y-12"
        >
          {/* Left Side */}
          <motion.div
            variants={fadeUpVariants}
            className="flex-1 flex flex-col gap-8"
          >
            <div>
              <div className="text-6xl md:text-6xl font-extrabold leading-tight font-instrument">
                <div className="hidden lg:block">
                  <span className="text-[#1C5CA8]">God's Dream, </span> <br />
                  <span className="text-[#EFC017]">One Family,</span>
                </div>
                <div className="block lg:hidden text-center">
                  <span className="text-[#1C5CA8]">God's Dream, </span>
                  <span className="text-[#EFC017]">One Family,</span>
                </div>
              </div>
            </div>

            <motion.p
              variants={fadeUpVariants}
              className="font-instrument text-lg leading-10"
            >
              The Family Federation is a global movement that, like its
              birthplace South Korea, has experienced remarkable growth. Sun
              Myung Moon, its founder, was called by Jesus Christ to his mission
              in 1935, during Korea’s harsh Japanese occupation. After Korea’s
              liberation in 1945, he faced brutal persecution under North
              Korea’s communist regime, enduring imprisonment and torture.{" "}
              <br /> <br />
              Despite these hardships, he continued preaching and, during the
              Korean War, founded the Unification Church with a small group of
              followers. By 1996, the Family Federation had expanded worldwide.
            </motion.p>

            <motion.div
              variants={fadeUpVariants}
              className="border-[#EFC017] border-4 rounded shadow-lg"
            >
              <img
                src="/images/about/about1.png"
                className="w-full h-auto aspect-[303/182]"
                alt=""
              />
            </motion.div>
          </motion.div>

          {/* Right Side */}
          <motion.div
            variants={fadeUpVariants}
            className="flex-1 flex flex-col gap-8"
          >
            <motion.div
              variants={fadeUpVariants}
              className="border-[#EFC017] border-4 rounded shadow-lg"
            >
              <img
                src="/images/about/about2.png"
                className="w-full h-auto aspect-[562.87/376.00]"
                alt=""
              />
            </motion.div>

            <motion.p
              variants={fadeUpVariants}
              className="font-instrument text-lg leading-10"
            >
              The Divine Principle, Father Moon’s core teachings, was originally
              written for Christians but later broadened to a wider audience.
              The Family Federation became the first movement of its kind
              founded by a couple—Father and Mother Moon. Since Father Moon’s
              passing in 2012, Mother Moon has continued spreading their vision,
              gaining recognition from major religious groups
            </motion.p>

            <motion.div
              variants={fadeUpVariants}
              className="border-[#EFC017] border-4 rounded shadow-lg"
            >
              <img
                src="/images/about/about3.png"
                className="w-full h-auto aspect-[3/2]"
                alt=""
              />
            </motion.div>
          </motion.div>
        </motion.div>
      </section>

      <ChatbotWidget />
    </div>
  );
}
