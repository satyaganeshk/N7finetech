import type { FormEvent } from 'react'
import { Plus } from 'lucide-react'

type DepositModalProps = {
  amount: string
  onAmountChange: (value: string) => void
  onSubmit: (e: FormEvent) => void
}

export function DepositModal({ amount, onAmountChange, onSubmit }: DepositModalProps) {
  return (
    <form onSubmit={onSubmit} className="space-y-4">
      <div className="flex items-center gap-3 mb-2">
        <Plus className="w-5 h-5 text-emerald-400" />
        <div>
          <h3 className="text-md font-bold text-white">Direct Deposit</h3>
          <p className="text-[11px] text-white/40">Fund your simulation account instantly.</p>
        </div>
      </div>
      <div>
        <label className="block text-[10px] font-bold text-white/40 uppercase tracking-wider mb-1.5">
          Amount to Add (USD)
        </label>
        <input
          type="number"
          required
          placeholder="e.g. 1000"
          value={amount}
          onChange={(e) => onAmountChange(e.target.value)}
          className="w-full bg-white/5 border border-white/10 rounded-xl px-4 py-2.5 text-white focus:outline-none focus:border-primary text-sm"
        />
      </div>
      <button
        type="submit"
        className="w-full py-3 rounded-xl bg-emerald-500 hover:bg-emerald-600 font-semibold text-xs tracking-wider uppercase transition-colors"
      >
        Deposit Instantly
      </button>
    </form>
  )
}
