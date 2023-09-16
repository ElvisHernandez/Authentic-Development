import React, { useContext, useEffect, useState } from "react";
import { MdCancel } from "react-icons/md";

import { Context } from "./Layout";

import Image from "next/image";
// import { ImageSize } from "../api/images/types";

interface ThumbnailGridProps {
  onThumbnailClick?: (thumbnailUrl: string) => Promise<void>;
  onThumbnailIconClick?: (thumbnailUrl: string) => Promise<void>;
  IconElement?: React.ReactElement;
}

export function ThumbnailGrid(props: ThumbnailGridProps) {
  const { paginatedThumbnailUrls, thumbnailPage } = useContext(Context);

  return (
    <div className="mt-[32px] place-items-center grid sm:grid-cols-1 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-6 gap-3">
      {paginatedThumbnailUrls[thumbnailPage]?.map((thumbnailUrl) => (
        <div
          key={thumbnailUrl}
          className="relative"
          onClick={() => props.onThumbnailClick?.(thumbnailUrl)}
        >
          <Image
            src={thumbnailUrl}
            alt={thumbnailUrl}
            className="rounded"
            width={100}
            height={100}
          />

          {!!props.onThumbnailIconClick && !!props.IconElement && (
            <div
              onClick={() => props.onThumbnailIconClick?.(thumbnailUrl)}
              className="cursor-pointer bg-black rounded-full flex justify-center items-center h-[20px] w-[20px] absolute top-[4px] right-[4px]"
            >
              {props.IconElement}
            </div>
          )}
        </div>
      ))}
    </div>
  );
}

export default function ImagesPage() {
  const context = useContext(Context);
  const { fetchThumbnails, paginatedThumbnailUrls, thumbnailPage } = useContext(Context);

  const uploadImage = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];

    if (!file) return;

    const formData = new FormData();
    formData.append("file", file);

    await fetch("/api/images", {
      method: "post",
      body: formData,
    });

    fetchThumbnails();
  };

  const deleteImage = async (thumbnailUrl: string) => {
    // const [_, incompleteKey] = thumbnailUrl.split(`${ImageSize.small}-`);
    // const s3ObjectKeys = [ImageSize.small, ImageSize.medium, ImageSize.large].map(
    //   (size) => `${size}-${incompleteKey}`
    // );
    // await fetch("/api/images", {
    //   method: "delete",
    //   body: JSON.stringify({
    //     s3ObjectKeys,
    //   }),
    // });
    // fetchThumbnails();
  };

  return (
    <div className="flex flex-col items-center">
      <h1 className="text-center py-[48px] text-[38px] font-semibold">{context.page}</h1>

      <div className="p-[32px] w-4/5 h-fit min-h-[500px] bg-base-200 rounded">
        <header className="flex justify-between mb-[32px]">
          <p>Images: {paginatedThumbnailUrls.reduce((acc, page) => acc + page.length, 0)}</p>

          <input
            type="file"
            className="file-input file-input-bordered w-full max-w-xs"
            onChange={uploadImage}
          />
        </header>

        <ThumbnailGrid onThumbnailIconClick={deleteImage} IconElement={<MdCancel />} />
      </div>
    </div>
  );
}
