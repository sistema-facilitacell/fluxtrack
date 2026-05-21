'use client'

import { useState, useRef } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import {
  User,
  Lock,
  Eye,
  EyeOff,
  ArrowRight,
  Loader2,
  AlertCircle,
  CheckCircle2,
} from 'lucide-react'

/* ── Types ─────────────────────────────────────── */
interface FormState {
  credential: string
  password:   string
  remember:   boolean
}

interface FieldError {
  credential?: string
  password?:   string
}

/* ── Validation ────────────────────────────────── */
function validate(form: FormState): FieldError {
  const errors: FieldError = {}
  if (!form.credential.trim()) {
    errors.credential = 'Informe seu usuário ou e-mail'
  }
  if (!form.password) {
    errors.password = 'Informe sua senha'
  } else if (form.password.length < 4) {
    errors.password = 'Senha muito curta'
  }
  return errors
}

export default function LoginForm() {
  const [form, setForm] = useState<FormState>({
    credential: '',
    password:   '',
    remember:   false,
  })
  const [showPass, setShowPass]   = useState(false)
  const [errors, setErrors]       = useState<FieldError>({})
  const [loading, setLoading]     = useState(false)
  const [success, setSuccess]     = useState(false)
  const [loginError, setLoginError] = useState('')

  const credRef = useRef<HTMLInputElement>(null)
  const passRef = useRef<HTMLInputElement>(null)

  /* ── Handlers ──────────────────────────────────── */
  function handleChange(field: keyof Omit<FormState, 'remember'>) {
    return (e: React.ChangeEvent<HTMLInputElement>) => {
      setForm(prev => ({ ...prev, [field]: e.target.value }))
      if (errors[field]) {
        setErrors(prev => ({ ...prev, [field]: undefined }))
      }
      if (loginError) setLoginError('')
    }
  }

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault()

    const fieldErrors = validate(form)
    if (Object.keys(fieldErrors).length > 0) {
      setErrors(fieldErrors)
      // Focus first errored field
      if (fieldErrors.credential) credRef.current?.focus()
      else if (fieldErrors.password) passRef.current?.focus()
      return
    }

    setLoading(true)
    setLoginError('')

    try {
      // Simulate async login — replace with your real auth call
      await new Promise(resolve => setTimeout(resolve, 1800))

      // Demo: reject wrong credentials
      if (form.credential !== 'admin' && form.credential !== 'admin@fluxtrack.com') {
        throw new Error('Usuário ou senha incorretos.')
      }

      setSuccess(true)
      // In a real app: router.push('/dashboard')
    } catch (err: unknown) {
      const msg = err instanceof Error ? err.message : 'Erro ao autenticar. Tente novamente.'
      setLoginError(msg)
    } finally {
      setLoading(false)
    }
  }

  /* ── Input field wrapper ───────────────────────── */
  function InputWrapper({
    id,
    label,
    icon: Icon,
    type,
    placeholder,
    value,
    onChange,
    error,
    ref: inputRef,
    rightSlot,
    autoComplete,
  }: {
    id:           string
    label:        string
    icon:         React.ElementType
    type:         string
    placeholder:  string
    value:        string
    onChange:     (e: React.ChangeEvent<HTMLInputElement>) => void
    error?:       string
    ref?:         React.RefObject<HTMLInputElement>
    rightSlot?:   React.ReactNode
    autoComplete: string
  }) {
    return (
      <div className="flex flex-col gap-1.5">
        <label htmlFor={id} className="text-xs font-semibold text-white/50 uppercase tracking-wider">
          {label}
        </label>
        <div className="relative">
          {/* Left icon */}
          <div className="absolute left-4 top-1/2 -translate-y-1/2 pointer-events-none z-10">
            <Icon
              size={16}
              style={{ color: error ? '#f87171' : 'rgba(14,165,255,0.5)' }}
            />
          </div>

          {/* Input */}
          <input
            id={id}
            ref={inputRef}
            type={type}
            placeholder={placeholder}
            value={value}
            onChange={onChange}
            autoComplete={autoComplete}
            spellCheck={false}
            disabled={loading || success}
            className="input-field pr-12"
            style={{
              borderColor: error
                ? 'rgba(248,113,113,0.5)'
                : undefined,
            }}
          />

          {/* Right slot */}
          {rightSlot && (
            <div className="absolute right-4 top-1/2 -translate-y-1/2 z-10">
              {rightSlot}
            </div>
          )}
        </div>

        {/* Error message */}
        <AnimatePresence mode="wait">
          {error && (
            <motion.div
              key="error"
              initial={{ opacity: 0, y: -4, height: 0 }}
              animate={{ opacity: 1, y: 0, height: 'auto' }}
              exit={{ opacity: 0, y: -4, height: 0 }}
              transition={{ duration: 0.2 }}
              className="flex items-center gap-1.5"
            >
              <AlertCircle size={11} className="text-red-400 flex-shrink-0" />
              <span className="text-[11px] text-red-400 font-medium">{error}</span>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    )
  }

  /* ── Render ────────────────────────────────────── */
  return (
    <form onSubmit={handleSubmit} noValidate className="flex flex-col gap-5">

      {/* ── CREDENTIAL FIELD ── */}
      <InputWrapper
        id="credential"
        label="Usuário / E-mail"
        icon={User}
        type="text"
        placeholder="Digite seu usuário ou e-mail"
        value={form.credential}
        onChange={handleChange('credential')}
        error={errors.credential}
        ref={credRef}
        autoComplete="username"
      />

      {/* ── PASSWORD FIELD ── */}
      <InputWrapper
        id="password"
        label="Senha"
        icon={Lock}
        type={showPass ? 'text' : 'password'}
        placeholder="Digite sua senha"
        value={form.password}
        onChange={handleChange('password')}
        error={errors.password}
        ref={passRef}
        autoComplete="current-password"
        rightSlot={
          <button
            type="button"
            onClick={() => setShowPass(p => !p)}
            className="text-white/30 hover:text-white/60 transition-colors"
            tabIndex={-1}
            aria-label={showPass ? 'Ocultar senha' : 'Mostrar senha'}
          >
            {showPass ? <EyeOff size={15} /> : <Eye size={15} />}
          </button>
        }
      />

      {/* ── REMEMBER + FORGOT ── */}
      <div className="flex items-center justify-between">
        {/* Remember me */}
        <label className="flex items-center gap-2.5 cursor-pointer group select-none">
          <div className="relative">
            <input
              type="checkbox"
              checked={form.remember}
              onChange={e => setForm(p => ({ ...p, remember: e.target.checked }))}
              className="sr-only"
            />
            <div
              className="w-5 h-5 rounded-md border flex items-center justify-center transition-all duration-200"
              style={{
                background:   form.remember ? 'linear-gradient(135deg,#0EA5FF,#06B6D4)' : 'rgba(8,17,32,0.8)',
                borderColor:  form.remember ? 'transparent' : 'rgba(14,165,255,0.3)',
                boxShadow:    form.remember ? '0 0 10px rgba(14,165,255,0.3)' : 'none',
              }}
            >
              <AnimatePresence>
                {form.remember && (
                  <motion.svg
                    key="check"
                    width="11" height="11"
                    viewBox="0 0 11 11"
                    initial={{ scale: 0, opacity: 0 }}
                    animate={{ scale: 1, opacity: 1 }}
                    exit={{ scale: 0, opacity: 0 }}
                    transition={{ duration: 0.15 }}
                  >
                    <polyline
                      points="2,5.5 4.5,8 9,3"
                      stroke="white"
                      strokeWidth="1.8"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      fill="none"
                    />
                  </motion.svg>
                )}
              </AnimatePresence>
            </div>
          </div>
          <span className="text-xs font-medium text-white/40 group-hover:text-white/60 transition-colors">
            Lembrar-me
          </span>
        </label>

        {/* Forgot password */}
        <button
          type="button"
          className="text-xs font-semibold transition-all duration-200"
          style={{ color: 'rgba(14,165,255,0.7)' }}
          onMouseEnter={e => (e.currentTarget.style.color = '#0EA5FF')}
          onMouseLeave={e => (e.currentTarget.style.color = 'rgba(14,165,255,0.7)')}
        >
          Esqueci minha senha?
        </button>
      </div>

      {/* ── GLOBAL LOGIN ERROR ── */}
      <AnimatePresence mode="wait">
        {loginError && (
          <motion.div
            key="login-error"
            initial={{ opacity: 0, y: -8, scale: 0.97 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: -8, scale: 0.97 }}
            transition={{ duration: 0.25 }}
            className="flex items-center gap-2.5 rounded-xl px-4 py-3"
            style={{
              background:  'rgba(248,113,113,0.08)',
              border:      '1px solid rgba(248,113,113,0.25)',
            }}
          >
            <AlertCircle size={15} className="text-red-400 flex-shrink-0" />
            <span className="text-xs text-red-400 font-medium">{loginError}</span>
          </motion.div>
        )}
      </AnimatePresence>

      {/* ── SUCCESS STATE ── */}
      <AnimatePresence mode="wait">
        {success && (
          <motion.div
            key="success"
            initial={{ opacity: 0, y: -8, scale: 0.97 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.3 }}
            className="flex items-center gap-2.5 rounded-xl px-4 py-3"
            style={{
              background: 'rgba(52,211,153,0.1)',
              border:     '1px solid rgba(52,211,153,0.3)',
            }}
          >
            <CheckCircle2 size={15} className="text-emerald-400 flex-shrink-0" />
            <span className="text-xs text-emerald-400 font-medium">
              Login efetuado! Redirecionando…
            </span>
          </motion.div>
        )}
      </AnimatePresence>

      {/* ── SUBMIT BUTTON ── */}
      <motion.button
        type="submit"
        disabled={loading || success}
        className="btn-primary"
        whileHover={!loading && !success ? { scale: 1.02, y: -2 } : {}}
        whileTap={!loading && !success ? { scale: 0.98 } : {}}
        transition={{ duration: 0.2 }}
        style={{
          opacity: loading || success ? 0.85 : 1,
          cursor:  loading || success ? 'not-allowed' : 'pointer',
        }}
      >
        <AnimatePresence mode="wait">
          {loading ? (
            <motion.span
              key="loading"
              className="flex items-center justify-center gap-2"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
            >
              <Loader2 size={16} className="animate-spin" />
              Autenticando…
            </motion.span>
          ) : success ? (
            <motion.span
              key="success"
              className="flex items-center justify-center gap-2"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
            >
              <CheckCircle2 size={16} />
              Acessando…
            </motion.span>
          ) : (
            <motion.span
              key="default"
              className="flex items-center justify-center gap-2"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
            >
              Entrar
              <ArrowRight size={16} />
            </motion.span>
          )}
        </AnimatePresence>
      </motion.button>

      {/* ── DEMO HINT ── */}
      <p className="text-center text-[10px] text-white/20 font-mono">
        Demo: usuário <span className="text-white/40">admin</span> · qualquer senha ≥4 chars
      </p>
    </form>
  )
}
