'use client';

import {useMemo, useState} from 'react';
import {tableFeatures, useTable} from '@tanstack/react-table';
import {useQueryClient} from '@tanstack/react-query';
import type {ColumnDef} from '@tanstack/react-table';
import type {Contact} from '@/db/schema';
import type {DashboardStats} from '@/lib/api/stats';
import {StatusBadge} from '@/components/ui/StatusBadge';
import {MessageDetailModal} from './MessageDetailModal';
import sharedStyles from '@/styles/shared-table.module.css';
import customStyles from './MessagesTable.module.css';

// Define the features this table uses
const features = tableFeatures({});

interface MessagesTableProps {
  messages: Contact[];
  onStatusUpdate?: (id: number, status: 'new' | 'read' | 'replied') => Promise<void>;
}

export function MessagesTable({messages, onStatusUpdate}: MessagesTableProps) {
  const queryClient = useQueryClient();
  const [selectedMessage, setSelectedMessage] = useState<Contact | null>(null);
  const [isModalOpen, setIsModalOpen] = useState(false);

  const handleViewMessage = async (message: Contact) => {
    // Mark as read if it's currently 'new'
    if (message.status === 'new' && onStatusUpdate) {
      // Store the previous stats for potential rollback
      const previousStats = queryClient.getQueryData<DashboardStats>(['dashboardStats']);
      
      // Optimistically update the dashboard stats
      queryClient.setQueryData<DashboardStats>(['dashboardStats'], (old) => {
        if (!old) return old;
        return {
          ...old,
          messages: {
            ...old.messages,
            new: Math.max(0, old.messages.new - 1),
            read: old.messages.read + 1,
          }
        };
      });

      try {
        // Update the message status
        await onStatusUpdate(message.id, 'read');
        
        // Invalidate to ensure data consistency with the server
        queryClient.invalidateQueries({ queryKey: ['dashboardStats'] });
      } catch (error) {
        // Revert optimistic update on failure
        queryClient.setQueryData(['dashboardStats'], previousStats);
        console.error('Failed to update message status:', error);
      }
    }
    
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
            <div className={sharedStyles.dateCell}>
              <div>{date.toLocaleDateString()}</div>
              <div className={sharedStyles.timeText}>{date.toLocaleTimeString()}</div>
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
            className={sharedStyles.actionButton}
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
                <tr 
                  key={row.id} 
                  className={`${sharedStyles.tr} ${row.original.status === 'new' ? customStyles.trNew : customStyles.trRead}`}
                >
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

      <MessageDetailModal message={selectedMessage} isOpen={isModalOpen} onClose={handleCloseModal} />
    </>
  );
}
