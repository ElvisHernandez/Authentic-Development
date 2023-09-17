import { Suspense } from "react";
import Link from "next/link";
import { useMutation, useQuery } from "@blitzjs/rpc";
import { Routes, BlitzPage } from "@blitzjs/next";
import {
  MdEngineering,
  MdDesignServices,
  MdDataThresholding,
  MdOutlineIntegrationInstructions,
  MdComputer,
  MdPrivateConnectivity,
} from "react-icons/md";

import logout from "src/auth/mutations/logout";
import Layout from "src/core/layouts/Layout";
import { useCurrentUser } from "src/users/hooks/useCurrentUser";
import styles from "src/styles/Home.module.css";
import getPosts from "src/posts/queries/getPosts";
import Image from "next/image";
import MeImage from "../../public/me.jpeg";

const UserInfo = () => {
  const currentUser = useCurrentUser();
  const [logoutMutation] = useMutation(logout);

  if (currentUser) {
    return (
      <>
        <button
          className={styles.button}
          onClick={async () => {
            await logoutMutation();
          }}
        >
          Logout
        </button>
        <div>
          User id: <code>{currentUser.id}</code>
          <br />
          User role: <code>{currentUser.role}</code>
        </div>
      </>
    );
  } else {
    return (
      <>
        <Link href={Routes.SignupPage()} className={styles.button}>
          <strong>Sign Up</strong>
        </Link>
        <Link href={Routes.LoginPage()} className={styles.loginButton}>
          <strong>Login</strong>
        </Link>
      </>
    );
  }
};

const HomeContent = () => {
  const [result] = useQuery(getPosts, {});
  console.log(result);

  return (
    <Layout title="Home">
      {/* <div className={styles.buttonContainer}>
        <Suspense fallback="Loading...">
          <UserInfo />
        </Suspense>
      </div> */}
      <h1 className="text-5xl pl-[48px] pt-[300px] text-white">
        Lets build an experience together
      </h1>
      <p className="pl-[48px] pt-[24px] text-white">
        My name is Elvis, I'm a full stack web developer and I specialize in making SaaS products
        for startups
      </p>

      {/* <h1 className="text-5xl absolute top-[32%] left-[48px]">Lets build an experience together</h1> */}
      <button className="btn btn-outline btn-accent normal-case mt-[24px]  ml-[48px] w-[140px]">
        Free Consult
      </button>
      <button className="btn btn-outline btn-info normal-case ml-[48px] w-[140px]">Services</button>

      <div className="mt-[200px]  bg-white pt-[48px]">
        <div className="flex">
          <div className="w-[45%] h-6 bg-gray-100"></div>
          <h2 className="text-2xl w-[10%] text-base-100 text-center font-semibold">About</h2>
          <div className="w-[45%] h-6 bg-gray-100"></div>
        </div>
        <p className="mx-[144px] mt-[24px]">
          Hi, I'm Elvis, and I specialize in turning your big ideas into reality through custom
          software. With a strong foundation in science and engineering, I've been at the ground
          floor of start-ups and have helped grow companies by providing them with the tools they
          need to succeed. My passion lies in understanding your business goals and transforming
          them into easy-to-use software solutions that not only work seamlessly but also drive
          revenue and efficiency.
        </p>
        <p className="mx-[144px] mt-[24px]">
          I have a diverse set of skills that can help your business grow and stay competitive.
          Whether you're looking to provide your customers with a standout digital experience or
          you're in need of behind-the-scenes systems that make your business run smoothly, I've got
          the experience to deliver. Let's talk about how I can help bring your vision to life.
        </p>
        <div className="flex justify-center py-[48px]">
          <Image className="rounded-full " alt="Me!" src={MeImage} height={300} width={300} />
        </div>
        <div className="flex">
          <div className="w-[45%] h-6 bg-gray-100"></div>
          <h2 className="text-2xl w-[10%] text-base-100 text-center font-semibold">Services</h2>
          <div className="w-[45%] h-6 bg-gray-100"></div>
        </div>
        <p className="mx-[144px] mt-[24px]">
          You've got the vision; we've got the expertise to bring it to life. Whether you're
          starting from scratch or need to optimize your existing platform, we offer comprehensive
          solutions that cater specifically to SaaS businesses.
        </p>
        {/* className="flex px-[144px] py-[64px] gap-x-8" */}
        <div className="grid grid-cols-3 gap-x-16 px-[144px] pt-[48px] pb-[24px]">
          <div className="text-center">
            <MdEngineering className="h-[64px] w-[64px] mx-auto my-[12px]" />
            <div className="font-medium mb-[12px]">End-to-End Development</div>
            <p className="text-sm">
              Why piece together multiple specialists when you can get it all done in one place? We
              handle everything from initial sketches to the launch of your SaaS product. We even
              ensure it runs smoothly after the big day.
            </p>
          </div>

          <div className="text-center">
            <MdDesignServices className="h-[64px] w-[64px] mx-auto my-[12px]" />
            <div className="font-medium mb-[12px]">User-Friendly Interfaces</div>
            <p className="text-sm">
              A great idea deserves a sleek and intuitive design. With your customer in mind, we
              create engaging user experiences that not only look good but are easy to navigate.
            </p>
          </div>

          <div className="text-center">
            <MdDataThresholding className="h-[64px] w-[64px] mx-auto my-[12px]" />
            <div className="font-medium mb-[12px]">Data Optimization</div>
            <p className="text-sm">
              We implement smart data solutions that make your service faster and more reliable.
              Understand your business better through key performance indicators and analytics that
              we integrate seamlessly into your platform.
            </p>
          </div>
        </div>
        <div className="grid grid-cols-3 gap-x-16 px-[144px] py-[24px]">
          <div className="text-center">
            <MdOutlineIntegrationInstructions className="h-[64px] w-[64px] mx-auto my-[12px]" />
            <div className="font-medium mb-[12px]">Seamless Third-Party Integrations</div>
            <p className="text-sm">
              Need to link up with other software or platforms? We've got you covered. Our expertise
              allows for smooth integrations that extend your service's capabilities.
            </p>
          </div>

          <div className="text-center">
            <MdPrivateConnectivity className="h-[64px] w-[64px] mx-auto my-[12px]" />
            <div className="font-medium mb-[12px]">Secure & Scalable</div>
            <p className="text-sm">
              As your business grows, your platform should too. We build with scalability in mind,
              ensuring that you can easily add features or users as needed. Rest easy knowing your
              data and your users' data are well-protected.
            </p>
          </div>

          <div className="text-center">
            <MdComputer className="h-[64px] w-[64px] mx-auto my-[12px]" />
            <div className="font-medium mb-[12px]">24/7 Support & Maintenance</div>
            <p className="text-sm">
              We don't just disappear after launch. Our ongoing support and maintenance services
              ensure your SaaS business continues to run smoothly, allowing you to focus on what you
              do best—running your business.
            </p>
          </div>
        </div>
      </div>
    </Layout>
  );
};

const Home: BlitzPage = () => (
  <Suspense fallback={<p>loading home content...</p>}>
    <HomeContent />
  </Suspense>
);

export default Home;
