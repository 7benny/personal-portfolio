import React from "react";
import ProjectCard from "../sub/ProjectCard";

const Projects = () => {
  return (
    <div
      className="flex flex-col items-center justify-center py-20"
      id="projects"
    >
      <h1 className="text-[40px] font-semibold text-transparent bg-clip-text bg-gradient-to-r from-purple-500 to-cyan-500 py-20">
        My Projects
      </h1>
      <div className="h-full w-full flex flex-col md:flex-row gap-10 px-10">
        <ProjectCard
          src="/NextWebsite.png"
          title="Interstellar themed Portfolio"
          description="Exploring the Cosmos: A Journey Through Space, Interstellar Dreams, and Tech Innovation with Typescript, Three.js, Tailwind CSS, AWS Amplify"
        />
        <ProjectCard
          src="/CardImage.png"
          title="Product Inventory Fullstack App with AWS"
          description="Building a Full-Stack Web App: Next.js Frontend, Node.js Backend, and AWS Deployment with Tailwind, Redux Toolkit, Prisma, and AWS Services"
        />
        <ProjectCard
          src="/SpaceWebsite.png"
          title="HooBank a UI\UX Business App"
          description="Crafting a Real-World Product: A UI/UX-Designed App with React and Tailwind CSS, Merging Business Insight with Web Design and JavaScript Skills"
        />
      </div>
    </div>
  );
};

export default Projects;
