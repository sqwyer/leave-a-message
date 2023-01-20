import { z } from "zod";

import { router, publicProcedure } from "../trpc";

export const messagesRouter = router({
  getAll: publicProcedure.query(({ ctx }) => {
    return ctx.prisma.message.findMany();
  }),
  createNew: publicProcedure
    .input(
      z.object({
        message: z.string(),
        phrase: z.string(),
      })
    )
    .mutation(({ input, ctx }) => {
      return ctx.prisma.message.create({
        data: {
          message: input.message,
          phrase: input.phrase,
        },
      });
    }),
  findOne: publicProcedure.input(z.string()).mutation(({ input, ctx }) => {
    return ctx.prisma.message.findUnique({
      where: {
        phrase: input,
      },
    });
  }),
});
