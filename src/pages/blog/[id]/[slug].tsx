import { BlitzPage } from "@blitzjs/next";
import { useQuery } from "@blitzjs/rpc";
import { useRouter } from "next/router";
import { Suspense, useMemo } from "react";
import { Markdown } from "src/core/components/MarkdownEditor";
import Layout from "src/core/layouts/Layout";
import Image from "next/image";
import getPost from "src/posts/queries/getPost";
import Link from "next/link";
import { handleLinkClickSmoothScroll } from "src/utils/smoothScroll";

const SpecificBlogPage: BlitzPage = () => {
  return (
    <Suspense fallback={<p>loading...</p>}>
      <SpecificBlogPageContent />
    </Suspense>
  );
};

const SpecificBlogPageContent: BlitzPage = () => {
  const router = useRouter();
  const { id } = router.query;

  const [post, { isLoading }] = useQuery(getPost, { id: parseInt(id as string) });

  const { title, subtitle } = useMemo(() => {
    const [title = "", subtitle = ""] = (post?.title ?? "").split(":");

    return {
      title,
      subtitle,
    };
  }, [post]);

  if (isLoading)
    return (
      <div className="flex flex-col items-center py-[64px] bg-white min-h-screen">
        <div className="h-[80px] w-[60%] bg-slate-400 mt-[144px] rounded animate-pulse"></div>
        <div className="h-[48px] w-[40%] bg-slate-400 my-[24px] rounded animate-pulse"></div>
        <div className="h-[1000px] w-[60%] bg-slate-400 rounded animate-pulse"></div>
      </div>
    );

  return (
    <div className="py-[64px] bg-white min-h-screen">
      <h1 className="text-4xl font-bold text-center mt-[144px]">
        {title}: <br /> <span>{subtitle}</span>
      </h1>
      <div className="flex justify-center items-center my-[24px]">
        <div className="avatar mr-[12px]">
          <div className="w-12 rounded-full">
            <Image
              alt="Author Elvis Hernandez"
              src="https://authentic-development-blog-images.s3.amazonaws.com/small-1695691281238-me.jpeg"
              width={50}
              height={50}
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
      <section className="mx-[20%] my-[64px]">
        <Markdown value={post?.content ?? ""} />
      </section>

      <section className="mx-[20%]">
        <h2 className="font-bold text-xl text-center">Get a Free Consult</h2>
        <div className="divider my-0"></div>{" "}
        <p>
          Want to take the plunge into the Micro-SaaS world but still have questions or need
          guidance? Feel free to reach out for a free consultation. It&apos;s always helpful to have
          experienced guidance when embarking on the journey of starting a Micro-SaaS. With the
          right tools, knowledge, and support, your Micro-SaaS could flourish into a sustainable and
          profitable venture.
        </p>
        <div className="flex justify-center mt-[24px]">
          <Link
            href={`/#contact`}
            className="btn btn-accent normal-case w-[140px] "
            onClick={(e) => handleLinkClickSmoothScroll(e, "contact")}
          >
            Free Consult
          </Link>
        </div>
      </section>
    </div>
  );
};

SpecificBlogPage.getLayout = (page) => <Layout>{page}</Layout>;
export default SpecificBlogPage;
