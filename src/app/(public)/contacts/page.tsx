import "./contacts.css";

export default function Contacts() {
  return (
    <div className="relative">
      {/* Section with "Have Any Questions?" */}
      <section className="px-5 sm:p-0 my-16 flex justify-around flex-col sm:flex-row items-center">
        <div className="max-w-md text-center sm:text-left">
          <h3 className="text-4xl sm:text-5xl lg:text-6xl font-bold text-[#BE9231]">
            Have Any <br /> Questions?
          </h3>
          <p className="font-light text-lg sm:text-xl lg:text-2xl mt-4">
            Our chatbot would be glad to answer <br /> your queries.
          </p>
        </div>
        <div className="mt-10 sm:mt-0 shadow-2xl p-8 rounded-2xl">
          <img
            className="h-[150px] sm:h-[180px] md:h-[200px]"
            src="/icons/chatbot_icon.svg"
            alt="Chatbot"
          />
        </div>
      </section>

      <div className="flex-col flex lg:flex-row bg-[#D3B778] py-24 px-6 lg:px-[100px] gap-10">
        {/* Email */}
        <div className="bg-white p-6 rounded-3xl w-[550px] h-[400px] mx-auto">
          <div className="flex justify-center items-center min-h-[120px]">
            <img src="/icons/email.png" 
            alt="email" 
            className="w-12 h-11" />
          </div>
          <p className="underline font-bold text-center mt-5 text-lg sm:text-xl md:text-2xl">EMAIL</p>
          <p className="text-center mt-3 text-gray-500 text-sm sm:text-base md:text-lg">Reach us through our email address</p>
          <p className="text-center mt-3 text-lg sm:text-xl md:text-2xl break-words">ummphils@gmail.com</p>
        </div>

        {/* Phone */}
        <div className="bg-white p-6 rounded-3xl w-[550px] h-[400px] mx-auto">
          <div className="flex justify-center items-center min-h-[115px]">
            <img src="/icons/phone.png" 
            alt="phone" 
            className="w-11 h-11" />
          </div>
          <p className="underline font-bold text-center mt-5 text-lg sm:text-xl md:text-2xl">PHONE</p>
          <p className="text-center mt-3 text-gray-500 text-sm sm:text-base md:text-lg">Reach us through our Phone number</p>
          <p className="text-center mt-3 text-lg sm:text-xl md:text-2xl break-words">(+63) 924 1833</p>
        </div>

        {/* Address */}
        <div className="bg-white p-6 rounded-3xl w-[550px] h-[400px] mx-auto">
          <div className="flex justify-center items-center min-h-[120px]">
            <img src="/icons/pin.png" 
            alt="pin" 
            className="w-11 h-11" />
          </div>
          <div className="text-center justify-center flex flex-col">
            <p className="underline font-bold mt-5 text-lg sm:text-xl md:text-2xl">ADDRESS</p>
            <p className="mt-3 text-gray-500 text-sm sm:text-base md:text-lg">Get to know where we're located </p>
            <p className="mt-3 text-lg sm:text-xl md:text-2xl break-words">Quezon City, Philippines</p>
          </div>
        </div>
      </div>
    </div>
  );
}
