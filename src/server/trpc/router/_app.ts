import { router } from "../trpc";
import { messagesRouter } from "./message";

export const appRouter = router({
  messages: messagesRouter,
});

// export type definition of API
export type AppRouter = typeof appRouter;
