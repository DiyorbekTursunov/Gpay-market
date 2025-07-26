import { CheckCodeError } from "../service/api/api"

export const getErrorMessage = (errorCode: CheckCodeError, t: (key: string) => string): string => {
  switch (errorCode) {
    case CheckCodeError.CODE_IS_EMPTY:
      return t("errors.codeIsEmpty")
    case CheckCodeError.CODE_INCORRECT:
      return t("errors.codeIncorrect")
    case CheckCodeError.CAPTCHA_EMPTY:
      return t("errors.captchaEmpty")
    case CheckCodeError.CAPTCHA_INCORRECT:
      return t("errors.captchaIncorrect")
    default:
      return t("errors.unknown")
  }
}
