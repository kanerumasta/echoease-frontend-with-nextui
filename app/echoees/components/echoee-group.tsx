import { z } from "zod";
import { useRef, useState } from "react";

import { ArtistInSchema } from "@/schemas/artist-schemas";

import EchoeeCard from "./echoee-card";

type Props = {
  echoeeList: z.infer<typeof ArtistInSchema>[];
  title: string;
};

export default function EchoeeGroup({ echoeeList, title }: Props) {
  const scrollRef = useRef<HTMLDivElement | null>(null);
  const [isDragging, setIsDragging] = useState(false);
  const [startX, setStartX] = useState(0);
  const [scrollLeft, setScrollLeft] = useState(0);

  const handleMouseDown = (e: React.MouseEvent) => {
    if (scrollRef.current) {
      setIsDragging(true);
      setStartX(e.pageX - scrollRef.current.offsetLeft);
      setScrollLeft(scrollRef.current.scrollLeft);
    }
  };

  const handleMouseLeaveOrUp = () => {
    setIsDragging(false);
  };

  const handleMouseMove = (e: React.MouseEvent) => {
    if (!isDragging || !scrollRef.current) return;
    e.preventDefault();
    const x = e.pageX - scrollRef.current.offsetLeft;
    const walk = (x - startX) * 2; // The number controls scroll speed

    scrollRef.current.scrollLeft = scrollLeft - walk;
  };

  return (
    <>
      <h1 className="mb-4 mt-12 text-2xl font-bold">{title}</h1>
      <div
        ref={scrollRef}
        className="w-full  flex gap-2 overflow-x-scroll scrollbar-hide"
        style={{
          cursor: isDragging ? "grabbing" : "grab",
        }}
        onMouseDown={handleMouseDown}
        onMouseLeave={handleMouseLeaveOrUp}
        onMouseMove={handleMouseMove}
        onMouseUp={handleMouseLeaveOrUp}
      >
        {echoeeList.map((echoee) => (
            <EchoeeCard key={echoee.id} echoee={echoee} />
        ))}

      </div>
    </>
  );
}
