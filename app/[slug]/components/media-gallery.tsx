import { useState } from "react";

type Props = {
  mediaUrls: string[];
};

export const MediaGallery = ({ mediaUrls }: Props) => {
  return (
    <div className="w-full flex flex-wrap gap-4">
      {mediaUrls.map((url, index) => (
        <div
          key={index}
          className="flex-shrink-0 max-w-[200px] overflow-hidden rounded-lg"
        >
          <img
            src={`${process.env.NEXT_PUBLIC_HOST}${url}`}
            alt={`Image ${index + 1}`}
            className="w-full h-auto object-cover"
          />
        </div>
      ))}
    </div>
  );
};
