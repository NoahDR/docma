type AuthLayoutProps = Readonly<{
  children: React.ReactNode
}>

export default function AuthLayout({ children }: AuthLayoutProps) {
  return <main className="min-h-dvh">{children}</main>
}
