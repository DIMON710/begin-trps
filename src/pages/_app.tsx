import { type AppType } from "next/app";

import { api } from "~/utils/api";

import "~/styles/globals.css";
import { ClerkProvider } from "@clerk/nextjs";
import { Toaster } from "react-hot-toast";
import Head from "next/head";

const MyApp: AppType = ({ Component, pageProps }) => {
  return (
  <ClerkProvider {...pageProps}>
    <Head>
        <title>Begin-trps</title>
        <meta name="description" content="Twitter" />
        <link rel="icon" href="/favicon.ico" />
    </Head>
    <div><Toaster position="bottom-center"/></div>
    <Component {...pageProps} />
  </ClerkProvider>)
};

export default api.withTRPC(MyApp);
