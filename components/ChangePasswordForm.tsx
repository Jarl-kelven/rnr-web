import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { zodResolver } from "@hookform/resolvers/zod";
import { Eye, EyeOff } from "lucide-react";
import React from "react";
import { useForm } from "react-hook-form";
import z from "zod";

const changePasswordSchema = z
  .object({
    currentPassword: z.string().min(6, "Current password is required."),
    newPassword: z
      .string()
      .min(6, "New password must be at least 6 characters long."),
  })
  .refine((data) => data.newPassword !== data.currentPassword, {
    path: ["newPassword"],
    message: "New password must be different from your current password.",
  });

export default function ChangePasswordForm({
  updatePasswordRef,
  onSubmit = (data = {}) => null,
  error,
}) {
  const [showCurrentPassword, setShowCurrentPassword] = React.useState(false);
  const [showNewPassword, setShowNewPassword] = React.useState(false);

  const form = useForm({
    resolver: zodResolver(changePasswordSchema),
    defaultValues: {
      currentPassword: "",
      newPassword: "",
    },
  });

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8">
        {/* Current password */}

        <FormField
          control={form.control}
          name="currentPassword"
          render={({ field }) => (
            <FormItem className="flex flex-wrap gap-y-8 md:gap-2 items-center">
              <FormLabel className="flex-2 text-gray-700 shrink-0">
                Current Password
              </FormLabel>
              <FormControl>
                <div className="relative w-full md:flex-2 md:w-auto">
                  <Input
                    type={showCurrentPassword ? "text" : "password"}
                    placeholder="**********"
                    {...field}
                    className="w-full rounded-lg min-h-12"
                  />
                  <button
                    type="button"
                    onClick={() => setShowCurrentPassword(!showCurrentPassword)}
                    className="absolute top-1/2 -translate-y-1/2 right-4 text-gray-600"
                  >
                    {showCurrentPassword ? (
                      <Eye size={18} />
                    ) : (
                      <EyeOff size={18} />
                    )}
                  </button>
                </div>
              </FormControl>
              <FormMessage className="flex-1 text-center" />
            </FormItem>
          )}
        />

        <hr className="border-gray-200 " />
        {/* New password */}
        <FormField
          control={form.control}
          name="newPassword"
          render={({ field }) => (
            <FormItem className="flex flex-wrap gap-y-8 md:gap-2 items-center">
              <FormLabel className="flex-2 text-gray-700 shrink-0">
                New Passord
              </FormLabel>
              <FormControl>
                <div className="relative w-full md:flex-2 md:w-auto">
                  <Input
                    type={showNewPassword ? "text" : "password"}
                    placeholder="**********"
                    {...field}
                    className="w-full rounded-lg min-h-12"
                  />
                  <button
                    type="button"
                    onClick={() => setShowNewPassword(!showNewPassword)}
                    className="absolute top-1/2 -translate-y-1/2 right-4 text-gray-600"
                  >
                    {showNewPassword ? <Eye size={18} /> : <EyeOff size={18} />}
                  </button>
                </div>
              </FormControl>
              <FormMessage className="flex-1 text-center" />
            </FormItem>
          )}
        />

        {/* Hidden form submit button */}
        <button
          ref={updatePasswordRef}
          type="submit"
          className="opacity-0 hidden"
        >
          update
        </button>
        <hr className="border-gray-200 " />
        {error && (
          <p className="mt-3 text-center w-full text-red-600 text-xs font-medium">
            Error: {error}
          </p>
        )}
      </form>
    </Form>
  );
}
