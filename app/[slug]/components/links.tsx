import { ArtistInSchema } from "@/schemas/artist-schemas";
import {
  FaFacebook,
  FaInstagram,
  FaSpotify,
  FaTwitter,
  FaYoutube,
} from "react-icons/fa";
import { z } from "zod";

export const Links = ({
  artist,
}: {
  artist: z.infer<typeof ArtistInSchema>;
}) => {
  return (
    <div className="flex gap-2 justify-end">
      {artist.fb_link && (
        <a href={artist.fb_link}>
          <FaFacebook opacity={0.6} size={24} />
        </a>
      )}
      {artist.instagram && (
        <a href={artist.instagram}>
          <FaInstagram opacity={0.6} size={24} />
        </a>
      )}
      {artist.twitter && (
        <a href={artist.twitter}>
          {" "}
          <FaTwitter opacity={0.6} size={24} />
        </a>
      )}
      {artist.spotify && (
        <a href={artist.spotify}>
          {" "}
          <FaSpotify opacity={0.6} size={24} />
        </a>
      )}
      {artist.youtube && (
        <a href={artist.youtube}>
          {" "}
          <FaYoutube opacity={0.6} size={24} />
        </a>
      )}
    </div>
  );
};
