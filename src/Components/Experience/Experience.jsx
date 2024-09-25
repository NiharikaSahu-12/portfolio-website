import React from "react";
import Allora_logo from "../../assets/allora.png";
import Artronaut_logo from "../../assets/atronaut.png";

const Experience = () => {
  return (
    <div id="Experience" className="p-10 md:p-24 bg-slate-900">
      <h1 className="text-4xl md:text-5xl text-white font-bold mb-24 text-center">Experience</h1>
      <div className="flex flex-col lg:flex-row gap-8">
        <ExperienceCard
          logo={Allora_logo}
          alt="Allorasoft Logo"
          title="Frontend Developer, Allorasoft Pvt. Ltd"
          date="Oct 2023 - Present"
          responsibilities={[
            "Developed and maintained responsive web applications using React.js and Tailwind CSS, resulting in a 25% increase in user engagement.",
            "Optimized application performance, improving load times by 40%",
            "Integrated RESTful APIs to fetch and display dynamic content from MongoDB and MySQL databases",
            "Actively participated in code reviews, providing constructive feedback to improve team code quality",
            "Participated in daily stand-up meetings and weekly sprint planning sessions",
          ]}
        />
        <ExperienceCard
          logo={Artronaut_logo}
          alt="Artronaut Logo"
          title="Frontend Developer Intern, Artronaut Creatives LLP"
          date="Feb 2023 - April 2023"
          responsibilities={[
            "Assisted in developing and maintaining responsive web pages using HTML5, CSS3, and JavaScript.",
            "Collaborated with senior developers to implement new features for the company's main product",
            "Gained hands-on experience with different frameworks and executed it in projects",
          ]}
        />
      </div>
    </div>
  );
};

const ExperienceCard = ({ logo, alt, title, date, responsibilities }) => {
  return (
    <div className="flex-1 bg-slate-950 bg-opacity-45 rounded-2xl p-6 flex flex-col shadow-lg shadow-slate-800">
      <div className="flex items-center mb-4">
        <img src={logo} alt={alt} className="w-16 h-16 object-contain mr-4" />
        <div>
          <h2 className="text-white text-lg font-semibold">{title}</h2>
          <p className="text-sm text-gray-400">{date}</p>
        </div>
      </div>
      <ul className="list-disc list-inside text-sm text-white space-y-2 mt-4">
        {responsibilities.map((item, index) => (
          <li key={index}>{item}</li>
        ))}
      </ul>
    </div>
  );
};

export default Experience;
