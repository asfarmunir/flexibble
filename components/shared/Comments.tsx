"use client";
import { IProject } from "@/lib/database/models/project.model";
import Image from "next/image";
import { Button } from "../ui/button";
import { useState, useEffect } from "react";
import {
  createComment,
  deleteComment,
  getCommentsofProject,
} from "@/lib/database/actions/comment.actions";
import { IComment } from "@/lib/database/models/comment.model";
import { MdDelete } from "react-icons/md";
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
} from "@/components/ui/alert-dialog";
import { useTransition } from "react";
import { toast } from "react-hot-toast";
import { auth } from "@clerk/nextjs";
import { IUser } from "@/lib/database/models/user.model";

const Comments = ({
  project,
  currentUser,
}: {
  project: IProject;
  currentUser: IUser;
}) => {
  let [isPending, startTransition] = useTransition();
  const [comment, setComment] = useState("");
  const [postComments, setPostComments] = useState([] as IComment[]);
  const [validate, setValidate] = useState(false);
  const [loading, setloading] = useState(true);
  const [commentLoading, setCommentLoading] = useState(false);
  useEffect(() => {
    const getCommentsOfPost = async () => {
      setloading(true);
      const comments = await getCommentsofProject(project._id);
      comments && setPostComments(comments);
      setloading(false);
    };
    getCommentsOfPost();
  }, [comment, isPending]);

  console.log(postComments);
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
    <div className="flex flex-col w-full wrapper">
      <h2 className="text-2xl font-bold text-gray-800">Comments</h2>
      {/* create new comment */}
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

      {/* comments */}
      {postComments?.length ? (
        postComments.map((comment) => {
          const formattedDate = new Date(comment.createdAt).toLocaleDateString(
            "en-US",
            {
              month: "short",
              day: "numeric",
            }
          );
          return (
            <div
              key={comment._id}
              className="flex items-start wrapper justify-start gap-4"
            >
              <Image
                src={comment.criticId.photo}
                alt="user"
                width={30}
                height={30}
                className="rounded-full"
              />
              <div className="flex items-start justify-center flex-col">
                <div className="">
                  <div className="flex items-center justify-start gap-2">
                    <p className="capitalize text-slate-600 font-semibold mb-1">
                      {comment.criticId.username}
                      <span className="text-slate-500 font-normal ml-2 md:ml-4 text-xs">
                        {formattedDate}
                      </span>
                    </p>

                    {currentUser._id === comment.criticId._id && (
                      <span className=" mt-1">
                        <AlertDialog>
                          <AlertDialogTrigger>
                            <p>
                              <MdDelete className="text-slate-500 font-normal  cursor-pointer hover:text-red-500 " />
                            </p>
                          </AlertDialogTrigger>

                          <AlertDialogContent className="bg-white ">
                            <AlertDialogHeader>
                              <AlertDialogTitle>
                                Are you sure you want to delete?
                              </AlertDialogTitle>
                            </AlertDialogHeader>

                            <AlertDialogFooter>
                              <AlertDialogCancel>Cancel</AlertDialogCancel>

                              <AlertDialogAction
                                onClick={() =>
                                  startTransition(async () => {
                                    await deleteComment(comment._id);
                                    toast.success("deleted!");
                                  })
                                }
                              >
                                {isPending ? "Deleting..." : "Delete"}
                              </AlertDialogAction>
                            </AlertDialogFooter>
                          </AlertDialogContent>
                        </AlertDialog>
                      </span>
                    )}
                  </div>

                  <p className="text-slate-500 text-xs md:text-sm ">
                    {comment.text}
                  </p>
                </div>

                <div className="flex items-start py-4 md:wrapper justify-start gap-4">
                  {/* comment reply */}
                  <Image
                    src={project.author.photo}
                    alt="user"
                    width={25}
                    height={25}
                    className="rounded-full"
                  />
                  <div className="flex items-start justify-center flex-col">
                    <p className="capitalize text-slate-600 font-semibold mb-1">
                      {project.author.username} {project.author.lastName}
                      <span className="text-slate-500 font-normal ml-2 md:ml-4 text-xs">
                        24th Aug
                      </span>
                    </p>
                    <p className="text-slate-500 text-xs md:text-sm ">
                      Lorem ipsum dolor sit amet consectetur adipisicing elit.
                      Tempora, voluptatibus sunt quod impedit ut temporibus
                      alias perspiciatis deleniti quidem eaque similique?
                    </p>
                  </div>
                </div>
              </div>
            </div>
          );
        })
      ) : (
        <p className="text-gray-500 text-sm mt-4 self-center">
          {
            /* @ts-ignore */
            loading ? "Loading comments..." : "No comments yet"
          }
        </p>
      )}
    </div>
  );
};

export default Comments;
