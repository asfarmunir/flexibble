"use client";
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from "@/components/ui/carousel";
import Autoplay from "embla-carousel-autoplay";
import Image from "next/image";
import { IProject } from "@/lib/database/models/project.model";
const ImgCarousel = ({ project }: { project: IProject }) => {
  return (
    <div className=" max-w-xl lg:max-w-2xl max-h-[400px] mx-10">
      <Carousel
        plugins={[
          Autoplay({
            delay: 3000,
          }),
        ]}
      >
        <CarouselContent>
          {project.images.map((image: string, index: number) => (
            <CarouselItem
              key={index}
              className="flex items-center justify-center shadow-md "
            >
              <Image
                src={image}
                width={700}
                height={700}
                alt="eye"
                className=" max-h-[200px] md:max-h-[280px] lg:max-h-[310px] transition-all  bg-contain object-contain object-center"
                priority
              />
            </CarouselItem>
          ))}
        </CarouselContent>
        {project.images.length > 1 && (
          <>
            <CarouselPrevious />
            <CarouselNext />
          </>
        )}
      </Carousel>
    </div>
  );
};

export default ImgCarousel;
