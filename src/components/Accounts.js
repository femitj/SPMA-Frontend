import React from 'react'
import { Redirect } from 'react-router-dom'
import { connect } from 'react-redux'
import axios from 'axios'

import { showLoader, hideLoader } from '../helpers/loader'
import Header from './Navbar'
import Footer from './Footer'
import Sidenav from './Sidenav'
import AccountTable from './AccountTable'
import BASE_URL from '../helpers/checkenv'

import { getUserDetails } from '../store/actions/users'

class AccountOverview extends React.Component {

  state = {
    user: '',
    payments: [],
    token: ''
  }

  changeRoute = (route) => {
    this.props.history.push(route)
  }

  getAllPayments = async () => {
    const allPayments = await axios
      .get(`${BASE_URL}/payments`)

    // this.setState({
    //   user: allPayments.data.data
    // })
  }

  async componentDidMount() {
    showLoader()
    await this.props.getUserData(this.props.token)
    await this.getAllPayments()
  }

  componentDidUpdate(prevProps) {
    // console.log('before change', this.props.token)
    if(this.props.user !== prevProps.user) {
      hideLoader()
      this.setState({
        user: this.props.user,
        payments: this.props.user.paymentHistory
      })
    }
    // console.log('after change', this.props.user)
    if(!prevProps.token){
      // console.log(this.props.token)
      return <Redirect to='/login' />
    }
  }

  sort(data) {
		return (data.sort(function(a, b){return new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime()}))
	}

  render() {
    const { payments } = this.state;
    const newPayments = this.sort(payments);
    const PaymentHistory = newPayments.splice(0, 4)

    if(!this.props.token){
      return <Redirect to='/login' />
    }
    return (
      <div>
        <Header />
        <main className="account">
        <div className="account__nav">
          <Sidenav />
        </div>
        <div className="account__content tab-d">
          <h1 className="account__heading">Account Overview</h1>
          <div className="account__overviews">
            <div className="account__details">
              <div className="account__details__header">
                <p className="account__details__heading">ACCOUNT DETAILS</p>
              </div>
              <div className="account__details__body">
                {
                  this.state.user ? (
                    <div>
                      <p className="account__details__name">{ `${this.state.user.firstName} ${this.state.user.lastName}`}</p>
                      <p className="account__details__sub">{ `${this.state.user.email}` }</p>
                      <button onClick={ () => this.changeRoute('/password') } className="btn btn__change">CHANGE PASSWORD</button>                               
                    </div>
                  ) : (
                    <div id="spinner" style={{textAlign: 'center'}}>
                      <div className="spinner-border" role="status">
                        <span className="sr-only">Loading...</span>
                      </div>                    
                    </div> 
                  )
                }
              </div>
            </div>
            <div className="account__overview">
              <table>
                <thead>
                <tr>
                  <th>Recent Transactions</th>
                  <th>&nbsp;</th>
                  <th>&nbsp;</th>
                  <th>&nbsp;</th>
                </tr>
                {/* <tr>
                  <th>Date</th>
                  <th>Principal</th>
                  <th>Installments</th>
                  <th>Status</th>
                  <th>View</th>
                </tr>                 */}
                </thead>
                {
                  this.state.user ? (
                   <AccountTable data={PaymentHistory.length ? PaymentHistory : []}/>
                  ) : (
                    <div id="spinner" style={{textAlign: 'center', padding: '5%'}}>
                      <div className="spinner-border" role="status">
                        <span className="sr-only">Loading...</span>
                      </div>                    
                    </div>                     
                  )
                }
              </table>
            </div>
          </div>
        </div>
      </main>
      <Footer />         
      </div>
    );
  }
}

const mapStateToprops = (state) => {
  return {
    token: state.signInToken.signedIn,
    user: state.user.user
  }
}

const mapDispatchToProps = (dispatch) => {
  return {
    getUserData: (token) => dispatch(getUserDetails(token))
  }
}

export default connect(mapStateToprops, mapDispatchToProps)(AccountOverview)
