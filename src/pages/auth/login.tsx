import { BlitzPage } from "@blitzjs/next";
import Layout from "src/core/layouts/Layout";
import { useRouter } from "next/router";
import { Suspense } from "react";
import dynamic from "next/dynamic";

const LoginForm = dynamic(() => import("src/auth/components/LoginForm"), { ssr: false });

const LoginPage: BlitzPage = () => {
  const router = useRouter();

  return (
    <Suspense fallback={<p>React sucks...</p>}>
      <Layout title="Log In">
        <LoginForm
          onSuccess={(_user) => {
            const next = router.query.next ? decodeURIComponent(router.query.next as string) : "/";
            return router.push(next);
          }}
        />
      </Layout>
    </Suspense>
  );
};

export default LoginPage;
