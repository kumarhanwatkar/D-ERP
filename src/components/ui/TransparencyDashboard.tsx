import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { Eye, ExternalLink, Copy, CheckCircle, Clock, AlertCircle } from 'lucide-react';
import { GlassCard } from './GlassCard';

interface BlockchainTransaction {
  id: string;
  type: 'payroll' | 'yield' | 'deposit' | 'withdrawal';
  amount: number;
  status: 'confirmed' | 'pending' | 'failed';
  timestamp: string;
  hash: string;
  from: string;
  to: string;
  gasUsed?: number;
}

interface TransparencyDashboardProps {
  transactions?: BlockchainTransaction[];
  liveStream?: boolean;
}

const mockTransactions: BlockchainTransaction[] = [
  {
    id: '1',
    type: 'payroll',
    amount: 25.0,
    status: 'confirmed',
    timestamp: '2 minutes ago',
    hash: '0x1a2b3c4d5e6f7g8h9i0j1k2l3m4n5o6p',
    from: '0xOrgWallet...',
    to: '0xEmployeeWallet...',
    gasUsed: 0.0015,
  },
  {
    id: '2',
    type: 'yield',
    amount: 2.5,
    status: 'confirmed',
    timestamp: '1 hour ago',
    hash: '0x2b3c4d5e6f7g8h9i0j1k2l3m4n5o6p7q',
    from: '0xYieldBot...',
    to: '0xOrgWallet...',
    gasUsed: 0.002,
  },
  {
    id: '3',
    type: 'payroll',
    amount: 25.0,
    status: 'confirmed',
    timestamp: '2 hours ago',
    hash: '0x3c4d5e6f7g8h9i0j1k2l3m4n5o6p7q8r',
    from: '0xOrgWallet...',
    to: '0xEmployeeWallet...',
    gasUsed: 0.0015,
  },
  {
    id: '4',
    type: 'payroll',
    amount: 25.0,
    status: 'pending',
    timestamp: 'Just now',
    hash: '0x4d5e6f7g8h9i0j1k2l3m4n5o6p7q8r9s',
    from: '0xOrgWallet...',
    to: '0xEmployeeWallet...',
  },
];

const TransparencyDashboard: React.FC<TransparencyDashboardProps> = ({
  transactions = mockTransactions,
  liveStream = true,
}) => {
  const [copiedHash, setCopiedHash] = useState<string | null>(null);
  const [autoRefresh, setAutoRefresh] = useState(liveStream);

  useEffect(() => {
    if (!autoRefresh) return;

    const interval = setInterval(() => {
      // This would normally refetch blockchain data
      console.log('Refreshing blockchain transactions...');
    }, 5000);

    return () => clearInterval(interval);
  }, [autoRefresh]);

  const copyToClipboard = (hash: string) => {
    navigator.clipboard.writeText(hash);
    setCopiedHash(hash);
    setTimeout(() => setCopiedHash(null), 2000);
  };

  const getTransactionIcon = (type: string) => {
    switch (type) {
      case 'payroll':
        return '💰';
      case 'yield':
        return '📈';
      case 'deposit':
        return '💵';
      case 'withdrawal':
        return '🔐';
      default:
        return '📊';
    }
  };

  const getStatusIcon = (status: string) => {
    switch (status) {
      case 'confirmed':
        return <CheckCircle className="w-5 h-5 text-green-500" />;
      case 'pending':
        return <Clock className="w-5 h-5 text-yellow-500 animate-spin" />;
      case 'failed':
        return <AlertCircle className="w-5 h-5 text-red-500" />;
      default:
        return null;
    }
  };

  const stats = {
    totalTransactions: transactions.length,
    confirmed: transactions.filter((t) => t.status === 'confirmed').length,
    pending: transactions.filter((t) => t.status === 'pending').length,
    totalVolume: transactions.reduce((sum, t) => sum + t.amount, 0),
  };

  return (
    <div className="space-y-6">
      <GlassCard>
        <div className="flex items-start justify-between mb-6">
          <div className="flex items-start gap-4">
            <Eye className="w-6 h-6 text-primary flex-shrink-0 mt-1" />
            <div>
              <h3 className="text-xl font-bold mb-2">Blockchain Transparency Dashboard</h3>
              <p className="text-sm text-muted-foreground">
                Real-time view of all transactions recorded on Binance Smart Chain
              </p>
            </div>
          </div>

          <motion.button
            whileHover={{ scale: 1.05 }}
            onClick={() => setAutoRefresh(!autoRefresh)}
            className={`px-3 py-2 rounded-lg text-xs font-semibold transition-all ${
              autoRefresh
                ? 'bg-green-500/20 text-green-500 border border-green-500/30'
                : 'bg-muted text-muted-foreground border border-border'
            }`}
          >
            {autoRefresh ? '🟢 Live' : '⚪ Paused'}
          </motion.button>
        </div>

        {/* Stats */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-8">
          <div className="bg-primary/5 border border-primary/20 rounded-lg p-4">
            <p className="text-xs text-muted-foreground mb-1">Total Transactions</p>
            <p className="text-2xl font-bold">{stats.totalTransactions}</p>
          </div>
          <div className="bg-green-500/5 border border-green-500/20 rounded-lg p-4">
            <p className="text-xs text-muted-foreground mb-1">Confirmed</p>
            <p className="text-2xl font-bold text-green-500">{stats.confirmed}</p>
          </div>
          <div className="bg-yellow-500/5 border border-yellow-500/20 rounded-lg p-4">
            <p className="text-xs text-muted-foreground mb-1">Pending</p>
            <p className="text-2xl font-bold text-yellow-500">{stats.pending}</p>
          </div>
          <div className="bg-purple-500/5 border border-purple-500/20 rounded-lg p-4">
            <p className="text-xs text-muted-foreground mb-1">Total Volume</p>
            <p className="text-2xl font-bold text-purple-500">${stats.totalVolume.toFixed(2)}</p>
          </div>
        </div>

        {/* Transactions List */}
        <div className="space-y-3">
          <p className="text-sm font-semibold mb-4">Recent Transactions</p>

          {transactions.map((tx, idx) => (
            <motion.div
              key={tx.id}
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: idx * 0.05 }}
              className="flex items-center gap-4 p-4 rounded-lg border border-border hover:border-primary/50 transition-all"
            >
              {/* Icon */}
              <div className="text-2xl">{getTransactionIcon(tx.type)}</div>

              {/* Details */}
              <div className="flex-1 min-w-0">
                <div className="flex items-center gap-2 mb-1">
                  <p className="font-semibold capitalize">{tx.type}</p>
                  {getStatusIcon(tx.status)}
                  <p className="text-xs text-muted-foreground">{tx.status}</p>
                </div>

                <p className="text-xs text-muted-foreground truncate">
                  {tx.from} → {tx.to}
                </p>

                <p className="text-xs text-muted-foreground mt-1">{tx.timestamp}</p>
              </div>

              {/* Amount */}
              <div className="text-right">
                <p className="font-bold">${tx.amount.toFixed(2)}</p>
                {tx.gasUsed && (
                  <p className="text-xs text-muted-foreground">Gas: {(tx.gasUsed * 1000).toFixed(2)} mBNB</p>
                )}
              </div>

              {/* Hash Actions */}
              <div className="flex items-center gap-2">
                <motion.button
                  whileHover={{ scale: 1.1 }}
                  onClick={() => copyToClipboard(tx.hash)}
                  className="p-2 hover:bg-muted rounded-lg transition-all"
                  title="Copy hash"
                >
                  {copiedHash === tx.hash ? (
                    <CheckCircle className="w-4 h-4 text-green-500" />
                  ) : (
                    <Copy className="w-4 h-4 text-muted-foreground" />
                  )}
                </motion.button>

                <a
                  href={`https://bscscan.com/tx/${tx.hash}`}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="p-2 hover:bg-muted rounded-lg transition-all"
                  title="View on BscScan"
                >
                  <ExternalLink className="w-4 h-4 text-primary" />
                </a>
              </div>
            </motion.div>
          ))}
        </div>

        {/* Info Box */}
        <div className="mt-8 p-4 bg-blue-500/5 border border-blue-500/20 rounded-lg">
          <p className="text-xs text-muted-foreground">
            <strong>ℹ️ Blockchain Transparency:</strong> Every transaction is permanently recorded on Binance Smart
            Chain and can be verified independently on BscScan.com. No transaction can be altered or hidden. This
            ensures complete financial transparency.
          </p>
        </div>
      </GlassCard>
    </div>
  );
};

export default TransparencyDashboard;
