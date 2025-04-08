import { Todos } from "./_components/todos";

import { getTodos } from "@/server/actions";

export const dynamic = "force-dynamic";

export default async function Home() {
  const todos = await getTodos();
  return (
    <div>
      <h1>Hello World</h1>
      <Todos todos={todos} />
    </div>
  );
}
