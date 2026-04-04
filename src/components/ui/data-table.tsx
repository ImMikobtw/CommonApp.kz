"use client";

import React from "react";

interface Column<T> {
  header: string;
  accessor: keyof T | ((item: T) => React.ReactNode);
  className?: string;
}

interface DataTableProps<T> {
  data: T[];
  columns: Column<T>[];
  isLoading?: boolean;
  emptyMessage?: string;
}

export function DataTable<T extends { id: string | number }>({
  data,
  columns,
  isLoading,
  emptyMessage = "No records found",
}: DataTableProps<T>) {
  if (isLoading) {
    return (
      <div className="w-full h-64 flex items-center justify-center border border-zinc-200 rounded-2xl bg-white shadow-sm">
        <div className="flex flex-col items-center gap-2">
          <div className="h-8 w-8 animate-spin rounded-full border-4 border-zinc-300 border-t-black" />
          <p className="text-sm font-medium text-zinc-500">Loading data...</p>
        </div>
      </div>
    );
  }

  if (data.length === 0) {
    return (
      <div className="w-full h-64 flex items-center justify-center border border-zinc-200 rounded-2xl bg-white shadow-sm">
        <p className="text-sm font-medium text-zinc-500">{emptyMessage}</p>
      </div>
    );
  }

  return (
    <div className="overflow-hidden border border-zinc-200 rounded-2xl bg-white shadow-sm ring-1 ring-zinc-200/50">
      <div className="overflow-x-auto">
        <table className="w-full text-left border-collapse">
          <thead>
            <tr className="border-b border-zinc-100 bg-zinc-50/50">
              {columns.map((column, idx) => (
                <th
                  key={idx}
                  className={`px-6 py-4 text-xs font-bold text-zinc-500 uppercase tracking-widest ${column.className || ""}`}
                >
                  {column.header}
                </th>
              ))}
            </tr>
          </thead>
          <tbody className="divide-y divide-zinc-100">
            {data.map((item) => (
              <tr
                key={item.id}
                className="group transition-colors hover:bg-zinc-50/50"
              >
                {columns.map((column, idx) => (
                  <td
                    key={idx}
                    className={`px-6 py-4 text-sm text-zinc-600 ${column.className || ""}`}
                  >
                    {typeof column.accessor === "function"
                      ? column.accessor(item)
                      : (item[column.accessor] as React.ReactNode)}
                  </td>
                ))}
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}
