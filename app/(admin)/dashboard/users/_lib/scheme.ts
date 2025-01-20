"use client";

import { z } from "zod";

export const pasienScheme = z.object({
    id: z.string(),
    name: z.string(),
    username: z.string(),
    email: z.string(),
});