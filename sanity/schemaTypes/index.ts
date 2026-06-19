import type { SchemaTypeDefinition } from "sanity";
import { aboutPage } from "./aboutPage";
import { contactPage } from "./contactPage";
import { motionProject } from "./motionProject";
import { siteSettings } from "./siteSettings";
import { stillProject } from "./stillProject";

export const schemaTypes: SchemaTypeDefinition[] = [
  siteSettings,
  stillProject,
  motionProject,
  aboutPage,
  contactPage,
];
