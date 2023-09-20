import { useContext, useState } from "react";
import { Context } from "./Layout";
import { useMutation, useQuery } from "@blitzjs/rpc";
import getTagsResolver from "src/tags/queries/getTags";
import createTagResolver from "src/tags/mutations/createTag";
import updateTagResolver from "src/tags/mutations/updateTag";
import deleteTagResolver from "src/tags/mutations/deleteTag";
import { Tag } from "@prisma/client";

enum Mode {
  read = "Read",
  create = "Create",
  update = "Update",
}

export default function TagsPage() {
  const context = useContext(Context);
  const [mode, setMode] = useState<Mode>(Mode.read);
  const [tags, { isLoading, refetch: refetchTags }] = useQuery(getTagsResolver, {});
  const [createTagMutation] = useMutation(createTagResolver);
  const [updateTagMutation] = useMutation(updateTagResolver);
  const [deleteTagMutation] = useMutation(deleteTagResolver);

  const [newTag, setNewTag] = useState({ name: "" });
  const [selectedTag, setSelectedTag] = useState({ name: "", id: 0 });

  const createTag = async () => {
    await createTagMutation(newTag);
    await refetchTags();
    setMode(Mode.read);
  };

  const updateTag = async () => {
    await updateTagMutation(selectedTag);
    await refetchTags();
    setMode(Mode.read);
  };

  const deleteTag = async (tag: Pick<Tag, "name" | "id">) => {
    await deleteTagMutation(tag);
    await refetchTags();
    setMode(Mode.read);
  };

  const selectTagToUpdate = (tag: Tag) => {
    setMode(Mode.update);
    setSelectedTag(tag);
  };

  return (
    <div className="flex flex-col items-center">
      <h1 className="text-center py-[48px] text-[38px] font-semibold">{context.page}</h1>

      <div className="p-[32px] w-4/5 h-fit min-h-[500px] bg-base-200 rounded">
        <header className="flex justify-between mb-[32px]">
          <p>Tags: {tags.length}</p>

          {(mode === Mode.create || mode === Mode.update) && (
            <button className="btn btn-info" onClick={() => setMode(Mode.read)}>
              View Tags
            </button>
          )}

          {mode === Mode.read && (
            <button className="btn btn-info" onClick={() => setMode(Mode.create)}>
              Create new tag
            </button>
          )}
        </header>
        {mode === Mode.read && (
          <div className="overflow-x-auto">
            <table className="table">
              <thead>
                <tr>
                  <th></th>
                  <th>Name</th>
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
                {tags.map((tag, index) => (
                  <tr key={index} className="hover:bg-base-100">
                    <th>{index + 1}</th>
                    <td>{tag.name}</td>
                    <td className="float-right">
                      <button
                        className="btn btn-info mr-[16px]"
                        onClick={() => selectTagToUpdate(tag)}
                      >
                        Edit
                      </button>
                      <button className="btn btn-error" onClick={() => deleteTag(tag)}>
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
          <TagEditor
            mode={mode}
            tag={newTag}
            handleSubmit={createTag}
            onChange={(e) => setNewTag({ name: e.target.value })}
          />
        )}
        {mode === Mode.update && (
          <TagEditor
            mode={mode}
            tag={selectedTag}
            handleSubmit={updateTag}
            onChange={(e) => setSelectedTag((prev) => ({ ...prev, name: e.target.value }))}
          />
        )}{" "}
      </div>
    </div>
  );
}

interface TagEditorProps {
  mode: Mode;
  tag: Partial<Tag>;
  onChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
  handleSubmit: () => Promise<void>;
}

const TagEditor = (props: TagEditorProps) => {
  return (
    <div>
      <div className="form-control w-full max-w-xs">
        <label className="label">
          <span className="label-text">Tag name?</span>
        </label>
        <input
          type="text"
          placeholder="Tag name"
          value={props.tag.name}
          className="input input-bordered w-full max-w-xs"
          onChange={props.onChange}
        />
      </div>

      <button
        className="btn btn-accent mt-[48px] mb-[24px] float-right"
        onClick={props.handleSubmit}
      >
        {props.mode === Mode.create ? "Create Tag" : "Update Tag"}
      </button>
    </div>
  );
};
