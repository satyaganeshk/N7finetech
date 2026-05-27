type ToastProps = {
  message: string
}

export default function Toast({ message }: ToastProps) {
  return (
    <div className="fixed bottom-6 right-6 z-50 bg-[#161B22] text-white border border-white/10 border-l-2 border-l-[#1E5CFF] px-4 py-3 rounded-md shadow-2xl flex items-center gap-3">
      <div className="w-1.5 h-1.5 rounded-full bg-[#1E5CFF] animate-pulse" />
      <div>
        <p className="text-[9px] uppercase tracking-[0.22em] text-white/45 font-medium">Notification</p>
        <p className="text-[12px] font-light">{message}</p>
      </div>
    </div>
  )
}
