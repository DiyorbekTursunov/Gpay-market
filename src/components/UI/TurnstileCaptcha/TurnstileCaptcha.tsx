"use client"
import { useEffect, useRef } from "react"

declare global {
  interface Window {
    turnstile: any
  }
}

const TurnstileCaptcha = ({
  siteKey,
  onSuccess,
}: {
  siteKey: string
  onSuccess: (token: string) => void
}) => {
  const captchaRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    if (!captchaRef.current || !window.turnstile) return

    const widgetId = window.turnstile.render(captchaRef.current, {
      sitekey: siteKey,
      callback: onSuccess,
      theme: "dark",
    })

    return () => {
      window.turnstile.remove(widgetId)
    }
  }, [siteKey, onSuccess])

  return <div ref={captchaRef} className="cf-turnstile" />
}

export default TurnstileCaptcha
