import { type inferAsyncReturnType } from "@trpc/server";

import { prisma } from "../db/client";

/**
 * This is the actual context you'll use in your router
 * @link https://trpc.io/docs/context
 **/
export const createContext = () => {
  return {
    prisma,
  };
};

export type Context = inferAsyncReturnType<typeof createContext>;
