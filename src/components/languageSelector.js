import React from 'react'
import { useTranslation } from 'react-i18next'

const LanguageSelector = () => {
  const { t, i18n } = useTranslation()

  const changeLanguage = (event) => {
    i18n.changeLanguage(event.target.value)
  }

  return (
    <div onChange={changeLanguage}>
      <input type="radio" value="en" name="language" defaultChecked /> en
      <input type="radio" value="fr" name="language"/> fr
      <input type="radio" value="nl" name="language"/> nl
      <input type="radio" value="de" name="language"/> de
    </div>
  )
}

export default LanguageSelector