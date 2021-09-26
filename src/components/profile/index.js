import {Component} from 'react'

import Loader from 'react-loader-spinner'

import Cookies from 'js-cookie'

const apiStatusConstants = {
  initial: 'INITIAL',
  success: 'SUCCESS',
  failure: 'FAILURE',
  inProgress: 'IN_PROGRESS',
}

class ProfileCard extends Component {
  state = {
    profileApiStatus: apiStatusConstants.initial,
    userDetails: [],
  }

  componentDidMount() {
    this.getUserProfile()
  }

  getUserProfile = async () => {
    this.setState({profileApiStatus: apiStatusConstants.inProgress})
    const jwtToken = Cookies.get('jwt_token')
    const apiUrl = 'https://apis.ccbp.in/profile'
    const options = {
      headers: {
        Authorization: `Bearer ${jwtToken}`,
      },
      method: 'GET',
    }
    const response = await fetch(apiUrl, options)
    const data = await response.json()
    const nd = [data.profile_details]

    if (response.ok === true) {
      const formattedUser = nd.map(each => ({
        name: each.name,
        profileImageUrl: each.profile_image_url,
        shortBio: each.short_bio,
      }))
      this.setState({
        userDetails: formattedUser,
        profileApiStatus: apiStatusConstants.success,
      })
    } else {
      this.setState({profileApiStatus: apiStatusConstants.failure})
    }
  }

  userProfile = () => {
    const {userDetails} = this.state

    return (
      <div className="userProfile">
        <img alt="profile" src={userDetails[0].profileImageUrl} />
        <h1>{userDetails[0].name}</h1>
        <p>{userDetails[0].shortBio}</p>
      </div>
    )
  }

  onReTryProfile = () => {
    this.getUserProfile()
  }

  renderProfileFailure = () => (
    <div>
      <button className="logoutBtn" onClick={this.onReTryProfile} type="button">
        Retry
      </button>
    </div>
  )

  renderProfile = () => {
    const {profileApiStatus} = this.state
    switch (profileApiStatus) {
      case apiStatusConstants.success:
        return this.userProfile()
      case apiStatusConstants.inProgress:
        return (
          <div className="loader-container" testid="loader">
            <Loader type="ThreeDots" color="#ffff" height="50" width="50" />
          </div>
        )
      case apiStatusConstants.failure:
        return this.renderProfileFailure()
      default:
        return null
    }
  }

  render() {
    return <div>{this.renderProfile()}</div>
  }
}

export default ProfileCard
