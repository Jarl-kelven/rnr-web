"use client";

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
import { useEffect, useMemo, useRef, useState } from "react";
import { useForm } from "react-hook-form";
import z from "zod";
import { Label } from "./ui/label";
import { CustomCalender } from "./CustomCalender";
import Image from "next/image";
import useUpload from "@/hooks/useUpload";
import { cn } from "@/lib/utils";

const profileSchema = z.object({
  photo: z.string().optional(),
  fullName: z.string().min(5, "Full name required"),
  email: z
    .email("Invalid email address")
    .max(100, "Email is too long")
    .min(3, "Email is required"),
  school: z.string().optional(),
  phone: z
    .string()
    // .optional()
    .regex(/^[0-9]{11}$/, "Enter a valid 11-digit phone number"),
  dateOfBirth: z.string().optional(),
});

const DisplayProfilePhoto = ({ src }) => {
  const [isLoading, setIsLoading] = useState(true);
  const [isError, setIsError] = useState(false);

  const handleLoad = () => setIsLoading(false);
  const handleError = () => {
    setIsError(true);
    setIsLoading(false);
  };

  if (isError || src.trim() === "") {
    return (
      <Image
        alt="Current profile picture"
        className="w-16 h-16 rounded-full object-cover object-top"
        src={"/profile-photo.jpg"}
        width={16}
        height={16}
      />
    );
  }

  return (
    <div className="relative h-auto w-auto">
      {isLoading && (
        <div className="absolute inset-0 w-16 h-16 rounded-full animate-pulse bg-linear-to-r from-gray-200 via-gray-300 to-gray-200 dark:from-gray-700 dark:via-gray-800 dark:to-gray-700" />
      )}
      <Image
        alt="Current profile picture"
        className="w-16 h-16 rounded-full object-cover object-top"
        src={src}
        width={16}
        height={16}
        onLoad={handleLoad}
        onError={handleError}
      />
    </div>
  );
};

export default function UpdateProfileForm({
  profile,
  updateProfileRef,
  onSubmit = () => null,
}) {
  const { upload, error } = useUpload();

  const uploadFileRef = useRef(null);

  const form = useForm({
    resolver: zodResolver(profileSchema),
    defaultValues: {
      photo: "",
      fullName: "",
      email: "",
      school: "",
      phone: "",
      dateOfBirth: "2025-06-01",
    },
  });

  useEffect(() => {
    if (profile) {
      form.reset({ ...profile });
    }
  }, [profile]);

  return (
    <Form {...form}>
      <form
        onSubmit={form.handleSubmit(onSubmit)}
        className="space-y-8 w-full h-full"
      >
        {/* Photo */}
        <div className="w-full flex flex-wrap gap-y-8 md:gap-2 items-center">
          <Label className="flex-2 text-gray-700 shrink-0">Your photo</Label>
          <div className="w-full md:flex-2 md:w-auto flex flex-wrap items-center gap-4">
            <DisplayProfilePhoto src={form.getValues("photo")} />
            <button
              className="px-5 py-2.5 rounded-full border border-gray-300 font-semibold text-gray-900 hover:bg-gray-100 transition-colors shadow"
              type="button"
              onClick={() =>
                uploadFileRef.current && uploadFileRef.current.click()
              }
            >
              Choose
            </button>
            <span
              className={cn(
                "text-sm text-nowrap whitespace-pre",
                error.trim() ? "text-red-600" : ""
              )}
            >
              JPG or PNG. 1MB max
            </span>
            <input
              ref={uploadFileRef}
              className="opacity-0 hidden"
              type="file"
              accept="image/png, image/jpg"
              onChange={(e) =>
                upload(e.target.files, (data) => form.setValue("photo", data))
              }
            />
          </div>
        </div>

        <hr className="border-gray-200" />

        {/* Full name */}
        <FormField
          control={form.control}
          name="fullName"
          render={({ field }) => (
            <FormItem className="w-full flex flex-wrap gap-y-8 md:gap-2 items-center">
              <FormLabel className="flex-2 text-gray-700 shrink-0">
                Full name
              </FormLabel>
              <FormControl>
                <Input
                  placeholder="Johny Jackson"
                  {...field}
                  className="w-full md:flex-2 md:w-auto rounded-lg min-h-12"
                />
              </FormControl>
              <FormMessage className="flex-1 text-center" />
            </FormItem>
          )}
        />

        <hr className="border-gray-200 " />
        {/* Email */}
        <FormField
          control={form.control}
          name="email"
          render={({ field }) => (
            <FormItem className="w-full flex flex-wrap gap-y-8 md:gap-2 items-center">
              <FormLabel className="flex-2 text-gray-700 shrink-0">
                Email
              </FormLabel>
              <FormControl>
                <Input
                  type="email"
                  placeholder="johnyjackson@gmail.com"
                  {...field}
                  className="w-full md:flex-2 md:w-auto rounded-lg min-h-12"
                />
              </FormControl>
              <FormMessage className="flex-1 text-center" />
            </FormItem>
          )}
        />

        <hr className="border-gray-200 " />
        {/* School name */}
        <FormField
          control={form.control}
          name="school"
          render={({ field }) => (
            <FormItem className="w-full flex flex-wrap gap-y-8 md:gap-2 items-center">
              <FormLabel className="flex-2 text-gray-700 shrink-0">
                School Information
              </FormLabel>
              <FormControl>
                <Input
                  type="text"
                  placeholder="Middle High School"
                  {...field}
                  className="w-full md:flex-2 md:w-auto rounded-lg min-h-12"
                />
              </FormControl>
              <FormMessage className="flex-1 text-center" />
            </FormItem>
          )}
        />

        <hr className="border-gray-200 " />
        {/* Phone number */}
        <FormField
          control={form.control}
          name="phone"
          render={({ field }) => (
            <FormItem className="w-full flex flex-wrap gap-y-8 md:gap-2 items-center">
              <FormLabel className="flex-2 text-gray-700 shrink-0">
                Phone number
              </FormLabel>
              <FormControl>
                <Input
                  type="tel"
                  placeholder="+1 (809) 561-9072"
                  {...field}
                  className="w-full md:flex-2 md:w-auto rounded-lg min-h-12"
                />
              </FormControl>
              <FormMessage className="flex-1 text-center" />
            </FormItem>
          )}
        />

        <hr className="border-gray-200" />
        {/* Date of birth*/}
        <div className="flex flex-wrap gap-y-8 md:gap-2 items-center">
          <Label className="flex-2 text-gray-700 shrink-0">Date of birth</Label>
          <CustomCalender
            date={new Date(form.getValues("dateOfBirth"))}
            setDate={(date) => form.setValue("dateOfBirth", date)}
          />
        </div>

        <hr className="border-gray-200 " />
        
        {/* Hidden form submit button */}
        <button
          ref={updateProfileRef}
          type="submit"
          className="opacity-0 hidden"
        >
          update
        </button>
      </form>
    </Form>
  );
}
