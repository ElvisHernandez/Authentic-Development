// import { useSession } from "next-auth/react";
import React, { createContext, useCallback, useContext, useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { MdArticle, MdSettings, MdPhotoLibrary } from "react-icons/md";

export enum Page {
  posts = "Posts",
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
  setPaginatedThumbnailUrls: React.Dispatch<React.SetStateAction<Array<string[]>>>;
  fetchThumbnails: () => Promise<void>;
}

export const Context = createContext<ContextState>({} as ContextState);

interface Props {
  children: React.ReactNode;
}

export default function ContextProvider(props: Props) {
  //   const session = useSession({ required: true });
  const [page, setPage] = useState(Page.posts);
  const [thumbnailPage, setThumbnailPage] = useState(0);
  const [thumbnailsPerPage, setThumnailsPerPage] = useState(10);
  const [paginatedThumbnailUrls, setPaginatedThumbnailUrls] = useState<Array<string[]>>([]);

  useEffect(() => {
    fetchThumbnails();
  }, []);

  const fetchThumbnails = useCallback(async () => {
    const res = await fetch(`/api/images?thumbnailsPerPage=${thumbnailsPerPage}`);

    const data = await res.json();

    if (data.json.paginatedThumbnailUrls) {
      setPaginatedThumbnailUrls(data.json.paginatedThumbnailUrls);
    }
  }, []);

  //   if (!session.data?.user) return null;

  return (
    <Context.Provider
      value={{
        page,
        setPage,
        thumbnailPage,
        setThumbnailPage,
        thumbnailsPerPage,
        paginatedThumbnailUrls,
        setPaginatedThumbnailUrls,
        fetchThumbnails,
      }}
    >
      <AdminLayout>{props.children}</AdminLayout>
    </Context.Provider>
  );
}

function AdminLayout(props: Props) {
  const { setPage } = useContext(Context);
  const router = useRouter();

  const navigateTo = (page: keyof typeof Page) => {
    setPage(Page[page]);
    router.push(`/admin?page=${page}`);
  };

  return (
    <div className="drawer drawer-open">
      <input id="my-drawer" type="checkbox" className="drawer-toggle" />
      <div className="drawer-content">
        {/* Page content here */}

        {props.children}
      </div>
      <div className="drawer-side ">
        <label htmlFor="my-drawer" className="drawer-overlay"></label>
        <ul className="menu p-4 w-80 h-full bg-base-200 text-center">
          {/* Sidebar content here */}
          <h1 className="py-[48px] text-[26px] font-semibold">Admin</h1>
          <li onClick={() => navigateTo("posts")}>
            <a>
              {" "}
              <MdArticle className="inline-block mb-[3px] mr-[4px]" />
              Posts
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
      </div>
    </div>
  );
}
