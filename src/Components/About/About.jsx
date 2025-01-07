import React from "react";
import { IoArrowForward } from "react-icons/io5";
import AboutImg from "../../assets/about.png";

const About = () => {
  return (
    <section
      id="About"
      className="bg-gradient-to-br from-slate-800 via-slate-900 to-black text-white min-h-screen flex items-center"
    >
      <div className="container mx-auto px-6 py-16">
        {/* Section Heading */}
        <h2 className="text-3xl md:text-4xl font-bold text-center mb-8">
          About Me
        </h2>

        {/* Main Content */}
        <div className="flex flex-col lg:flex-row items-center justify-between gap-8">
          {/* Left Section: Image */}
          <div
            className="relative lg:w-1/2 flex justify-center"
            data-aos="fade-right"
          >
            <img
              src={AboutImg}
              alt="Frontend Developer"
              className="w-full max-w-md rounded-lg shadow-lg"
            />
          </div>

          {/* Right Section: Text */}
          <div
            className="lg:w-1/2 max-w-2xl space-y-4"
            data-aos="fade-left"
            data-aos-delay="200"
          >
            <p className="text-gray-300 text-lg leading-relaxed">
              Hello! I’m a Frontend Developer focused on creating intuitive and
              responsive web applications. With over 1+ year of experience in web
              development, I specialize in HTML, CSS, JavaScript, and React to
              build seamless user experiences.
            </p>
            <p className="text-gray-300 text-lg leading-relaxed">
              I enjoy transforming ideas into functional, visually appealing
              websites. With a keen eye for design and detail, I aim to ensure
              every project is both user-friendly and high-performance.
            </p>
            <p className="text-gray-300 text-lg leading-relaxed">
              When I’m not coding, I spend my time exploring the latest trends
              in web development and design, and I’m always open to collaborating
              on projects that push creative boundaries.
            </p>

            {/* Highlight Section */}
            <div className="flex gap-4 items-center">
              <IoArrowForward
                className="text-blue-500 text-2xl"
                size={24}
              />
              <p className="text-gray-400 text-sm italic">
                "The best way to predict the future is to create it." – Abraham Lincoln
              </p>
            </div>

            {/* Call-to-Action Button */}
            <div className="mt-6">
              <a
                href="#Contact"
                className="bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700 text-white font-medium py-3 px-6 rounded-xl shadow-lg transform hover:-translate-y-1 transition-all duration-300 flex items-center gap-3 max-w-xs"
              >
                <span>Let’s Connect</span>
                <IoArrowForward />
              </a>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default About;