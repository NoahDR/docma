"use client"

import Link from "next/link"
import { useEffect, useRef, useState, type ComponentType } from "react"
import { CircleAlert, Info, LoaderCircle } from "lucide-react"

import { Button } from "@/components/ui/button"
import {
  Field,
  FieldDescription,
  FieldGroup,
  FieldLabel,
  FieldSeparator,
} from "@/components/ui/field"
import { Input } from "@/components/ui/input"
import { AppLocale, LoginFormCopy, RegisterFormCopy } from "@/lib/i18n"
import { cn } from "@/lib/utils"

type SocialProvider = "microsoft" | "apple" | "google"
type FormField = "email" | "password" | "passwordConfirm"

type SocialIconProps = {
  className?: string
  "aria-hidden"?: boolean
}

type FieldErrors = Partial<Record<FormField, string>>

type LocalizedFormUi = {
  fixFields: string
  previewLogin: string
  previewRegister: string
  emailRequired: string
  emailInvalid: string
  emailTooLong: string
  passwordRequired: string
  passwordTooShort: string
  passwordTooLong: string
  passwordConfirmRequired: string
  passwordMismatch: string
}

const MAX_EMAIL_LENGTH = 254
const MAX_PASSWORD_LENGTH = 128
const REGISTER_PASSWORD_MIN_LENGTH = 8

const formUiByLocale: Record<AppLocale, LocalizedFormUi> = {
  de: {
    fixFields: "Bitte pruefe die markierten Felder und versuche es erneut.",
    previewLogin: "Vorschau-Modus: Die Anmeldung ist noch nicht mit einem Backend verbunden.",
    previewRegister: "Vorschau-Modus: Die Registrierung ist noch nicht mit einem Backend verbunden.",
    emailRequired: "Bitte gib deine geschaeftliche E-Mail ein.",
    emailInvalid: "Bitte gib eine gueltige E-Mail-Adresse ein.",
    emailTooLong: "Die E-Mail-Adresse ist zu lang.",
    passwordRequired: "Bitte gib dein Passwort ein.",
    passwordTooShort: "Verwende mindestens 8 Zeichen.",
    passwordTooLong: "Das Passwort ist zu lang.",
    passwordConfirmRequired: "Bitte bestaetige dein Passwort.",
    passwordMismatch: "Die Passwoerter stimmen nicht ueberein.",
  },
  en: {
    fixFields: "Check the highlighted fields and try again.",
    previewLogin: "Preview mode: sign-in is not connected to a backend yet.",
    previewRegister: "Preview mode: account creation is not connected to a backend yet.",
    emailRequired: "Enter your business email address.",
    emailInvalid: "Enter a valid email address.",
    emailTooLong: "This email address is too long.",
    passwordRequired: "Enter your password.",
    passwordTooShort: "Use at least 8 characters.",
    passwordTooLong: "This password is too long.",
    passwordConfirmRequired: "Confirm your password.",
    passwordMismatch: "The passwords do not match.",
  },
  it: {
    fixFields: "Controlla i campi evidenziati e riprova.",
    previewLogin: "Modalita anteprima: l'accesso non e ancora collegato a un backend.",
    previewRegister: "Modalita anteprima: la registrazione non e ancora collegata a un backend.",
    emailRequired: "Inserisci il tuo indirizzo email aziendale.",
    emailInvalid: "Inserisci un indirizzo email valido.",
    emailTooLong: "Questo indirizzo email e troppo lungo.",
    passwordRequired: "Inserisci la password.",
    passwordTooShort: "Usa almeno 8 caratteri.",
    passwordTooLong: "Questa password e troppo lunga.",
    passwordConfirmRequired: "Conferma la password.",
    passwordMismatch: "Le password non coincidono.",
  },
  fr: {
    fixFields: "Verifie les champs en surbrillance puis reessaie.",
    previewLogin: "Mode apercu : la connexion n'est pas encore reliée a un backend.",
    previewRegister: "Mode apercu : l'inscription n'est pas encore reliée a un backend.",
    emailRequired: "Saisis ton adresse e-mail professionnelle.",
    emailInvalid: "Saisis une adresse e-mail valide.",
    emailTooLong: "Cette adresse e-mail est trop longue.",
    passwordRequired: "Saisis ton mot de passe.",
    passwordTooShort: "Utilise au moins 8 caracteres.",
    passwordTooLong: "Ce mot de passe est trop long.",
    passwordConfirmRequired: "Confirme ton mot de passe.",
    passwordMismatch: "Les mots de passe ne correspondent pas.",
  },
}

const appleLogoPath =
  "M20.06 18.366c-.459 1.06-.678 1.533-1.268 2.49-.826 1.338-1.99 3.005-3.433 3.017-1.28.013-1.61-.832-3.347-.822-1.738.01-2.1.838-3.38.826-1.443-.013-2.545-1.52-3.37-2.858-2.31-3.745-2.55-8.142-1.126-10.325 1.011-1.551 2.61-2.46 4.115-2.46 1.533 0 2.496.836 3.76.836 1.227 0 1.975-.837 3.748-.837 1.342 0 2.761.73 3.77 1.99-3.32 1.821-2.782 6.59.531 8.143ZM14.468 7.83C15.115 6.991 15.606 5.807 15.428 4.646c-1.056.072-2.292.74-3.012 1.62-.649.792-1.184 1.97-.974 3.083 1.153.036 2.338-.648 3.026-1.52Z"

function MicrosoftLogo({ className, "aria-hidden": ariaHidden }: SocialIconProps) {
  return (
    <svg viewBox="2 0 22 24" preserveAspectRatio="xMinYMid meet" className={className} aria-hidden={ariaHidden}>
      <path fill="#f25022" d="M2 2h9v9H2V2Z" />
      <path fill="#7fba00" d="M13 2h9v9h-9V2Z" />
      <path fill="#00a4ef" d="M2 13h9v9H2v-9Z" />
      <path fill="#ffb900" d="M13 13h9v9h-9v-9Z" />
    </svg>
  )
}

function AppleLogo({ className, "aria-hidden": ariaHidden }: SocialIconProps) {
  return (
    <svg viewBox="2.225 0 21.775 24" preserveAspectRatio="xMinYMid meet" className={className} aria-hidden={ariaHidden}>
      <path fill="currentColor" d={appleLogoPath} />
    </svg>
  )
}

function GoogleLogo({ className, "aria-hidden": ariaHidden }: SocialIconProps) {
  return (
    <svg viewBox="28.1 0 505.4 544.3" preserveAspectRatio="xMinYMid meet" className={className} aria-hidden={ariaHidden}>
      <path
        fill="#4285f4"
        d="M533.5 278.4c0-17.4-1.4-34-4.1-50.1H272v95h147.1c-6.3 34.1-25.2 62.9-53.8 82.1v68.1h86.9c50.8-46.8 81.3-115.8 81.3-195.1Z"
      />
      <path
        fill="#34a853"
        d="M272 544.3c73.8 0 135.8-24.3 181-66l-86.9-68.1c-24.2 16.3-55.2 25.8-94.1 25.8-72.4 0-133.7-48.8-155.7-114.3H28.1v71.8C72.3 482.6 164.8 544.3 272 544.3Z"
      />
      <path
        fill="#fbbc04"
        d="M116.3 321.7a163.9 163.9 0 0 1 0-99.1v-71.8H28.1a272.1 272.1 0 0 0 0 242.7l88.2-71.8Z"
      />
      <path
        fill="#ea4335"
        d="M272 107.7c40.2 0 76.2 13.8 104.6 40.8l78.1-78.1C407.6 26.7 345.6 0 272 0 164.8 0 72.3 61.7 28.1 150.8l88.2 71.8c22-65.5 83.3-114.9 155.7-114.9Z"
      />
    </svg>
  )
}

const socialIcons: Record<SocialProvider, ComponentType<SocialIconProps>> = {
  microsoft: MicrosoftLogo,
  apple: AppleLogo,
  google: GoogleLogo,
}

const socialIconClassByProvider: Record<SocialProvider, string> = {
  microsoft: "size-4",
  apple: "size-4",
  google: "size-4",
}

type AuthFormProps =
  | {
      locale: AppLocale
      mode: "login"
      labels: LoginFormCopy
    }
  | {
      locale: AppLocale
      mode: "register"
      labels: RegisterFormCopy
    }

function isValidEmail(value: string) {
  return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(value)
}

function prefersReducedMotion() {
  return (
    typeof window !== "undefined" &&
    window.matchMedia("(prefers-reduced-motion: reduce)").matches
  )
}

function emphasizeInvalidFields(form: HTMLFormElement, fields: FormField[]) {
  if (prefersReducedMotion()) {
    return
  }

  fields.forEach((field, index) => {
    const control = form.elements.namedItem(field)

    if (!(control instanceof HTMLElement)) {
      return
    }

    const target = control.closest<HTMLElement>("[data-slot='field']") ?? control

    target.animate(
      [
        { transform: "translate3d(0, 0, 0)" },
        { transform: "translate3d(-0.4rem, 0, 0)" },
        { transform: "translate3d(0.32rem, 0, 0)" },
        { transform: "translate3d(-0.16rem, 0, 0)" },
        { transform: "translate3d(0, 0, 0)" },
      ],
      {
        duration: 420,
        delay: index * 36,
        easing: "cubic-bezier(0.22, 1, 0.36, 1)",
      }
    )
  })
}

export function AuthForm({ locale, mode, labels }: AuthFormProps) {
  const formIdPrefix = mode === "register" ? "register" : "login"
  const route = mode === "register" ? "register" : "login"
  const switchRoute = mode === "register" ? "login" : "register"
  const formUi = formUiByLocale[locale]
  const submitTimeoutRef = useRef<number | null>(null)
  const [errors, setErrors] = useState<FieldErrors>({})
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [status, setStatus] = useState<null | { tone: "info" | "error"; message: string }>(null)

  const providers: Array<{ provider: SocialProvider; label: string }> = [
    { provider: "microsoft", label: labels.social.microsoft },
    { provider: "apple", label: labels.social.apple },
    { provider: "google", label: labels.social.google },
  ]

  useEffect(() => {
    return () => {
      if (submitTimeoutRef.current !== null) {
        window.clearTimeout(submitTimeoutRef.current)
      }
    }
  }, [])

  const clearFieldError = (field: FormField) => {
    setErrors((current) => {
      if (!current[field]) {
        return current
      }

      const nextErrors = { ...current }
      delete nextErrors[field]
      return nextErrors
    })
  }

  const handleFieldChange = (field: FormField) => () => {
    clearFieldError(field)
    setStatus((current) => (current?.tone === "error" ? null : current))
  }

  const validate = (formData: FormData): FieldErrors => {
    const nextErrors: FieldErrors = {}
    const email = String(formData.get("email") ?? "").trim()
    const password = String(formData.get("password") ?? "")
    const passwordConfirm = String(formData.get("passwordConfirm") ?? "")

    if (!email) {
      nextErrors.email = formUi.emailRequired
    } else if (email.length > MAX_EMAIL_LENGTH) {
      nextErrors.email = formUi.emailTooLong
    } else if (!isValidEmail(email)) {
      nextErrors.email = formUi.emailInvalid
    }

    if (!password) {
      nextErrors.password = formUi.passwordRequired
    } else if (password.length > MAX_PASSWORD_LENGTH) {
      nextErrors.password = formUi.passwordTooLong
    } else if (mode === "register" && password.length < REGISTER_PASSWORD_MIN_LENGTH) {
      nextErrors.password = formUi.passwordTooShort
    }

    if (mode === "register") {
      if (!passwordConfirm) {
        nextErrors.passwordConfirm = formUi.passwordConfirmRequired
      } else if (password !== passwordConfirm) {
        nextErrors.passwordConfirm = formUi.passwordMismatch
      }
    }

    return nextErrors
  }

  const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault()

    if (isSubmitting) {
      return
    }

    const form = event.currentTarget
    const nextErrors = validate(new FormData(form))

    if (Object.keys(nextErrors).length > 0) {
      setErrors(nextErrors)
      setStatus({ tone: "error", message: formUi.fixFields })

      const fieldOrder: FormField[] =
        mode === "register" ? ["email", "password", "passwordConfirm"] : ["email", "password"]
      const firstInvalidField = fieldOrder.find((field) => nextErrors[field])
      const focusTarget = firstInvalidField ? form.elements.namedItem(firstInvalidField) : null

      if (focusTarget instanceof HTMLElement) {
        focusTarget.focus()
      }

      window.requestAnimationFrame(() => {
        emphasizeInvalidFields(form, fieldOrder.filter((field) => nextErrors[field]))
      })

      return
    }

    setErrors({})
    setIsSubmitting(true)
    setStatus(null)

    if (submitTimeoutRef.current !== null) {
      window.clearTimeout(submitTimeoutRef.current)
    }

    submitTimeoutRef.current = window.setTimeout(() => {
      setIsSubmitting(false)
      setStatus({
        tone: "info",
        message: mode === "register" ? formUi.previewRegister : formUi.previewLogin,
      })
    }, 450)
  }

  return (
    <form className="flex flex-col gap-4" onSubmit={handleSubmit} noValidate aria-busy={isSubmitting}>
      <div className="grid grid-cols-1 gap-2">
        {providers.map(({ provider, label }) => {
          const Icon = socialIcons[provider]

          return (
            <Button
              key={provider}
              variant="outline"
              size="default"
              className="min-h-11 w-full justify-start px-4 py-3 text-left"
              asChild
            >
              <Link href={`/${locale}/${route}?provider=${provider}`} prefetch={false}>
                <span className="flex min-w-0 items-center gap-3">
                  <span className="inline-flex size-6 shrink-0 items-center justify-center">
                    <Icon className={socialIconClassByProvider[provider]} aria-hidden />
                  </span>
                  <span className="min-w-0 whitespace-normal leading-snug">{label}</span>
                </span>
              </Link>
            </Button>
          )
        })}
      </div>

      <FieldSeparator>{labels.divider}</FieldSeparator>

      <FieldGroup className="gap-3">
        <Field className="form-field-shell" data-error-state={errors.email ? "true" : "false"}>
          <FieldLabel htmlFor={`${formIdPrefix}-email`}>{labels.email}</FieldLabel>
          <Input
            id={`${formIdPrefix}-email`}
            name="email"
            type="email"
            required
            maxLength={MAX_EMAIL_LENGTH}
            inputMode="email"
            autoCapitalize="none"
            spellCheck={false}
            autoCorrect="off"
            autoComplete="email"
            dir="ltr"
            aria-invalid={errors.email ? true : undefined}
            aria-describedby={errors.email ? `${formIdPrefix}-email-error` : undefined}
            placeholder={labels.emailPlaceholder}
            onChange={handleFieldChange("email")}
          />
          {errors.email ? (
            <FieldDescription
              id={`${formIdPrefix}-email-error`}
              role="alert"
              className="text-destructive"
            >
              {errors.email}
            </FieldDescription>
          ) : null}
        </Field>

        <Field className="form-field-shell" data-error-state={errors.password ? "true" : "false"}>
          <FieldLabel htmlFor={`${formIdPrefix}-password`}>{labels.password}</FieldLabel>
          <Input
            id={`${formIdPrefix}-password`}
            name="password"
            type="password"
            required
            minLength={mode === "register" ? REGISTER_PASSWORD_MIN_LENGTH : undefined}
            maxLength={MAX_PASSWORD_LENGTH}
            autoComplete={mode === "register" ? "new-password" : "current-password"}
            aria-invalid={errors.password ? true : undefined}
            aria-describedby={errors.password ? `${formIdPrefix}-password-error` : undefined}
            placeholder={labels.passwordPlaceholder}
            onChange={handleFieldChange("password")}
          />
          {errors.password ? (
            <FieldDescription
              id={`${formIdPrefix}-password-error`}
              role="alert"
              className="text-destructive"
            >
              {errors.password}
            </FieldDescription>
          ) : null}
        </Field>

        {mode === "register" ? (
          <Field className="form-field-shell" data-error-state={errors.passwordConfirm ? "true" : "false"}>
            <FieldLabel htmlFor={`${formIdPrefix}-password-confirm`}>
              {labels.passwordConfirm}
            </FieldLabel>
            <Input
              id={`${formIdPrefix}-password-confirm`}
              name="passwordConfirm"
              type="password"
              required
              minLength={REGISTER_PASSWORD_MIN_LENGTH}
              maxLength={MAX_PASSWORD_LENGTH}
              autoComplete="new-password"
              aria-invalid={errors.passwordConfirm ? true : undefined}
              aria-describedby={errors.passwordConfirm ? `${formIdPrefix}-password-confirm-error` : undefined}
              placeholder={labels.passwordConfirmPlaceholder}
              onChange={handleFieldChange("passwordConfirm")}
            />
            {errors.passwordConfirm ? (
              <FieldDescription
                id={`${formIdPrefix}-password-confirm-error`}
                role="alert"
                className="text-destructive"
              >
                {errors.passwordConfirm}
              </FieldDescription>
            ) : null}
          </Field>
        ) : null}
      </FieldGroup>

      <Button type="submit" size="default" className="w-full justify-center" disabled={isSubmitting}>
        {isSubmitting ? <LoaderCircle className="size-4 animate-spin" aria-hidden /> : null}
        {labels.submit}
      </Button>

      {status ? (
        <div
          aria-live="polite"
          role={status.tone === "error" ? "alert" : "status"}
          className={cn(
            "form-status-banner",
            status.tone === "error" ? "form-status-banner-error" : "form-status-banner-info"
          )}
        >
          {status.tone === "error" ? (
            <CircleAlert className="mt-0.5 size-4 shrink-0" aria-hidden />
          ) : (
            <Info className="mt-0.5 size-4 shrink-0" aria-hidden />
          )}
          <p className="min-w-0 text-sm leading-normal [overflow-wrap:anywhere] hyphens-auto">
            {status.message}
          </p>
        </div>
      ) : null}

      <FieldDescription className="text-center">{labels.hint}</FieldDescription>

      <p className="text-center text-sm leading-relaxed text-muted-foreground [overflow-wrap:anywhere] hyphens-auto">
        {labels.switch.prompt}{" "}
        <Link
          href={`/${locale}/${switchRoute}`}
          className="font-semibold text-accent transition-colors hover:text-accent/80"
        >
          {labels.switch.action}
        </Link>
      </p>
    </form>
  )
}
