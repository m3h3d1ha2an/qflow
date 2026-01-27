"use client";

import { toast } from "sonner";
import z from "zod";
import { useAppForm } from "@/components/form/form-hooks";
import { Button } from "@/components/ui/button";
import { Spinner } from "@/components/ui/spinner";
import { useUploadThing } from "@/hooks/use-uploadthing";
import { authClient } from "@/lib/better-auth/client";

export const AccountForm = () => {
  const { data } = authClient.useSession();
  const { startUpload, isUploading } = useUploadThing("profilePicture", {
    // onClientUploadComplete
    // onUploadProgress
  });
  const form = useAppForm({
    defaultValues: {
      name: data?.user.name ?? "",
    },
    validators: {
      onSubmit: z.object({
        name: z
          .string()
          .trim()
          .min(2, "Name must be at least 2 characters long")
          .max(100, "Name must be at most 100 characters long"),
      }),
    },
    onSubmit: async ({ value }) => {
      await authClient.updateUser(
        { name: value.name },
        {
          onSuccess: () => {
            toast.success("Account updated successfully.");
          },
          onError: (error) => {
            console.error(error);
            toast.error(error.error.message || "Failed to update account. ");
          },
        },
      );
    },
  });

  const handleImageUpload = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;
    const result = await startUpload([file]);
    if (result?.[0]) {
      await authClient.updateUser({
        fetchOptions: {
          onSuccess: () => {
            toast.success("Profile picture updated!");
          },
          onError: () => {
            toast.error("Failed to update image.");
          },
        },
      });
    }
  };

  return (
    <form
      onSubmit={(e) => {
        e.preventDefault();
        e.stopPropagation();
        form.handleSubmit();
      }}
      className="w-full px-4"
    >
      <div className="flex flex-col items-center gap-4 mb-6">
        <div className="relative group cursor-pointer">
          <div
            className="w-24 h-24 rounded-full overflow-hidden border-2 border-muted hover:border-primary transition-all bg-secondary flex items-center justify-center"
            onClick={() => document.getElementById("profile-upload")?.click()}
          >
            {isUploading ? (
              <Spinner className="w-8 h-8" />
            ) : data?.user.image ? (
              <img src={data.user.image} alt="Profile" className="w-full h-full object-cover" />
            ) : (
              <span className="text-2xl font-bold uppercase text-muted-foreground">{data?.user.name?.charAt(0)}</span>
            )}

            {/* Overlay on hover */}
            <div className="absolute inset-0 bg-black/40 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity">
              <p className="text-[10px] text-white font-medium uppercase">Change</p>
            </div>
          </div>

          <input
            id="profile-upload"
            type="file"
            className="hidden"
            accept="image/*"
            onChange={handleImageUpload}
            disabled={isUploading}
          />
        </div>
        <div className="text-center">
          <h3 className="text-sm font-medium">Profile Image</h3>
          <p className="text-xs text-muted-foreground">Max size 512KB</p>
        </div>
      </div>

      <form.AppField name="name">
        {(field) => (
          <field.Input
            label="Display Name"
            description="Please enter your full name, or a display name you are comfortable with."
          />
        )}
      </form.AppField>
      <form.Subscribe
        selector={(state) => [state.canSubmit, state.isSubmitting]}
        children={([canSubmit, isSubmitting]) => (
          <Button type="submit" className="text-base mt-2" disabled={!canSubmit}>
            {isSubmitting && <Spinner />}
            Save Changes
          </Button>
        )}
      />
    </form>
  );
};
