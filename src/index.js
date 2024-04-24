import React from "react";
import ReactDOM from "react-dom";
import App from "./App";
import * as serviceWorkerRegistration from './serviceWorkerRegistration';
import {QueryClientProvider, QueryClient} from "react-query";
import { SpeedInsights } from "@vercel/speed-insights/react"

const queryClient = new QueryClient();

ReactDOM.render(
  <QueryClientProvider client={queryClient}>
    <App />
    <SpeedInsights />
  </QueryClientProvider>,
  document.getElementById("root")
);

serviceWorkerRegistration.register();
