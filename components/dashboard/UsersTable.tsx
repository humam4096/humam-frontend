'use client';

import {useMemo} from 'react';
import {tableFeatures, useTable} from '@tanstack/react-table';
import type {ColumnDef} from '@tanstack/react-table';
import type {User} from '@/lib/api/users';
import sharedStyles from '@/styles/shared-table.module.css';
import customStyles from './UsersTable.module.css';

// Define the features this table uses
const features = tableFeatures({});

interface UsersTableProps {
  users: User[];
}

export function UsersTable({users}: UsersTableProps) {
  // Define columns
  const columns = useMemo<Array<ColumnDef<typeof features, User>>>(
    () => [
      {
        id: 'rowNumber',
        header: '#',
        cell: (info) => info.row.index + 1,
        size: 60,
      },
      {
        accessorKey: 'name',
        header: 'Name',
        cell: (info) => info.getValue(),
      },
      {
        accessorKey: 'email',
        header: 'Email',
        cell: (info) => info.getValue(),
      },
      {
        accessorKey: 'role',
        header: 'Role',
        cell: (info) => {
          const role = info.getValue<string>();
          return <span className={`${customStyles.roleBadge} ${customStyles[role.toLowerCase()]}`}>{role}</span>;
        },
      },
      {
        accessorKey: 'createdAt',
        header: 'Created At',
        cell: (info) => {
          const date = new Date(info.getValue<string>());
          return (
            <div className={sharedStyles.dateCell}>
              <div>{date.toLocaleDateString()}</div>
              <div className={sharedStyles.timeText}>{date.toLocaleTimeString()}</div>
            </div>
          );
        },
      },
      {
        accessorKey: 'updatedAt',
        header: 'Updated At',
        cell: (info) => {
          const date = new Date(info.getValue<string>());
          return (
            <div className={sharedStyles.dateCell}>
              <div>{date.toLocaleDateString()}</div>
              <div className={sharedStyles.timeText}>{date.toLocaleTimeString()}</div>
            </div>
          );
        },
      },
    ],
    []
  );

  // Create table instance
  const table = useTable({
    key: 'users-table',
    features,
    columns,
    data: users,
  });

  return (
    <div className={sharedStyles.container}>
      <div className={sharedStyles.tableWrapper}>
        <table className={sharedStyles.table}>
          <thead className={sharedStyles.thead}>
            {table.getHeaderGroups().map((headerGroup) => (
              <tr key={headerGroup.id}>
                {headerGroup.headers.map((header) => (
                  <th key={header.id} className={sharedStyles.th}>
                    {header.isPlaceholder ? null : <table.FlexRender header={header} />}
                  </th>
                ))}
              </tr>
            ))}
          </thead>
          <tbody>
            {table.getRowModel().rows.map((row) => (
              <tr key={row.id} className={sharedStyles.tr}>
                {row.getAllCells().map((cell) => (
                  <td key={cell.id} className={sharedStyles.td}>
                    <table.FlexRender cell={cell} />
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
