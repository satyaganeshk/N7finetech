import type { FormEvent } from 'react'
import { Send } from 'lucide-react'

type TransferModalProps = {
  target: string
  amount: string
  onTargetChange: (value: string) => void
  onAmountChange: (value: string) => void
  onSubmit: (e: FormEvent) => void
}

export function TransferModal({
  target,
  amount,
  onTargetChange,
  onAmountChange,
  onSubmit
}: TransferModalProps) {
  return (
    <form onSubmit={onSubmit} className="space-y-4">
      <div className="flex items-center gap-3 mb-2">
        <Send className="w-5 h-5 text-primary rotate-45" />
        <div>
          <h3 className="text-md font-bold text-white">Quick Fund Transfer</h3>
          <p className="text-[11px] text-white/40">Instantly wire secure assets globally.</p>
        </div>
      </div>
      <div>
        <label className="block text-[10px] font-bold text-white/40 uppercase tracking-wider mb-1.5">
          Recipient Name
        </label>
        <input
          type="text"
          required
          placeholder="e.g. Jin"
          value={target}
          onChange={(e) => onTargetChange(e.target.value)}
          className="w-full bg-white/5 border border-white/10 rounded-xl px-4 py-2.5 text-white focus:outline-none focus:border-primary text-sm"
        />
      </div>
      <div>
        <label className="block text-[10px] font-bold text-white/40 uppercase tracking-wider mb-1.5">
          Amount (USD)
        </label>
        <input
          type="number"
          required
          placeholder="e.g. 59"
          value={amount}
          onChange={(e) => onAmountChange(e.target.value)}
          className="w-full bg-white/5 border border-white/10 rounded-xl px-4 py-2.5 text-white focus:outline-none focus:border-primary text-sm"
        />
      </div>
      <button
        type="submit"
        className="w-full py-3 rounded-xl bg-gradient-to-r from-primary to-primary-dark font-semibold text-xs tracking-wider uppercase"
      >
        Confirm &amp; Send
      </button>
    </form>
  )
}
