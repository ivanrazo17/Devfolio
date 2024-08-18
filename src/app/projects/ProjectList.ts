interface Project {
    projectName: string;
    scale: string;
    position: string;
    modelSrc: string;
    href: string;
  }
  
  const ProjectList: Project[] = [
    {
        projectName: "Sincolator",
        scale: "0.05, 0.05, 0.05",
        position: "0.1, 4, 0",
        modelSrc: "/BaganiBlades3D.gltf",
        href: "Sincolator",
    },
    {
        projectName: "Bagani Blades",
        scale: "3, 3, 3",
        position: "0, 3, 0",
        modelSrc: "/BaganiBlades3D.gltf",
        href: "Bagani Blades",
    },
    {
        projectName: "VAHCINET",
        scale: "",
        position: "",
        modelSrc: "/VAHCINET3D.gltf",
        href: "",
    },
    {
      projectName: "",
      scale: "",
      position: "",
      modelSrc: "",
      href: "",
    },
    {
      projectName: "",
      scale: "",
      position: "",
      modelSrc: "",
      href: "",
    },
    {
      projectName: "",
      scale: "",
      position: "",
      modelSrc: "",
      href: "",
    },
    {
      projectName: "",
      scale: "",
      position: "",
      modelSrc: "",
      href: "",
    },
  ];
  
  export default ProjectList;
  