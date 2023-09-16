"use client";
import React, { useContext, useRef, useState } from "react";
import { MdImage } from "react-icons/md";

import { Post } from "@prisma/client";

import { Context } from "./Layout";
import { ThumbnailGrid } from "./ImagesPage";
import { useMutation, useQuery } from "@blitzjs/rpc";
import getPosts from "src/posts/queries/getPosts";
import MarkdownEditor from "src/core/components/MarkdownEditor";
import createPostMutation from "src/posts/mutations/createPost";
import updatePostResolver from "src/posts/mutations/updatePost";
import deletePostResolver from "src/posts/mutations/deletePost";

enum Mode {
  read = "Read",
  create = "Create",
  update = "Update",
}

export default function PostsPage() {
  const context = useContext(Context);

  const [posts, { isLoading, refetch: refetchPosts }] = useQuery(getPosts, {});
  const [createPost] = useMutation(createPostMutation);
  const [updatePostMutation] = useMutation(updatePostResolver);
  const [deletePostMutation] = useMutation(deletePostResolver);

  const [newPost, setNewPost] = useState<Partial<Post>>({
    title: "",
    content: "",
  });
  const [selectedPost, setSelectedPost] = useState<Partial<Post>>({
    title: "",
    content: "",
  });

  const [mode, setMode] = useState<Mode>(Mode.read);

  const selectPostToUpdate = (post: Post) => {
    setMode(Mode.update);
    setSelectedPost(post);
  };

  const createNewPost = async (e: React.MouseEvent<HTMLButtonElement>, post: Partial<Post>) => {
    e.preventDefault();

    await createPost(post);
    await refetchPosts();
    setMode(Mode.read);
  };

  const updatePost = async (e: React.MouseEvent<HTMLButtonElement>, post: Partial<Post>) => {
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

      <div className="p-[32px] w-4/5 h-fit min-h-[500px] bg-base-200 rounded">
        <header className="flex justify-between mb-[32px]">
          <p>Posts: {posts.length}</p>

          {(mode === Mode.create || mode === Mode.update) && (
            <button className="btn btn-info" onClick={() => setMode(Mode.read)}>
              View Posts
            </button>
          )}

          {mode === Mode.read && (
            <button className="btn btn-info" onClick={() => setMode(Mode.create)}>
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
  post: Partial<Post>;
  setPost: (post: Partial<Post>) => void;
  mode: Mode;
  handleSubmit: (e: React.MouseEvent<HTMLButtonElement>, post: Partial<Post>) => Promise<void>;
}

function ImageModal(props: {
  modalRef: React.Ref<HTMLDialogElement>;
  imageInserter: (imageUrl: string) => Promise<void>;
}) {
  const modalRef = useRef<HTMLDialogElement>(null);

  const closeDialogOnBackdropClickHandler = (e: React.MouseEvent<HTMLDialogElement>) => {
    const { target } = e;

    if (target === modalRef.current) {
      modalRef.current.close();
    }
  };

  return (
    <dialog ref={props.modalRef} className="modal" onClick={closeDialogOnBackdropClickHandler}>
      <form method="dialog" className="modal-box min-w-[700px]">
        <ThumbnailGrid onThumbnailClick={props.imageInserter} />
        <div className="modal-action">
          {/* if there is a button in form, it will close the modal */}
          <button className="btn">Close</button>
        </div>
      </form>
    </dialog>
  );
}

function PostEditor(props: PostEditorProps) {
  const { post, setPost, handleSubmit, mode } = props;

  const modalRef = useRef<HTMLDialogElement>(null);
  const [imageInserter, setImageInserter] = useState<(s: string) => Promise<void>>(
    () => async (s: string) => {}
  );

  //   const imageInsert: ICommand = {
  //     name: "Insert Image",
  //     keyCommand: "insert-image",
  //     icon: <MdImage />,
  //     execute: ({ state, view }) => {
  //       if (!state || !view) return;

  //       const imageInserter = async (imageUrl: string) => {
  //         const mediumImageUrl = imageUrl.replace("small", "medium");

  //         view.dispatch({
  //           changes: {
  //             from: view.state.selection.main.from,
  //             insert: `![](${mediumImageUrl})`,
  //           },
  //         });

  //         modalRef.current?.close();
  //       };

  //       modalRef.current?.showModal();
  //       setImageInserter(() => imageInserter);
  //     },
  //   };

  return (
    <>
      <ImageModal modalRef={modalRef} imageInserter={imageInserter} />
      <form>
        <input
          type="text"
          placeholder="Title"
          value={post.title}
          onChange={(e) => setPost({ title: e.target.value })}
          className="mb-[16px] input input-bordered w-full max-w-xs"
        />

        {/* <MarkdownEditor
          value={post.content}
          onChange={(value, viewUpdate) => setPost({ content: value })}
          toolbars={[imageInsert]}
          className="min-h-[300px]"
        /> */}

        <MarkdownEditor
          value={post.content}
          onChange={(e) => setPost({ content: e.target.value })}
        />

        <button
          className="btn btn-accent my-[16px] float-right"
          onClick={(e) => handleSubmit(e, post)}
        >
          {mode === Mode.create ? "Create Post" : "Update Post"}
        </button>
      </form>
    </>
  );
}
