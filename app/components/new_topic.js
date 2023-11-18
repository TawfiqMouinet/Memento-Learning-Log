import { createServerActionClient } from "@supabase/auth-helpers-nextjs";
import { revalidatePath } from "next/cache";
import { cookies } from "next/headers";
import { Input } from "@nextui-org/input";

export default function NewTopic() {
  const addTopic = async (formData) => {
    "use server";
    const supabase = createServerActionClient({ cookies });
    const { data: user } = await supabase.auth.getUser();
    const uuid = user.user.id;
    const title = formData.get("title");
    await supabase
      .from("topic")
      .insert({ title: title, user: uuid, number_of_entries: 0 });
    revalidatePath("./home");
  };
  return (
    <form action={addTopic} id="topic">
      <Input
        autoFocus
        name="title"
        label="Title"
        placeholder="Enter the title."
        variant="bordered"
      />
    </form>
  );
}
