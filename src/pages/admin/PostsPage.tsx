import React, { useContext, useRef, useState } from "react";
import { Post, Tag } from "@prisma/client";

import { Context } from "./Layout";
import { useMutation, useQuery } from "@blitzjs/rpc";
import getPosts from "src/posts/queries/getPosts";
import MarkdownEditor, { ImageModal } from "src/core/components/MarkdownEditor";
import createPostMutation from "src/posts/mutations/createPost";
import updatePostResolver from "src/posts/mutations/updatePost";
import deletePostResolver from "src/posts/mutations/deletePost";
import getTagsResolver from "src/tags/queries/getTags";
import Image from "next/image";

enum Mode {
  read = "Read",
  create = "Create",
  update = "Update",
}

type PartialPost = Pick<Post, "title" | "content" | "thumbnailUrl" | "description">;

type PostWithTagIds = PartialPost & {
  selectedTagIds: number[];
};

export default function PostsPage() {
  const context = useContext(Context);

  const [posts, { isLoading, refetch: refetchPosts }] = useQuery(getPosts, {});
  const [createPost] = useMutation(createPostMutation);
  const [updatePostMutation] = useMutation(updatePostResolver);
  const [deletePostMutation] = useMutation(deletePostResolver);

  const [newPost, setNewPost] = useState({
    title: "",
    content: "",
    description: "",
    thumbnailUrl: "",
  });
  const [selectedPost, setSelectedPost] = useState({
    title: "",
    content: "",
    description: "",
    thumbnailUrl: "",
  });

  const [mode, setMode] = useState<Mode>(Mode.read);

  const selectPostToUpdate = (post: Post) => {
    setMode(Mode.update);
    setSelectedPost(post);
  };

  const createNewPost = async (e, post: PostWithTagIds) => {
    e.preventDefault();

    await createPost(post);
    await refetchPosts();
    setMode(Mode.read);
  };

  const updatePost = async (e, post: PostWithTagIds & { id: number }) => {
    e.preventDefault();

    await updatePostMutation(post);
    await refetchPosts();
    setMode(Mode.read);
  };

  const deletePost = async (post: { id: number }) => {
    await deletePostMutation(post);
    await refetchPosts();
  };
  return (
    <div className="flex flex-col items-center">
      <h1 className="text-center py-[48px] text-[38px] font-semibold">{context.page}</h1>

      <div className="p-[32px] mb-[64px] w-4/5 h-fit min-h-[500px] bg-base-200 rounded">
        <header className="flex justify-between mb-[32px]">
          <p>Posts: {posts.length}</p>

          {(mode === Mode.create || mode === Mode.update) && (
            <button className="btn btn-info" onClick={() => setMode(Mode.read)}>
              View Posts
            </button>
          )}

          {mode === Mode.read && (
            <button
              className="btn btn-info"
              onClick={() => {
                setNewPost({
                  title: "",
                  content: "",
                  description: "",
                  thumbnailUrl: "",
                });
                setMode(Mode.create);
              }}
            >
              Create new post
            </button>
          )}
        </header>

        {mode === Mode.read && (
          <div className="overflow-x-auto">
            <table className="table">
              <thead>
                <tr>
                  <th></th>
                  <th>Title</th>
                </tr>
              </thead>
              <tbody>
                {isLoading &&
                  [...new Array(5)].map((_, index) => (
                    <tr key={index} className="h-[52px] bg-base-100 animate-pulse">
                      <th className=""></th>
                      <td className=""></td>
                      <td className=""></td>
                    </tr>
                  ))}
                {posts.map((post, index) => (
                  <tr key={index} className="hover:bg-base-100">
                    <th>{index + 1}</th>
                    <td>{post.title}</td>
                    <td className="float-right">
                      <button
                        className="btn btn-info mr-[16px]"
                        onClick={() => selectPostToUpdate(post)}
                      >
                        Edit
                      </button>
                      <button className="btn btn-error" onClick={() => deletePost(post)}>
                        Delete
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}

        {mode === Mode.create && (
          <PostEditor
            post={newPost}
            mode={mode}
            setPost={(post) => setNewPost({ ...newPost, ...post })}
            handleSubmit={createNewPost}
          />
        )}

        {mode === Mode.update && (
          <PostEditor
            post={selectedPost}
            mode={mode}
            setPost={(post) => setSelectedPost({ ...selectedPost, ...post })}
            handleSubmit={updatePost}
          />
        )}
      </div>
    </div>
  );
}

interface PostEditorProps {
  mode: Mode;
  post: PartialPost & { tags?: Array<{ id: number }> };
  setPost: (post: Partial<Post>) => void;
  handleSubmit: (e: React.MouseEvent<HTMLButtonElement>, post: PostWithTagIds) => Promise<void>;
}

function PostEditor(props: PostEditorProps) {
  const { post, setPost, handleSubmit, mode } = props;
  const [selectedTagIds, setSelectedTagIds] = useState<number[]>(
    post?.tags?.map((tag) => tag.id) ?? []
  );
  const [thumbnailUrl, setThumbnailUrl] = useState(post.thumbnailUrl || "");
  const imageModalRef = useRef<HTMLDialogElement>(null);
  const [tags] = useQuery(getTagsResolver, {});

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
          updateValue={(value: string) => setPost({ content: value })}
        />

        <button
          className="btn btn-accent mt-[48px] mb-[24px] float-right"
          onClick={(e) => handleSubmit(e, { ...post, selectedTagIds, thumbnailUrl })}
        >
          {mode === Mode.create ? "Create Post" : "Update Post"}
        </button>
      </form>

      <ImageModal modalRef={imageModalRef} imageInserter={imageInserter} />
    </>
  );
}
