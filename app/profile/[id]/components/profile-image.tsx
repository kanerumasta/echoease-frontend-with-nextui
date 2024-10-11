import CustomImage from "@/components/image";
import { UserSchema } from "@/schemas/user-schemas";
import { Modal, ModalBody, ModalContent, useDisclosure } from "@nextui-org/modal";
import { z } from "zod";

export const ProfileImage = ({imageSrc}:{imageSrc:string}) =>{
    const {isOpen , onOpen, onClose, onOpenChange} = useDisclosure()
    return<>
        <CustomImage onPress={onOpen} width="200px" height="200px" className="rounded-full" src={imageSrc}/>
        <Modal isOpen={isOpen} onOpenChange={onOpenChange}>
            <ModalContent>
                <ModalBody>
                <CustomImage width="500px" height="500px" className="rounded-md" src={imageSrc}/>
                </ModalBody>
            </ModalContent>
        </Modal>
    </>
}
