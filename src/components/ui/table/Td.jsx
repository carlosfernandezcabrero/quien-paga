export default function Td({ children, className = '' }) {
  return (
    <td className={`px-4 py-2 dark:text-white text-black ${className}`}>
      {children}
    </td>
  )
}
