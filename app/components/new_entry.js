"use client";
import { createClientComponentClient } from "@supabase/auth-helpers-nextjs";
import { Input } from "@nextui-org/input";
import { useState } from "react";
import { Textarea } from "@nextui-org/input";

export default function NewEntry(topic) {
  const [title, setTitle] = useState("");
  const [text, setText] = useState("");
  console.log(topic.topic);
  const addEntry = async () => {
    const supabase = createClientComponentClient();
    await supabase
      .from("entry")
      .insert({ title: title, text: text, topic: topic.topic });
  };
  return (
    <form onSubmit={addEntry} id="entry">
      <Input
        autoFocus
        name="title"
        label="Title"
        placeholder="Enter the title."
        variant="bordered"
        onChange={(e) => setTitle(e.target.value)}
        className="mb-4"
        labelPlacement="outside"
        isRequired
      />
      <Textarea
        isRequired
        name="text"
        label="Entry Text"
        placeholder="Type in your entry"
        labelPlacement="outside"
        onChange={(e) => setText(e.target.value)}
      />
    </form>
  );
}
