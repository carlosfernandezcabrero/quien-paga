export default function TableWrapper({ children, className = '' }) {
  return (
    <div
      className={`overflow-hidden rounded-md w-full mx-auto border dark:border-slate-600 border-slate-400 ${className}`}
    >
      <table className="w-full">{children}</table>
    </div>
  )
}
