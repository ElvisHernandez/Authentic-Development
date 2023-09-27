import { useMutation, useQuery } from "@blitzjs/rpc";
import { Post } from "@prisma/client";
import { useRef, useState } from "react";
import Image from "next/image";
import { Mode, PartialPost, PostWithTagIds } from "src/pages/admin/PostsPage";
import getTagsResolver from "src/tags/queries/getTags";
import updatePostResolver from "src/posts/mutations/updatePost";
import MarkdownEditor, { ImageModal } from "./MarkdownEditor";
import { Alert } from "./Alert";

interface PostEditorProps {
  mode: Mode;
  post: PartialPost & { id: number; tags?: Array<{ id: number }> };
  setPost: (post: Partial<Post>) => void;
  handleSubmit: (e: React.MouseEvent<HTMLButtonElement>, post: PostWithTagIds) => Promise<void>;
}

export function PostEditor(props: PostEditorProps) {
  const { post, setPost, handleSubmit, mode } = props;
  const [selectedTagIds, setSelectedTagIds] = useState<number[]>(
    post?.tags?.map((tag) => tag.id) ?? []
  );
  const [thumbnailUrl, setThumbnailUrl] = useState(post.thumbnailUrl || "");
  const imageModalRef = useRef<HTMLDialogElement>(null);
  const [tags] = useQuery(getTagsResolver, {});
  const [updatePostMutation, { isSuccess, isError, isLoading }] = useMutation(updatePostResolver);

  const onSelectedTagsChange = (e) => {
    const { value, checked } = e.target;

    if (checked) {
      setSelectedTagIds((prev) => [...prev, +value]);
    } else {
      setSelectedTagIds((prev) => prev.filter((tagId) => tagId !== +value));
    }
  };

  const imageInserter = async (imageSrc) => {
    setThumbnailUrl(imageSrc);
    imageModalRef?.current?.close();
  };

  const handleEditorSave = async () => {
    if (mode !== Mode.update) return;
    await updatePostMutation({ ...post, selectedTagIds, thumbnailUrl });
  };

  return (
    <>
      <form onSubmit={(e) => e.preventDefault()}>
        <div className="flex justify-between">
          <div className="w-1/2">
            <div className="max-w-xs">
              {tags.map((tag) => (
                <div key={tag.id} className="form-control">
                  <label className="label cursor-pointer">
                    <span className="label-text">{tag.name}</span>
                    <input
                      type="checkbox"
                      value={tag.id}
                      checked={selectedTagIds.includes(tag.id)}
                      className="checkbox checkbox-accent"
                      onChange={onSelectedTagsChange}
                    />
                  </label>
                </div>
              ))}
            </div>
            <input
              type="text"
              placeholder="Title"
              value={post.title}
              onChange={(e) => setPost({ title: e.target.value })}
              className="mb-[16px] input input-bordered w-full max-w-xs text-sm"
            />
          </div>
          <div className="flex items-center">
            {!!thumbnailUrl && (
              <div className="mr-[24px]">
                <Image
                  className="rounded"
                  height={100}
                  width={100}
                  src={thumbnailUrl}
                  alt="Blog thumbnail"
                />
              </div>
            )}
            <button className="btn btn-primary" onClick={() => imageModalRef.current?.showModal()}>
              Upload Thumbnail
            </button>
          </div>
        </div>

        <div className="form-control mb-[24px]">
          <label className="label">
            <span className="label-text">Description</span>
          </label>
          <textarea
            className="textarea textarea-bordered h-24"
            placeholder="Description"
            value={post.description}
            onChange={(e) => setPost({ description: e.target.value })}
          ></textarea>
        </div>

        <MarkdownEditor
          value={post.content}
          handleSave={mode === Mode.update ? handleEditorSave : undefined}
          updateValue={(value: string) => setPost({ content: value })}
          isLoading={isLoading}
        />

        <button
          className="btn btn-accent mt-[48px] mb-[24px] float-right"
          disabled={isLoading}
          onClick={(e) => handleSubmit(e, { ...post, selectedTagIds, thumbnailUrl })}
        >
          {mode === Mode.create ? "Create Post" : "Update Post"}
        </button>
      </form>

      <ImageModal modalRef={imageModalRef} imageInserter={imageInserter} />
      {isSuccess && (
        <Alert alertVariant="alert-success" msg="Your post was updated successfully!" />
      )}
      {isError && (
        <Alert
          alertVariant="alert-error"
          msg="Apologies, failed to update post. Please try again."
        />
      )}
    </>
  );
}
