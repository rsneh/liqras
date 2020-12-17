import { AnchorButton } from 'components/Buttons'
import Modal from 'components/Modal'
import Input from 'components/inputs/Input'

export default function EditBlogPostSlug({ slug, setSlug }) {
  const onChangeInputHandler = ({ target }) => setSlug(target.value)
  return (
    <div className="flex flex-col w-full">
      <div className="flex items-baseline overflow-hidden">
        <label className="text-sm pb-1 font-medium flex items-center text-gray-500">
          Slug
        </label>
        <Modal
          header={false}
          button={<AnchorButton label={slug ? "Edit" : "Set"} className="mx-2 text-xs underline" />}
        >
          <div className="mt-3 text-center sm:mt-0 sm:ml-4 sm:text-left">
            <h3 className="text-lg leading-6 font-medium text-gray-900" id="modal-headline">
              Edit Post Slug
            </h3>
            <div className="mt-2">
              <Input label="Slug" onChange={onChangeInputHandler} defaultValue={slug} />
            </div>
          </div>
        </Modal>
      </div>
      <span className="text-xs truncate" title={slug}>{slug}</span>
    </div>
  )
}