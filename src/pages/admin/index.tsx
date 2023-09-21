import { BlitzPage, getSession } from "@blitzjs/auth";
import { GetServerSideProps } from "next";
import { Suspense } from "react";
import Layout from "./Layout";
import { useSearchParams } from "next/navigation";
import PostsPage from "./PostsPage";
import TagsPage from "./TagsPage";
import ImagesPage from "./ImagesPage";
import isAdminUser from "src/utils/isAdminUser";
import { Routes } from "@blitzjs/next";

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
  } else if (page === "tags") {
    return <TagsPage />;
  } else if (page === "images") {
    return <ImagesPage />;
  }

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
      destination: "/auth/login",
    },
  };

  return isAdmin ? { props: {} } : redirect;
};

AdminPage.getLayout = (page) => <Layout>{page}</Layout>;
export default AdminPage;
