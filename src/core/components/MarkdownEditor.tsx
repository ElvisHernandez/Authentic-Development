import { useRef, useState } from "react";
import ReactMarkdown from "react-markdown";
import remarkGfm from "remark-gfm";
import { MdPreview, MdOutlineFullscreen, MdOutlineFullscreenExit, MdImage } from "react-icons/md";
import { ThumbnailGrid } from "src/pages/admin/ImagesPage";

function ImageModal(props: {
  modalRef: React.RefObject<HTMLDialogElement>;
  imageInserter: (imageUrl: string) => Promise<void>;
}) {
  const closeDialogOnBackdropClickHandler = (e: React.MouseEvent<HTMLDialogElement>) => {
    const { target } = e;

    if (target === props.modalRef?.current) {
      props.modalRef?.current.close();
    }
  };

  const onClose = (e) => {
    e.preventDefault();
    props.modalRef?.current?.close();
  };

  return (
    <dialog ref={props.modalRef} className="modal" onClick={closeDialogOnBackdropClickHandler}>
      <div className="modal-box min-w-[700px]">
        <ThumbnailGrid onThumbnailClick={props.imageInserter} />
        <div className="modal-action">
          {/* if there is a button in form, it will close the modal */}
          <button className="btn" onClick={onClose}>
            Close
          </button>
        </div>
      </div>
    </dialog>
  );
}
export type MarkdownEditorProps = {
  value: string | undefined;
  updateValue: (value: string) => void;
};

export default function MarkdownEditor(props: MarkdownEditorProps) {
  const [showPreview, setShowPreview] = useState(true);
  const [fullScreen, setFullScreen] = useState(false);
  const modalRef = useRef<HTMLDialogElement>(null);

  const embedImage = async (imageUrl: string) => {
    props.updateValue((props.value ?? "") + `![](${imageUrl})`);
    modalRef.current?.close();
  };

  return (
    <div className={fullScreen ? "w-screen h-screen fixed top-0 left-0 z-50" : "h-[300px]"}>
      <ImageModal modalRef={modalRef} imageInserter={embedImage} />

      <div className="flex justify-end items-center bg-base-100 p-4 h-[5%] border-b-[1px] border-base-300">
        <MdImage className="cursor-pointer" onClick={() => modalRef.current?.showModal()} />
        <MdPreview className="cursor-pointer" onClick={() => setShowPreview(!showPreview)} />
        {!fullScreen && (
          <MdOutlineFullscreen className="cursor-pointer" onClick={() => setFullScreen(true)} />
        )}
        {fullScreen && (
          <MdOutlineFullscreenExit
            className="cursor-pointer"
            onClick={() => setFullScreen(false)}
          />
        )}
      </div>

      <div className="relative h-[95%]">
        <textarea
          placeholder="Content"
          className={`textarea textarea-bordered textarea-lg 
          ${showPreview ? "w-1/2" : "w-full"} 
          ${fullScreen ? "h-screen" : "h-full"}
          rounded-none p-4 border-0 focus:outline-none`}
          onChange={(e) => props.updateValue(e.target.value)}
          value={props.value}
        ></textarea>

        {showPreview && (
          <div className="absolute top-0 right-0 border-l-[1px] border-base-300 bg-base-100 h-full w-2/4 p-4">
            <ReactMarkdown
              children={props.value ?? ""}
              remarkPlugins={[remarkGfm]}
              components={{
                h1: ({ node, ...props }) => (
                  <>
                    <h1 className="font-bold text-2xl" {...props}></h1>
                    <div className="divider my-0"></div>
                  </>
                ),
              }}
            />
          </div>
        )}
      </div>
    </div>
  );
}
