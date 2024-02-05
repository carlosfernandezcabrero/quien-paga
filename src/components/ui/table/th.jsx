export default function Th({ children, className = '' }) {
  return (
    <th className={`px-4 py-1.5 text-sm font-semibold text-left ${className}`}>
      {children}
    </th>
  )
}
