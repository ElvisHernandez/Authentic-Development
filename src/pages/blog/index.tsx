import { BlitzPage, Routes } from "@blitzjs/next";
import { useQuery } from "@blitzjs/rpc";
import { Post } from "@prisma/client";
import Image from "next/image";
import { useRouter } from "next/router";
import { Suspense } from "react";
import Layout from "src/core/layouts/Layout";
import getPostsResolver from "src/posts/queries/getPosts";

const BlogPage: BlitzPage = () => {
  return (
    <Suspense fallback={<p>loading...</p>}>
      <BlogPageContent />
    </Suspense>
  );
};

const BlogPageContent = () => {
  const router = useRouter();
  const [posts] = useQuery(getPostsResolver, { published: true });

  const getPostImageSrc = (post: Pick<Post, "thumbnailUrl">) =>
    post.thumbnailUrl.replace("small", "medium");

  return (
    <div className=" py-[64px] px-[48px] min-h-screen bg-white">
      <div className="my-[144px]">
        <h1 className="text-4xl font-bold">The Authentic Development Blog</h1>
        <p className="text-lg py-[12px] max-w-[90%] sm:max-w-[70%] lg:max-w-[50%] 2xl:max-w-[40%]">
          Discover expert insights on Micro-SaaS innovation—from idea validation and key performance
          indicators, to sustainable growth and beyond. Your go-to resource for all things
          Micro-SaaS.
        </p>
      </div>

      <div className="">
        <h2 className="text-2xl font-semibold">Most Recent Posts</h2>
        <div className="divider " />

        <section className="flex flex-col gap-4 items-center">
          {posts.map((post) => (
            <div
              key={post.id}
              className="card h-[500px] w-[fit-content] rounded bg-slate-200 shadow-xl"
            >
              <figure>
                <Image height={500} width={500} src={getPostImageSrc(post)} alt="Blog Image" />
              </figure>
              <div className="card-body max-w-[600px]">
                <h3 className="card-title">{post.title}</h3>
                <p className="text-xs">{post.description}</p>
                <div className="card-actions justify-end">
                  <button
                    className="btn btn-primary normal-case"
                    onClick={() =>
                      router.push(Routes.SpecificBlogPage({ id: post.id, slug: post.slug }))
                    }
                  >
                    Read
                  </button>
                </div>
              </div>
            </div>
          ))}
        </section>
      </div>
    </div>
  );
};

BlogPage.getLayout = (page) => <Layout>{page}</Layout>;
export default BlogPage;
