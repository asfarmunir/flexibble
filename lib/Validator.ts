import * as z from "zod";

export const projectFormSchema = z.object({
  title: z.string().min(3, "Title must be at least 3 characters"),
  description: z
    .string()
    .min(3, "Description must be at least 3 characters")
    .max(2000, "Description must be less than 2000 characters"),
  // githubUrl: z.string().optional(),
  githubUrl: z.union([z.literal(""), z.string().trim().url()]),
  deploymentUrl: z.union([z.literal(""), z.string().trim().url()]),
  imageUrl: z.string(),
  category: z.string(),
});
