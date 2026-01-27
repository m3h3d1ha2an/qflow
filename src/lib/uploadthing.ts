import { createUploadthing, type FileRouter } from "uploadthing/next";
import { UploadThingError } from "uploadthing/server";
import { auth } from "@/lib/better-auth/server";

const upload = createUploadthing();

export const qflowUploadRouter: FileRouter = {
  profilePicture: upload({
    image: {
      maxFileSize: "512KB",
      maxFileCount: 1
    }
  }).middleware(async ({ req }) => {
      const session = await auth.api.getSession({ headers: req.headers });
      if (!session) throw new UploadThingError("Unauthorized");
      return { userId: session.user.id };
    }).onUploadComplete(async ({ file, metadata }) => {
     console.log({file, metadata})
    }),
}

export type UploadRouter = typeof qflowUploadRouter;
