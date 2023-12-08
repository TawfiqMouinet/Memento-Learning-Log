"use client";
import { createClientComponentClient } from "@supabase/auth-helpers-nextjs";
import { useEffect, useState } from "react";
import NewModal from "../../components/modal";
import { Button } from "@nextui-org/button";
import NewEntry from "../../components/new_entry";
import {
  Table,
  TableHeader,
  TableColumn,
  TableBody,
  TableRow,
  TableCell,
  getKeyValue,
} from "@nextui-org/table";

export default function Entry({ params }) {
  const supabase = createClientComponentClient();
  const topic_id = params.entries;
  const [reload, setReload] = useState(false);
  const [sortDescriptor, setSortDescriptor] = useState({
    column: "title",
    direction: "ascending",
  });
  const [rows, setRows] = useState([]);
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
    const { data } = await supabase
      .from("entry")
      .select()
      .eq("topic", topic_id);
    setRows(
      data.map((entry) => ({
        key: entry.id,
        title: entry.title,
        text: entry.text,
        created_at: entry.created_at.substring(0, 10),
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
      label: "TITLE",
    },
    {
      key: "text",
      label: "ENTRY",
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
      >
        <TableHeader columns={columns}>
          {(column) => (
            <TableColumn key={column.key} align="center" allowsSorting>
              {column.label}
            </TableColumn>
          )}
        </TableHeader>
        <TableBody items={rows} emptyContent={"Create some topics first!"}>
          {(item) => (
            <TableRow key={item.key}>
              {(columnKey) => (
                <TableCell>{getKeyValue(item, columnKey)}</TableCell>
              )}
            </TableRow>
          )}
        </TableBody>
      </Table>
      <NewModal
        buttonText={"Entry"}
        modalHeader={"Create a new Entry"}
        modalContent={
          <div>
            <NewEntry topic={topic_id} />
          </div>
        }
        modalFooter={
          <Button
            className=""
            color="primary"
            variant="flat"
            form="entry"
            type="submit"
            onClick={() => setReload}
          >
            Add Entry
          </Button>
        }
        size="3xl"
      />
    </main>
  );
}
