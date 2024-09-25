import React from "react";
import { IoArrowForward } from "react-icons/io5";
import AboutImg from "../../assets/7358653-removebg-preview.png";

const About = () => {
  return (
    <section id="About" className="bg-slate-900 text-white min-h-screen flex items-center">
      <div className="container mx-auto px-4 py-16">
        <h2 className="text-4xl md:text-5xl font-bold mb-8 text-center">About Me!</h2>
        <div className="flex flex-col lg:flex-row items-center justify-center gap-8">
          <div className="lg:w-1/2 flex justify-center">
            <img 
              src={AboutImg} 
              alt="Frontend Developer" 
              className="w-full max-w-md"
            />
          </div>
          <div className="lg:w-1/2 max-w-2xl">
            <div className="flex items-start gap-4">
              <IoArrowForward className="text-primary mt-1 flex-shrink-0" size={24} />
              <div>
                <h3 className="text-2xl font-semibold mb-4">Frontend Developer</h3>
                <p className="text-gray-300 leading-relaxed">
                  As a highly skilled Frontend Developer with 1+ years of experience, I am proficient in HTML, CSS, 
                  and JavaScript. My ability to create visually appealing and user-friendly websites has led to 
                  successful collaborations with clients across various industries. With a strong attention to detail 
                  and problem-solving skills, I am constantly seeking new challenges to enhance my expertise. Let me 
                  bring my passion for creating seamless online experiences to your team.
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default About;