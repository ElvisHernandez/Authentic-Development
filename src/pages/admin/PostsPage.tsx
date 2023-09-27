import React, { useContext, useRef, useState } from "react";
import { Post } from "@prisma/client";
import { Context } from "./Layout";
import { useMutation, useQuery } from "@blitzjs/rpc";
import getPosts from "src/posts/queries/getPosts";
import createPostMutation from "src/posts/mutations/createPost";
import updatePostResolver from "src/posts/mutations/updatePost";
import deletePostResolver from "src/posts/mutations/deletePost";
import { PostEditor } from "src/core/components/PostEditor";
import publishPostResolver from "src/posts/mutations/publishPost";

export enum Mode {
  read = "Read",
  create = "Create",
  update = "Update",
}

export type PartialPost = Pick<Post, "title" | "content" | "thumbnailUrl" | "description">;

export type PostWithTagIds = PartialPost & {
  selectedTagIds: number[];
};

const createEmptyPost = () => ({
  id: 0,
  title: "",
  content: "",
  description: "",
  thumbnailUrl: "",
});

export default function PostsPage() {
  const context = useContext(Context);

  const [posts, { isLoading, refetch: refetchPosts }] = useQuery(getPosts, {});
  const [createPost] = useMutation(createPostMutation);
  const [updatePostMutation] = useMutation(updatePostResolver);
  const [deletePostMutation] = useMutation(deletePostResolver);
  const [publishPostMutation, { isLoading: publishIsLoading }] = useMutation(publishPostResolver);
  const deleteModalRef = useRef<HTMLDialogElement>(null);

  const [postToDelete, setPostToDelete] = useState(createEmptyPost());
  const [newPost, setNewPost] = useState(createEmptyPost());
  const [selectedPost, setSelectedPost] = useState(createEmptyPost());

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

  const deletePost = async () => {
    await deletePostMutation(postToDelete);
    await refetchPosts();
    setPostToDelete(createEmptyPost());
  };

  const publishPost = async (post: { id: number; published: boolean }) => {
    await publishPostMutation({ published: !post.published, id: post.id });
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
                setNewPost(createEmptyPost());
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
                        className={`btn ${post.published ? "btn-error" : "btn-success"} mr-[16px]`}
                        onClick={() => publishPost(post)}
                        disabled={publishIsLoading}
                      >
                        {post.published ? "Unpublish" : "Publish"}
                      </button>
                      <button
                        className="btn btn-info mr-[16px]"
                        onClick={() => selectPostToUpdate(post)}
                      >
                        Edit
                      </button>
                      <button
                        className="btn btn-error"
                        onClick={() => {
                          setPostToDelete(post);
                          deleteModalRef.current?.showModal();
                        }}
                      >
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

      <DeleteModal
        modalRef={deleteModalRef}
        deleteHandler={deletePost}
        postToDelete={postToDelete}
      />
    </div>
  );
}

const DeleteModal = ({
  modalRef,
  deleteHandler,
  postToDelete,
}: {
  postToDelete: { title: string };
  deleteHandler: () => Promise<void>;
  modalRef: React.RefObject<HTMLDialogElement>;
}) => {
  return (
    <dialog ref={modalRef} className="modal ">
      <div className="modal-box absolute">
        <h3 className="font-bold text-lg">Are you sure you want to delete this post?</h3>
        <p className="py-4">Post: {postToDelete.title}</p>
        <div className="flex justify-center">
          <button
            className="btn btn-error"
            onClick={async () => {
              modalRef.current?.close();
              await deleteHandler();
            }}
          >
            DELETE
          </button>
        </div>
      </div>
      <div></div>
    </dialog>
  );
};

export async function getServerSideProps() {
  return {};
}
