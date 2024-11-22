import { z } from "zod";
import { useEffect, useRef, useState } from "react";
import { BsChevronLeft, BsChevronRight } from "react-icons/bs";
import { useInView } from "react-intersection-observer";
import { Skeleton } from "@nextui-org/skeleton";

import { useFetchArtistsWithFilterQuery } from "@/redux/features/artistApiSlice";
import { ArtistInSchema } from "@/schemas/artist-schemas";

import EchoeeCard from "./echoee-card";

type TFilter = {
  min_price: number | null;
  max_price: number | null;
  q: string | null;
  genres: number[];
  category: string | null;
};

type Props = {
  title: string;
  filters: TFilter;
};

export default function EchoeeGroup({ title, filters }: Props) {
  const [page, setPage] = useState(1);
  const [echoees, setEchoees] = useState<z.infer<typeof ArtistInSchema>[]>([]);
  const {
    data: paginatedEchoees,
    isLoading,
    refetch,
  } = useFetchArtistsWithFilterQuery({
    ...filters,
    page: page,
  });

  const scrollRef = useRef<HTMLDivElement | null>(null);
  const [showLeftArrow, setShowLeftArrow] = useState(false);
  const [showRightArrow, setShowRightArrow] = useState(true);
  const { ref: endRef, inView } = useInView({
    threshold: 0.3,
    triggerOnce: false,
    delay: 100,
  });

  const onArrowRightClick = () => {
    scrollRef.current?.scrollBy({
      left: scrollRef.current.clientWidth * 0.8,
      behavior: "smooth",
    });
    checkArrowVisibility();
  };

  const onArrowLeftClick = () => {
    scrollRef.current?.scrollBy({
      left: -scrollRef.current.clientWidth,
      behavior: "smooth",
    });
  };

  const checkArrowVisibility = () => {
    if (scrollRef.current) {
      const { scrollLeft, clientWidth, scrollWidth } = scrollRef.current;

      setShowLeftArrow(scrollLeft > 0);
      setShowRightArrow(
        Math.floor(scrollLeft + clientWidth) < Math.ceil(scrollWidth + 5),
      );
      console.log(
        Math.floor(scrollLeft + clientWidth + 2) < Math.ceil(scrollWidth),
      );
      console.log(Math.floor(scrollLeft + clientWidth + 2));
      console.log(Math.ceil(scrollWidth));
      console.log(showLeftArrow, showRightArrow);
    }
  };

  // Add scroll event listener for arrow visibility
  useEffect(() => {
    const scrollContainer = scrollRef.current;

    scrollContainer?.addEventListener("scroll", checkArrowVisibility);
    checkArrowVisibility();

    return () =>
      scrollContainer?.removeEventListener("scroll", checkArrowVisibility);
  }, []);

  // Refetch and reset pagination when filters change
  useEffect(() => {
    setPage(1);
    setEchoees([]);
    refetch();
  }, [filters, refetch]);

  // Append new results to list only when `paginatedEchoees` changes
  useEffect(() => {
    if (paginatedEchoees) {
      setEchoees((prev) => [...prev, ...paginatedEchoees.results]);
    }
    checkArrowVisibility();
  }, [paginatedEchoees]);

  // Trigger loading of the next page when at the end of list and more results are available
  useEffect(() => {
    if (inView && paginatedEchoees?.has_next && !isLoading) {
      if (scrollRef.current) {
        scrollRef.current.scrollTo({ left: scrollRef.current.scrollWidth });
      }
      setPage((prev) => prev + 1);
    }
  }, [inView]);

  if (!isLoading && echoees.length <= 0) {
    return null;
  }

  return (
    <>
      <h1 className="mb-4 mt-12 text-2xl font-bold">{title}</h1>
      <div className="w-full relative group">
        <div
          ref={scrollRef}
          className="flex gap-2 overflow-x-scroll scrollbar-hide"
        >
          {echoees.map((echoee) => (
            <EchoeeCard key={echoee.id} echoee={echoee} />
          ))}
          {isLoading && page == 1 && (
            <div className="flex gap-2">
              <Skeleton className="max-w-[250px] min-w-[250px] min-h-[300px]" />
              <Skeleton className="max-w-[250px] min-w-[250px] min-h-[300px]" />
              <Skeleton className="max-w-[250px] min-w-[250px] min-h-[300px]" />
              <Skeleton className="max-w-[250px] min-w-[250px] min-h-[300px]" />
              <Skeleton className="max-w-[250px] min-w-[250px] min-h-[300px]" />
            </div>
          )}
          {paginatedEchoees?.has_next && !isLoading && (
            <Skeleton
              ref={endRef}
              className="max-w-[250px] min-w-[250px] min-h-[300px]"
            />
          )}
        </div>

        {showRightArrow &&
          !isLoading &&
          echoees.length > 4 &&
          paginatedEchoees?.has_next && (
            <button
              className="absolute invisible group-hover:visible top-[50%] -translate-y-[50%]  right-2"
              onClick={onArrowRightClick}
            >
              <BsChevronRight
                className="text-white/20 hover:text-white transition-all duration-300 rounded-lg hover:bg-white/5 p-2"
                size={80}
              />
            </button>
          )}

        {showLeftArrow && (
          <button
            className="absolute top-[50%] invisible group-hover:visible -translate-y-[50%]  left-2"
            onClick={onArrowLeftClick}
          >
            <BsChevronLeft
              className="text-white/20 hover:text-white transition-all duration-300 rounded-lg hover:bg-white/5 p-2"
              size={80}
            />
          </button>
        )}
      </div>
    </>
  );
}
