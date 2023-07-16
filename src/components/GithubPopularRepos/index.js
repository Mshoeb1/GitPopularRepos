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

const apiUrl = 'https://apis.ccbp.in/popular-repos?language='

class GithubPopularRepos extends Component {
  state = {
    initialLanguage: 'ALL',
    isLoading: false,
    languageData: [],
    apiStatus: false,
  }

  componentDidMount() {
    this.getLanguageData(languageFiltersData[0].id)
  }

  getLanguageData = async initialLanguage => {
    this.setState({isLoading: true})
    const response = await fetch(`${apiUrl}${initialLanguage}`)
    console.log(response.status)
    const data = await response.json()
    const updatedData = data.popular_repos.map(each => ({
      name: each.name,
      id: each.id,
      issuesCount: each.issues_count,
      forksCount: each.forks_count,
      starsCount: each.stars_count,
      avatarUrl: each.avatar_url,
    }))
    this.setState({
      languageData: updatedData,
      isLoading: false,
      apiStatus: response.status,
    })
  }

  renderLoader = () => (
    <div data-testid="loader">
      <Loader type="ThreeDots" color="#0284c7" height={80} width={80} />
    </div>
  )

  renderLanguageFilterItem = () => {
    const {initialLanguage} = this.state

    return (
      <ul className="repo-filter-container">
        {languageFiltersData.map(eachLanguage => (
          <LanguageFilterItem
            key={eachLanguage.id}
            filterItemDetails={eachLanguage}
            isSelected={eachLanguage.id === initialLanguage}
            setActiveLanguageAndRepository={this.setActiveLanguageAndRepository}
          />
        ))}
      </ul>
    )
  }

  renderRepositoryItem = () => {
    const {languageData} = this.state

    return (
      <ul className="repo-item-container">
        {languageData.map(eachItem => (
          <RepositoryItem key={eachItem.id} repositoryDetails={eachItem} />
        ))}
      </ul>
    )
  }

  setActiveLanguageAndRepository = newId => {
    this.setState({initialLanguage: newId})
    this.getLanguageData(newId)
  }

  renderFailureView = () => (
    <div className="failure-container">
      <img
        src="https://assets.ccbp.in/frontend/react-js/api-failure-view.png"
        alt="failure view"
        className="failure-img"
      />
      <h1 className="failure-heading">Something Went Wrong</h1>
    </div>
  )

  renderApiStatusView = () => {
    const {apiStatus} = this.state
    if (apiStatus === 200) {
      return this.renderRepositoryItem()
    }
    return this.renderFailureView()
  }

  render() {
    const {isLoading} = this.state

    return (
      <div className="main-container">
        <div className="main-repository-container">
          <h1 className="main-heading">Popular</h1>
          {this.renderLanguageFilterItem()}
        </div>
        {isLoading ? this.renderLoader() : this.renderApiStatusView()}
      </div>
    )
  }
}

export default GithubPopularRepos
