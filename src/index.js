import React from "react";
import ReactDOM from "react-dom";
import App from "./App";
import * as serviceWorkerRegistration from './serviceWorkerRegistration';
import {QueryClientProvider, QueryClient} from "react-query";
import { SpeedInsights } from "@vercel/speed-insights/react"
import { Analytics } from "@vercel/analytics/react"

const queryClient = new QueryClient();

ReactDOM.render(
  <QueryClientProvider client={queryClient}>
    <App />
    <SpeedInsights />
    <Analytics />
  </QueryClientProvider>,
  document.getElementById("root")
);

serviceWorkerRegistration.register();
