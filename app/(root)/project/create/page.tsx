import React from "react";
import EventForm from "@/components/shared/ProjectForm";
import { auth } from "@clerk/nextjs";

const page = () => {
  const { sessionClaims } = auth();
  const id: string = sessionClaims!.userId as string;
  console.log(id);
  return (
    <>
      <section className="bg-primary-50 px-8 bg-dotted-pattern bg-cover bg-center py-5 md:py-10">
        <h3 className="wrapper h3-bold text-center sm:text-left">
          Add your project
        </h3>
      </section>

      <div className="wrapper my-8">
        <EventForm type="Add" authorId={id} />
      </div>
    </>
  );
};

export default page;
