import { createTRPCRouter } from "src/server/api/trpc";
import { exampleRouter } from "src/server/api/routers/example";
import { eventRouter } from "./routers/event";
import { userRouter } from "./routers/user";
import { titheRouter } from "./routers/tithe";

/**
 * This is the primary router for your server.
 *
 * All routers added in /api/routers should be manually added here.
 */
export const appRouter = createTRPCRouter({
  example: exampleRouter,
  event: eventRouter,
  user: userRouter,
  tithe: titheRouter,
});

// export type definition of API
export type AppRouter = typeof appRouter;
