export default function PageTitle({ children, className }) {
  return (
    <h1
      className={`flex items-center text-4xl font-semibold text-cyan-800 dark:text-cyan-100 gap-x-3 ${className}`}
    >
      {children}
    </h1>
  )
}
