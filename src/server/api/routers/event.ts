import { z } from "zod";
import { env } from "src/env.mjs";
import { 
     createTRPCRouter,
     publicProcedure, 
     protectedProcedure
} from "../trpc";

export const eventRouter = createTRPCRouter({
    getAllEvents: publicProcedure
        .query(({ ctx }) => {
            return ctx.prisma.event.findMany()
        }),

    createEvent: protectedProcedure
        .input(z.object({
            name: z.string(),
            startDatetime: z.string(),
            endDatetime: z.string(),
        }))
        .mutation(({ ctx, input: { name, startDatetime, endDatetime } }) => {
            if (ctx.session?.user.role !== env.ROLE_3 && ctx.session?.user.role !== env.ROLE_2) {
                throw new Error('You do not have permission to perform this action')
            }

            return ctx.prisma.event.create({
                data: {
                    name,
                    startDatetime,
                    endDatetime,
                    user: {
                        connect: {
                            id: ctx.session?.user.id
                        }
                    },
                }
            })
        }),

    updateEvent: protectedProcedure
        .input(z.object({
            id: z.string(),
            name: z.string({ required_error: 'Fill in all fields' })
                .min(1)
                .max(50),
            startDatetime: z.string(),
            endDatetime: z.string(),
        }))
        .mutation(({ ctx, input: { id, name, startDatetime, endDatetime } }) => {
            if (ctx.session?.user.role !== env.ROLE_3 && ctx.session?.user.role !== env.ROLE_2) {
                throw new Error('You do not have permission to perform this action')
            }

            return ctx.prisma.event.update({
                where: {
                    id
                },
                data: {
                    name,
                    startDatetime,
                    endDatetime,
                }
            })
        }),

    deleteEvent: protectedProcedure
        .input(z.object({ id: z.string() }))
        .mutation(({ ctx, input: { id } }) => {
            if (ctx.session?.user.role !== env.ROLE_3 && ctx.session?.user.role !== env.ROLE_2) {
                throw new Error('You do not have permission to perform this action')
            }

            return ctx.prisma.event.delete({
                where: {
                    id
                }
            })
        })
});
