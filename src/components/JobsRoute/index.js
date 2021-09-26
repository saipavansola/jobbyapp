import {Component} from 'react'

import {Link, Redirect} from 'react-router-dom'
import {AiFillHome, AiFillStar} from 'react-icons/ai'
import {BsFillBagFill, BsSearch} from 'react-icons/bs'
import {RiLogoutBoxRFill} from 'react-icons/ri'
import {ImLocation} from 'react-icons/im'
import Loader from 'react-loader-spinner'

import Cookies from 'js-cookie'
import FilterGroup from '../filterGroup'
import ProfileCard from '../profile'

import './index.css'

const apiStatusConstants = {
  initial: 'INITIAL',
  success: 'SUCCESS',
  failure: 'FAILURE',
  inProgress: 'IN_PROGRESS',
}

const employmentTypesList = [
  {
    label: 'Full Time',
    employmentTypeId: 'FULLTIME',
  },
  {
    label: 'Part Time',
    employmentTypeId: 'PARTTIME',
  },
  {
    label: 'Freelance',
    employmentTypeId: 'FREELANCE',
  },
  {
    label: 'Internship',
    employmentTypeId: 'INTERNSHIP',
  },
]

const salaryRangesList = [
  {
    salaryRangeId: '1000000',
    label: '10 LPA and above',
  },
  {
    salaryRangeId: '2000000',
    label: '20 LPA and above',
  },
  {
    salaryRangeId: '3000000',
    label: '30 LPA and above',
  },
  {
    salaryRangeId: '4000000',
    label: '40 LPA and above',
  },
]

class Job extends Component {
  state = {
    jobsApiStatus: apiStatusConstants.initial,
    type: [],
    salary: salaryRangesList[0].salaryRangeId,
    jobsList: [],
    search: '',
  }

  componentDidMount() {
    this.getJobDetails()
  }

  getJobDetails = async () => {
    this.setState({jobsApiStatus: apiStatusConstants.inProgress})
    const {type, salary, search} = this.state
    const strType = type.join()
    const jwtToken = Cookies.get('jwt_token')
    const apiUrl = `https://apis.ccbp.in/jobs?employment_type=${strType}&minimum_package=${salary}&search=${search}`
    const options = {
      headers: {
        Authorization: `Bearer ${jwtToken}`,
      },
      method: 'GET',
    }

    const response = await fetch(apiUrl, options)
    const data = await response.json()
    if (response.ok === true) {
      const formattedDetails = data.jobs.map(each => ({
        id: each.id,
        companyLogoUrl: each.company_logo_url,
        employmentType: each.employment_type,
        jobDescription: each.job_description,
        location: each.location,
        packagePerAnnum: each.package_per_annum,
        rating: each.rating,
        title: each.title,
      }))
      this.setState({
        jobsList: formattedDetails,
        jobsApiStatus: apiStatusConstants.success,
      })
    } else {
      this.setState({jobsApiStatus: apiStatusConstants.failure})
    }
  }

  logOut = () => {
    const {history} = this.props
    Cookies.remove('jwt_token')
    history.replace('/login')
  }

  jobsList = () => {
    const {jobsList} = this.state
    if (jobsList.length === 0) {
      return (
        <div className="noJobs">
          <img
            alt="no jobs"
            src="https://assets.ccbp.in/frontend/react-js/no-jobs-img.png"
          />
          <h1>No Jobs Found</h1>
          <p>We could not find any jobs. Try other filters</p>
        </div>
      )
    }
    return (
      <ul className="JobOrder">
        {jobsList.map(each => (
          <li key={each.id}>
            <Link style={{textDecoration: 'none'}} to={`/jobs/${each.id}`}>
              <div className="jobListM">
                <div className="jobOne">
                  <img
                    width={50}
                    alt="company logo"
                    src={each.companyLogoUrl}
                  />
                  <div className="jobDetails">
                    <h1 className="jobTitle">{each.title}</h1>
                    <p>
                      <AiFillStar color="gold" /> {each.rating}
                    </p>
                  </div>
                </div>
                <div className="jobTwo">
                  <div className="jobTwoIn">
                    <p>
                      <ImLocation />
                      {each.location}
                    </p>
                    <p>
                      <BsFillBagFill />
                      {each.employmentType}
                    </p>
                  </div>
                  <p>{each.packagePerAnnum}</p>
                </div>
                <hr />
                <h1 className="jobTitle">Description</h1>
                <p>{each.jobDescription}</p>
              </div>
            </Link>
          </li>
        ))}
      </ul>
    )
  }

  onReTryJob = () => {
    this.getJobDetails()
  }

  renderJobFailure = () => (
    <div>
      <img
        alt="failure view"
        src="https://assets.ccbp.in/frontend/react-js/failure-img.png"
      />
      <h1>Oops! Something Went Wrong</h1>
      <p>We cannot seem to find the page you are looking for</p>
      <button className="RetryBtn" onClick={this.onReTryJob} type="button">
        Retry
      </button>
    </div>
  )

  renderJobs = () => {
    const {jobsApiStatus} = this.state
    switch (jobsApiStatus) {
      case apiStatusConstants.success:
        return this.jobsList()
      case apiStatusConstants.inProgress:
        return (
          <div className="loader-container" testid="loader">
            <Loader type="ThreeDots" color="#ffff" height="50" width="50" />
          </div>
        )
      case apiStatusConstants.failure:
        return this.renderJobFailure()
      default:
        return null
    }
  }

  onCheck = id => {
    console.log(id)
    const {type} = this.state
    if (type.includes(id)) {
      const upType = type.filter(each => each !== id)
      this.setState({type: upType}, this.getJobDetails)
    } else {
      this.setState({type: [...type, id]}, this.getJobDetails)
    }
  }

  onSalary = id => {
    this.setState({salary: id}, this.getJobDetails)
  }

  inputSearch = event => {
    this.setState({search: event.target.value})
  }

  onSearch = () => {
    this.getJobDetails()
  }

  render() {
    const {search} = this.state
    const jwtToken = Cookies.get('jwt_token')
    if (jwtToken === undefined) {
      return <Redirect to="/login" />
    }
    return (
      <div className="joBM">
        <div className="nav">
          <Link style={{textDecoration: 'none'}} to="/">
            <img
              width={100}
              alt="website logo"
              src="https://assets.ccbp.in/frontend/react-js/logo-img.png  "
            />
          </Link>
          <div className="links">
            <Link style={{textDecoration: 'none'}} to="/">
              <h1 className="linkName">Home</h1>
            </Link>
            <Link style={{textDecoration: 'none'}} to="/jobs">
              <h1 className="linkName">Jobs</h1>
            </Link>
          </div>
          <button onClick={this.logOut} className="logoutBtn" type="button">
            LogOut
          </button>
          <div className="small">
            <Link style={{textDecoration: 'none'}} to="/">
              <AiFillHome fontSize="30px" color="white" />
            </Link>
            <Link style={{textDecoration: 'none'}} to="/jobs">
              <BsFillBagFill fontSize="30px" color="white" />
            </Link>
            <button onClick={this.logOut} className="logoutIcon" type="button">
              <RiLogoutBoxRFill fontSize="30px" color="white" />
            </button>
          </div>
        </div>
        <div className="jobsMain">
          <div className="optionsCon">
            <div className="profileCon">
              <ProfileCard />
              <hr />
            </div>
            <FilterGroup
              salaryRangesList={salaryRangesList}
              employmentTypesList={employmentTypesList}
              onCheck={this.onCheck}
              onSalary={this.onSalary}
            />
          </div>
          <div className="jobsSpace">
            <div className="search">
              <input
                className="searchInput"
                onChange={this.inputSearch}
                value={search}
                type="search"
                placeholder="Search"
              />
              <button
                className="searchBtn"
                onClick={this.onSearch}
                type="button"
                testid="searchButton"
              >
                <BsSearch color="white" className="search-icon" />
              </button>
            </div>
            <div className="jobsRender">{this.renderJobs()}</div>
          </div>
        </div>
      </div>
    )
  }
}

export default Job
