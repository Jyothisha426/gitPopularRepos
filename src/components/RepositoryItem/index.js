import './index.css'

const RepositoryItem = props => {
  const {repoDetails} = props
  const {avatarUrl, forksCount, issuesCount, name, starsCount} = repoDetails
  return (
    <li className="each-repo">
      <img src={avatarUrl} alt={name} className="avatar-img" />
      <h1 className="name">{name}</h1>
      <div className="sub-container">
        <img
          src="https://assets.ccbp.in/frontend/react-js/stars-count-img.png"
          className="star"
          alt="stars"
        />
        <p className="count">{starsCount}</p>
      </div>
      <div className="sub-container">
        <img
          src="https://assets.ccbp.in/frontend/react-js/forks-count-img.png"
          className="star"
          alt="forks"
        />
        <p className="count">{forksCount}</p>
      </div>
      <div className="sub-container">
        <img
          src="https://assets.ccbp.in/frontend/react-js/issues-count-img.png"
          className="star"
          alt="open issues"
        />
        <p className="count">{issuesCount}</p>
      </div>
    </li>
  )
}

export default RepositoryItem
