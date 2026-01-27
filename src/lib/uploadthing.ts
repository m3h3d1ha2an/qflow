import { createUploadthing, type FileRouter } from "uploadthing/next";
import { UploadThingError } from "uploadthing/server";
import { auth } from "@/lib/better-auth/server";

type UploadedFileData = Parameters<Parameters<ReturnType<typeof upload>["onUploadComplete"]>[0]>[0]["file"];

const upload = createUploadthing();

const profilePictureConfig = {
  image: {
    minFileCount: 1,
    maxFileCount: 1,
    maxFileSize: "512KB",
  },
} satisfies Parameters<typeof upload>[0];

const authentication = async ({ req }: { req: Request }) => {
  const session = await auth.api.getSession({ headers: req.headers });
  if (!session) throw new UploadThingError("Unauthorized");
  return { userId: session.user.id };
};

const saveProfilPicture = async ({ file }: { file: UploadedFileData }) => {
return await auth.api.updateUser({ body: { image: file.ufsUrl } })
};

export const ourFileRouter = {
  profilePicture: upload(profilePictureConfig).middleware(authentication).onUploadComplete(saveProfilPicture),
} satisfies FileRouter;

export type OurFileRouter = typeof ourFileRouter;
