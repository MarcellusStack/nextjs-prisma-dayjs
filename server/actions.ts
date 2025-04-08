"use server"; // don't forget to add this!

import { z } from "zod";
import { actionClient } from "@/lib/action-clients";
import { prisma } from "@/lib/prisma";
import { toUTC } from "@/lib/dayjs";
import { revalidatePath } from "next/cache";

// This schema is used to validate input from client.
const schema = z.object({
  datetime: z.date(),
  date: z.date(),
  title: z.string().min(1),
});

export const createTodo = actionClient
  .schema(schema)
  .stateAction(async ({ parsedInput: { datetime, date, title } }) => {
    try {
      await prisma.todo.create({
        data: {
          datetime: new Date(datetime),
          date: new Date(date),
          title: title,
        },
      });
    } catch (error) {
      console.error(error);
      return { success: false, message: "Todo creation failed" };
    }

    console.log("Todo created");

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
    },
  });

  console.log(todos);

  return todos;
};

export type TodoProps = NonNullable<Awaited<ReturnType<typeof getTodos>>>;
