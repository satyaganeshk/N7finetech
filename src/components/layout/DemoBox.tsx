import { useState, type FormEvent } from 'react'
import { Check, X } from 'lucide-react'

type DemoBoxProps = {
  open: boolean
  onClose: () => void
  onToast: (message: string) => void
}

type DemoFormState = {
  name: string
  email: string
  company: string
}

export default function DemoBox({ open, onClose, onToast }: DemoBoxProps) {
  const [submitted, setSubmitted] = useState(false)
  const [form, setForm] = useState<DemoFormState>({ name: '', email: '', company: '' })
  const [errors, setErrors] = useState<Partial<DemoFormState>>({})

  if (!open) return null

  const handleSubmit = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault()
    const newErrors: Partial<DemoFormState> = {}
    if (!form.name) newErrors.name = 'Required'
    if (!form.email) newErrors.email = 'Required'
    if (Object.keys(newErrors).length > 0) {
      setErrors(newErrors)
      onToast('Please fill in your name and email.')
      return
    }
    setErrors({})
    setSubmitted(true)
    window.setTimeout(() => {
      setSubmitted(false)
      setForm({ name: '', email: '', company: '' })
      onClose()
      onToast('Thanks — our team will reach out shortly.')
    }, 1800)
  }

  return (
    <div
      className="fixed inset-0 z-50 bg-[#0E1116]/85 backdrop-blur-md flex items-center justify-center p-6"
      role="dialog"
      aria-modal="true"
      aria-labelledby="demo-dialog-title"
    >
      <div className="bg-[#161B22] border border-white/10 rounded-2xl p-9 max-w-md w-full relative shadow-2xl">

        {/* Close */}
        <button
          onClick={onClose}
          aria-label="Close demo request dialog"
          className="absolute top-4 right-4 w-8 h-8 flex items-center justify-center rounded-lg text-white/35 hover:text-white/80 hover:bg-white/6 transition-all"
        >
          <X className="w-4 h-4" />
        </button>

        {/* Header */}
        <div className="mb-7">
          <p className="text-[10px] uppercase tracking-[0.22em] text-cyan font-medium mb-2">
            Request Demo
          </p>
          <h3 id="demo-dialog-title" className="text-2xl font-light text-white tracking-tight mb-1.5">
            Talk to our team
          </h3>
          <p className="text-white/45 text-[13px] font-light leading-relaxed">
            Share a few details and we'll arrange a tailored walkthrough.
          </p>
        </div>

        {submitted ? (
          <div className="py-12 flex flex-col items-center justify-center gap-3">
            <div className="w-13 h-13 rounded-full bg-[#1E5CFF]/12 border border-cyan/30 flex items-center justify-center text-cyan">
              <Check className="w-5 h-5 stroke-[2.5]" />
            </div>
            <p className="text-[12px] text-white/55 font-light">Submitting your request…</p>
          </div>
        ) : (
          <>
            <form onSubmit={handleSubmit} className="space-y-3.5">
              {/* Name */}
              <div>
                <label className="block text-[10px] uppercase tracking-[0.22em] text-white/35 font-medium mb-1.5">
                  Name
                </label>
                <input
                  type="text"
                  placeholder="Jane Doe"
                  value={form.name}
                  onChange={(e) => {
                    setForm({ ...form, name: e.target.value })
                    setErrors({ ...errors, name: undefined })
                  }}
                  className={`w-full bg-[#0E1116] border rounded-lg px-4 py-2.5 text-[13px] text-white font-light outline-none transition-all
                    placeholder:text-white/20
                    ${errors.name
                      ? 'border-red-500/60 focus:border-red-500/80 shadow-[0_0_0_2px_rgba(224,76,76,0.12)]'
                      : 'border-white/10 hover:border-white/20 focus:border-[#1E5CFF] focus:shadow-[0_0_0_2px_rgba(30,92,255,0.15)]'
                    }`}
                />
              </div>

              {/* Email */}
              <div>
                <label className="block text-[10px] uppercase tracking-[0.22em] text-white/35 font-medium mb-1.5">
                  Work Email
                </label>
                <input
                  type="email"
                  placeholder="jane@company.com"
                  value={form.email}
                  onChange={(e) => {
                    setForm({ ...form, email: e.target.value })
                    setErrors({ ...errors, email: undefined })
                  }}
                  className={`w-full bg-[#0E1116] border rounded-lg px-4 py-2.5 text-[13px] text-white font-light outline-none transition-all
                    placeholder:text-white/20
                    ${errors.email
                      ? 'border-red-500/60 focus:border-red-500/80 shadow-[0_0_0_2px_rgba(224,76,76,0.12)]'
                      : 'border-white/10 hover:border-white/20 focus:border-[#1E5CFF] focus:shadow-[0_0_0_2px_rgba(30,92,255,0.15)]'
                    }`}
                />
              </div>

              {/* Company */}
              <div>
                <label className="block text-[10px] uppercase tracking-[0.22em] text-white/35 font-medium mb-1.5">
                  Company
                </label>
                <input
                  type="text"
                  placeholder="N7 Bank"
                  value={form.company}
                  onChange={(e) => setForm({ ...form, company: e.target.value })}
                  className="w-full bg-[#0E1116] border border-white/10 hover:border-white/20 focus:border-[#1E5CFF] focus:shadow-[0_0_0_2px_rgba(30,92,255,0.15)] rounded-lg px-4 py-2.5 text-[13px] text-white font-light outline-none transition-all placeholder:text-white/20"
                />
              </div>

              <button
                type="submit"
                className="w-full bg-[#1E5CFF] hover:bg-[#1745CC] active:scale-[0.98] text-white py-3 rounded-lg text-[11px] font-semibold uppercase tracking-[0.18em] transition-all mt-1"
              >
                Request Demo
              </button>
            </form>

            {/* Divider */}
            <div className="border-t border-white/7 my-5" />
          </>
        )}
      </div>
    </div>
  )
}