"use client";

import { Select, SelectItem } from "@nextui-org/select";
import { Skeleton } from "@nextui-org/skeleton";
import { Dispatch, SetStateAction } from "react";
import { z } from "zod";

import { AcceptedIDsSchema } from "@/schemas/artist-schemas";
import { useFetchAcceptedIdsQuery } from "@/redux/features/artistApiSlice";

type acceptedPickerProps = {
  picked: number | null;
  setPicked: Dispatch<SetStateAction<number | null>>;
  idTypeInString?: string;
  setIdTypeInString?: Dispatch<SetStateAction<string>>;
};

export const AcceptedIdsPicker = ({
  picked,
  setPicked,
  idTypeInString,
  setIdTypeInString,
}: acceptedPickerProps) => {
  const { data: acceptedIds, isLoading } = useFetchAcceptedIdsQuery();

  //filter out id and get name
  const getIdName = (
    idNumber: number,
    acceptedIdsList: z.infer<typeof AcceptedIDsSchema>[],
  ) => {
    const filtered = acceptedIdsList.filter((aid) => aid.id === idNumber);

    return filtered.length > 0 ? filtered[0].name : "";
  };

  return (
    <Skeleton isLoaded={!isLoading}>
      {acceptedIds && (
        <Select
          isRequired
          isLoading={isLoading}
          label="Select government ID type"
          radius="sm"
          size="lg"
          value={idTypeInString ? idTypeInString : undefined}
          onChange={(e) => {
            setPicked(parseInt(e.target.value));
            const idTypeInSTring =
              e.target.value && acceptedIds
                ? getIdName(parseInt(e.target.value), acceptedIds)
                : "";

            setIdTypeInString && setIdTypeInString(idTypeInSTring);
          }}
        >
          {acceptedIds.map((aid) => (
            <SelectItem key={aid.id}>{aid.name}</SelectItem>
          ))}
        </Select>
      )}
    </Skeleton>
  );
};
