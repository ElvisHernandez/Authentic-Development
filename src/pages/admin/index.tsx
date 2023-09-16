import { BlitzPage, getSession } from "@blitzjs/auth";
import db from "db";
import { GetServerSideProps } from "next";
import { Suspense } from "react";
import { getAdminEmail } from "src/utils/getEnvVars";

import Layout from "./Layout";
import { useSearchParams } from "next/navigation";
import PostsPage from "./PostsPage";
import ImagesPage from "./ImagesPage";
import ReactMarkdown from "react-markdown";
import remarkGfm from "remark-gfm";
import isAdminUser from "src/utils/isAdminUser";
import { useQuery } from "@blitzjs/rpc";
import getPosts from "src/posts/queries/getPosts";

const AdminPage: BlitzPage = () => {
  return (
    <Suspense fallback={<p>Loading...</p>}>
      <AdminDashboard />
    </Suspense>
  );
};

export function AdminDashboard() {
  const searchParams = useSearchParams();

  const page = searchParams.get("page");

  if (!page || page === "posts") {
    return <PostsPage />;
  }
  // else if (page === "images") {
  //   return <ImagesPage />;
  // }

  return <p>Admin page</p>;
}

export const getServerSideProps: GetServerSideProps = async ({ req, res }) => {
  let isAdmin: boolean = false;

  try {
    const session = await getSession(req, res);
    isAdmin = await isAdminUser(session);
  } catch (e) {
    console.error(e);
  }

  const redirect = {
    props: {},
    redirect: {
      destination: "/",
    },
  };

  return isAdmin ? { props: {} } : redirect;
};

AdminPage.getLayout = (page) => <Layout>{page}</Layout>;
export default AdminPage;
