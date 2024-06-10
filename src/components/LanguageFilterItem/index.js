import './index.css'

const LanguageFilterItem = props => {
  const {languageFiltersData, updateActiveLanguageId, isActive} = props
  const {id, language} = languageFiltersData
  const onClickLanguage = () => {
    updateActiveLanguageId(id)
  }
  const btnStyles = isActive ? 'active-btn' : 'lang-btn'
  return (
    <li className="each-language">
      <button type="button" className={btnStyles} onClick={onClickLanguage}>
        {language}
      </button>
    </li>
  )
}

export default LanguageFilterItem
