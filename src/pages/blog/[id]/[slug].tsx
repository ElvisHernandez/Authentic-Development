import { BlitzPage } from "@blitzjs/next";
import { useQuery } from "@blitzjs/rpc";
import { useRouter } from "next/router";
import { Suspense } from "react";
import { Markdown } from "src/core/components/MarkdownEditor";
import Layout from "src/core/layouts/Layout";
import Image from "next/image";
import getPost from "src/posts/queries/getPost";

const SpecificBlogPage: BlitzPage = () => {
  return (
    <Suspense fallback={<p>loading...</p>}>
      <SpecificBlogPageContent />
    </Suspense>
  );
};

const SpecificBlogPageContent: BlitzPage = () => {
  const router = useRouter();
  const { id, slug } = router.query;

  const [post, { isLoading }] = useQuery(getPost, { id: parseInt(id as string) });

  return (
    <div className="py-[64px] bg-white min-h-screen">
      <h1 className="text-4xl font-bold text-center mt-[144px]">{post?.title}</h1>
      <div className="flex justify-center items-center my-[24px]">
        <div className="avatar mr-[12px]">
          <div className="w-12 rounded-full">
            <Image
              alt="Author Elvis Hernandez"
              src="https://authentic-development-blog-images.s3.amazonaws.com/small-1694849400780-me.jpeg"
            />
          </div>
        </div>{" "}
        <div className="flex items-center">
          <p className="text-sm font-medium">Written By Elvis Hernandez</p>
          <div className="rounded-[9999px] bg-slate-300 h-[3px] w-[3px] mx-[6px]"></div>
          <p className="text-sm text-slate-400 font-light">
            {new Date(post?.publishedAt || post?.createdAt || "").toDateString()}
          </p>
        </div>
      </div>
      <section className="mx-[144px] my-[64px]">
        <Markdown value={post?.content ?? ""} />
      </section>
    </div>
  );
};

SpecificBlogPage.getLayout = (page) => <Layout>{page}</Layout>;
export default SpecificBlogPage;
