import { useState } from "react";
import { useForm, useFieldArray, Controller } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { ArtistInSchema, SpecialTimeSlotsSchema } from "@/schemas/artist-schemas";
import { z } from "zod";
import { Button } from "@nextui-org/button";
import { Modal, ModalBody, ModalContent, ModalHeader } from "@nextui-org/modal";
import { useCreateSpecialTimeSlotMutation } from "@/redux/features/artistApiSlice";
// import { Button, Modal, ModalContent, ModalHeader, ModalBody}

type FormData = z.infer<typeof SpecialTimeSlotsSchema>;

type Props = {
    artist:z.infer<typeof ArtistInSchema>,
    date:Date
}

export const SpecialTimeSlotForm = ({artist,date}:Props) => {
  const [isOpen, setIsOpen] = useState(false);
const [createSpecialTimeSlot] = useCreateSpecialTimeSlotMutation()
  // Initialize form and field array
  const { control, handleSubmit, formState: { errors } } = useForm<FormData>({
    resolver: zodResolver(SpecialTimeSlotsSchema),
    defaultValues: {
      time_slots: [{ start_time: "", end_time: "" }],
    },
  });

  // For managing dynamic slots
  const { fields, append, remove } = useFieldArray({
    control,
    name: "time_slots",
  });

  const onSubmit = (data: FormData) => {
    data.time_slots.map((slot)=>{
        const payload = {
            date: `${date.getFullYear()}-${date.getMonth()+1}-${date.getDate()}`,
            start_time: slot.start_time,
            end_time:slot.end_time,
            artist:artist.id
        }
        createSpecialTimeSlot(payload)
    })

  };

  return (
    <div>
      <Button color="primary" onPress={() => setIsOpen(true)}>Add a special timeslot</Button>

      <Modal onOpenChange={setIsOpen} isOpen={isOpen}>
        <ModalContent>
          <ModalHeader>Add Special Time Slots</ModalHeader>
          <ModalBody>
            <form onSubmit={handleSubmit(onSubmit)}>
              <div className="flex flex-col space-y-4">

                <label>Time Slots</label>
                {fields.map((field, index) => (
                  <div key={field.id} className="flex space-x-4 items-center">
                    <Controller
                      control={control}
                      name={`time_slots.${index}.start_time`}
                      render={({ field }) => (
                        <input
                          type="time"
                          {...field}
                          className="input"
                        />
                      )}
                    />
                    <span>to</span>
                    <Controller
                      control={control}
                      name={`time_slots.${index}.end_time`}
                      render={({ field }) => (
                        <input
                          type="time"
                          {...field}
                          className="input"
                        />
                      )}
                    />
                    <Button
                      size="sm"
                      onPress={() => remove(index)}
                      className="bg-red-500 text-white"
                    >
                      Remove
                    </Button>
                  </div>
                ))}
                {errors.time_slots && <p className="error">{errors.time_slots.message}</p>}

                <Button onPress={() => append({ start_time: "", end_time: "" })}>
                  Add Another Slot
                </Button>

                <Button type="submit" className="bg-blue-500 text-white">
                  Submit
                </Button>
              </div>
            </form>
          </ModalBody>
        </ModalContent>
      </Modal>
    </div>
  );
};
