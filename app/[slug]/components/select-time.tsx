import { Time } from "@internationalized/date"
import { Button } from "@nextui-org/button"
import { TimeInput, TimeInputValue } from "@nextui-org/date-input"
import { Modal, ModalBody, ModalContent, ModalFooter, ModalHeader } from "@nextui-org/modal"
import { Dispatch, SetStateAction, useState } from "react"
import { IoMdTime } from "react-icons/io"

type Props = {
    selectedStartTime: Time,
    selectedEndTime: Time,
    setSelectedStartTime: Dispatch<SetStateAction<Time>>,
    setSelectedEndTime: Dispatch<SetStateAction<Time>>,
};


export const SelectTime = ({ selectedStartTime, selectedEndTime, setSelectedStartTime, setSelectedEndTime }: Props) => {
    const [isOpen, setIsOpen] = useState(false);
    const [currentTimeType, setCurrentTimeType] = useState<'start' | 'end'>('start');

    const handleSubmit = () => {
        setIsOpen(false);
    };

    return (
        <>
            <Button onClick={() => setIsOpen(true)} startContent={<IoMdTime />}>
                Pick Event Time
            </Button>
            <Modal isOpen={isOpen} onClose={() => setIsOpen(false)}>
                <ModalContent>
                    <ModalHeader>Pick Event Time</ModalHeader>
                    <ModalBody>
                        <div>
                            <h3>Select Start Time</h3>
                           <TimeInput onChange={(value)=>setSelectedStartTime(value)} value={selectedStartTime}/>
                        </div>
                        <div className="mt-4">
                            <h3>Select End Time</h3>
                            <TimeInput onChange={(value)=>setSelectedEndTime(value)} value={selectedEndTime}/>
                        </div>
                    </ModalBody>
                    <ModalFooter>
                        <Button onClick={handleSubmit} color="primary">
                            Submit
                        </Button>
                        <Button onClick={() => setIsOpen(false)} color="secondary">
                            Cancel
                        </Button>
                    </ModalFooter>
                </ModalContent>
            </Modal>
        </>
    );
};
