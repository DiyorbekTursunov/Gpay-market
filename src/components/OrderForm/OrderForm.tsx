import type React from "react"
import { useState } from "react"
import { useTranslation } from "react-i18next"
import { Button, Input } from "../UI"
import type { OrderFormProps, OrderFormData } from "../../types"
import "./OrderForm.scss"

const OrderForm: React.FC<OrderFormProps> = ({ onSubmit, isLoading, error, needsCaptcha = false }) => {
  const { t } = useTranslation()
  const [formData, setFormData] = useState<OrderFormData>({
    code: "",
    isNotRobot: false,
    captcha: "",
  })
  const [captchaValid, setCaptchaValid] = useState(false)

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()

    if (needsCaptcha && !captchaValid) {
      return
    }

    onSubmit(formData)
  }

  const handleCodeChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFormData((prev) => ({
      ...prev,
      code: e.target.value,
    }))
  }

  const handleCheckboxChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFormData((prev) => ({
      ...prev,
      isNotRobot: e.target.checked,
    }))
  }

  return (
    <form className="order-form" onSubmit={handleSubmit}>
      <h2 className="order-form__title" dangerouslySetInnerHTML={{ __html: t("orderForm.title") }} />

      <Input
        value={formData.code}
        onChange={handleCodeChange}
        placeholder={t("orderForm.placeholder")}
        fullWidth
        size="medium"
        required
        name="code"
        id="order-code"
        autoComplete="off"
      />

      <Button
        text={t("orderForm.submitButton")}
        type="submit"
        isLoading={isLoading}
        disabled={isLoading || (needsCaptcha && !captchaValid)}
        fullWidth
        variant="primary"
        size="medium"
      />

      <label className="order-form__checkbox">
        <input
          className="order-form__checkbox-input"
          type="checkbox"
          required
          checked={formData.isNotRobot}
          onChange={handleCheckboxChange}
        />
        <span className="checkmark" />
        {t("orderForm.notRobotLabel")}
      </label>

      {error && <div className="order-form__error">{error}</div>}
    </form>
  )
}

export default OrderForm
