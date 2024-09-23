"use client";

import { useCreateBooking } from "@/hooks/bookings";
import useLoginRequired from "@/hooks/use-login-required";
import useFetchAddresses from "@/hooks/utils/use-fetch-addresses";

import { cn } from "@/lib/utils";
import {
  useFetchArtistRatesQuery,
  useFetchDetailArtistBySlugQuery,
  useFetchPortfolioQuery,
  useFollowArtistMutation,
  useUnfollowArtistMutation,
} from "@/redux/features/artistApiSlice";
import { useFetchCurrentUserQuery } from "@/redux/features/authApiSlice";
import {
  useFetchChatBySlugQuery,
  useFetchChatsQuery,
} from "@/redux/features/chatApiSlice";
import {
  ArtistInSchema,
  InPortfolioItemSchema,
} from "@/schemas/artist-schemas";
import { BookingSchema } from "@/schemas/booking-schemas";
import { DevTool } from "@hookform/devtools";
import { getLocalTimeZone, parseDate, today } from "@internationalized/date";
import { Autocomplete, AutocompleteItem } from "@nextui-org/autocomplete";
import { Button } from "@nextui-org/button";
import { Chip } from "@nextui-org/chip";
import { TimeInput } from "@nextui-org/date-input";
import { DatePicker } from "@nextui-org/date-picker";
import { Input } from "@nextui-org/input";
import {
  Modal,
  ModalBody,
  ModalContent,
  ModalFooter,
  ModalHeader,
  useDisclosure,
} from "@nextui-org/modal";
import { Spacer } from "@nextui-org/spacer";
import { Poppins } from "next/font/google";
import { notFound, useParams, useRouter } from "next/navigation";
import { Fragment, Key, useEffect, useRef, useState } from "react";
import { FormProvider, useFormContext } from "react-hook-form";
import {
  FaFacebook,
  FaInstagram,
  FaPhone,
  FaPlay,
  FaSpotify,
  FaTwitter,
  FaYoutube,
} from "react-icons/fa";
import { HiChat } from "react-icons/hi";
import { ImLocation } from "react-icons/im";
import { RiUserFollowFill } from "react-icons/ri";
import { SlUserFollowing } from "react-icons/sl";
import { useInView } from "react-intersection-observer";
import { z } from "zod";
const interReg = Poppins({
  subsets: ["latin"],
  weight: "400",
});

const interBold = Poppins({
  subsets: ["latin"],
  weight: "800",
});

export default function Page() {
  const {
    data: user,
    isLoading: isUserLoading,
    isError: isUserError,
    isFetching,
  } = useFetchCurrentUserQuery();

  const params = useParams<{ slug: string }>();
  const { isOpen, onClose, onOpen, onOpenChange } = useDisclosure();
  const { ref, inView } = useInView({ threshold: 1 });
  const router = useRouter();
  const {
    data: currentUser,
    isLoading: currentUserLoading,
    isError: currentUserError,
  } = useFetchCurrentUserQuery();
  const {
    data: artist,
    isLoading: isArtistLoading,
    isError: isArtistError,
  } = useFetchDetailArtistBySlugQuery(params.slug);
  const [isAboutVisible, setIsAboutVisible] = useState(false);

  useLoginRequired(`/${params.slug}`);

  if (isArtistError) {
    return notFound();
  }

  const handleBookPress = () => {
    if (!currentUser?.profile?.is_complete) {
      window.location.href = `/auth/register/profile?redirect=${encodeURIComponent(`/${artist?.slug}`)}`;
    } else {
      onOpen();
    }
  };

  useEffect(() => {
    if (inView) {
      setIsAboutVisible(true);
    }
  }, [inView]);

  return (
    <div className="flex w-full min-h-screen flex-col">
      {artist && <Landing artist={artist} />}
      <div className="">
        <div ref={ref} className="min-h-[200px] flex gap-4">
          {artist && isAboutVisible && <About artist={artist} />}
        </div>
        <Spacer y={8} />
        <h1 className="text-3xl text-center mb-8 font-bold text-blue-400">
          Portfolio
        </h1>
        {artist && <Portfolio artist={artist} />}
        {artist?.user.id !== currentUser?.id && (
          <Button
            onClick={handleBookPress}
            color="primary"
            className="fixed top-6 right-6 overflow-visible  rounded-full hover:-translate-y-1 px-12 shadow-xl bg-blue-500/70 animate-bounce after:content-[''] after:absolute after:rounded-full after:inset-0 after:bg-blue-500/80 after:z-[-1] after:transition after:!duration-500 hover:after:scale-150 hover:after:opacity-0"
          >
            Book Me
          </Button>
        )}
        <Modal
          size="3xl"
          onOpenChange={onOpenChange}
          scrollBehavior="outside"
          isDismissable={false}
          isKeyboardDismissDisabled={false}
          isOpen={isOpen}
        >
          {artist && <BookingForm artist={artist} />}
        </Modal>
      </div>
    </div>
  );
}

const BookingForm = ({
  artist,
}: {
  artist: z.infer<typeof ArtistInSchema>;
}) => {
  const [currentStep, setCurrentStep] = useState(0);
  const { form, bookingState, onSubmit } = useCreateBooking();
  const formRef = useRef<HTMLFormElement | null>(null);
  const steps = [
    {
      id: "step1",
      fields: [
        "eventName",
        "eventDate",

        "municipality",
        "barangay",
        "street",
        "landmark",
        "eventTime",
      ],
    },
    {
      id: "step2",
      fields: ["rate"],
    },
  ];
  const handleNext = async () => {
    const fields = steps[currentStep].fields;

    type FieldName = keyof z.infer<typeof BookingSchema>;

    const valid = await form.trigger(fields as FieldName[]);
    console.log(valid);
    console.log(fields);
    if (!valid) {
      return;
    }

    setCurrentStep((prev) => ++prev);
  };

  const handleSubmitClick = () => {
    if (formRef.current) {
      formRef.current.requestSubmit();
    }
  };

  return (
    <ModalContent>
      {(onClose) => (
        <Fragment>
          <ModalHeader>
            <p>
              You are booking{" "}
              <span className="font-bold capitalize text-blue-400">
                {`${artist?.user.first_name} ${artist?.user.last_name}`}
              </span>
            </p>
          </ModalHeader>
          <ModalBody>
            <FormProvider {...form}>
              <form
                ref={formRef}
                onSubmit={form.handleSubmit(onSubmit)}
                className="space-y-4"
              >
                {currentStep === 0 && <BookingStep1 artist={artist} />}
                {currentStep === 1 && <BookingStep2 artist={artist} />}
                {currentStep === 2 && <FinalBookingStep artist={artist} />}
                <DevTool control={form.control} />
              </form>
            </FormProvider>
          </ModalBody>
          <ModalFooter>
            {currentStep > 0 && (
              <Button onPress={() => setCurrentStep((prev) => --prev)}>
                Cancel
              </Button>
            )}

            {currentStep <= 1 && (
              <Button color="primary" onPress={handleNext}>
                Next
              </Button>
            )}
            {currentStep > 1 && (
              <Button
                onClick={handleSubmitClick}
                isDisabled={bookingState.isLoading}
                color="primary"
              >
                Submit
              </Button>
            )}
          </ModalFooter>
        </Fragment>
      )}
    </ModalContent>
  );
};

const BookingStep1 = ({
  artist,
}: {
  artist: z.infer<typeof ArtistInSchema>;
}) => {
  const {
    barangays,
    brgyLoading,
    fetchBarangays,
    fetchMunicipalities,
    fetchProvinces,
    municipalities,
    municipalityLoading,
    pronvinceLoading,
    provinces,
  } = useFetchAddresses();
  const form = useFormContext<z.infer<typeof BookingSchema>>();
  const [selectedMunicipalityCode, setSelectedMunicipalityCode] =
    useState<any>(null);
  const provinceCode = "072200000"; //CEBU

  useEffect(() => {
    fetchMunicipalities(provinceCode);
  }, []);

  useEffect(() => {
    selectedMunicipalityCode && fetchBarangays(selectedMunicipalityCode);
  }, [selectedMunicipalityCode]);

  function getMunicipalityName(
    municipalities: { name: string; code: string }[],
    municipalityCode: Key
  ) {
    const filtered = municipalities.filter(
      (municipality) => municipality.code === municipalityCode
    );
    return filtered[0].name;
  }

  return (
    <Fragment>
      <input
        {...form.register("artist")}
        value={artist.id}
        style={{ display: "none" }}
      />

      <Input
        size="lg"
        color="primary"
        variant="underlined"
        radius="sm"
        {...form.register("eventName")}
        label="What's the event?"
        placeholder="E.g Birthday"
        isInvalid={!!form.formState.errors.eventName}
      />
      <DatePicker
        color="primary"
        size="lg"
        variant="underlined"
        radius="sm"
        onChange={(e) =>
          form.setValue("eventDate", `${e.month}/${e.day}/${e.year}`)
        }
        label="When should we mark our calendars?"
        minValue={today(getLocalTimeZone()).add({ days: 1 })}
        maxValue={today(getLocalTimeZone()).add({ years: 1 })}
        isInvalid={!!form.formState.errors.eventDate}
      />
      <TimeInput
        color="primary"
        size="lg"
        variant="underlined"
        radius="sm"
        aria-label="time-input"
        label="At what time?"
        onChange={(e) => form.setValue("eventTime", e.toString())}
        isInvalid={!!form.formState.errors.eventTime}
      />
      <Input
        color="primary"
        {...form.register("province")}
        size="lg"
        variant="underlined"
        radius="sm"
        label="Province"
        value={"Cebu"}
        isReadOnly
      />

      <Autocomplete
        color="primary"
        size="lg"
        radius="sm"
        variant="underlined"
        isInvalid={!!form.formState.errors.municipality}
        label="Select city or municipality"
        isLoading={municipalityLoading}
        onSelectionChange={(key) => {
          setSelectedMunicipalityCode(key);
          municipalities &&
            key &&
            form.setValue(
              "municipality",
              getMunicipalityName(municipalities, key)
            );
        }}
      >
        {(municipalities ?? []).map((municipality) => (
          <AutocompleteItem key={municipality.code} value={municipality.code}>
            {municipality.name}
          </AutocompleteItem>
        ))}
      </Autocomplete>
      <Autocomplete
        color="primary"
        size="lg"
        isInvalid={!!form.formState.errors.barangay}
        radius="sm"
        variant="underlined"
        label="Select a barangay"
        isLoading={brgyLoading}
        onSelectionChange={(v) => v && form.setValue("barangay", v.toString())}
      >
        {/* Only render AutocompleteItem if barangays is defined */}
        {(barangays ?? []).map((barangay) => (
          <AutocompleteItem key={barangay.name} value={barangay.name}>
            {barangay.name}
          </AutocompleteItem>
        ))}
      </Autocomplete>
      <Input
        color="primary"
        isInvalid={!!form.formState.errors.street}
        size="lg"
        variant="underlined"
        {...form.register("street")}
        label="Street"
      />
      <Input
        color="primary"
        isInvalid={!!form.formState.errors.landmark}
        size="lg"
        variant="underlined"
        {...form.register("landmark")}
        label="Landmark"
      />
    </Fragment>
  );
};

const BookingStep2 = ({
  artist,
}: {
  artist: z.infer<typeof ArtistInSchema>;
}) => {
  const { data: rates } = useFetchArtistRatesQuery(artist.id.toString());
  const form = useFormContext<z.infer<typeof BookingSchema>>();
  const selectedRateId = form.watch("rate");
  return (
    <Fragment>
      <h1 className="text-center">Choose a Rate</h1>
      <div className="flex  w-full justify-evenly">
        {rates?.map((r) => (
          <div
            onClick={() => {
              form.setValue("rate", r.id.toString());
              form.setValue("rateAmount", r.amount.toString());
              form.setValue("rateName", r.name);
            }}
            key={r.name}
            className={cn(
              "flex flex-col hover:cursor-pointer items-center bg-white p-8 rounded-xl",
              { "bg-blue-500": selectedRateId === r.id.toString() }
            )}
          >
            <p
              className={cn("capitalize text-black/70", {
                "text-white/70": selectedRateId === r.id.toString(),
              })}
            >
              {r.name}
            </p>
            <p
              className={cn("capitalize text-3xl font-bold text-black", {
                "text-white": selectedRateId === r.id.toString(),
              })}
            >
              P{r.amount}
            </p>
          </div>
        ))}
      </div>
    </Fragment>
  );
};

const FinalBookingStep = ({
  artist,
}: {
  artist: z.infer<typeof ArtistInSchema>;
}) => {
  const form = useFormContext<z.infer<typeof BookingSchema>>();

  return (
    <div className="flex gap-4">
      <div className="min-w-[200px] rounded-md h-[200px] overflow-hidden">
        <img
          className="w-full h-full object-cover"
          width={200}
          src={`${process.env.NEXT_PUBLIC_HOST}${artist.user.profile?.profile_image}`}
        />
      </div>
      <div className="bg-white/5 rounded-md p-4 w-full space-y-3">
        <div className="flex items-center">
          <span className="w-[80px] text-white/50">Event: </span>
          <p className="text-lg font-semibold">{form.watch("eventName")}</p>
        </div>
        <div className="flex items-center">
          <span className="w-[80px] text-white/50">Date: </span>
          <p className="text-lg font-semibold"> {form.watch("eventDate")}</p>
        </div>
        <div className="flex items-center">
          <span className="w-[80px] text-white/50">Time: </span>
          <p className="text-lg font-semibold"> {form.watch("eventTime")}</p>
        </div>
        <div className="capitalize flex items-center">
          <span className="w-[80px] text-white/50">Location: </span>
          <p className="text-lg font-semibold">
            {form.watch("street")}, {form.watch("barangay")},
            {form.watch("municipality")}, {form.watch("province")} @
            {form.watch("landmark")}
          </p>
        </div>
        <div className="capitalize flex items-center">
          <span className="w-[80px] text-white/50">Rate: </span>
          <p className="text-lg font-semibold">
            {form.watch("rateName")} for P{form.watch("rateAmount")}
          </p>
        </div>
      </div>
    </div>
  );
};

const Landing = ({ artist }: { artist: z.infer<typeof ArtistInSchema> }) => {
  return (
    <div
      className={cn(
        interReg.className,
        "h-screen flex flex-col justify-center px-20 w-full "
      )}
    >
      <div className="h-screen w-screen absolute top-0 right-0 overflow-hidden">
        <img
          width={100}
          className="w-full h-full object-cover"
          src={`${process.env.NEXT_PUBLIC_HOST}${artist.user.profile?.profile_image}`}
        />
      </div>
      <div className="h-screen z-100 absolute top-0 left-0 w-full bg-gradient-to-r from-black via-black/90 to-black/35 "></div>
      <div className="z-30 space-y-4 ">
        <h1 className="text-3xl font-bold">Hello, My name is</h1>
        <p className={cn(interBold.className, "text-7xl capitalize font-bold")}>
          {artist.user.fullname}
        </p>
        <p>A passionate singer </p>
      </div>
    </div>
  );
};

const About = ({ artist }: { artist: z.infer<typeof ArtistInSchema> }) => {
  const params = useParams<{ slug: string }>();
  const { refetch } = useFetchDetailArtistBySlugQuery(params.slug);
  const { refetch: refetchChats } = useFetchChatsQuery();
  const { data: currentUser, isLoading } = useFetchCurrentUserQuery();
  const {
    data: conversation,
    isLoading: conversationLoading,
    isError: isConversationLoading,
  } = useFetchChatBySlugQuery(params.slug);

  const [followArtist, { isLoading: followLoading, isError: followError }] =
    useFollowArtistMutation();
  const [
    unfollowArtist,
    { isLoading: unfollowLoading, isError: unfollowError },
  ] = useUnfollowArtistMutation();

  const router = useRouter();

  if (isLoading) return <div>Loading...</div>;

  const handleFollow = () => {
    const formData = new FormData();
    formData.append("artist", artist.id.toString());
    followArtist(formData)
      .unwrap()
      .then(() => refetch())
      .catch();
  };
  const handleUnfollow = () => {
    const formData = new FormData();
    formData.append("artist", artist.id.toString());
    unfollowArtist(formData)
      .unwrap()
      .then(() => refetch())
      .catch();
  };

  const handleMessageMeClick = () => {
    refetchChats();
    router.push(`/messages/${conversation?.code}`);
  };
  return (
    <div className="flex gap-4 duration-1000 animate-appearance-in h-screen w-full">
      {/* Image Profile */}
      <div className=" w-full md:w-[80%] h-[60%] bg-white/5 rounded-xl p-2 m-auto flex flex-col md:flex-row">
        <div className="h-full w-full rounded-md overflow-hidden">
          <img
            width={200}
            className="w-full h-full object-cover"
            src={`${process.env.NEXT_PUBLIC_HOST}${artist.user.profile?.profile_image}`}
          />
        </div>
        <div className=" w-full px-5">
          <p className="text-blue-400 font-bold">About Me</p>
          <p className="capitalize lg:text-5xl md:text-3xl text-2xl font-bold">{`${artist.user.fullname}`}</p>

          {artist?.followers?.length > 0 && (
            <Chip size="sm">{`${artist.followers?.length} Follower${artist.followers.length === 1 ? "" : "s"}`}</Chip>
          )}
          <Spacer y={4} />

          <div className="flex items-center gap-2">
            {currentUser && !artist.followers.includes(currentUser.id) && (
              <Button
                startContent={<RiUserFollowFill size={24} />}
                isLoading={followLoading}
                onPress={handleFollow}
                radius="sm"
                color="primary"
              >
                Follow
              </Button>
            )}
            {currentUser && artist.followers.includes(currentUser.id) && (
              <Button
                startContent={<SlUserFollowing size={24} />}
                onPress={handleUnfollow}
                isLoading={unfollowLoading}
                radius="sm"
              >
                Following
              </Button>
            )}
            <Button
              startContent={<HiChat size={24} />}
              onClick={handleMessageMeClick}
              color="default"
              radius="sm"
            >
              Message Me
            </Button>
          </div>
          <Spacer y={4} />
          <p className="text-sm mb-1 dark:text-white/30">Personal Details</p>
          <div className="space-y-2">
            <div className="flex items-center">
              <ImLocation size={20} className="mr-2" />
              {artist.user.profile?.complete_address && (
                <p className="capitalize dark:text-white/60 text-md ">
                  {artist.user.profile.complete_address}
                </p>
              )}
            </div>
            <div className="flex items-center">
              <FaPhone size={20} className="mr-2" />
              <p className=" dark:text-white/60 text-md ">
                {artist.user.profile?.phone}
              </p>
            </div>
          </div>
          <Spacer y={2} />
          <p className="text-sm mb-1 dark:text-white/30">Genres</p>
          <div className="flex space-x-2 w-full">
            {artist.genres?.map((genre) => (
              <Chip
                color="secondary"
                className="capitalize dark:text-white"
                key={genre.id}
              >
                #{genre.name}
              </Chip>
            ))}
          </div>
          <p className="text-sm mb-1 dark:text-white/30">Rate</p>
          <Links artist={artist} />
        </div>
      </div>
    </div>
  );
};

const Links = ({ artist }: { artist: z.infer<typeof ArtistInSchema> }) => {
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

const Portfolio = ({ artist }: { artist: z.infer<typeof ArtistInSchema> }) => {
  const { data } = useFetchPortfolioQuery(artist.id.toString());

  return (
    <div className="flex flex-col lg:flex-row md:px-20 gap-4">
      {data?.items.map((item) => (
        <div key={item.id} className=" w-full ">
          <p className="text-lg mb-3 font-bold capitalize">{item.title}</p>
          <Grid key={item.id} item={item} />
        </div>
      ))}
    </div>
  );
};

const Banner = () => {
  return (
    <div className="w-full overflow-hidden h-[300px] bg-blue-500 ">
      <img className="object-cover w-full" src="/media/banner.jpg" />
    </div>
  );
};

const Grid = ({ item }: { item: z.infer<typeof InPortfolioItemSchema> }) => {
  const maxVisible = 4; // Maximum number of media to display
  const allMedia = [...item.videos, ...item.images]; // Combine videos and images into one array
  const visibleMedia = allMedia.slice(0, maxVisible); // Show only the first 9 media
  const remainingCount = allMedia.length - maxVisible;
  return (
    <div className="flex flex-wrap relative gap-2">
      {visibleMedia.map((media, mediaIndex) => (
        <div
          key={mediaIndex}
          className={cn(
            "hover:cursor-pointer hover:opacity-80 transition duration-150 ease-in-out flex-grow w-[150px]  h-[200px] rounded-md overflow-hidden",
            {
              relative: mediaIndex === 3,
            }
          )}
        >
          {media.endsWith(".mp4") ? (
            <div className="relative w-full h-full">
              <video className="w-full h-full object-cover" width={200}>
                <source src={`${process.env.NEXT_PUBLIC_HOST}${media}`} />
              </video>
              <FaPlay
                color="white"
                size={30}
                className="absolute top-[50%] left-[50%] translate-x-[-50%] translate-y-[-50%]"
              />
            </div>
          ) : (
            <img
              className="w-full h-full object-cover"
              width={200}
              height={200}
              src={`${process.env.NEXT_PUBLIC_HOST}${media}`}
              alt="Portfolio Media"
            />
          )}
          {mediaIndex === 3 && (
            <div className="absolute bottom-0 right-0 bg-black bg-opacity-70 flex items-center justify-center text-3xl text-white w-full h-full rounded-md z-10">
              {`+${remainingCount}`}
            </div>
          )}
        </div>
      ))}
    </div>
  );
};
