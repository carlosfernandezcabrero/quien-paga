export const contentModalStyles =
  'p-6 border rounded-md bg-gray-100 border-gray-500 text-neutral-800 dark:border-slate-500 dark:bg-slate-700 dark:text-neutral-200 max-w-[450px] w-full'

export default function Modal({ children }) {
  return (
    <div className="absolute top-0 bottom-0 left-0 flex items-center justify-center w-full bg-neutral-400/50 dark:bg-neutral-950/40">
      <div className={contentModalStyles}>{children}</div>
    </div>
  )
}
