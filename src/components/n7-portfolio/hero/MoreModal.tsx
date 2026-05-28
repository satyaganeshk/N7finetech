import { Grid, Info } from 'lucide-react'

type MoreModalProps = {
  onClose: () => void
}

export function MoreModal({ onClose }: MoreModalProps) {
  return (
    <div className="space-y-4 text-center">
      <div className="w-12 h-12 rounded-full bg-white/5 flex items-center justify-center mx-auto text-primary">
        <Grid className="w-6 h-6" />
      </div>
      <div>
        <h3 className="text-md font-bold text-white">Simulation Controller</h3>
        <p className="text-xs text-white/40 mt-1 max-w-xs mx-auto">
          Click inside either card on the right column to test live wallet values, simulated
          transactions, and filters.
        </p>
      </div>
      <div className="p-3 bg-white/5 rounded-2xl text-left border border-white/10">
        <div className="flex items-start gap-2.5">
          <Info className="w-4 h-4 text-white/40 shrink-0 mt-0.5" />
          <div>
            <p className="text-[11px] text-white/80 leading-normal">
              For local deployment, replace the string configurations in your source code with
              your local directory layout.
            </p>
          </div>
        </div>
      </div>
      <button
        onClick={onClose}
        className="w-full py-2.5 rounded-xl bg-white/5 hover:bg-white/10 transition-colors text-xs font-bold uppercase"
      >
        Close
      </button>
    </div>
  )
}
