"use client";
import {
  Modal,
  ModalContent,
  ModalHeader,
  ModalBody,
  ModalFooter,
} from "@nextui-org/modal";
import { useDisclosure } from "@nextui-org/use-disclosure";
import { Button } from "@nextui-org/button";

export default function NewModal({
  buttonText,
  modalHeader,
  modalContent,
  modalFooter,
}) {
  const { isOpen, onOpen, onOpenChange } = useDisclosure();
  return (
    <>
      <Button onPress={onOpen}>{buttonText}</Button>
      <Modal isOpen={isOpen} onOpenChange={onOpenChange}>
        <ModalContent>
          {(onClose) => (
            <>
              <ModalHeader className="flex flex-col gap-1">
                {modalHeader}
              </ModalHeader>
              <ModalBody>{modalContent}</ModalBody>
              <ModalFooter>
                <Button color="white" variant="flat" onPress={onClose}>
                  Close
                </Button>
                {modalFooter}
              </ModalFooter>
            </>
          )}
        </ModalContent>
      </Modal>
    </>
  );
}
