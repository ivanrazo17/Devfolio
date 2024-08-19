interface Project {
    projectName: string;
    scale: [number, number, number];
    position: [number, number, number];
    modelSrc: string;
    href: string;
  }
  
  const ProjectList: Project[] = [
    {
      projectName: "Sincolator",
      scale: [0.05, 0.05, 0.05],
      position: [0.1, 4, 0],
      modelSrc: "/Sincolator3D.gltf",
      href: "Sincolator",
    },
    {
      projectName: "Bagani Blades",
      scale: [3, 3, 3],
      position: [0, 3, 0],
      modelSrc: "/BaganiBlades3D.gltf",
      href: "Bagani Blades",
    },
    {
      projectName: "VAHCINET",
      scale: [0.08, 0.1, 0.2],
      position: [0, 2.5, -0.5],
      modelSrc: "/VAHCINET3D.gltf",
      href: "VAHCINET",
    },
    {
      projectName: "Data Visual",
      scale: [0.05, 0.05, 0.05],
      position: [0, 4, -0.5],
      modelSrc: "/DataVisual3D.gltf",
      href: "Data Visual",
    },
    {
      projectName: "2048 Clone Game",
      scale: [0.05, 0.05, 0.05],
      position: [0, 4, -1],
      modelSrc: "/2048Clone3D.gltf",
      href: "2048 Clone Game",
    },
  ];

  export default ProjectList;
  