interface Experience {
    title: string;
    companyName: string;
    icon: string;
    iconBg: string;
    date: string;
    points: string[];
}
  
interface Contact {
    title: string;
    icon?: string; 
    link?: string; 
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
  

export const contact: Contact[] = [
    {
        title: "LinkedIn",
        link: "https://www.linkedin.com/in/ivan-webster-razo-1243952a5",
        icon: "/Icon/linkedin.svg", 
    },
    {
        title: "GitHub",
        link: "https://github.com/ivanrazo17", 
        icon: "/Icon/github.svg", 
    },
    {
        title: "CV",
        link: "/RazoResume.pdf", 
        icon: "/Icon/cv.svg",
    },
];
