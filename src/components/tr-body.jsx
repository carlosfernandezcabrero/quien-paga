export default function TrBody({ children }) {
  return (
    <tr className="even:bg-slate-100 dark:even:bg-slate-900 odd:bg-slate-200 dark:odd:bg-slate-800">
      {children}
    </tr>
  )
}
