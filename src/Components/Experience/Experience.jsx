import React from "react";
import Allora_logo from "../../assets/allora.png";
import Artronaut_logo from "../../assets/atronaut.png";

const Experience = () => {
  return (
    <div id="Experience" className="p-10 md:p-24">
      <h1 className="text-2xl md:text-4xl text-white font-bold">Experience</h1>
      <div className="flex flex-wrap items-center justify-around">
        <div className="flex gap-10 bg-slate-950 bg-opacity-45 mt-6 rounded-2xl p-4 items-center">
          <img src={Allora_logo} alt="Allorasoft Logo" className="w-12 h-12" />
          <span className="text-white">
            <h2 className="leading-tight">Frontend Developer, Allorasoft Pvt. Ltd</h2>
            <p className="text-sm leading-tight font-thin">
              Oct 2023 - Present
            </p>
            <ul className="list-disc list-inside text-sm p-10">
              <li>
                Developed and maintained responsive web applications using React.js and Tailwind CSS, resulting in a 25% increase in user engagement.
              </li>
              <li>Optimized application performance, improving load times by 40%</li>
              <li>
                Integrated RESTful APIs to fetch and display dynamic content from MongoDB and MySQL databases
              </li>
              <li>Actively participated in code reviews, providing constructive feedback to improve team code quality</li>
              <li>Participated in daily stand-up meetings and weekly sprint planning sessions</li>
            </ul>
          </span>
        </div>

        <div className="flex gap-10 bg-slate-950 bg-opacity-45 mt-6 rounded-2xl p-4 items-center">
          <img src={Artronaut_logo} alt="Artronaut Logo" className="w-20 h-20 mx-2" />
          <span className="text-white">
            <h2 className="leading-tight">Frontend Developer Intern, Artronaut Creatives</h2>
            <p className="text-sm leading-tight font-thin">Feb 2023 - April 2023</p>
            <ul className="list-disc list-inside text-sm p-10">
              <li>Assisted in developing and maintaining responsive web pages using HTML5, CSS3, and JavaScript.</li>
              <li>Collaborated with senior developers to implement new features for the company's main product</li>
              <li>Gained hands-on experience with different frameworks and executed it in projects</li>
            </ul>
          </span>
        </div>
      </div>
    </div>
  );
};

export default Experience;
