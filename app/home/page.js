"use server";
import { createServerComponentClient } from "@supabase/auth-helpers-nextjs";
import { cookies } from "next/headers";
import Link from "next/link";
import NewTable from "../components/table";
import NewModal from "../components/modal";
import { Button } from "@nextui-org/button";
import NewTopic from "../components/new_topic";

export default async function Home() {
  "use server";
  const cookieStore = cookies();
  const supabase = createServerComponentClient({
    cookies: () => cookieStore,
  });
  const { data: topics } = await supabase.from("topic").select();
  const rows = topics?.map((topic) => ({
    key: topic.id,
    title: topic.title,
    num_of_entries: topic.number_of_entries,
    created_at: topic.created_at.substring(0, 10),
  }));

  const columns = [
    {
      key: "Topic",
      label: "TOPIC",
    },
    {
      key: "Entries",
      label: "ENTRIES",
    },
    {
      key: "Date",
      label: "DATE",
    },
  ];

  return (
    <main>
      <NewTable rows={rows} columns={columns} />
      <NewModal
        buttonText={"Add Topic"}
        modalHeader={"Create a new Topic"}
        modalContent={
          <div>
            <NewTopic />
          </div>
        }
        modalFooter={
          <Button color="primary" form="topic" type="submit">
            Add Topic
          </Button>
        }
      />
    </main>
  );
}
