import { Time } from "@internationalized/date";
import { Button } from "@nextui-org/button";
import { TimeInput } from "@nextui-org/date-input";
import {
    Modal,
    ModalBody,
    ModalContent,
    ModalFooter,
    ModalHeader,
} from "@nextui-org/modal";
import { Dispatch, SetStateAction, useState } from "react";
import { IoMdTime } from "react-icons/io";

type Props = {
  selectedStartTime: Time;
  selectedEndTime: Time;
  setSelectedStartTime: Dispatch<SetStateAction<Time>>;
  setSelectedEndTime: Dispatch<SetStateAction<Time>>;
};

export const SelectTime = ({
  selectedStartTime,
  selectedEndTime,
  setSelectedStartTime,
  setSelectedEndTime,
}: Props) => {
  const [isOpen, setIsOpen] = useState(false);
  const handleSubmit = () => {
    setIsOpen(false);
  };

  return (
    <>
      <Button startContent={<IoMdTime />} onClick={() => setIsOpen(true)}>
        Pick Event Time
      </Button>
      <Modal isOpen={isOpen} onClose={() => setIsOpen(false)}>
        <ModalContent>
          <ModalHeader>Pick Event Time</ModalHeader>
          <ModalBody>
            <div>
              <h3>Select Start Time</h3>
              <TimeInput
                value={selectedStartTime}
                onChange={(value) => setSelectedStartTime(value)}
              />
            </div>
            <div className="mt-4">
              <h3>Select End Time</h3>
              <TimeInput
                value={selectedEndTime}
                onChange={(value) => setSelectedEndTime(value)}
              />
            </div>
          </ModalBody>
          <ModalFooter>
            <Button color="primary" onClick={handleSubmit}>
              Submit
            </Button>
            <Button color="secondary" onClick={() => setIsOpen(false)}>
              Cancel
            </Button>
          </ModalFooter>
        </ModalContent>
      </Modal>
    </>
  );
};
