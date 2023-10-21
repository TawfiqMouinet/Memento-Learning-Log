import { createServerComponentClient } from "@supabase/auth-helpers-nextjs";
import { cookies } from "next/headers";
import Link from "next/link";

export default async function Home() {
  const cookieStore = cookies();
  const supabase = createServerComponentClient({ cookies: () => cookieStore });
  const { data: topics } = await supabase.from("topic").select();
  return (
    <main>
      <table className="m-auto border-collapse border border-slate-300 table-auto text-white ">
        <tr className="border border-slate-300">
          <th className="border border-slate-300">Topic</th>
          <th className="border border-slate-300">Entries</th>
          <th className="border  border-slate-300">Date</th>
        </tr>
        {topics?.map((topic) => (
          <tr key={topic.id} className="border border-slate-300">
            <td className="border border-slate-300 text-center">
              <Link href={`/home/${topic.id}`} prefetch={false}>
                {topic.title}
              </Link>
            </td>
            <td className="border border-slate-300 text-center">
              {topic.number_of_entries}
            </td>
            <td className="border border-slate-300 text-center">
              {topic.created_at.substring(0, 10)}
            </td>
          </tr>
        ))}
      </table>
    </main>
  );
}
