import { createRouteHandler } from "uploadthing/next";
import { qflowUploadRouter } from "@/lib/uploadthing";

export const { GET, POST } = createRouteHandler({ router: qflowUploadRouter });
