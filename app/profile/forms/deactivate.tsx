'use client'
import { useDeactivateUserMutation, useLogoutUserMutation } from "@/redux/features/authApiSlice"

import { Button } from "@nextui-org/button"
import { Modal, ModalBody, ModalContent, ModalFooter, ModalHeader, useDisclosure } from "@nextui-org/modal"
import { useRouter } from "next/navigation"



export const Deactivate = () => {
    const {isOpen,onClose, onOpenChange, onOpen} = useDisclosure()
    const [deactivate,{isLoading}] = useDeactivateUserMutation()
    const [logout] = useLogoutUserMutation()
    const router = useRouter()

    const handleDeactivate = async() => {
        await deactivate()
        logout()
        onClose()
        router.replace('/auth/login')
    };

    return <>
    <Button
            onPress={onOpen}
              className="text-white"
              color="danger"
              radius="sm"
              variant="ghost"
            >
              Deactivate
            </Button>
            <Modal isOpen={isOpen} onOpenChange={onOpenChange}>
        <ModalContent>
            <ModalHeader>
              <h1 className="text-2xl font-bold text-[#f31260]">Deactivate Account</h1>
            </ModalHeader>
            <ModalBody>
                <h1>Are you sure you want to deactivate your account?</h1>
                 <p className="text-sm text-white/40">Deactivating your account will disable your access to the platform and hide your profile from other users. You will not be able to interact with any content or services until you reactivate your account.<br className="mb-1"/> Are you sure you want to proceed with deactivating your account?</p>
            </ModalBody>
            <ModalFooter>
                <Button
                  className=""
                  color="default"
                  onClick={onClose}
                  radius="sm"
                  variant="solid"
                >
                  No
                </Button>
                <Button
                isLoading={isLoading}
                isDisabled={isLoading}

                  className=" bg-[#f31260] "
                  color="primary"
                  onClick={handleDeactivate}
                  radius="sm"
                  variant="solid"
                >
                  Yes
                </Button>

            </ModalFooter>
        </ModalContent>
      </Modal>
    </>
}
