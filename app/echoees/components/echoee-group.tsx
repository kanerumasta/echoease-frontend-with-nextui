import { ArtistInSchema } from "@/schemas/artist-schemas";
import { z } from "zod";
import EchoeeCard from "./echoee-card";
import { useRef, useState } from "react";

type Props = {
  echoeeList: z.infer<typeof ArtistInSchema>[];
};

export default function EchoeeGroup({ echoeeList }: Props) {
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
    <div
      ref={scrollRef}
      onMouseDown={handleMouseDown}
      onMouseLeave={handleMouseLeaveOrUp}
      onMouseUp={handleMouseLeaveOrUp}
      onMouseMove={handleMouseMove}
      style={{
        cursor: isDragging ? "grabbing" : "grab",
      }}
      className="w-full flex gap-2 overflow-x-scroll scrollbar-hide"
    >
      {echoeeList.map((echoee) => (
        <>
          <EchoeeCard echoee={echoee} />

        </>
      ))}
    </div>
  );
}
