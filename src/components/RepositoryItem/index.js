import './index.css'

const RepositoryItem = props => {
  const {repositoryDetails} = props
  const {
    name,
    issuesCount,
    forksCount,
    starsCount,
    avatarUrl,
  } = repositoryDetails

  return (
    <li className="list-repo-item">
      <img src={avatarUrl} alt={name} className="image" />
      <h1 className="card-heading">{name}</h1>
      <div className="icon-container">
        <img
          src="https://assets.ccbp.in/frontend/react-js/stars-count-img.png"
          alt="stars"
          className="icon-img"
        />
        <p className="icon-para">{starsCount} stars</p>
      </div>
      <div className="icon-container">
        <img
          src="https://assets.ccbp.in/frontend/react-js/forks-count-img.png"
          alt="forks"
          className="icon-img"
        />
        <p className="icon-para">{forksCount} forks</p>
      </div>
      <div className="icon-container">
        <img
          src="https://assets.ccbp.in/frontend/react-js/issues-count-img.png"
          alt="open issues"
          className="icon-img"
        />
        <p className="icon-para">{issuesCount} open issues</p>
      </div>
    </li>
  )
}

export default RepositoryItem
