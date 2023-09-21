import { BlitzPage } from "@blitzjs/next";
import { useQuery } from "@blitzjs/rpc";
import Layout from "src/core/layouts/Layout";
import getPostsResolver from "src/posts/queries/getPosts";

const BlogPage: BlitzPage = () => {
  const [posts] = useQuery(getPostsResolver, {});

  return (
    <div className=" py-[64px] px-[48px] min-h-screen bg-white">
      <div className="my-[144px]">
        <h1 className="text-4xl font-bold">The Authentic Development Blog</h1>
        <p className="text-lg py-[12px] max-w-[90%] sm:max-w-[70%] lg:max-w-[50%] 2xl:max-w-[40%]">
          Discover expert insights on SaaS innovation—from idea validation and key performance
          indicators, to sustainable growth and beyond. Your go-to resource for all things SaaS.
        </p>
      </div>

      <div className="">
        <h2 className="text-2xl font-semibold">Most Recent Posts</h2>
        <div className="divider " />

        <section className="flex flex-col gap-4 items-center">
          {posts.map((post) => (
            <div className="card h-[300px] w-[500px] rounded bg-slate-200 lg:card-side shadow-xl">
              <figure>
                <img src="/images/stock/photo-1494232410401-ad00d5433cfa.jpg" alt="Album" />
              </figure>
              <div className="card-body">
                <h3 className="card-title">{post.title}</h3>
                <p>{post.description}</p>
                <div className="card-actions justify-end">
                  <button className="btn btn-primary normal-case">Read</button>
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
