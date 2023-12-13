import { useRef, useState } from "react";
import ReactMarkdown from "react-markdown";
import remarkGfm from "remark-gfm";
import remarkHighlight from "remark-highlight.js";
import "highlight.js/styles/night-owl.css";
import {
  MdPreview,
  MdOutlineFullscreen,
  MdOutlineFullscreenExit,
  MdImage,
  MdSave,
} from "react-icons/md";
import { ThumbnailGrid } from "src/pages/admin/ImagesPage";
import slugify from "slugify";
import { handleLinkClickSmoothScroll } from "src/utils/smoothScroll";
import React from "react";
import Image from "next/image";

export function ImageModal(props: {
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

function UnmemoizedMarkdown(props: { value: string }) {
  const isHashLink = (href?: string) => !!href && href[0] === "#";
  const getSlugifiedId = (props: React.PropsWithChildren): string => {
    if (typeof props.children?.[0] !== "string") return "";

    return slugify(props.children[0].replaceAll("'", ""), { lower: true });
  };
  const noop = () => {};
  return (
    <ReactMarkdown
      remarkPlugins={[remarkGfm, remarkHighlight]}
      components={{
        h1: ({ node, ...props }) => (
          <>
            <h1 className="font-bold text-2xl text-center" {...props}></h1>
            <div className="divider my-0"></div>
          </>
        ),
        h2: ({ node, ...props }) => {
          return (
            <>
              <h2
                id={getSlugifiedId(props)}
                className="font-bold text-xl text-center"
                {...props}
              ></h2>
              <div className="divider my-0"></div>
            </>
          );
        },
        h3: ({ node, ...props }) => {
          return (
            <h3 {...props} id={getSlugifiedId(props)} className="font-semibold text-lg">
              {props.children}
            </h3>
          );
        },
        a: ({ node, ...props }) => {
          return (
            <a
              {...props}
              className="underline"
              target="_blank"
              onClick={(e) =>
                isHashLink(props.href)
                  ? handleLinkClickSmoothScroll(e, props.href?.slice(1) as string, 100)
                  : noop()
              }
            >
              {props.children}
            </a>
          );
        },

        ol: ({ node, ...props }) => {
          return (
            <div className="flex justify-center">
              <ol {...props} className="list-decimal font-medium list-inside">
                {props.children}
              </ol>
            </div>
          );
        },
        li: ({ node, ...props }) => {
          return (
            <li {...props} className="ml-[24px]">
              {props.children}
            </li>
          );
        },
        ul: ({ node, ...props }) => {
          return (
            <ul {...props} className="px-[24px] list-disc">
              {props.children}
            </ul>
          );
        },
        p: ({ node, ...props }) => {
          return (
            <p {...props} className="px-[24px]">
              {props.children}
            </p>
          );
        },
        img: ({ node, ...props }) => {
          const isSmallImage = props.src?.includes("small");
          const isMediumImage = props.src?.includes("medium");
          const isLargeImage = props.src?.includes("large");

          const getImageSize = (): number => {
            if (isSmallImage) return 100;
            if (isMediumImage) return 500;
            if (isLargeImage) return 1000;

            throw new Error(`image ${props.src} size not supported`);
          };

          return (
            <span className="inline-block flex justify-center">
              <Image
                {...props}
                src={props.src ?? ""}
                alt={props.alt ?? ""}
                placeholder="empty"
                height={getImageSize()}
                width={getImageSize()}
                className="rounded"
              />
            </span>
          );
        },
        code: ({ node, ...props }) => <code {...props} style={{ borderRadius: "5px" }}></code>,
      }}
    >
      {props.value ?? ""}
    </ReactMarkdown>
  );
}

export const Markdown = React.memo(UnmemoizedMarkdown);

export type MarkdownEditorProps = {
  value: string | undefined;
  isLoading: boolean;
  updateValue: (value: string) => void;
  handleSave?: () => Promise<void>;
};

export default function MarkdownEditor(props: MarkdownEditorProps) {
  const [showPreview, setShowPreview] = useState(true);
  const [fullScreen, setFullScreen] = useState(false);
  const [cursorIndex, setCursorIndex] = useState(0);
  const modalRef = useRef<HTMLDialogElement>(null);

  const embedImage = async (imageUrl: string) => {
    const { value, updateValue } = props;
    if (!value) return;

    const newValue = value.slice(0, cursorIndex) + `![](${imageUrl})` + value.slice(cursorIndex);
    updateValue(newValue);
    modalRef.current?.close();
  };

  const handleTextSelect = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
    const selectionEnd = e.currentTarget?.selectionEnd;
    if (!selectionEnd) return;
    setCursorIndex(selectionEnd);
  };

  return (
    <div className={fullScreen ? "w-screen h-screen fixed top-0 left-0 z-50" : ""}>
      <ImageModal modalRef={modalRef} imageInserter={embedImage} />

      <div className="flex justify-end items-center bg-base-100 p-4 h-[5%] border-b-[1px] border-base-300 gap-x-2">
        {!!props.handleSave && (
          <MdSave
            className={`cursor-pointer ${props.isLoading ? "opacity-50" : ""}`}
            onClick={props.handleSave}
          />
        )}
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
          className={`textarea textarea-bordered textarea-lg text-sm
          ${showPreview ? "w-1/2" : "w-full"} 
          ${fullScreen ? "h-[100%]" : "h-[400px]"}
          rounded-none p-4 border-0 focus:outline-none`}
          onChange={(e) => props.updateValue(e.target.value)}
          onSelect={handleTextSelect}
          value={props.value}
        ></textarea>

        {showPreview && (
          <div
            className={`
            absolute top-0 right-0 border-l-[1px] border-base-300 
            bg-base-100 w-2/4 p-4 overflow-y-scroll
            ${fullScreen ? "h-[100%]" : "h-[400px]"}`}
          >
            <Markdown value={props.value ?? ""} />
          </div>
        )}
      </div>
    </div>
  );
}
