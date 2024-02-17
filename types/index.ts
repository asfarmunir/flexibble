export type createProjectTypes = {
  authorId: string;
  project: {
    title: string;
    description: string;
    githubUrl?: string;
    category: string;
    deploymentUrl?: string;
    images?: string[];
  };
  path: string;
};

export type updateProjectTypes = {
  projectId: string;
  project: {
    title: string;
    description: string;
    githubUrl?: string;
    category: string;
    deploymentUrl?: string;
    images?: string[];
  };
  path: string;
};
