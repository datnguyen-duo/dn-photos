import { defineConfig, isDev } from "sanity";
import { visionTool } from "@sanity/vision";
import { deskTool } from "sanity/desk";
import { getStartedPlugin } from "./plugins/sanity-plugin-tutorial";
import { media } from "sanity-plugin-media";
import schemas from "./sanity/schemas";
const devOnlyPlugins = [getStartedPlugin()];

const config = defineConfig({
  projectId: "0p77p9q1",
  dataset: "production",
  title: "Dat Nguyen",
  apiVersion: "2023-05-05",
  basePath: "/admin",
  plugins: [
    deskTool(),
    visionTool(),
    media(),
    ...(isDev ? devOnlyPlugins : []),
  ],
  schema: { types: schemas },
});

export default config;
