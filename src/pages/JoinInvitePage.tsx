import React from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { motion } from 'framer-motion';
import { ArrowRight, Wallet } from 'lucide-react';
import { Navbar } from '@/components/layout/Navbar';
import { GlassCard } from '@/components/ui/GlassCard';
import { NeonButton } from '@/components/ui/NeonButton';
import { LightModeShapes } from '@/components/ui/LightModeShapes';

const JoinInvitePage: React.FC = () => {
  const navigate = useNavigate();
  const { inviteCode } = useParams();

  React.useEffect(() => {
    if (inviteCode) {
      navigate(`/login?invite=${inviteCode}`, { replace: true });
    }
  }, [inviteCode, navigate]);

  return (
    <div className="min-h-screen bg-background relative overflow-hidden">
      <LightModeShapes variant="public" />
      <Navbar />
      <div className="relative pt-32 pb-20 px-4 sm:px-6 lg:px-8">
        <div className="max-w-md mx-auto">
          <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} className="text-center mb-8">
            <h1 className="text-3xl font-display font-bold mb-2">Join Your Organization</h1>
            <p className="text-muted-foreground">Connecting your wallet and opening the invite flow.</p>
          </motion.div>
          <GlassCard className="p-8" variant="glow" neonColor="cyan">
            <div className="text-center space-y-6">
              <div className="w-20 h-20 mx-auto rounded-2xl bg-gradient-to-br from-primary to-secondary flex items-center justify-center">
                <Wallet className="w-10 h-10 text-primary-foreground" />
              </div>
              <p className="text-sm text-muted-foreground">
                Your invite code will be passed to the secure MetaMask wallet flow.
              </p>
              <NeonButton className="w-full" onClick={() => navigate(`/login?invite=${inviteCode || ''}`)}>
                Continue to Wallet Login
                <ArrowRight className="w-5 h-5 ml-2" />
              </NeonButton>
            </div>
          </GlassCard>
        </div>
      </div>
    </div>
  );
};

export default JoinInvitePage;
