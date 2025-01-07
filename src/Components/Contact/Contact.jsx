import React, { useState } from "react";
import emailjs from "emailjs-com";
import { MdOutlineEmail } from "react-icons/md";
import { CiLinkedin } from "react-icons/ci";
import { FaGithub, FaMapMarkerAlt, FaPaperPlane } from "react-icons/fa";
import Notiflix from 'notiflix';

const Contact = () => {
  const [isSubmitting, setIsSubmitting] = useState(false);

  const sendEmail = (e) => {
    e.preventDefault();
    setIsSubmitting(true);

    emailjs.sendForm(
      import.meta.env.VITE_EMAILJS_SERVICE_ID,
      import.meta.env.VITE_EMAILJS_TEMPLATE_ID,
      e.target,
      import.meta.env.VITE_EMAILJS_PUBLIC_KEY
    )
      .then(
        (result) => {
          console.log("Email sent:", result.text);
          Notiflix.Notify.success("Message sent successfully! I'll get back to you soon.");
          e.target.reset();
        },
        (error) => {
          console.error("Error:", error.text);
          Notiflix.Notify.failure("Oops! Something went wrong. Please try again.");
        }
      )
      .finally(() => {
        setIsSubmitting(false);
      });
  };

  return (
    <div id="Contact" className="min-h-screen bg-gradient-to-br from-purple-50 via-white to-blue-50">
      <div className="container mx-auto px-4 py-20 md:py-18">
        {/* Header Section */}
        <div className="text-center mb-8">
          <div className="text-3xl md:text-4xl font-bold bg-gradient-to-r from-purple-600 to-blue-600 bg-clip-text text-transparent mb-3">
            Let's Connect!!
          </div>
          <p className="text-gray-600 text-sm md:text-base max-w-2xl mx-auto">
            Have a project in mind or just want to say hi? I'd love to hear from you.
          </p>
        </div>

        <div className="grid md:grid-cols-2 gap-10 max-w-6xl mx-auto">
          {/* Left Section - Contact Info */}
          <div className="bg-slate-100 rounded-xl p-6 shadow-md transform hover:scale-105 transition-all duration-300">
            <h2 className="text-xl font-semibold text-gray-800 mb-4">Send a Message 📩</h2>
            <form onSubmit={sendEmail} className="space-y-4">
              <div>
                <label htmlFor="from_name" className="block text-sm font-medium text-gray-700 mb-1">
                  Your Name
                </label>
                <input
                  type="text"
                  id="from_name"
                  name="from_name"
                  required
                  className="w-full px-3 py-2 rounded-lg border border-gray-300 focus:ring-2 focus:ring-purple-500 focus:border-transparent transition-all duration-300 outline-none"
                  placeholder="John Doe"
                />
              </div>

              <div>
                <label htmlFor="from_email" className="block text-sm font-medium text-gray-700 mb-1">
                  Your Email
                </label>
                <input
                  type="email"
                  id="from_email"
                  name="from_email"
                  required
                  className="w-full px-3 py-2 rounded-lg border border-gray-300 focus:ring-2 focus:ring-purple-500 focus:border-transparent transition-all duration-300 outline-none"
                  placeholder="john@example.com"
                />
              </div>

              <div>
                <label htmlFor="message" className="block text-sm font-medium text-gray-700 mb-1">
                  Message
                </label>
                <textarea
                  id="message"
                  name="message"
                  required
                  rows="4"
                  className="w-full px-3 py-2 rounded-lg border border-gray-300 focus:ring-2 focus:ring-purple-500 focus:border-transparent transition-all duration-300 outline-none resize-none"
                  placeholder="Your message here..."
                ></textarea>
              </div>

              <button
                type="submit"
                disabled={isSubmitting}
                className="w-full bg-gradient-to-r from-purple-600 to-blue-600 text-white font-medium py-2 px-4 rounded-lg 
                hover:from-purple-700 hover:to-blue-700 focus:outline-none focus:ring-2 focus:ring-purple-500 focus:ring-offset-2 
                transform hover:-translate-y-0.5 transition-all duration-300 disabled:opacity-50 disabled:cursor-not-allowed
                flex items-center justify-center space-x-2"
              >
                <span>{isSubmitting ? "Sending..." : "Send Message"}</span>
                <FaPaperPlane className={`${isSubmitting ? 'animate-ping' : ''}`} />
              </button>
            </form>
          </div>

          {/* Right Section - Contact Form */}
          <div className="bg-slate-100 rounded-xl p-6 shadow-md transform hover:scale-105 transition-all duration-300">
            <div className="space-y-6">
              <div>
                <h2 className="text-xl font-semibold text-gray-800 mb-4">Get in Touch</h2>
                <div className="space-y-4">
                  <div className="flex items-center space-x-3 group">
                    <div className="bg-purple-100 p-2 rounded-full group-hover:bg-purple-200 transition-colors">
                      <MdOutlineEmail size={22} className="text-purple-600" />
                    </div>
                    <div>
                      <p className="text-sm text-gray-500">Email</p>
                      <a
                        href="mailto:niharikasahu1299@gmail.com"
                        className="text-gray-800 hover:text-purple-600 transition-colors"
                      >
                        niharikasahu1299@gmail.com
                      </a>
                    </div>
                  </div>

                  <div className="flex items-center space-x-3 group">
                    <div className="bg-blue-100 p-2 rounded-full group-hover:bg-blue-200 transition-colors">
                      <CiLinkedin size={22} className="text-blue-600" />
                    </div>
                    <div>
                      <p className="text-sm text-gray-500">LinkedIn</p>
                      <a
                        href="https://linkedin.com/in/niharikasahu12"
                        target="_blank"
                        rel="noopener noreferrer"
                        className="text-gray-800 hover:text-blue-600 transition-colors"
                      >
                        linkedin.com/in/niharikasahu12
                      </a>
                    </div>
                  </div>

                  <div className="flex items-center space-x-3 group">
                    <div className="bg-gray-100 p-2 rounded-full group-hover:bg-gray-200 transition-colors">
                      <FaGithub size={22} className="text-gray-600" />
                    </div>
                    <div>
                      <p className="text-sm text-gray-500">GitHub</p>
                      <a
                        href="https://github.com/NiharikaSahu-12"
                        target="_blank"
                        rel="noopener noreferrer"
                        className="text-gray-800 hover:text-gray-600 transition-colors"
                      >
                        github.com/NiharikaSahu-12
                      </a>
                    </div>
                  </div>

                  <div className="flex items-center space-x-3 group">
                    <div className="bg-green-100 p-2 rounded-full group-hover:bg-green-200 transition-colors">
                      <FaMapMarkerAlt size={22} className="text-green-600" />
                    </div>
                    <div>
                      <p className="text-sm text-gray-500">Location</p>
                      <p className="text-gray-800">Umargam, Gujarat, India</p>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Footer Section */}
        <footer className="mt-6 text-center">
          <p className="text-gray-600 text-sm">
            Designed and Build by Niharika Sahu 💜, 2024 All Rights Reserved
          </p>
        </footer>
      </div>
    </div>
  );
};

export default Contact;
