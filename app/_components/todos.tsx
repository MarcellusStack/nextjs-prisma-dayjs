"use client";

import React from "react";
import { createTodo } from "@/server/actions";
import { useStateAction } from "next-safe-action/stateful-hooks";
import { useForm } from "@mantine/form";
import { DateInput, DateTimePicker } from "@mantine/dates";
import { dayjsExt as dayjs, toLocalDate, toLocalDateTime } from "@/lib/dayjs";

export const Todos = ({ todos }) => {
  return (
    <div className="flex flex-col gap-4">
      <h1 className="text-2xl font-bold">Todos</h1>
      {todos.map((todo) => (
        <div key={todo.id} className="border border-green-600">
          <p>Title: {todo.title}</p>
          <p>
            DateTime:{" "}
            {toLocalDateTime(todo.datetime).format("DD.MM.YYYY HH:mm")}
          </p>
          <p>Date: {toLocalDate(todo.date).format("DD.MM.YYYY")}</p>
          <p>Created at: {dayjs(todo.createdAt).format("DD.MM.YYYY HH:mm")}</p>
          <p>Updated at: {dayjs(todo.updatedAt).format("DD.MM.YYYY HH:mm")}</p>
        </div>
      ))}

      <AddTodo />
    </div>
  );
};

export const AddTodo = () => {
  const { execute, status } = useStateAction(createTodo);

  const form = useForm({
    mode: "uncontrolled",
    initialValues: {
      datetime: new Date(),
      date: new Date(),
      title: "t",
    },
  });

  return (
    <form
      onSubmit={form.onSubmit((values) => {
        execute(values);
      })}
    >
      <DateInput
        locale="de"
        label="Datum"
        valueFormat="DD.MM.YYYY"
        key={form.key("date")}
        {...form.getInputProps("date")}
      />
      <DateTimePicker
        locale="de"
        valueFormat="DD.MM.YYYY HH:mm"
        label="Datetime"
        placeholder="Pick date and time"
        key={form.key("datetime")}
        {...form.getInputProps("datetime")}
      />
      <button type="submit" disabled={status === "executing"}>
        {status === "executing" ? "Adding..." : "Add Todo"}
      </button>
    </form>
  );
};
