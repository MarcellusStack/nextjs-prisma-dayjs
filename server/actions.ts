"use server"; // don't forget to add this!

import { z } from "zod";
import { actionClient } from "@/lib/action-clients";
import { prisma } from "@/lib/prisma";
import { toUTC, toUTCTime } from "@/lib/dayjs";
import { revalidatePath } from "next/cache";

const schema = z.object({
  datetime: z.date(),
  date: z.date(),
  title: z.string().min(1),
  time: z
    .string()
    .regex(/^([0-1]?[0-9]|2[0-3]):[0-5][0-9]$/)
    .optional(),
});

export const createTodo = actionClient
  .schema(schema)
  .stateAction(async ({ parsedInput: { datetime, date, title, time } }) => {
    try {
      await prisma.todo.create({
        data: {
          datetime: toUTC(datetime).toDate(),
          date: toUTC(date).startOf("day").toDate(),
          title: title,
          time: time ? toUTCTime(time) : null,
        },
      });
    } catch {
      return { success: false, message: "Todo creation failed" };
    }

    revalidatePath("/");

    return { success: true, message: "Todo created" };
  });

export const getTodos = async () => {
  const todos = await prisma.todo.findMany({
    orderBy: {
      createdAt: "desc",
    },
    select: {
      id: true,
      createdAt: true,
      updatedAt: true,
      title: true,
      completed: true,
      datetime: true,
      date: true,
      time: true,
    },
  });

  return todos;
};

export type TodoProps = NonNullable<Awaited<ReturnType<typeof getTodos>>>;
