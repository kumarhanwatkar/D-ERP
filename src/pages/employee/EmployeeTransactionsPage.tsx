import React from 'react';
import { motion } from 'framer-motion';
import { ExternalLink, FileText } from 'lucide-react';
import { DashboardLayout } from '@/components/layout/DashboardLayout';
import { GlassCard } from '@/components/ui/GlassCard';
import { useAuth } from '@/context/AuthContext';
import { backendApi } from '@/lib/backendApi';

const transactions = [
  { id: 'TX-1051', type: 'Salary', amount: 25, status: 'Confirmed', time: '1 hour ago', hash: '0x1a2b...3c4d' },
  { id: 'TX-1050', type: 'Salary', amount: 25, status: 'Confirmed', time: '2 hours ago', hash: '0x2b3c...4d5e' },
  { id: 'TX-1049', type: 'Yield', amount: 12.5, status: 'Confirmed', time: '5 hours ago', hash: '0x3c4d...5e6f' },
  { id: 'TX-1048', type: 'Salary', amount: 25, status: 'Pending', time: '6 hours ago', hash: '0x4d5e...6f7g' },
];

const EmployeeTransactionsPage: React.FC = () => {
  const { user } = useAuth();
  const [transactionRows, setTransactionRows] = React.useState(transactions);

  React.useEffect(() => {
    if (!user) return;

    backendApi.getEmployeeTransactions(user.id).then((response) => {
      if (Array.isArray(response.transactions) && response.transactions.length > 0) {
        setTransactionRows(response.transactions.map((row: any) => ({
          id: row.id,
          type: row.type === 'salary' ? 'Salary' : row.type,
          amount: row.amount,
          status: row.status === 'confirmed' ? 'Confirmed' : row.status === 'pending' ? 'Pending' : 'Confirmed',
          time: row.time || row.timestamp,
          hash: row.txHash || row.hash,
        })));
      }
    }).catch(() => {
      setTransactionRows(transactions);
    });
  }, [user]);

  return (
    <DashboardLayout>
      <div className="space-y-6">
        <motion.div initial={{ opacity: 0, y: 16 }} animate={{ opacity: 1, y: 0 }}>
          <h1 className="text-2xl font-display font-bold">Your Transactions</h1>
          <p className="text-muted-foreground">A complete ledger of salary and yield entries.</p>
        </motion.div>

        <GlassCard className="overflow-hidden" variant="default">
          <div className="overflow-x-auto">
            <table className="w-full">
              <thead>
                <tr className="border-b border-border">
                  <th className="text-left p-4 text-sm text-muted-foreground">Transaction</th>
                  <th className="text-left p-4 text-sm text-muted-foreground">Type</th>
                  <th className="text-left p-4 text-sm text-muted-foreground">Amount</th>
                  <th className="text-left p-4 text-sm text-muted-foreground">Status</th>
                  <th className="text-left p-4 text-sm text-muted-foreground">Time</th>
                  <th className="text-left p-4 text-sm text-muted-foreground">Hash</th>
                </tr>
              </thead>
              <tbody>
                {transactionRows.map((row, index) => (
                  <motion.tr
                    key={row.id}
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: index * 0.05 }}
                    className="border-b border-border/60 hover:bg-muted/40 transition-colors"
                  >
                    <td className="p-4 font-medium">{row.id}</td>
                    <td className="p-4">{row.type}</td>
                    <td className="p-4 text-success font-semibold">+${row.amount.toFixed(2)}</td>
                    <td className="p-4">
                      <span className={`px-2 py-1 rounded-full text-xs ${row.status === 'Confirmed' ? 'bg-success/10 text-success' : 'bg-warning/10 text-warning'}`}>
                        {row.status}
                      </span>
                    </td>
                    <td className="p-4 text-muted-foreground text-sm">{row.time}</td>
                    <td className="p-4">
                      <a className="inline-flex items-center gap-1 text-primary text-sm hover:underline" href={`https://bscscan.com/tx/${row.hash}`} target="_blank" rel="noreferrer">
                        {row.hash}
                        <ExternalLink className="w-3 h-3" />
                      </a>
                    </td>
                  </motion.tr>
                ))}
              </tbody>
            </table>
          </div>
        </GlassCard>

        <GlassCard className="p-4" variant="neon" neonColor="cyan">
          <div className="flex items-center gap-2 text-sm text-muted-foreground">
            <FileText className="w-4 h-4 text-primary" />
            Exports are generated daily and include transaction IDs, block references, and settlement state.
          </div>
        </GlassCard>
      </div>
    </DashboardLayout>
  );
};

export default EmployeeTransactionsPage;
