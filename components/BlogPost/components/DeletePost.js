import Modal from 'components/Modal';
import { AnchorButton, Button } from 'components/Buttons'

export default function DeletePost({ onClickDeleteButton }) {
  return (
    <Modal
      size="md"
      header={false}
      footer={false}
      button={
        <AnchorButton
          label="DELETE"
          className="text-xs underline uppercase"
          colorClass="text-red-500"
        />
      }
      primaryDialogButton={
        <Button
          label="DELETE"
          colorClass="text-white bg-red-500 hover:bg-dark"
          className="submit-action self-end px-4 py-2"
          onClick={onClickDeleteButton}
        />
      }
    >
      <div className="mt-3 text-center sm:mt-0 sm:ml-4 sm:text-left">
        <h3 className="text-lg leading-6 font-medium text-gray-900" id="modal-headline">
          Are you sure you want to delete this post?
        </h3>
      </div>
    </Modal>
  );
}