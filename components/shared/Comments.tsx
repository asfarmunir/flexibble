"use client";
import { IProject } from "@/lib/database/models/project.model";
import Image from "next/image";
import { Button } from "../ui/button";
import { useState, useEffect } from "react";
import {
  createComment,
  createReply,
  deleteComment,
  deleteReply,
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
import { IUser } from "@/lib/database/models/user.model";

const Comments = ({
  project,
  currentUser,
  preRenderedComments,
}: {
  project: IProject;
  currentUser: IUser;
  preRenderedComments: IComment[];
}) => {
  let [isPending, startTransition] = useTransition();
  const [comment, setComment] = useState("");
  const [replyValues, setReplyValues] = useState<{ [key: string]: string }>({});
  const [postComments, setPostComments] = useState(preRenderedComments);
  const [commentValidate, setCommentValidate] = useState(false);
  const [replyValidate, setReplyValidate] = useState(false);
  const [loading, setloading] = useState(false);
  useEffect(() => {
    const getCommentsOfPost = async () => {
      const comments = await getCommentsofProject(project._id);
      comments && setPostComments(comments);
    };
    getCommentsOfPost();
  }, [comment, isPending, replyValues]);

  const addComment = async (
    e: React.FormEvent<HTMLFormElement>,
    type: string,
    commentId: string
  ) => {
    e.preventDefault();
    if (type === "comment") {
      if (comment.length === 0) {
        setCommentValidate(true);
        return;
      }
      setCommentValidate(false);
      const commentData = {
        text: comment,
        postId: project._id,
        criticId: currentUser._id,
        createdAt: new Date(),
      };

      toast.promise(createComment(commentData), {
        loading: "Adding comment...",
        success: "Comment added!",
        error: "Failed to add comment",
      });
      setComment("");
    }
    if (type === "reply") {
      const replyValue = replyValues[commentId];
      if (!replyValue || replyValue.trim().length === 0) {
        setReplyValidate(true);
        setReplyValues((prevState) => ({
          ...prevState,
          [commentId]: replyValue,
        }));
        return;
      }
      setReplyValidate(false);
      const replyData = {
        text: replyValue,
        commentId,
        criticId: {
          username: currentUser.username,
          photo: currentUser.photo,
        },
        createdAt: new Date(),
      };
      toast.promise(createReply(replyData), {
        loading: "Adding reply...",
        success: "Reply added!",
        error: "Failed to add reply",
      });

      setReplyValues((prevState) => ({
        ...prevState,
        [commentId]: "",
      }));
    }
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
            <form onSubmit={(e) => addComment(e, "comment", "")}>
              <input
                type="text"
                placeholder="Add a comment"
                className="w-full bg-slate-100 text-xs md:text-sm rounded-md px-4 py-2 text-slate-600 focus:outline-none focus:ring-2 focus:ring-primary focus:ring-opacity-50"
                onChange={(e) => setComment(e.target.value)}
                value={comment}
              />
              {commentValidate && (
                <p className=" text-xs font-thin text-red-500 mt-2 ml-1 ">
                  Please add a comment
                </p>
              )}

              <Button
                size={"sm"}
                variant={"outline"}
                type="submit"
                className={`bg-slate-100 text-slate-500 hover:bg-slate-200 mt-2 text-xs rounded-md focus:outline-none focus:ring-1 focus:ring-slate-500 focus:ring-opacity-50`}
              >
                comment
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
              <div className="flex items-start w-full justify-center flex-col">
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
                                    toast.promise(deleteComment(comment._id), {
                                      loading: "Deleting...",
                                      success: "Deleted!",
                                      error: "Failed to delete",
                                    });

                                    // await deleteComment(comment._id);
                                    // toast.success("deleted!");
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

                {/* create reply */}
                <div className="flex w-full items-start py-4 md:wrapper justify-start gap-4">
                  <Image
                    src={currentUser.photo}
                    alt="user"
                    width={25}
                    height={25}
                    className="rounded-full"
                  />
                  <div className="w-full">
                    <form
                      onSubmit={(e) =>
                        addComment(e, "reply", comment._id.toString())
                      }
                    >
                      <input
                        type="text"
                        placeholder="reply..."
                        className="w-full border-b border-slate-200 text-xs md:text-sm px-4 py-2 text-slate-600 focus:outline-none focus:ring-2 focus:ring-slate-50 focus:ring-opacity-50"
                        onChange={(e) =>
                          setReplyValues((prevState) => ({
                            ...prevState,
                            [comment._id]: e.target.value,
                          }))
                        }
                        value={replyValues[comment._id] || ""}
                      />
                      {replyValidate && (
                        <p className=" text-xs font-thin text-red-500 mt-2 ml-1 ">
                          Please add a comment
                        </p>
                      )}

                      <Button
                        size={"sm"}
                        variant={"outline"}
                        type="submit"
                        className={` bg-slate-100 text-slate-500 hover:bg-slate-200 mt-2 text-xs rounded-md focus:outline-none focus:ring-1 focus:ring-slate-500 focus:ring-opacity-50 px-6 py-1`}
                      >
                        reply
                      </Button>
                    </form>
                  </div>
                </div>
                {/* comment replies */}
                {comment.replies.length > 0 &&
                  comment.replies.map((reply, index) => {
                    const ReplyDate = new Date(
                      reply.createdAt
                    ).toLocaleDateString("en-US", {
                      month: "short",
                      day: "numeric",
                    });
                    return (
                      <div
                        key={index}
                        className="flex items-start py-4 md:wrapper justify-start gap-4"
                      >
                        <Image
                          src={reply.criticId.photo}
                          alt="user"
                          width={25}
                          height={25}
                          className="rounded-full"
                        />
                        <div className="flex items-start justify-center flex-col">
                          <div className="flex items-center justify-center">
                            <p className="capitalize text-slate-600 font-semibold mb-1">
                              {reply.criticId.username}
                            </p>
                            <div className="flex itemcs-center justify-center gap-2">
                              <span className="text-slate-500 font-normal ml-2 md:ml-4 mt-0.5 text-xs">
                                {ReplyDate}
                              </span>
                              {currentUser.username ===
                                reply.criticId.username && (
                                <span className="">
                                  <AlertDialog>
                                    <AlertDialogTrigger>
                                      <p>
                                        <MdDelete className="text-slate-500 font-normal text-xs mb-0.5   cursor-pointer hover:text-red-500 " />
                                      </p>
                                    </AlertDialogTrigger>

                                    <AlertDialogContent className="bg-white ">
                                      <AlertDialogHeader>
                                        <AlertDialogTitle>
                                          Are you sure you want to delete?
                                        </AlertDialogTitle>
                                      </AlertDialogHeader>

                                      <AlertDialogFooter>
                                        <AlertDialogCancel>
                                          Cancel
                                        </AlertDialogCancel>

                                        <AlertDialogAction
                                          onClick={() =>
                                            startTransition(async () => {
                                              toast.promise(
                                                deleteReply(reply._id),
                                                {
                                                  loading: "Deleting...",
                                                  success: "Deleted!",
                                                  error: "Failed to delete",
                                                }
                                              );
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
                          </div>

                          <p className="text-slate-500 text-wrap text-xs md:text-sm ">
                            {reply.text}
                          </p>
                        </div>
                      </div>
                    );
                  })}
              </div>
            </div>
          );
        })
      ) : (
        <p className="text-gray-500 text-sm mt-4 self-center">
          {loading ? "Loading comments..." : "No comments yet"}
        </p>
      )}
    </div>
  );
};

export default Comments;
