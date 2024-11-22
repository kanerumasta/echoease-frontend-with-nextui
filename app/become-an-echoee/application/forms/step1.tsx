"use client";

import { Button } from "@nextui-org/button";
import { Chip } from "@nextui-org/chip";
import { Input, Textarea } from "@nextui-org/input";
import { Select, SelectItem } from "@nextui-org/select";
import { Skeleton } from "@nextui-org/skeleton";
import { Spacer } from "@nextui-org/spacer";
import { Fragment } from "react";
import { useFieldArray, useFormContext } from "react-hook-form";
import { FaPlus } from "react-icons/fa";
import { MdDelete } from "react-icons/md";
import { z } from "zod";

import { ArtistApplicationSchema } from "@/schemas/artist-schemas";
import { useFetchGenresQuery } from "@/redux/features/artistApiSlice";

//FORM STEP 1
//this step is for new artist identity
export default function Step1() {
  const form = useFormContext<z.infer<typeof ArtistApplicationSchema>>();
  const { data: genres } = useFetchGenresQuery();

  const { fields, append, remove } = useFieldArray<
    z.infer<typeof ArtistApplicationSchema>
  >({
    name: "rates",
  });

  return (
    <Fragment>
      <div>
        <p className="text-2xl font-semibold text-blue-400">
          Your echoee identity starts here
        </p>
        <p className="text-sm text-white/50">
          Let them know who you are as an echoee.
        </p>
      </div>
      <Spacer y={8} />

      <Textarea
        {...form.register("bio")}
        errorMessage={form.formState.errors.bio?.message}
        isInvalid={!!form.formState.errors.bio}
        label="Artist Description"
        placeholder="Type your artist description here..."
        radius="sm"
        variant="faded"
      />
      <Input
        {...form.register("stage_name")}
        label="Stage Name"
        placeholder="You may add a stage name here(optional)..."
        radius="sm"
        variant="faded"
      />

      <Skeleton isLoaded={!!genres}>
        {genres && (
          <Select
            isMultiline
            isRequired
            aria-label="select genres"
            errorMessage={form.formState.errors.genres?.message}
            isInvalid={!!form.formState.errors.genres}
            label="Genres"
            placeholder="Select your genres"
            radius="sm"
            renderValue={(items) => (
              <div className="flex flex-wrap gap-2">
                {items.map((item) => (
                  <Chip key={item.key} color="primary">
                    {item.textValue}
                  </Chip>
                ))}
              </div>
            )}
            selectedKeys={form.watch("genres")}
            selectionMode="multiple"
            size="lg"
            variant="faded"
            onChange={(e) => form.setValue("genres", e.target.value.split(","))}
          >
            {genres?.map((gen) => (
              <SelectItem key={gen.id}>{gen.name}</SelectItem>
            ))}
          </Select>
        )}
      </Skeleton>
      {fields.map((item, index) => (
        <div key={item.id} className="flex items-center gap-2">
          <Input
            {...form.register(`rates.${index}.name`)}
            label="Echo Package"
            placeholder="E.g. 1 to 3 songs"
            radius="sm"
            size="lg"
            variant="faded"
          />

          <Input
            label="Package amount"
            radius="sm"
            size="lg"
            type="number"
            variant="faded"
            {...form.register(`rates.${index}.amount`)}
            placeholder="E.g. 5000"
          />

          <Button
            isIconOnly
            className="hover:text-red-400 "
            radius="md"
            size="lg"
            variant="faded"
            onClick={() => remove(index)}
          >
            <MdDelete
              className="transition-all hover:cursor-pointer duration-75 "
              size={24}
            />
          </Button>
        </div>
      ))}

      <Button
        fullWidth
        radius="sm"
        size="lg"
        startContent={<FaPlus />}
        type="button"
        onClick={() => append({ name: "", amount: "" })}
      >
        Add Rate
      </Button>

      {form.formState.errors.rates && (
        <p className="text-sm text-[#f31260]">
          {form.formState.errors.rates.message}
        </p>
      )}
    </Fragment>
  );
}
