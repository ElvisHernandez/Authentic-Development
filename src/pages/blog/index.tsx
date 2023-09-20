import { BlitzPage } from "@blitzjs/next";
import Layout from "src/core/layouts/Layout";

const BlogPage: BlitzPage = () => {
  return (
    <div className=" pt-[64px] px-[48px] bg-white">
      <div className="my-[144px]">
        <h1 className="text-4xl font-bold">The Authentic Development Blog</h1>
        <p className="text-lg py-[12px] max-w-[80%]">
          Discover expert insights on SaaS innovation—from idea validation and key performance
          indicators, to sustainable growth and beyond. Your go-to resource for all things SaaS.
        </p>
      </div>
    </div>
  );
};

BlogPage.getLayout = (page) => <Layout>{page}</Layout>;
export default BlogPage;
