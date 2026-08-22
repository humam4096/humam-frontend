'use client';

import {useMemo, useState} from 'react';
import {tableFeatures, useTable} from '@tanstack/react-table';
import type {ColumnDef} from '@tanstack/react-table';
import type {Contact} from '@/db/schema';
import {StatusBadge} from '@/components/ui/StatusBadge';
import {MessageDetailModal} from './MessageDetailModal';
import styles from './MessagesTable.module.css';

// Define the features this table uses
const features = tableFeatures({});

interface MessagesTableProps {
  messages: Contact[];
}

export function MessagesTable({messages}: MessagesTableProps) {
  const [selectedMessage, setSelectedMessage] = useState<Contact | null>(null);
  const [isModalOpen, setIsModalOpen] = useState(false);

  const handleViewMessage = (message: Contact) => {
    setSelectedMessage(message);
    setIsModalOpen(true);
  };

  const handleCloseModal = () => {
    setIsModalOpen(false);
    setTimeout(() => setSelectedMessage(null), 200); // Clear after animation
  };

  // Define columns
  const columns = useMemo<Array<ColumnDef<typeof features, Contact>>>(
    () => [
      {
        accessorKey: 'id',
        header: 'ID',
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
        accessorKey: 'company',
        header: 'Company',
        cell: (info) => info.getValue() || '-',
      },
      {
        accessorKey: 'status',
        header: 'Status',
        cell: (info) => <StatusBadge status={info.getValue<'new' | 'read' | 'replied'>()} />,
      },
      {
        accessorKey: 'createdAt',
        header: 'Date',
        cell: (info) => {
          const date = new Date(info.getValue<string>());
          return (
            <div className={styles.dateCell}>
              <div>{date.toLocaleDateString()}</div>
              <div className={styles.timeText}>{date.toLocaleTimeString()}</div>
            </div>
          );
        },
      },
      {
        id: 'actions',
        header: 'Actions',
        cell: (info) => (
          <button
            onClick={() => handleViewMessage(info.row.original)}
            className={styles.actionButton}
            aria-label="View message details"
          >
            View
          </button>
        ),
        size: 80,
      },
    ],
    []
  );

  // Create table instance
  const table = useTable({
    key: 'messages-table',
    features,
    columns,
    data: messages,
  });

  return (
    <>
      <div className={styles.container}>
        <div className={styles.tableWrapper}>
          <table className={styles.table}>
            <thead className={styles.thead}>
              {table.getHeaderGroups().map((headerGroup) => (
                <tr key={headerGroup.id}>
                  {headerGroup.headers.map((header) => (
                    <th key={header.id} className={styles.th}>
                      {header.isPlaceholder ? null : <table.FlexRender header={header} />}
                    </th>
                  ))}
                </tr>
              ))}
            </thead>
            <tbody className={styles.tbody}>
              {table.getRowModel().rows.map((row) => (
                <tr key={row.id} className={styles.tr}>
                  {row.getAllCells().map((cell) => (
                    <td key={cell.id} className={styles.td}>
                      <table.FlexRender cell={cell} />
                    </td>
                  ))}
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      <MessageDetailModal message={selectedMessage} isOpen={isModalOpen} onClose={handleCloseModal} />
    </>
  );
}
