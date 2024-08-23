interface Experience {
    title: string;
    companyName: string;
    icon: string;
    iconBg: string;
    date: string;
    points: string[];
  }
  

interface Hobby {
    title: string;
    icon: string;
  }
  
export const experiences: Experience[] = [
    {
      title: "Professional Development",
      companyName: "Self-Learning Journey",
      icon: "/Company/ProfessionalDevelopment.png",
      iconBg: "#383E56",
      date: "February 2023 - Present",
      points: [
        "Dedicated to self-learning advanced libraries and frameworks for web development and UI/UX technologies.",
        "Focused on mastering Figma, JavaScript and React, Next,js, Three.js.",
        "Next professional development is back end technologies",
        "Completed multiple projects to apply and enhance new skills.",
        "Looking for a job opportunity as a Web Developer, Data Analytics and UI/UX Designer"
      ],
    },
    {
      title: "IC Layout Intern",
      companyName: "Xinyx Design Consultancy & Services, Inc",
      icon: "/Company/Xinyx.jpg",
      iconBg: "#E6DEDD",
      date: "June 2023 - July 2023",
      points: [
        "Completed the OJT Training Program about CMOS technology schematic and layout.",
        "Understood Common Design Rule Manuals of CMOS technology.",
        "Familiarized with Custom Compiler Synopsys.",
        "Designed 9 Tracks Standard Cell layouts 90nm.",
        "Implemented and contributed leadership, good communication, and qualified layouts to the company."
      ],
    },
    {
      title: "Internship Trainee",
      companyName: "Tritec Integrated Philippines Inc",
      icon: "/Company/Tritec.png",
      iconBg: "#383E56",
      date: "November 2019 - November 2019",
      points: [
        "Revised employee handbook.",
        "Designed publication materials regarding products and services of the company.",
        "Endorsement and procurement of products and services to establishments.",
        "Managed employee applicants and interviews.",
        "Troubleshot computer technical errors",
        "Handled company needs in printing, sorting of documents, and receipt audits",
      ],
    }
  ];
  
  export const hobbies: Hobby[] = [
    {
      title: "Web Developer",
      icon: "/HobbiesIcon/WebDeveloper.png",
    },
    {
      title: "AI Researcher",
      icon: "/HobbiesIcon/AIResearcher.png",
    },
    {
      title: "Cosplay Artisan",
      icon: "/HobbiesIcon/CosplayArtisan.png",
    },
    {
      title: "Game Collector",
      icon: "/HobbiesIcon/VideoGameCollector.png",
    },
  ];
  