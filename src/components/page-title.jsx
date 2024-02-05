export default function PageTitle({ children }) {
  return (
    <h1 className="flex items-center text-4xl font-semibold text-center text-cyan-800 dark:text-cyan-100 gap-x-3">
      {children}
    </h1>
  )
}
