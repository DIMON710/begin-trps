import { type AppType } from "next/app";

import { api } from "~/utils/api";

import "~/styles/globals.css";
import { ClerkProvider } from "@clerk/nextjs";
import { Toaster } from "react-hot-toast";

const MyApp: AppType = ({ Component, pageProps }) => {
  return (
  <ClerkProvider {...pageProps}>
    <div><Toaster position="bottom-center"/></div>
    <Component {...pageProps} />
  </ClerkProvider>)
};

export default api.withTRPC(MyApp);
