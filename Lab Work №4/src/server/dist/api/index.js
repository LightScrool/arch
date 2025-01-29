"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.api = void 0;
const zod_1 = require("zod");
const core_1 = require("@zodios/core");
const preset = zod_1.z.object({
    alias: zod_1.z.string(),
    name: zod_1.z.string(),
    description: zod_1.z.string().optional(),
    size: zod_1.z.number(),
    isHorizontal: zod_1.z.boolean(),
});
const project = zod_1.z.object({
    alias: zod_1.z.string(),
    name: zod_1.z.string(),
    description: zod_1.z.string().optional(),
    presets: zod_1.z.array(preset),
});
const ok = zod_1.z.literal("ok");
exports.api = (0, core_1.makeApi)([
    {
        method: "get",
        path: "/api/inner/v1/user",
        response: zod_1.z.object({
            name: zod_1.z.string(),
            avatar: zod_1.z.string().optional(),
        }),
    },
    {
        method: "get",
        path: "/api/inner/v1/user/projects",
        response: zod_1.z.array(zod_1.z.object({
            alias: zod_1.z.string(),
            name: zod_1.z.string(),
            description: zod_1.z.string().optional(),
        })),
    },
    {
        method: "post",
        path: "/api/inner/v1/projects",
        parameters: [
            {
                name: "body",
                type: "Body",
                schema: zod_1.z.object({
                    alias: zod_1.z.string(),
                    name: zod_1.z.string(),
                    description: zod_1.z.string().optional(),
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
        response: zod_1.z.object({
            apiKey: zod_1.z.string(),
        }),
    },
    {
        method: "delete",
        path: "/api/inner/v1/projects/:projectAlias/apiKey",
        response: ok,
    },
]);
