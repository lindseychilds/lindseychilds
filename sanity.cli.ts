import { defineCliConfig } from "sanity/cli";
import { dataset, projectId } from "./sanity/env";

export default defineCliConfig({
  api: { projectId, dataset },
  studioHost: "lindseychilds",
  deployment: { appId: "zzd0naehezaiqztjcipgrfvv" },
  autoUpdates: true,
});
