import React, { Suspense, createContext, useContext, useState } from "react";
import { useRouter } from "next/router";
import { MdArticle, MdSettings, MdPhotoLibrary } from "react-icons/md";
import { useMutation, useQuery } from "@blitzjs/rpc";
import getThumbnailsQuery from "src/images/queries/getThumbnails";
import logoutResolver from "src/auth/mutations/logout";
import { Routes } from "@blitzjs/next";

export enum Page {
  posts = "Posts",
  tags = "Tags",
  images = "Images",
  settings = "Settings",
}

interface ContextState {
  page: Page;
  setPage: React.Dispatch<React.SetStateAction<Page>>;
  thumbnailPage: number;
  setThumbnailPage: React.Dispatch<React.SetStateAction<number>>;
  thumbnailsPerPage: number;
  paginatedThumbnailUrls: Array<string[]>;
  fetchThumbnails: () => Promise<any>;
}

export const Context = createContext<ContextState>({} as ContextState);

interface Props {
  children: React.ReactNode;
}

const withSuspense = (Component: React.FC) => {
  return (props) => (
    <Suspense fallback="loading admin dashboard...">
      <Component {...props} />
    </Suspense>
  );
};

function ContextProvider(props: Props) {
  const [page, setPage] = useState(Page.posts);
  const [thumbnailPage, setThumbnailPage] = useState(0);
  const [thumbnailsPerPage, setThumnailsPerPage] = useState(10);

  const [{ paginatedThumbnailUrls }, { refetch: fetchThumbnails }] = useQuery(getThumbnailsQuery, {
    thumbnailsPerPage,
  });

  return (
    <Context.Provider
      value={{
        page,
        setPage,
        thumbnailPage,
        setThumbnailPage,
        thumbnailsPerPage,
        paginatedThumbnailUrls,
        fetchThumbnails,
      }}
    >
      <Suspense fallback="loading admin dashboard...">
        <AdminLayout>{props.children}</AdminLayout>
      </Suspense>
    </Context.Provider>
  );
}

function AdminLayout(props: Props) {
  const { setPage } = useContext(Context);
  const router = useRouter();

  const [logoutMutation] = useMutation(logoutResolver);

  const navigateTo = (page: keyof typeof Page) => {
    setPage(Page[page]);
    router.push(`/admin?page=${page}`);
  };

  return (
    <div className="drawer drawer-open text-white" data-theme="dracula">
      <input id="my-drawer" type="checkbox" className="drawer-toggle" />
      <div className="drawer-content">
        {/* Page content here */}

        {props.children}
      </div>
      <div className="drawer-side text-white h-screen bg-base-200 relative">
        <label htmlFor="my-drawer" className="drawer-overlay"></label>
        <ul className="menu p-4 w-80 text-center">
          {/* Sidebar content here */}
          <h1 className="py-[48px] text-[26px] font-semibold">Admin</h1>
          <li onClick={() => navigateTo("posts")}>
            <a>
              {" "}
              <MdArticle className="inline-block mb-[3px] mr-[4px]" />
              Posts
            </a>
          </li>
          <li onClick={() => navigateTo("tags")}>
            <a>
              {" "}
              <MdArticle className="inline-block mb-[3px] mr-[4px]" />
              Tags
            </a>
          </li>
          <li onClick={() => navigateTo("images")}>
            <a>
              {" "}
              <MdPhotoLibrary className="inline-block mb-[3px] mr-[4px]" />
              Images
            </a>
          </li>
          <li>
            <a>
              {" "}
              <MdSettings className="inline-block mb-[3px] mr-[4px]" />
              Settings
            </a>
          </li>
        </ul>

        <button
          className="btn btn-primary absolute left-[35%] bottom-[24px]"
          onClick={async () => {
            await logoutMutation();
            router.push(Routes.Home());
          }}
        >
          Logout
        </button>
      </div>
    </div>
  );
}

export default withSuspense(ContextProvider);
