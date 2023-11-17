import { Modal, ModalContent, ModalBody, ModalFooter, ModalHeader } from '@nextui-org/modal'
import { Button } from '@nextui-org/button'

import { HiOutlineExclamationTriangle } from "react-icons/hi2"

type DeleteCommentProps = {
  isOpen: boolean,
  onOpenChange: () => void,
  onDelete: () => void
}

const DeleteComment = ({ isOpen, onOpenChange, onDelete } : DeleteCommentProps) => {
  return (
    <Modal isOpen={isOpen} onOpenChange={onOpenChange} placement="bottom-center">
      <ModalContent>
        {(onClose) => (
          <>
            <ModalHeader className='text-danger flex flex-col items-center mt-4'>
              <HiOutlineExclamationTriangle className='h-12 w-12' />
              <p>¿Estás seguro?</p>
            </ModalHeader>
            <ModalBody className='text-center'>
              <p>¿Estás seguro de eliminar este comentario?</p>
            </ModalBody>
            <ModalFooter>
              <Button variant="light" onPress={onClose}>
                Cancelar
              </Button>
              <Button color="danger" onPress={onDelete}>
                Eliminar
              </Button>
            </ModalFooter>
          </>
        )}
      </ModalContent>
    </Modal>
  )
}

export default DeleteComment