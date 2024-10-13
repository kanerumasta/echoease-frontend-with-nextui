import { ArtistInSchema } from "@/schemas/artist-schemas";
import { UserSchema } from "@/schemas/user-schemas";
import React, { createContext, useContext, ReactNode } from "react";
import { z } from "zod";




const BookingContext = createContext<BookingContextProps | null>(null);

export const useBookingContext = () => {
    const context = useContext(BookingContext);
    if (!context) {
      throw new Error("useBookingContext must be used within a BookingProvider");
    }
    return context;
  };


export const BookingProvider:React.FC<BookingProviderProps> = ({
  artist,
  currentUser,
  children,
}) => {
  return (
    <BookingContext.Provider value={{ artist, currentUser }}>
      {children}
    </BookingContext.Provider>
  );
};



type BookingProviderProps = {
    artist: z.infer<typeof ArtistInSchema>;
    currentUser:z.infer<typeof UserSchema>;
    children: ReactNode;
  }

interface BookingContextProps {
    artist: z.infer<typeof ArtistInSchema>;
    currentUser:z.infer<typeof UserSchema>;
  }
