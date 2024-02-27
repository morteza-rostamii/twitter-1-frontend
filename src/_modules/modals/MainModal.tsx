import {
  Modal,
  ModalOverlay,
  ModalContent,
  ModalHeader,
  ModalFooter,
  ModalBody,
  ModalCloseButton,
  useDisclosure,
  Button,
  IconButton,
} from '@chakra-ui/react'
import React from 'react';
import { HiOutlineXMark } from "react-icons/hi2";

const MainModal = ({
  Btn,
  children,
}:any) => {
  const { isOpen, onOpen, onClose } = useDisclosure();

  const openBtn = React.cloneElement(Btn, {
    onClick: onOpen,
  });

  return (
    <>
      {openBtn}

      <Modal isOpen={isOpen} onClose={onClose}>
        <ModalOverlay />
        <ModalContent>
          <ModalHeader
          display={'flex'}
          alignItems={'center'}
          justifyContent={'space-between'}
          padding={'10px'}
          >
            <IconButton
            aria-label=''
            icon={<HiOutlineXMark size={20}/>}
            size={'sm'}
            isRound={true}
            onClick={onClose}
            />
            <span>sas</span>
          </ModalHeader>
          <ModalBody>
            {children}
          </ModalBody>
        </ModalContent>
      </Modal>
    </>
  )
}

export default MainModal