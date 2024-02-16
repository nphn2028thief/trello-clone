"use client";
import Link from "next/link";
import Image from "next/image";
import { useEffect, useState } from "react";
import { toast } from "react-toastify";
import { useQuery } from "@tanstack/react-query";
import { Check, Loader2 } from "lucide-react";
import { useFormStatus } from "react-dom";
import {
  FieldErrors,
  FieldValues,
  Path,
  PathValue,
  UseFormSetError,
  UseFormSetValue,
} from "react-hook-form";

import FormError from "./Error";
import { QUERY_KEY } from "@/constants/key";
import { defaultImages } from "@/constants/images";
import { cn } from "@/lib/utils";
import { unsplash } from "@/lib/unsplash";

interface IProps<T extends FieldValues> {
  name: Path<T>;
  setValue: UseFormSetValue<T>;
  setError: UseFormSetError<T>;
  errors: FieldErrors;
}

const FormPicker = <T extends FieldValues>(props: IProps<T>) => {
  const { name, setValue, setError, errors } = props;

  const [images, setImages] =
    useState<Array<Record<string, any>>>(defaultImages);
  const [selectedImageId, setSelectedImageId] = useState<string>("");

  const { pending } = useFormStatus();

  const {
    data: unsplashResult,
    isError,
    isLoading,
    isFetching,
  } = useQuery({
    queryKey: [QUERY_KEY.UNSPLASH],
    queryFn: async () => {
      const result = await unsplash.photos.getRandom({
        collectionIds: ["317099"],
        count: 9,
      });

      return result;
    },
    enabled: false,
    retry: 0,
    refetchOnMount: false,
    refetchOnWindowFocus: false,
  });

  useEffect(() => {
    if (isError) {
      setImages(defaultImages);
    }
  }, [isError]);

  useEffect(() => {
    if (unsplashResult && unsplashResult.response) {
      const newImages = unsplashResult.response as Array<Record<string, any>>;
      setImages(newImages);
    } else {
      toast.error("Get images from unsplash failure!");
    }
  }, [unsplashResult]);

  if (isLoading || isFetching) {
    return (
      <div className="flex justify-center items-center p-6">
        <Loader2 className="w-6 h-6 text-sky-700 animate-spin" />
      </div>
    );
  }

  return (
    <div className="relative">
      <div className="grid grid-cols-3 gap-2 mb-1">
        {images.map((item) => (
          <div
            key={item.id}
            className={cn(
              "relative aspect-video group hover:opacity-75 transition bg-muted cursor-pointer",
              pending && "opacity-50 hover:opacity-50 cursor-auto"
            )}
            onClick={() => {
              if (pending) return;
              setSelectedImageId(item.id);
              setValue(
                name,
                `${item.id}|${item.urls.thumb}|${item.urls.full}|${item.user.name}|${item.links.html}` as PathValue<
                  T,
                  Path<T>
                >
              );
              setError(name, { message: "" });
            }}
          >
            <Image
              src={item.urls.thumb}
              alt="unsplash image"
              fill
              className="object-cover rounded-sm"
            />
            {selectedImageId === item.id && (
              <div className="w-full h-full absolute inset-0 flex justify-center items-center bg-black/30">
                <Check className="w-4 h-4 text-white" />
              </div>
            )}
            <Link
              href={item.links.html}
              target="_blank"
              className="w-full absolute bottom-0 text-xs text-white hover:underline p-1 bg-black/10 truncate opacity-0 group-hover:opacity-100"
            >
              {item.user.name}
            </Link>
          </div>
        ))}
      </div>
      <FormError htmlFor={name} errors={errors} />
    </div>
  );
};

export default FormPicker;
