import { createServerComponentClient } from "@supabase/auth-helpers-nextjs";
import { cookies } from "next/headers";

export default async function Entry({ params }) {
  const cookieStore = cookies();
  const supabase = createServerComponentClient({ cookies: () => cookieStore });
  const topic_id = params.entries;
  const { data: entries } = await supabase
    .from("entry")
    .select()
    .eq("topic", topic_id);
  return (
    <main>
      <ul>
        {entries?.map((entry) => (
          <li>
            <h1 className="text-xl mb-4 text-white">{entry.title}</h1>
            <p className="text-white">
              {entry.text.length > 200
                ? entry.text.substring(0, 200).concat("...")
                : entry.text}
            </p>
          </li>
        ))}
      </ul>
    </main>
  );
}
