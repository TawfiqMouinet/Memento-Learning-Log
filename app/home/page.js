"use client";
import { createClientComponentClient } from "@supabase/auth-helpers-nextjs";
import Link from "next/link";
import { useEffect, useState } from "react";
import NewModal from "../components/modal";
import { Button } from "@nextui-org/button";
import NewTopic from "../components/new_topic";
import {
  Table,
  TableHeader,
  TableColumn,
  TableBody,
  TableRow,
  TableCell,
  getKeyValue,
} from "@nextui-org/table";

export default function Home() {
  const supabase = createClientComponentClient();
  const [rows, setRows] = useState([]);
  const [sortDescriptor, setSortDescriptor] = useState({
    column: "title",
    direction: "ascending",
  });
  const [reload, setReload] = useState(false);
  const sortByKey = (array, key, sortOrder = "ascending") => {
    const compareFunction = (a, b) => {
      if (a[key].toLowerCase() < b[key].toLowerCase()) {
        return sortOrder === "ascending" ? -1 : 1;
      } else if (a[key].toLowerCase() > b[key].toLowerCase()) {
        return sortOrder === "ascending" ? 1 : -1;
      } else {
        return 0;
      }
    };

    return array.slice().sort(compareFunction);
  };
  async function fetchRows() {
    const { data } = await supabase.from("topic").select();
    setRows(
      data.map((topic) => ({
        key: topic.id,
        title: topic.title,
        number_of_entries: topic.number_of_entries.toString(),
        created_at: topic.created_at.substring(0, 10),
      }))
    );
  }
  useEffect(() => {
    fetchRows();
  }, [reload]);
  useEffect(() => {
    setRows((prev) => {
      const sortedArray = sortByKey(
        prev,
        sortDescriptor.column,
        sortDescriptor.direction
      );
      return sortedArray;
    });
  }, [sortDescriptor]);

  const columns = [
    {
      key: "title",
      label: "TOPIC",
    },
    {
      key: "number_of_entries",
      label: "ENTRIES",
    },
    {
      key: "created_at",
      label: "DATE",
    },
  ];

  return (
    <main className="flex flex-col items-center">
      <Table
        aria-label="Table of topics"
        layout="auto"
        isStriped={true}
        fullWidth={true}
        sortDescriptor={sortDescriptor}
        onSortChange={setSortDescriptor}
        className="w-2/3"
        align="center"
      >
        <TableHeader columns={columns}>
          {(column) => (
            <TableColumn key={column.key} allowsSorting>
              {column.label}
            </TableColumn>
          )}
        </TableHeader>
        <TableBody items={rows} emptyContent={"Create some topics first!"}>
          {(item) => (
            <TableRow key={item.key}>
              {(columnKey) => (
                <TableCell>
                  {columnKey === "title" ? (
                    <Link href={`/home/${item.key}`}>
                      {getKeyValue(item, columnKey)}
                    </Link>
                  ) : (
                    getKeyValue(item, columnKey)
                  )}
                </TableCell>
              )}
            </TableRow>
          )}
        </TableBody>
      </Table>
      <NewModal
        buttonText={"Topic"}
        modalHeader={"Create a new Topic"}
        modalContent={
          <div>
            <NewTopic />
          </div>
        }
        modalFooter={
          <Button
            color="primary"
            variant="flat"
            form="topic"
            type="submit"
            onClick={() => setReload(true)}
          >
            Add Topic
          </Button>
        }
        size={"md"}
      />
    </main>
  );
}
