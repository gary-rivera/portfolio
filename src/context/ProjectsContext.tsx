import { createContext, useContext, ReactNode } from "react";
import { Projects } from "@data/projects";
import { projects, sortedDesc } from "@data/getProjects";

type ProjectsContextType = {
	projects: Projects;
	sortedDesc: string[];
	isLoading: boolean;
	isError: boolean;
};

const value: ProjectsContextType = {
	projects,
	sortedDesc,
	isLoading: false,
	isError: false,
};

const ProjectsContext = createContext<ProjectsContextType>(value);

export const ProjectsProvider = ({ children }: { children: ReactNode }) => (
	<ProjectsContext.Provider value={value}>{children}</ProjectsContext.Provider>
);

export const useProjectsContext = () => useContext(ProjectsContext);
