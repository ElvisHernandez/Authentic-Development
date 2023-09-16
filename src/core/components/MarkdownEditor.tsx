import { ChangeEvent, useState } from "react";
import ReactMarkdown from "react-markdown";
import remarkGfm from "remark-gfm";
import { MdPreview, MdOutlineFullscreen, MdOutlineFullscreenExit } from "react-icons/md";

export type MarkdownEditorProps = {
  value: string | undefined;
  onChange: (event: ChangeEvent<HTMLTextAreaElement>) => void;
};

export default function MarkdownEditor(props: MarkdownEditorProps) {
  const [showPreview, setShowPreview] = useState(false);
  const [fullScreen, setFullScreen] = useState(false);

  return (
    <div className={fullScreen ? "w-screen h-screen fixed top-0 left-0 z-50" : "h-[300px]"}>
      <div className="flex justify-end items-center bg-base-100 p-4 h-[5%] border-b-[1px] border-base-300">
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
          className="textarea textarea-bordered textarea-lg w-full h-full rounded-none p-4 border-0 focus:outline-none"
          onChange={props.onChange}
          value={props.value}
        ></textarea>

        {showPreview && (
          <div className="absolute top-0 right-0 border-l-[1px] border-base-300 h-full w-2/4 p-4">
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
