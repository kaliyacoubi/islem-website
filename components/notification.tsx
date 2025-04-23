"use client"

import { X } from "lucide-react"
import { motion } from "framer-motion"

interface NotificationProps {
  type: "success" | "error"
  message: string
  details?: string
  onClose: () => void
}

export function Notification({ type, message, details, onClose }: NotificationProps) {
  const bgColor = type === "success" ? "bg-green-500/20 border-green-500/30" : "bg-red-500/20 border-red-500/30"
  const textColor = type === "success" ? "text-green-300" : "text-red-300"

  return (
    <motion.div
      initial={{ opacity: 0, y: -10 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: -10 }}
      className={`rounded-xl p-4 mb-4 flex items-center justify-between ${bgColor}`}
    >
      <div>
        <p className={`font-bold mb-1 ${textColor}`}>{message}</p>
        {details && <p className={`text-sm ${textColor}`}>{details}</p>}
      </div>
      <button type="button" onClick={onClose} className={`${textColor} hover:opacity-70`}>
        <X className="h-5 w-5" />
      </button>
    </motion.div>
  )
}
