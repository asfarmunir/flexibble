import React from "react";
import EventForm from "@/components/shared/ProjectForm";
import { auth } from "@clerk/nextjs";
import { getProjectById } from "@/lib/database/actions/project.actions";

type UpdateProjectProps = {
  params: {
    id: string;
  };
};

const page = async ({ params: { id } }: UpdateProjectProps) => {
  const { sessionClaims } = auth();
  const project = await getProjectById(id);
  const userId: string = sessionClaims!.userId as string;
  return (
    <>
      <section className="bg-primary-50 px-8 bg-dotted-pattern bg-cover bg-center py-5 md:py-10">
        <h3 className="wrapper h3-bold text-center sm:text-left">
          Update Project
        </h3>
      </section>

      <div className="wrapper my-8">
        <EventForm
          type="Update"
          authorId={userId}
          project={project}
          projectId={project._id}
        />
      </div>
    </>
  );
};

export default page;
