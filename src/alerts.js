import Swal from 'sweetalert2'
import { buttonVariants } from './components/ui/button'
import { inputVariants } from './components/ui/input'

const POPUP_STYLES =
  'border bg-gray-100 border-gray-500 text-neutral-800 dark:border-slate-500 dark:bg-slate-700 dark:text-neutral-200 border-solid'
const PRIMARY_BUTTON_STYLES = `${buttonVariants.base} ${buttonVariants.variants.size.default} ${buttonVariants.variants.variant.default} shadow-none`
const DANGER_BUTTON_STYLES = `${buttonVariants.base} ${buttonVariants.variants.size.default} ${buttonVariants.variants.variant.danger} shadow-none border-solid`

export function alertError({ message }) {
  Swal.fire({
    title: 'Oops...',
    text: message,
    icon: 'error',
    confirmButtonText: 'Aceptar',
    customClass: {
      popup: POPUP_STYLES,
      confirmButton: PRIMARY_BUTTON_STYLES
    }
  })
}

export function alertDialog({
  title,
  message,
  icon = 'warning',
  confirmButtonText,
  cancelButtonText = 'Cancelar'
}) {
  return Swal.fire({
    title,
    text: message,
    icon,
    showCancelButton: true,
    confirmButtonText,
    cancelButtonText,
    customClass: {
      popup: POPUP_STYLES,
      confirmButton: DANGER_BUTTON_STYLES,
      cancelButton: PRIMARY_BUTTON_STYLES
    }
  })
}

export function alertWithInputText({ title, confirmButtonText }) {
  return Swal.fire({
    title,
    input: 'text',
    confirmButtonText,
    inputAttributes: {
      autocapitalize: 'off'
    },
    customClass: {
      popup: POPUP_STYLES,
      confirmButton: PRIMARY_BUTTON_STYLES,
      input: `${inputVariants.initial} ${inputVariants.variants.variant.default} shadow-none w-auto`
    }
  })
}
