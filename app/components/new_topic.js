"use client";
import { createClientComponentClient } from "@supabase/auth-helpers-nextjs";
import { Input } from "@nextui-org/input";
import { useState } from "react";

export default function NewTopic() {
  const [title, setTitle] = useState("");
  const addTopic = async () => {
    const supabase = createClientComponentClient();
    const { data: user } = await supabase.auth.getUser();
    const uuid = user.user.id;
    console.log(uuid);
    console.log(title);
    await supabase
      .from("topic")
      .insert({ title: title, user: uuid, number_of_entries: 0 });
  };
  return (
    <form onSubmit={addTopic} id="topic">
      <Input
        autoFocus
        name="title"
        label="Title"
        placeholder="Enter the title."
        variant="bordered"
        onChange={(e) => setTitle(e.target.value)}
        isRequired
        labelPlacement="outside"
      />
    </form>
  );
}
