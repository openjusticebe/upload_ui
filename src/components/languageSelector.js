import React from 'react'
import { useTranslation } from 'react-i18next'

const LanguageSelector = () => {
  // const { t, i18n } = useTranslation()

  const changeLanguage = (lng) => {
    i18n.changeLanguage(lng);
  }

  return (
    <ul className="float-right col-2">
    <li><button onClick={() => changeLanguage('nl')} className="btn btn-sm btn-link text-primary">nl</button></li>
    <li><button onClick={() => changeLanguage('fr')} className="btn btn-sm btn-link text-primary">fr</button></li>
    <li><button onClick={() => changeLanguage('en')} className="btn btn-sm btn-link text-primary">en</button></li>
    {/* <li><button onClick={() => changeLanguage('de')} className="btn btn-sm btn-link text-primary">de</button></li> */}
    </ul>
  )
}

export default LanguageSelector
