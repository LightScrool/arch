import { z } from "zod";
import { makeApi } from "@zodios/core";

const preset = z.object({
  alias: z.string(),
  name: z.string(),
  description: z.string().optional(),
  size: z.number(),
  isHorizontal: z.boolean(),
});

const project = z.object({
  alias: z.string(),
  name: z.string(),
  description: z.string().optional(),
  presets: z.array(preset),
});

const ok = z.literal("ok");

export type Preset = z.infer<typeof preset>;

export type Project = z.infer<typeof project>;

export const api = makeApi([
  {
    method: "get",
    path: "/api/inner/v1/user",
    response: z.object({
      name: z.string(),
      avatar: z.string().optional(),
    }),
  },

  {
    method: "get",
    path: "/api/inner/v1/user/projects",
    response: z.array(
      z.object({
        alias: z.string(),
        name: z.string(),
        description: z.string().optional(),
      }),
    ),
  },

  {
    method: "post",
    path: "/api/inner/v1/projects",
    parameters: [
      {
        name: "body",
        type: "Body",
        schema: z.object({
          alias: z.string(),
          name: z.string(),
          description: z.string().optional(),
        }),
      },
    ],
    response: ok,
  },

  {
    method: "delete",
    path: "/api/inner/v1/projects/:projectAlias",
    response: ok,
  },

  {
    method: "get",
    path: "/api/inner/v1/projects/:projectAlias",
    response: project.omit({ alias: true }),
  },

  {
    method: "get",
    path: "/api/inner/v1/projects/:projectAlias/apiKey",
    response: z.object({
      apiKey: z.string(),
    }),
  },

  {
    method: "delete",
    path: "/api/inner/v1/projects/:projectAlias/apiKey",
    response: ok,
  },
]);
