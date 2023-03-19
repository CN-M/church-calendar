import { z } from "zod";
import { env } from "~/env.mjs";

import { 
     createTRPCRouter,
     protectedProcedure
} from "../trpc";


export const userRouter = createTRPCRouter({
    getAllUsers: protectedProcedure
        .query(({ ctx }) => {
            if (ctx.session?.user.role !== env.ROLE_3) {
                throw new Error('You do not have permission to perform this action')
            }

            return ctx.prisma.user.findMany()
        }
    ),

    getUser: protectedProcedure
        .input(z.object({
            id: z.string()
        }))
        .query(({ ctx, input: { id } }) => {
            if (ctx.session?.user.role !== env.ROLE_3) {
                throw new Error('You do not have permission to perform this action')
            }

            return ctx.prisma.user.findUnique({
                where: {
                    id
                }
            })
        }
    ),

    promoteUser: protectedProcedure
        .input(z.object({
            id: z.string(),
        }))
        .mutation(({ ctx, input: { id } }) => {
            if (ctx.session?.user.role !== env.ROLE_3) {
                throw new Error('You do not have permission to perform this action')
            }

            return ctx.prisma.user.update({
                where: {
                    id
                },
                data: {
                    role: env.ROLE_2
                } as object
            })
        }
    ),

    demoteUser: protectedProcedure
        .input(z.object({
            id: z.string(),
        }))
        .mutation(({ ctx, input: { id } }) => {
            if (ctx.session?.user.role !== env.ROLE_3) {
                throw new Error('You do not have permission to perform this action')
            }

            return ctx.prisma.user.update({
                where: {
                    id
                },
                data: {
                    role: env.ROLE_1
                } as object
            })
        }
    ),

    deleteUser: protectedProcedure
        .input(z.object({
            id: z.string()
        }))
        .mutation(({ ctx, input: { id } }) => {
            if (ctx.session?.user.role !== env.ROLE_3) {
                throw new Error('You do not have permission to perform this action')
            }

            return ctx.prisma.user.delete({
                where: {
                    id
                }
            })
        }
    )
})