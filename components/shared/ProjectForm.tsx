"use client";

import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { IoMdCloudUpload } from "react-icons/io";
import { FaGithub } from "react-icons/fa6";
import { Button } from "@/components/ui/button";
import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Input } from "@/components/ui/input";
import { projectFormSchema } from "@/lib/Validator";
import * as z from "zod";
import { ProjectDefaultValues, categoryFilters } from "@/lib/constants";
import { Textarea } from "@/components/ui/textarea";
import { useUploadThing } from "@/lib/uploadthing";
import { useRouter } from "next/navigation";
import { IProject } from "@/lib/database/models/project.model";
import { toast } from "react-hot-toast";
import { Separator } from "../ui/separator";
import Image from "next/image";
//uploadthing
import { useCallback, useState } from "react";
import { useDropzone } from "@uploadthing/react";
import { generateClientDropzoneAccept } from "uploadthing/client";
import { convertFileToUrl } from "@/lib/utils";
import {
  createProject,
  updateProject,
} from "@/lib/database/actions/project.actions";

type EventFormProps = {
  type: "Add" | "Update";
  project?: IProject;
  authorId: string;
  projectId?: string;
};

const EventForm = ({ type, authorId, project, projectId }: EventFormProps) => {
  const [files, setFiles] = useState<File[]>([]);
  const onDrop = useCallback((acceptedFiles: File[]) => {
    setFiles(acceptedFiles);
  }, []);

  const [imageLength, setImageLength] = useState(false);

  const { startUpload, permittedFileInfo } = useUploadThing("imageUploader");

  const fileTypes = permittedFileInfo?.config
    ? Object.keys(permittedFileInfo?.config)
    : [];

  const { getRootProps, getInputProps } = useDropzone({
    onDrop,
    accept: fileTypes ? generateClientDropzoneAccept(fileTypes) : undefined,
  });

  const initialValues =
    project && type === "Update"
      ? {
          ...project,
        }
      : ProjectDefaultValues;

  const router = useRouter();

  // const { startUpload } = useUploadThing("imageUploader");

  const form = useForm<z.infer<typeof projectFormSchema>>({
    resolver: zodResolver(projectFormSchema),
    defaultValues: initialValues,
  });

  let uploadedImageUrl: string[] = [];
  if (files.length > 0) {
    files.forEach((file) => {
      const url = convertFileToUrl(file);
      uploadedImageUrl.push(url);
    });
  }

  async function onSubmit(values: z.infer<typeof projectFormSchema>) {
    let uploadedImagesUrl: string[] = [];
    if (files.length === 0 && type === "Add") {
      setImageLength(true);
      return;
    }
    if (files.length > 0) {
      const uploadedImages = await startUpload(files);
      if (!uploadedImages) {
        return;
      }
      uploadedImages.map((img) => uploadedImagesUrl.push(img.url));
    } else {
      project!.images.map((img) => uploadedImagesUrl.push(img));
    }

    const projectData = {
      project: {
        ...values,
        images: uploadedImagesUrl,
      },
      author: authorId,
      path: "/",
    };

    if (type === "Add") {
      try {
        const newProject = await toast.promise(
          createProject({
            authorId,
            project: { ...values, images: uploadedImagesUrl },
            path: "/profile",
          }),
          {
            loading: "Adding...",
            success: "Project Added successfully!",
            error: "Failed to add",
          }
        );
        if (newProject) {
          form.reset();
          router.push(`/project/${newProject._id}`);
        }
      } catch (error) {
        console.log(error);
      }
    }
    if (type === "Update") {
      if (!projectId) {
        router.back();
        return;
      }
      try {
        const updatedProject = await toast.promise(
          updateProject({
            projectId,
            project: { ...values, images: uploadedImagesUrl },
            path: `/project/${projectId}`,
          }),
          {
            loading: "Updating...",
            success: "Project Updated successfully!",
            error: "Failed to update",
          }
        );
        if (updatedProject) {
          form.reset();
          router.push(`/project/${updatedProject._id}`);
        }
      } catch (error) {
        console.log(error);
      }
    }
  }

  return (
    <Form {...form}>
      <form
        onSubmit={form.handleSubmit(onSubmit)}
        className="flex flex-col gap-5"
      >
        <div className="flex flex-col gap-5 md:flex-row">
          <FormField
            control={form.control}
            name="title"
            render={({ field }) => (
              <FormItem className="w-full">
                <FormControl>
                  <Input
                    placeholder="Project title"
                    {...field}
                    className="input-field"
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name="category"
            render={({ field }) => (
              <FormItem className="w-full">
                <FormControl>
                  <Select
                    defaultValue={field.value}
                    onValueChange={field.onChange}
                  >
                    <SelectTrigger className="select-field">
                      <SelectValue placeholder="category" />
                    </SelectTrigger>
                    <SelectContent>
                      {categoryFilters.map((category, index) => (
                        <SelectItem
                          key={index}
                          value={category}
                          className="select-item"
                        >
                          {category}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
        </div>

        <div className="flex flex-col gap-5 md:flex-row">
          <FormField
            control={form.control}
            name="description"
            render={({ field }) => (
              <FormItem className="w-full">
                <FormControl className="h-72">
                  <Textarea
                    placeholder="Description"
                    {...field}
                    className="textarea rounded-2xl"
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <div className="w-full flex flex-col justify-start">
            <FormField
              defaultValue="hehe"
              control={form.control}
              name="imageUrl"
              render={({ field }) => (
                <FormItem className="w-full">
                  <FormControl className="h-72">
                    <div
                      {...getRootProps()}
                      className="flex-center bg-dark-3 flex h-72 cursor-pointer flex-col overflow-hidden rounded-xl bg-grey-50"
                    >
                      <input {...getInputProps()} />
                      <div className="flex items-center justify-center gap-4 flex-wrap bg-contain object-contain px-4">
                        {files.length > 0 &&
                          files.length < 5 &&
                          uploadedImageUrl.map((url, index) => (
                            <Image
                              key={index}
                              src={url}
                              width={120}
                              height={80}
                              alt="uploaded image"
                              className="rounded-lg bg-contain max-h-[80px] object-contain object-center"
                            />
                          ))}
                      </div>
                      {files.length > 0 && files.length >= 5 && (
                        <p className=" font-semibold text-red-600">
                          Max 4 images allowed
                        </p>
                      )}
                      {files.length > 0 ? (
                        <Button
                          type="button"
                          size={"sm"}
                          className="rounded-lg mt-6 "
                        >
                          upload again
                        </Button>
                      ) : (
                        <div className="flex-center flex-col py-5 text-grey-500">
                          {type === "Update" ? (
                            <div className="flex items-center justify-center gap-2 mb-4">
                              {project!.images.map((img, index) => (
                                <Image
                                  key={index}
                                  src={img}
                                  width={120}
                                  height={80}
                                  alt="uploaded image"
                                  className="rounded-lg bg-contain max-h-[80px] object-contain object-center"
                                />
                              ))}
                            </div>
                          ) : (
                            <div>
                              <img
                                src="/uploads.svg"
                                width={77}
                                height={77}
                                alt="file upload"
                              />
                              <h3 className="mb-2 mt-2">Drag photo here</h3>
                              <p className="p-medium-12 mb-4">SVG, PNG, JPG</p>
                            </div>
                          )}

                          <Button type="button" className="rounded-full">
                            {type === "Update"
                              ? "Update Images"
                              : " Select from computer"}
                          </Button>
                        </div>
                      )}
                    </div>
                  </FormControl>
                </FormItem>
              )}
            />
            {imageLength && (
              <p className="text-red-400 mt-2 font-semibold text-sm">
                Please add 1 image atleast
              </p>
            )}
          </div>
        </div>

        <div className="flex flex-col gap-5 md:flex-row">
          <FormField
            control={form.control}
            defaultValue=""
            name="githubUrl"
            render={({ field }) => (
              <FormItem className="w-full">
                <FormControl>
                  <div className="flex-center h-[54px] w-full overflow-hidden rounded-full bg-grey-50 px-4 py-2">
                    <FaGithub className="text-xl" />
                    <Input
                      placeholder="Github URL (optional)"
                      {...field}
                      className="input-field"
                    />
                  </div>
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            defaultValue=""
            name="deploymentUrl"
            render={({ field }) => (
              <FormItem className="w-full">
                <FormControl>
                  <div className="flex-center h-[54px] w-full overflow-hidden rounded-full bg-grey-50 px-4 py-2">
                    <IoMdCloudUpload className="text-2xl" />

                    <Input
                      placeholder="Deployment URL (optional)"
                      {...field}
                      className="input-field"
                    />
                  </div>
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
        </div>

        <Separator className="my-3" />

        <Button
          type="submit"
          size="lg"
          disabled={form.formState.isSubmitting}
          className="button col-span-2 w-[200px] md:w-[300px] place-self-center "
        >
          {form.formState.isSubmitting ? "Submitting..." : `${type} Project `}
        </Button>
      </form>
    </Form>
  );
};

export default EventForm;
