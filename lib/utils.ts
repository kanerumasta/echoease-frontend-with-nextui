import { type ClassValue, clsx } from "clsx"
import { twMerge } from "tailwind-merge"

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs))
}


export function truncateString(str:string , length:number) {
    const dotIndex = str.indexOf(".")
    const extension = dotIndex !== -1 ? str.slice(dotIndex) : ""
    const main = dotIndex !== -1 ? str.substring(0, dotIndex) : str
    return str.length > length ? main.slice(0, length) + "..." + extension : str
}
