import React from 'react';
import { render, screen, fireEvent, act } from '@testing-library/react';
import { describe, it, expect, vi, beforeEach, afterEach } from 'vitest';
import AIChat from './AIChat';

vi.mock('@/lib/backendApi', () => ({
  backendApi: {
    chatRespond: vi.fn(async () => ({
      reply:
        'Based on your current configuration:\n\n✅ Current Allocation: 85% locked / 15% accessible\n✅ Estimated Yield: $2,450/month at current volume',
      suggestions: [],
      timestamp: new Date().toISOString(),
    })),
  },
}));

describe('AIChat', () => {
  beforeEach(() => {
    vi.useFakeTimers();
    Object.defineProperty(HTMLElement.prototype, 'scrollTo', {
      configurable: true,
      value: vi.fn(),
    });
    Object.defineProperty(HTMLElement.prototype, 'scrollIntoView', {
      configurable: true,
      value: vi.fn(),
    });
  });

  afterEach(() => {
    vi.clearAllTimers();
    vi.useRealTimers();
    vi.restoreAllMocks();
  });

  it('opens, scrolls the conversation, and replies to a preset query', async () => {
    const onQuery = vi.fn();
    const { container } = render(<AIChat onQuery={onQuery} />);

    const launcher = container.querySelector('button.fixed.bottom-6.right-6');
    expect(launcher).not.toBeNull();
    fireEvent.click(launcher as HTMLButtonElement);

    expect(screen.getByRole('heading', { name: /D-ERP AI Assistant/i })).toBeInTheDocument();
    expect(HTMLElement.prototype.scrollTo).toHaveBeenCalled();

    fireEvent.click(screen.getByRole('button', { name: /Optimize payroll/i }));

    expect(onQuery).toHaveBeenCalledWith('Optimize payroll');

    await act(async () => {
      vi.advanceTimersByTime(800);
    });

    expect(screen.getByText(/Current Allocation:/i)).toBeInTheDocument();
    expect(HTMLElement.prototype.scrollTo).toHaveBeenCalled();
  });
});