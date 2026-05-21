import React, { useEffect, useState } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { motion } from 'framer-motion';
import { Menu, X, Wallet, ChevronDown, LogOut, User, Sun, Moon } from 'lucide-react';
import { useWeb3 } from '@/context/Web3Context';
import { useAuth } from '@/context/AuthContext';
import { NeonButton } from '@/components/ui/NeonButton';
import { cn } from '@/lib/utils';
import { applyTheme, type Theme } from '@/lib/theme';

const navLinks = [
  { name: 'Home', path: '/' },
  { name: 'How It Works', path: '/how-it-works' },
  { name: 'Pricing', path: '/pricing' },
  { name: 'ROI Calculator', path: '/roi-calculator' },
  { name: 'Use Cases', path: '/use-cases' },
  { name: 'Features', path: '/features' },
  { name: 'Security', path: '/security' },
  { name: 'Compliance', path: '/compliance' },
  { name: 'About', path: '/about' },
];

export const Navbar: React.FC = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [showDropdown, setShowDropdown] = useState(false);
  const [theme, setTheme] = useState<Theme>('light');
  const location = useLocation();
  const { account, isConnected, connectWallet, disconnectWallet, balance } = useWeb3();
  const { user, isAuthenticated, logout } = useAuth();

  useEffect(() => {
    const activeTheme = document.documentElement.getAttribute('data-theme');
    setTheme(activeTheme === 'dark' ? 'dark' : 'light');

    const handleThemeChange = (event: Event) => {
      const customEvent = event as CustomEvent<Theme>;
      if (customEvent.detail) {
        setTheme(customEvent.detail);
      }
    };

    window.addEventListener('themechange', handleThemeChange);
    return () => window.removeEventListener('themechange', handleThemeChange);
  }, []);

  const truncateAddress = (address: string) => {
    return `${address.slice(0, 6)}...${address.slice(-4)}`;
  };

  const handleLogout = () => {
    logout();
    disconnectWallet();
    setShowDropdown(false);
  };

  const handleThemeToggle = () => {
    const nextTheme: Theme = theme === 'dark' ? 'light' : 'dark';
    applyTheme(nextTheme);
  };

  return (
    <nav className="fixed top-0 left-0 right-0 z-50 border-b border-border/60 bg-background/75 backdrop-blur-2xl shadow-[0_12px_32px_hsl(222_40%_10%/0.06)]">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex min-h-[84px] md:min-h-[88px] flex-wrap items-center justify-between gap-3 py-2 lg:flex-nowrap">
          {/* Logo */}
          <Link to="/" className="flex shrink-0 items-center gap-2">
            <motion.div
              className="w-10 h-10 rounded-2xl bg-gradient-to-br from-primary via-primary/95 to-secondary flex items-center justify-center shadow-[0_14px_30px_hsl(217_91%_60%/0.22)]"
              whileHover={{ scale: 1.05 }}
            >
              <span className="text-primary-foreground font-bold text-xl">D</span>
            </motion.div>
            <div className="leading-tight">
              <span className="font-display text-xl font-bold gradient-text block">D-ERP</span>
              <span className="text-[0.68rem] uppercase tracking-[0.26em] text-muted-foreground">Payroll • Yield • Transparency</span>
            </div>
          </Link>

          {/* Desktop Navigation */}
          <div className="hidden md:flex min-w-0 flex-1 flex-wrap items-center justify-center gap-1.5 rounded-full border border-border/60 bg-card/70 px-1.5 py-1.5 backdrop-blur-md shadow-[0_12px_30px_hsl(222_40%_10%/0.06)]">
            {navLinks.map((link) => (
              <Link
                key={link.path}
                to={link.path}
                className={cn(
                  'nav-pill',
                  location.pathname === link.path ? 'nav-pill-active' : 'nav-pill-inactive'
                )}
                aria-current={location.pathname === link.path ? 'page' : undefined}
              >
                {link.name}
              </Link>
            ))}
          </div>

          {/* Wallet & Auth */}
          <div className="hidden md:flex shrink-0 items-center gap-3">
            {isAuthenticated && user ? (
              <>
                <button
                  type="button"
                  onClick={handleThemeToggle}
                  className="inline-flex h-11 w-11 items-center justify-center rounded-full border border-border/70 bg-card/80 text-foreground shadow-[0_10px_22px_hsl(222_40%_20%/0.08)] backdrop-blur-md transition-all duration-200 hover:-translate-y-0.5 hover:border-primary/30 hover:bg-primary/5 hover:shadow-[0_14px_30px_hsl(222_40%_20%/0.12)] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 focus-visible:ring-offset-background"
                  aria-label={theme === 'dark' ? 'Switch to light theme' : 'Switch to dark theme'}
                  title={theme === 'dark' ? 'Switch to light theme' : 'Switch to dark theme'}
                >
                  {theme === 'dark' ? <Sun className="h-4 w-4" /> : <Moon className="h-4 w-4" />}
                </button>
                <div className="relative">
                  <button
                    onClick={() => setShowDropdown(!showDropdown)}
                    className="flex items-center gap-3 rounded-full border border-border/60 bg-card/80 px-3 py-2 shadow-sm backdrop-blur-md transition-all hover:-translate-y-0.5 hover:border-primary/30 hover:bg-primary/5"
                  >
                    <div className="w-8 h-8 rounded-full bg-gradient-to-br from-primary to-secondary flex items-center justify-center shadow-[0_10px_20px_hsl(217_91%_60%/0.22)]">
                      <User className="w-4 h-4 text-primary-foreground" />
                    </div>
                    <div className="text-left">
                      <p className="text-sm font-medium">{user.name}</p>
                      <p className="text-xs text-muted-foreground capitalize">{user.role}</p>
                    </div>
                    <ChevronDown className="w-4 h-4 text-muted-foreground" />
                  </button>

                  {showDropdown && (
                    <motion.div
                      initial={{ opacity: 0, y: 10 }}
                      animate={{ opacity: 1, y: 0 }}
                      className="absolute right-0 top-full mt-3 w-72 rounded-2xl border border-border/70 bg-card/90 p-4 shadow-[0_20px_50px_hsl(222_40%_10%/0.16)] backdrop-blur-2xl"
                    >
                      <div className="mb-4 pb-4 border-b border-border">
                        <p className="text-sm text-muted-foreground">Wallet Balance</p>
                        <p className="text-lg font-bold text-primary">{balance} BNB</p>
                        <p className="text-xs text-muted-foreground mt-1">
                          {account && truncateAddress(account)}
                        </p>
                      </div>
                      <Link
                        to={user.role === 'admin' ? '/admin' : '/employee'}
                        className="flex items-center gap-2 rounded-xl px-3 py-2 transition-all hover:bg-primary/5 hover:text-primary"
                        onClick={() => setShowDropdown(false)}
                      >
                        <User className="w-4 h-4" />
                        <span>Dashboard</span>
                      </Link>
                      <button
                        onClick={handleLogout}
                        className="mt-2 w-full flex items-center gap-2 rounded-xl px-3 py-2 text-destructive transition-all hover:bg-destructive/10"
                      >
                        <LogOut className="w-4 h-4" />
                        <span>Logout</span>
                      </button>
                    </motion.div>
                  )}
                </div>
              </>
            ) : (
              <>
                {isConnected ? (
                  <div className="flex items-center gap-2 rounded-full border border-border/60 bg-card/80 px-4 py-2 shadow-sm">
                    <div className="w-2 h-2 rounded-full bg-success" />
                    <span className="text-sm font-medium">{truncateAddress(account!)}</span>
                  </div>
                ) : null}
                <button
                  type="button"
                  onClick={handleThemeToggle}
                  className="inline-flex h-11 w-11 items-center justify-center rounded-full border border-border/70 bg-card/80 text-foreground shadow-[0_10px_22px_hsl(222_40%_20%/0.08)] backdrop-blur-md transition-all duration-200 hover:-translate-y-0.5 hover:border-primary/30 hover:bg-primary/5 hover:shadow-[0_14px_30px_hsl(222_40%_20%/0.12)] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 focus-visible:ring-offset-background"
                  aria-label={theme === 'dark' ? 'Switch to light theme' : 'Switch to dark theme'}
                  title={theme === 'dark' ? 'Switch to light theme' : 'Switch to dark theme'}
                >
                  {theme === 'dark' ? <Sun className="h-4 w-4" /> : <Moon className="h-4 w-4" />}
                </button>
                <Link to="/login" className="shrink-0">
                  <NeonButton size="sm">
                    <Wallet className="w-4 h-4 mr-2" />
                    {isConnected ? 'Login' : 'Connect Wallet'}
                  </NeonButton>
                </Link>
              </>
            )}
          </div>

          {/* Mobile Menu Button */}
          <div className="md:hidden flex items-center gap-2">
            <button
              type="button"
              onClick={handleThemeToggle}
              className="p-2.5 rounded-full border border-border/70 bg-card/80 shadow-sm transition-all hover:-translate-y-0.5 hover:border-primary/30 hover:bg-primary/5"
              aria-label={theme === 'dark' ? 'Switch to light theme' : 'Switch to dark theme'}
            >
              {theme === 'dark' ? <Sun className="w-5 h-5" /> : <Moon className="w-5 h-5" />}
            </button>
            <button
              className="p-2.5 rounded-full border border-border/70 bg-card/80 shadow-sm transition-all hover:-translate-y-0.5 hover:border-primary/30 hover:bg-primary/5"
              onClick={() => setIsOpen(!isOpen)}
            >
              {isOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
            </button>
          </div>
        </div>

        {/* Mobile Menu */}
        {isOpen && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: 'auto' }}
            exit={{ opacity: 0, height: 0 }}
            className="md:hidden pb-4"
          >
            <div className="mt-3 flex flex-col gap-2 rounded-3xl border border-border/60 bg-card/90 p-3 shadow-[0_20px_50px_hsl(222_40%_10%/0.12)] backdrop-blur-2xl">
              {navLinks.map((link) => (
                <Link
                  key={link.path}
                  to={link.path}
                  className={cn(
                    'nav-pill justify-start px-4 py-3',
                    location.pathname === link.path ? 'nav-pill-active' : 'nav-pill-inactive'
                  )}
                  onClick={() => setIsOpen(false)}
                >
                  {link.name}
                </Link>
              ))}
              <Link to="/login" onClick={() => setIsOpen(false)}>
                <NeonButton className="w-full justify-center">
                  <Wallet className="w-4 h-4 mr-2" />
                  Connect Wallet
                </NeonButton>
              </Link>
            </div>
          </motion.div>
        )}
      </div>
    </nav>
  );
};
