import './index.css'

const LanguageFilterItem = props => {
  const {filterItemDetails, isSelected, setActiveLanguageAndRepository} = props
  const {id, language} = filterItemDetails
  const styledClass = isSelected ? 'style' : 'normal'

  const onClickSelectId = () => {
    setActiveLanguageAndRepository(id)
  }

  return (
    <li className="list-content">
      <button type="button" className={styledClass} onClick={onClickSelectId}>
        {language}
      </button>
    </li>
  )
}

export default LanguageFilterItem
