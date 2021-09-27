import {Component} from 'react'

import {AiFillHome} from 'react-icons/ai'
import {BsFillBagFill} from 'react-icons/bs'
import {RiLogoutBoxRFill} from 'react-icons/ri'
import {Link, withRouter} from 'react-router-dom'
import Cookies from 'js-cookie'

class Header extends Component {
  logOut = () => {
    const {history} = this.props
    Cookies.remove('jwt_token')
    history.replace('/login')
  }

  render() {
    return (
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
    )
  }
}

export default withRouter(Header)
