'use client'

import { useFetchGenresQuery } from "@/redux/features/artistApiSlice";
import { ArtistApplicationSchema } from "@/schemas/artist-schemas";
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


//FORM STEP 1
//this step is for new artist identity
export default function Step1(){
    const form = useFormContext<z.infer<typeof ArtistApplicationSchema>>();
    const { data: genres, isLoading: isGenresLoading } = useFetchGenresQuery();

    const { fields, append, remove } = useFieldArray<
      z.infer<typeof ArtistApplicationSchema>
    >({
      name: "rates",
    });



    return (
      <Fragment>

        <div>
            <p className="text-2xl font-semibold text-blue-400">Your echoee identity starts here</p>
            <p className="text-sm text-white/50">Let them know who you are as an echoee.</p>
        </div>
        <Spacer y={8}/>

        <Textarea
          {...form.register("bio")}
          variant="faded"
          radius="sm"
          label="Artist Description"
          isInvalid={!!form.formState.errors.bio}
          errorMessage={form.formState.errors.bio?.message}
          placeholder="Type your artist description here..."
        />

        <Skeleton isLoaded={!!genres}>
        {genres && (
          <Select
            variant="faded"
            isRequired
            label="Genres"
            isInvalid={!!form.formState.errors.genres}
            errorMessage={form.formState.errors.genres?.message}
            size="lg"
            placeholder="Select your genres"
            radius="sm"
            isMultiline
            selectedKeys={form.watch("genres")}
            selectionMode="multiple"
            aria-label="select genres"
            onChange={(e) => form.setValue("genres", e.target.value.split(","))}
            renderValue={(items) => (
              <div className="flex flex-wrap gap-2">
                {items.map((item) => (
                  <Chip color="primary" key={item.key}>
                    {item.textValue}
                  </Chip>
                ))}
              </div>
            )}
          >
            {genres?.map((gen) => (
              <SelectItem key={gen.id}>{gen.name}</SelectItem>
            ))}
          </Select>
        )}
</Skeleton>
        {fields.map((item, index) => (
          <div className="flex items-center gap-2" key={item.id}>
            <Input
              {...form.register(`rates.${index}.name`)}
              label="Name of this rate"
              variant="faded"
              size="lg"
              radius="sm"
              placeholder="E.g. 1 to 3 songs"
            />

            <Input
            variant="faded"
                radius="sm"
                size="lg"
                label="Rate amount"

              type="number"
              {...form.register(`rates.${index}.amount`)}
              placeholder="E.g. 5000"
            />

            <Button className="hover:text-red-400 " radius="md" size="lg" variant="faded" isIconOnly  onClick={()=>remove(index)} >
                <MdDelete className="transition-all hover:cursor-pointer duration-75 " size={24}/>
            </Button>
          </div>
        ))}


<Button fullWidth radius="sm" size="lg" startContent={<FaPlus />}  type="button" onClick={() => append({ name: "", amount: "" })}>
          Add Rate
        </Button>

        {form.formState.errors.rates && <p className="text-sm text-[#f31260]">{form.formState.errors.rates.message}</p>}

      </Fragment>
    );
  };
