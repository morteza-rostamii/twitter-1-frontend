import { IconButton, Modal, ModalBody, ModalContent, ModalHeader, ModalOverlay, useDisclosure } from '@chakra-ui/react';
import React from 'react'
import { HiOutlineXMark } from 'react-icons/hi2';
import SignupForm from './SignupForm';
import LoginForm from './LoginForm';
import useMultiStepsForm from '@/hooks/useMultiStepsForm';

const RegisterBtn = ({
  children,
}:any) => {
  const { isOpen, onOpen, onClose } = useDisclosure();
  const {
    currentIndex,
    steps,
    step,
    next,
    back,
    goto,
    isFirst,
    isLast,
  } = useMultiStepsForm([
    {
      id: 0,
      name: 'signup',
      node: <SignupForm/>,
    },
    {
      id: 1,
      name: 'login',
      node: <LoginForm/>,
    },
  ]);

  // const openBtn = React.cloneElement(Btn, {
  //   onClick: onOpen,
  // });

  return (
    <>
      <span onClick={onOpen}>
        {children}
      </span>

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
            {/* <span>sas</span> */}
          </ModalHeader>
          <ModalBody
          padding={'10px'}
          >
            {step.node}
          </ModalBody>
        </ModalContent>
      </Modal>
    </>
  )
}

export default RegisterBtn