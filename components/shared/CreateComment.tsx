import Image from "next/image";
import { useState } from "react";
import { Button } from "../ui/button";
import { IUser } from "@/lib/database/models/user.model";
import { IComment } from "@/lib/database/models/comment.model";
import { createComment } from "@/lib/database/actions/comment.actions";
import { IProject } from "@/lib/database/models/project.model";
import { toast } from "react-hot-toast";

const CreateComment = ({
  currentUser,
  project,
}: {
  currentUser: IUser;
  project: IProject;
}) => {
  const [comment, setComment] = useState("");
  const [postComments, setPostComments] = useState([] as IComment[]);
  const [validate, setValidate] = useState(false);
  const [loading, setloading] = useState(true);
  const [commentLoading, setCommentLoading] = useState(false);

  const addComment = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (comment.length === 0) {
      setValidate(true);
      return;
    }
    setValidate(false);
    const commentData = {
      text: comment,
      postId: project._id,
      criticId: currentUser._id,
      createdAt: new Date(),
    };

    setCommentLoading(true);
    const createdComment = await createComment(commentData);
    createdComment && setCommentLoading(false);
    toast.success("comment added!");
    setComment("");
  };

  return (
    <>
      {currentUser && (
        <div className="flex items-center wrapper justify-start gap-4 shadow-sm rounded-lg">
          <Image
            src={currentUser.photo}
            alt="user"
            width={30}
            height={30}
            className="rounded-full"
          />
          <div className="w-full">
            <form onSubmit={addComment}>
              <input
                type="text"
                placeholder="Add a comment"
                className="w-full bg-slate-100 text-xs md:text-sm rounded-md px-4 py-2 text-slate-600 focus:outline-none focus:ring-2 focus:ring-primary focus:ring-opacity-50"
                onChange={(e) => setComment(e.target.value)}
                value={comment}
              />
              {validate && (
                <p className=" text-xs font-thin text-red-500 mt-2 ml-1 ">
                  Please add a comment
                </p>
              )}

              <Button
                size={"sm"}
                variant={"outline"}
                type="submit"
                className={`${
                  commentLoading
                    ? "bg-slate-100 text-slate-400"
                    : "bg-slate-100 text-slate-500 hover:bg-slate-200"
                } mt-2 text-xs rounded-md focus:outline-none focus:ring-1 focus:ring-slate-500 focus:ring-opacity-50`}
              >
                {commentLoading ? "adding comment..." : "comment"}
              </Button>
            </form>
          </div>
        </div>
      )}
    </>
  );
};

export default CreateComment;
