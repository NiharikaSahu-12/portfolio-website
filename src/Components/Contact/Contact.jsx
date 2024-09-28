import React from "react";
import { MdOutlineEmail } from "react-icons/md";
import { CiLinkedin } from "react-icons/ci";
import { FaGithub } from "react-icons/fa";

const Contact = () => {
  return (
    <div id="Contact" className="flex items-center justify-center min-h-screen bg-gradient-to-b from-gray-200 to-gray-100 p-10">
      <div className="flex flex-col items-center max-w-5xl w-full">
        <h1 className="text-3xl md:text-5xl font-bold text-[#465697] mb-4 text-center">Contact Me</h1>
        <p className="text-md md:text-lg text-gray-700 mb-8 text-center">
          I would love to hear from you! Please fill out the form below to get in touch.
        </p>

        <div className="flex w-full space-x-8">
          {/* Contact Form */}
          <form className="w-full max-w-lg bg-white shadow-lg rounded-lg p-8 space-y-4 border border-gray-300 flex-1">
            <div>
              <input
                type="text"
                placeholder="Your Name"
                required
                className="shadow appearance-none border rounded w-full py-3 px-4 text-gray-700 leading-tight focus:outline-none focus:ring-2 focus:ring-[#465697] transition duration-300"
              />
            </div>

            <div>
              <input
                type="email"
                placeholder="Your Email"
                required
                className="shadow appearance-none border rounded w-full py-3 px-4 text-gray-700 leading-tight focus:outline-none focus:ring-2 focus:ring-[#465697] transition duration-300"
              />
            </div>

            <div>
              <textarea
                placeholder="Your Message"
                required
                rows="4"
                className="shadow appearance-none border rounded w-full py-3 px-4 text-gray-700 leading-tight focus:outline-none focus:ring-2 focus:ring-[#465697] transition duration-300"
              ></textarea>
            </div>
            <button
              type="submit"
              className="bg-[#465697] hover:bg-blue-700 text-white font-bold py-3 px-6 rounded focus:outline-none focus:shadow-outline transition duration-300 transform hover:scale-105"
            >
              Send Message
            </button>
          </form>

          {/* Links Section */}
          <div className="flex flex-col w-full max-w-xs">
            <p className="text-xl font-semibold mb-4">Connect with me:</p>
            <ul className="text-sm md:text-lg space-y-2">
              <li className="flex items-center">
                <MdOutlineEmail size={20} className="mr-2" />
                <a href="mailto:niharikasahu1299@gmail.com" className="text-[#465697] hover:underline transition duration-300" title="Send an email to sahuniharika1211@gmail.com">
                  niharikasahu1299@gmail.com
                </a>
              </li>
              <li className="flex items-center">
                <CiLinkedin size={20} className="mr-2" />
                <a href="https://linkedin.com/in/niharikasahu12" target="_blank" rel="noopener noreferrer" className="text-[#465697] hover:underline transition duration-300">
                  linkedin.com/in/niharikasahu12
                </a>
              </li>
              <li className="flex items-center">
                <FaGithub size={20} className="mr-2" />
                <a href="https://github.com/NiharikaSahu-12" target="_blank" rel="noopener noreferrer" className="text-[#465697] hover:underline transition duration-300">
                  github.com/NiharikaSahu-12
                </a>
              </li>
            </ul>
          </div>
        </div>

        {/* Footer Section */}
        <footer className="mt-8 w-full border-t border-gray-300 pt-4 text-center text-sm text-gray-600">
        <p className="text-xs md:text-sm mt-2">&copy; {new Date().getFullYear()} Made with 💜 by Niharika Sahu.</p>
        </footer>
      </div>
    </div>
  );
};

export default Contact;
