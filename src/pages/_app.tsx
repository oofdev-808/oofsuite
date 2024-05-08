import Layout from "@/components/Layout";
import "@/styles/globals.css";
import type { AppProps } from "next/app";
import { Provider } from "react-redux";
import { store } from "@/redux/store";
import StateSetterComponent from "@/redux/stateSetterComponent/StateSetterComponent";

export default function App({ Component, pageProps }: AppProps) {
  return (
    <Provider store={store}>
      <StateSetterComponent />
      <Layout>
        <Component {...pageProps} />
      </Layout>
    </Provider>
  );
}
