import {Component} from 'react'
import Loader from 'react-loader-spinner'
import LanguageFilterItem from '../LanguageFilterItem'
import RepositoryItem from '../RepositoryItem'
import './index.css'

const languageFiltersData = [
  {id: 'ALL', language: 'All'},
  {id: 'JAVASCRIPT', language: 'Javascript'},
  {id: 'RUBY', language: 'Ruby'},
  {id: 'JAVA', language: 'Java'},
  {id: 'CSS', language: 'CSS'},
]

class GithubPopularRepos extends Component {
  state = {
    activeLanguageId: languageFiltersData[0].id,
    reposList: [],
    isLoading: false,
  }

  componentDidMount() {
    this.getRepos()
  }

  renderFailureView = () => (
    <div>
      <img
        src="https://assets.ccbp.in/frontend/react-js/api-failure-view.png"
        alt="failure view"
        className="failure-view"
      />
      <h1 className="failure-heading">Something went wrong</h1>
    </div>
  )

  getRepos = async () => {
    this.setState({isLoading: true})
    const {activeLanguageId} = this.state
    const apiUrl = `https://apis.ccbp.in/popular-repos?language=${activeLanguageId}`
    const response = await fetch(apiUrl)
    if (response.ok) {
      const data = await response.json()
      const updatedData = data.popular_repos.map(eachRepo => ({
        avatarUrl: eachRepo.avatar_url,
        forksCount: eachRepo.forks_count,
        id: eachRepo.id,
        issuesCount: eachRepo.issues_count,
        name: eachRepo.name,
        starsCount: eachRepo.stars_count,
      }))
      this.setState({reposList: updatedData, isLoading: false})
    } else {
      this.setState({isLoading: false}, this.renderFailureView)
    }
  }

  updateActiveLanguageId = activeLanguageId => {
    this.setState({activeLanguageId}, this.getRepos)
  }

  renderLoader = () => (
    <div data-testid="loader">
      <Loader type="ThreeDots" color="#0284c7" height={80} width={80} />
    </div>
  )

  renderRepos = () => {
    const {reposList} = this.state
    return (
      <ul className="repos-list">
        {reposList.map(eachRepo => (
          <RepositoryItem key={eachRepo.id} repoDetails={eachRepo} />
        ))}
      </ul>
    )
  }

  render() {
    const {activeLanguageId, isLoading} = this.state
    return (
      <div className="app-container">
        <h1 className="main-heading">Popular</h1>
        <ul className="languages-list">
          {languageFiltersData.map(each => (
            <LanguageFilterItem
              key={each.id}
              languageFiltersData={each}
              activeLanguageId={activeLanguageId}
              updateActiveLanguageId={this.updateActiveLanguageId}
              isActive={each.id === activeLanguageId}
            />
          ))}
        </ul>
        {isLoading ? this.renderLoader() : this.renderRepos()}
      </div>
    )
  }
}

export default GithubPopularRepos
