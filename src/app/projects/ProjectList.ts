interface Project {
  projectNum: number;
  projectName: string;
  scale: [number, number, number];
  position: [number, number, number];
  modelSrc: string;
  href: string;
  status: string;     
  description: string; 
  techStacks: string[]; 
}

const ProjectList: Project[] = [
  {
    projectNum: 1,
    projectName: "Sincolator",
    scale: [0.05, 0.05, 0.05],
    position: [0.1, 4, 0],
    modelSrc: "/3DModels/Sincolator3D.gltf",
    href: "Not Available",
    status: "In Progress",
    description: "A fullstack rental e-commerce app of calculators tailored for students",
    techStacks: ["React Native", "Node.js", "Express.js", "Nativewind", "SQLite Cloud"]
  },
  {
    projectNum: 2,
    projectName: "Bagani Blades",
    scale: [3, 3, 3],
    position: [0, 3, 0],
    modelSrc: "/3DModels/BaganiBlades3D.gltf",
    href: "https://bagani-blades.vercel.app/",
    status: "Completed",
    description: "A front-end e-commerce platform for custom-made cosplay weapons and armor props",
    techStacks: ["Next.js", "Tailwind CSS", "Lucide Icons", "shadcn", "Figma", "Clerk Authentication"]
  },
  {
    projectNum: 3,
    projectName: "VAHCINET",
    scale: [0.08, 0.1, 0.2],
    position: [0, 2.5, -0.5],
    modelSrc: "/3DModels/VAHCINET3D.gltf",
    href: "https://vahcinet.vercel.app/",
    status: "Completed",
    description: "A Human-Computer Interaction system utilizing Convolutional Neural Networks (CNN) for computer navigation",
    techStacks: ["TensorFlow", "Keras", "Python", "JavaScript", "Node.js"]
  },
  {
    projectNum: 4,
    projectName: "Data Visual",
    scale: [0.05, 0.05, 0.05],
    position: [0, 4, -0.5],
    modelSrc: "/3DModels/DataVisual3D.gltf",
    href: "https://ivanrazo17.github.io/Tweets-Data-Visualization/",
    status: "Completed",
    description: "A data visualization project developed to display the number of tweets of trending topics",
    techStacks: ["HTML", "CSS", "JavaScript", "Rapid API"]
  },
  {
    projectNum: 5,
    projectName: "2048 Clone Game",
    scale: [0.035, 0.035, 0.035],
    position: [0, 3.5, -0.5],
    modelSrc: "/3DModels/2048Clone3D.gltf",
    href: "https://ivanrazo17.github.io/2048-Clone/",
    status: "Completed",
    description: "A clone of the popular 2048 game",
    techStacks: ["HTML", "CSS", "JavaScript"]
  },
];

export default ProjectList;
