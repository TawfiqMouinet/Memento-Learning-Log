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
import { FiPlus } from "react-icons/fi";

export default function NewModal({
  buttonText,
  modalHeader,
  modalContent,
  modalFooter,
  size,
}) {
  const { isOpen, onOpen, onOpenChange } = useDisclosure();
  return (
    <div className="w-2/3">
      <Button
        className="mt-10 border-2 fixed right-10 border-slate-600 bg-transparent transition hover:border-0 hover:translate-y-1 hover:scale-110 hover:bg-white hover:text-black hover:transition-all"
        startContent={<FiPlus className="text-xl" />}
        onPress={onOpen}
      >
        {buttonText}
      </Button>
      <Modal
        size={size}
        isOpen={isOpen}
        onOpenChange={onOpenChange}
        scrollBehavior="inside"
      >
        <ModalContent>
          {(onClose) => (
            <>
              <ModalHeader className="flex flex-col gap-1">
                {modalHeader}
              </ModalHeader>
              <ModalBody>{modalContent}</ModalBody>
              <ModalFooter>
                <Button color="danger" variant="flat" onPress={onClose}>
                  Close
                </Button>
                {modalFooter}
              </ModalFooter>
            </>
          )}
        </ModalContent>
      </Modal>
    </div>
  );
}
