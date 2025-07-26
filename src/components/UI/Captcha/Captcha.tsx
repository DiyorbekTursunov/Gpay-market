"use client"

import type React from "react"
import { useState, useEffect } from "react"
import { useTranslation } from "react-i18next"
import "./Captcha.scss"

interface CaptchaProps {
  onCaptchaChange: (value: string) => void
  onValidChange: (isValid: boolean) => void
  className?: string
}

const Captcha: React.FC<CaptchaProps> = ({ onCaptchaChange, onValidChange, className }) => {
  const { t } = useTranslation()
  const [question, setQuestion] = useState("")
  const [answer, setAnswer] = useState("")
  const [correctAnswer, setCorrectAnswer] = useState(0)
  const [userAnswer, setUserAnswer] = useState("")

  const generateQuestion = () => {
    const operations = ["+", "-", "*"]
    const operation = operations[Math.floor(Math.random() * operations.length)]
    const num1 = Math.floor(Math.random() * 10) + 1
    const num2 = Math.floor(Math.random() * 10) + 1

    let result = 0
    let questionText = ""

    switch (operation) {
      case "+":
        result = num1 + num2
        questionText = `${num1} + ${num2}`
        break
      case "-":
        result = Math.max(num1, num2) - Math.min(num1, num2)
        questionText = `${Math.max(num1, num2)} - ${Math.min(num1, num2)}`
        break
      case "*":
        const smallNum1 = Math.floor(Math.random() * 5) + 1
        const smallNum2 = Math.floor(Math.random() * 5) + 1
        result = smallNum1 * smallNum2
        questionText = `${smallNum1} × ${smallNum2}`
        break
    }

    setQuestion(questionText)
    setCorrectAnswer(result)
    setUserAnswer("")
    setAnswer("")
  }

  useEffect(() => {
    generateQuestion()
  }, [])

  useEffect(() => {
    const isValid = userAnswer !== "" && Number.parseInt(userAnswer) === correctAnswer
    onValidChange(isValid)
    onCaptchaChange(userAnswer)
  }, [userAnswer, correctAnswer, onValidChange, onCaptchaChange])

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value.replace(/[^0-9]/g, "")
    setUserAnswer(value)
    setAnswer(value)
  }

  const handleRefresh = () => {
    generateQuestion()
  }

  return (
    <div className={`captcha ${className || ""}`}>
      <div className="captcha__question">
        <span className="captcha__label">{t("captcha.question")}</span>
        <div className="captcha__math">
          <span className="captcha__equation">{question} = ?</span>
          <button type="button" className="captcha__refresh" onClick={handleRefresh} title={t("captcha.refresh")}>
            ↻
          </button>
        </div>
      </div>
      <input
        type="text"
        className="captcha__input"
        value={answer}
        onChange={handleInputChange}
        placeholder={t("captcha.placeholder")}
        maxLength={3}
      />
    </div>
  )
}

export default Captcha
