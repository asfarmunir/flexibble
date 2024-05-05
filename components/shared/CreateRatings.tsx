"use client";

import {
  createRating,
  getRatingsByProjectId,
  getRatingsByUserId,
  removeRating,
} from "@/lib/database/actions/rating.action";
import { IRating } from "@/lib/database/models/rating.model";
import { useEffect, useState } from "react";
import { toast } from "react-hot-toast";
import { FaHeart } from "react-icons/fa6";
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@/components/ui/tooltip";
import { useRouter } from "next/navigation";
import './ratings.css';

const CreateRatings = ({
  projectId,
  criticId,
  projectAuthorId,
}: {
  projectId: string;
  criticId: string;
  projectAuthorId: string;
  }) => {
  
  const router = useRouter();
  
  const [ratingOfPost, setRatingOfPost] = useState<IRating[]>([]);
  const [isRated, setIsRated] = useState<IRating[]>([]);
  const [isRatingAdded, setIsRatingAdded] = useState(false);

  useEffect(() => {
    const getRatingsOfPost = async () => {
      try {
        const likes = await getRatingsByProjectId(projectId);
        if (likes) {
          setRatingOfPost(likes);
        }
        const ratings = await getRatingsByUserId(criticId, projectId);
        if (ratings) {
          setIsRated(ratings);
        }
      } catch (error) {
        console.error("Error fetching ratings:", error);
      }
    };
    getRatingsOfPost();
  }, [projectId, criticId, isRated]);

  const addRating = async () => {

    if (isRatingAdded) return;
    setIsRatingAdded(true);
    toast.promise(
      createRating({ projectId, criticId }),
      {
        loading: "Adding to Favorites...",
        success: "Added to Favorites",
        error: "Failed to add rating",
      },
      {
        success: {
          icon: "❤️",
        },
      }
    );
    router.refresh(); 
  };

  

  return (
    <div className="flex items-center justify-start gap-1">
      {projectAuthorId !== criticId ? (
        <div>
          {isRated.length > 0 && criticId === isRated[0].criticId._id && (
            // <FaHeart
            //   className="text-red-500 text-lg cursor-pointer"
            //   onClick={() => {
            //     toast.promise(
            //       removeRating(isRated[0]._id),
            //       {
            //         loading: "Removing Favorite...",
            //         success: "Removed from Favorites",
            //         error: "Failed to remove rating",
            //       },
            //       {
            //         success: {
            //           icon: "❤️",
            //         },
            //       }
            //     );
            //     setIsRated([]);
            //   }}
            // />
            <button onClick={
              async () => {
                      // setIsRatingAdded(false);
                      // toast.promise(
                      //   removeRating(isRated[0]._id),
                      //   {
                      //     loading: "Removing Favorite...",
                      //     success: "Removed from Favorites",
                      //     error: "Failed to remove rating",
                      //   },
                      //   {
                      //     success: {
                      //       icon: "❤️",
                      //     },
                      //   }
                      // );
                      // setIsRated([]);
                // router.refresh();]
                toast.loading("Removing Favorite...");
                setIsRatingAdded(false);
                await removeRating(isRated[0]._id);
                toast.dismiss();
                toast.success("Removed from Favorites");
                setIsRated([]);
                router.refresh();

                    }
            }
            
            >
                  <FaHeart
                    className="text-red-500 text-lg mt-1 cursor-pointer"
              />
            </button>
          )}
          {isRated.length === 0 && (
            <button onClick={addRating}
              disabled={isRatingAdded}
            >
                  <FaHeart
                    className="text-gray-400 text-lg mt-1  hover:text-red-500 cursor-pointer hover:scale-110 transition duration-200 ease-in-out"
                  />
                 </button>
          )}
        </div>
      ) : (
        <FaHeart className="text-gray-400 text-lg " />
      )}
      <span className="text-gray-400 ">{ratingOfPost.length}</span>{" "}
    </div>
  );
};

export default CreateRatings;
