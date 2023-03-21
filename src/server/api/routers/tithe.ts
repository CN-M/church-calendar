import { z } from "zod";
import axios from "axios";
import {
  createTRPCRouter,
  publicProcedure,
} from "~/server/api/trpc";

import { env } from "~/env.mjs";
import { type Payment } from "~/types/types";

const { YOCO_KEY } = env;

const processPayment = async ({ token, amountInCents }: Payment) => {
    await axios.post(
    'https://online.yoco.com/v1/charges/',
    {
        token: token,
        amountInCents: amountInCents,
        currency: 'ZAR',
    },
    {
        headers: {
        'X-Auth-Secret-Key': YOCO_KEY,
        },
    })
}

export const titheRouter = createTRPCRouter({
    payTithe: publicProcedure
        .input(z.object({
            amountInCents: z.number(),
            token: z.string(),
        }))
        .mutation(({ ctx, input: { token, amountInCents } }) => {
            processPayment({ token, amountInCents })
            return ctx.prisma.tithe.create({
                data: {
                    amount: amountInCents / 100,
                    user: {
                        connect: {
                            id: ctx.session?.user.id
                        }
                    },
                }
            })
        }),

    payGeneralTithe: publicProcedure
        .input(z.object({
            name: z.string().optional(),
            amountInCents: z.number(),
            token: z.any(),
        }))
        .mutation(({ ctx, input: { name, token, amountInCents } }) => {
            processPayment({ token, amountInCents })
            return ctx.prisma.generalTithe.create({
                data: {
                    name,
                    amount: amountInCents / 100,
                }
            })
        }
    ),
});


