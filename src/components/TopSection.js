import React from 'react'
import { Link, withRouter } from 'react-router-dom'
import { connect } from 'react-redux'
import uuidv1 from 'uuid'
import axios from 'axios'

import FOLDER from '../assets/img/folder.svg'
import HOUSEIMG from '../assets/img/abuja7.jpg'
import BED from '../assets/img/bed.svg'
import BATHROOM from '../assets/img/bathroom.svg'
import Proress from './Progress'
import MapSection from './Mapsection'
import RelatedProps from './Related_Propeties'
import Gallery from '../helpers/gallery';

import BASE_URL from '../helpers/checkenv'

const PaystackPop = window.PaystackPop
const Swiper = window.Swiper

class TopSection extends React.Component {

  constructor(props) {
    super(props);
    this.demo = React.createRef()

    this.state = {
      earnedAmt: '',
      payment: '',
      paymentSlide: 1,
      duration: '6 months',
      paymentMethod: 'debitCard',
      // debitCard: false,
      // bankTransfer: false,
      directDebit: false,
      monthlyPay: 0,
      imgFolder: 'landSurvey' 
    }
    this.secondSubmit = this.secondSubmit.bind(this)
    this.handlePayment = this.handlePayment.bind(this)
    // this.handleImgChange = this.handleImgChange.bind(this)
  }

  getUserdata = async (token) => {
    const userData = await axios
      .post(`${BASE_URL}/getuserdata`, { data: token})
    return userData 
  }

  handleChange = (e) => {
    e.preventDefault()
    // console.log(e.target.checked) 
    this.setState({
      payment: {
        ...this.state.payment,
        [e.target.name]: e.target.value
      }
    })
  }

  handleImgChange = (e, type) => {
    e.preventDefault()
    this.setState({ imgFolder: type})
  }

  handleDuration = (e) => {
    e.preventDefault()
    this.setState({
      duration: e.target.value,
    })
  }

  handlePayment = (e) => {
    e.preventDefault()
    // console.log(e.target.pick)
    this.setState({
      paymentMethod: e.target.value,
    })
  }

  submitForm = async (e) => {
    e.preventDefault()
    // console.log(this.state.payment.earnedAmt)
    const { duration, monthlyPay } = this.state;
    const num = parseInt(duration)
    const paramsData = {
      path: this.props.match.path,
      id: this.props.match.params.id,
      totalAmt: this.props.prop.price,
      // numbeOfInatallmnts: this.state.payment.number_of_months || 0
      numbeOfInatallmnts: num || 0,
      purchase: this.state.purchase
    }

    const user = await this.getUserdata(this.props.token)
    const { data } = user.data
    const ref = uuidv1().replace(/-/ig, '');
    const { sub } = data
    const handler = PaystackPop.setup({
      key: 'pk_test_4f422488a9113a0d123253f3733e3aa108ad9f40',
      email: sub,
      amount: parseInt(parseInt(monthlyPay) || this.props.prop.price) * 100,
      currency: "NGN",
      ref: ref, // generates a pseudo-unique reference. Please replace with a reference you generated. Or remove the line entirely so our API will generate one for you,
      metadata: {
        custom_fields: [
          {
            transaction_id: uuidv1()
          }
        ]
     },      
      callback: function(response){
        // alert('success. transaction ref is ' + response.reference);
        axios
          .post(`${BASE_URL}/users/payments`, { response: response, data:paramsData }, data)
      },
      onClose: function(){
        // alert('window closed');
      }
    });
    handler.openIframe();
  }

  showMonthCard() {
    return (
        <div className="inner__main--2">
        <div className="inner__pay">
        <div id="month">
        <p className="inner__pick inner__pick--title">PICK MONTHS</p>
        <form className="radio-container">
          <div className="radiobtn">
            <input
              type="radio"
              id="6 months" 
              name="pick" 
              value="6 months"
              onChange={this.handleDuration} 
              checked={this.state.duration === "6 months"}
            />
            <label htmlFor="6 months">
              <p className="radiobtn__text">6 months</p>
            </label>
          </div>
      
          <div className="radiobtn">
            <input
              type="radio"
              id="12 months"
              name="pick"
              value="12 months"
              onChange={this.handleDuration}
              checked={this.state.duration === "12 months"}
            />
            <label htmlFor="12 months">
              <p className="radiobtn__text">12 months</p>
            </label>
          </div>
      
          <div className="radiobtn">
            <input
              type="radio"
              id="18 months"
              name="pick"
              value="18 months"
              onChange={this.handleDuration}
              checked={this.state.duration === "18 months"}
            />
            <label htmlFor="18 months">
              <p className="radiobtn__text">18 months</p>
            </label>
          </div>
      
          <button className="btn btn__inner" id="payOpt" onClick={e => this.thirdSubmit(e)}>Next</button>
        </form>
        </div>
        </div>
        </div>
      )
  }

  showPaymentCard = () => {
    return (
      <div className="inner__main--2">
      <div className="inner__pay">
      <div id="payment">
      <p className="inner__pick inner__pick--title">PICK MONTHS</p>
      <p className="inner__pick inner__pick--heading">₦{parseInt(this.state.monthlyPay).toLocaleString()} Monthly</p>
      <form className="radio-container">
        <div className="radiobtn">
          <input
          type="radio"
          id="card"
          name="pick"
          value="debitCard"
          onChange={this.handlePayment}
          checked={this.state.paymentMethod === "debitCard"}
          />
          <label htmlFor="card">
            <p className="radiobtn__text">CREDIT/ DEBIT CARD</p>
          </label>
        </div>

        <div className="radiobtn">
          <input
          type="radio"
          id="bank"
          name="pick"
          value="bankTransfer"
          onChange={this.handlePayment}
          checked={this.state.paymentMethod === "bankTransfer"}
          />
          <label htmlFor="bank">
            <p className="radiobtn__text">BANK TRANSFER</p>
          </label>
        </div>

        <p className="inner__deduct">
          Do you want the money to be deducted monthly
        </p>
        <div className="inner__direct">
          <input type="checkbox" name="directDebit" id="direct" value="directDebit" className="radio__direct" />
          <label htmlFor="direct">Direct debit</label>
        </div>

        <button className="btn btn__inner" id="cardDet" onClick={e => this.fourthSubmit(e)}>Next</button>
      </form>
      </div>
      </div>
      </div>
    )
  }

  showCardDetailsCard = () => {
    return (
      <div id="card__details" style="display: none;">
      <p className="inner__pick inner__pick--title">CARD DETAILS</p>
      <p className="inner__pick inner__pick--heading">₦5,000 Monthly</p>
      <form className="signup__forms__container">
        <div className="input w100">
          <label htmlFor="card-no" className="input__label">Card number</label>
          <input required type="number" className="input__field" name="card-no" id="card-no" />
          <small className="input__error" style="display: none">Card number invalid</small>
        </div>
        <div className="input">
          <label htmlFor="valid" className="input__label">Valid thru</label>
          <input required type="month" id="valid" name="valid" className="input__field" />
        </div>
        <div className="input">
          <label htmlFor="cvv" className="input__label">CVV</label>
          <input required type="number" id="cvv" name="cvv" className="input__field" />
        </div>
      </form>
      <button className="btn btn__inner" id="cardPay">Pay</button>
      </div>
    )
  }

  showBankDetialsCard = () => {
    return (
      <div id="bank__details" style="display: none;">
      <p className="inner__pick inner__pick--title">BANK DETAILS</p>
      <p className="inner__pick inner__pick--heading">₦5,000 Monthly</p>
      <div className="inner__details">
        <p className="details__title">Bank</p>
        <p className="details__text">First Bank PLC</p>
        <p className="details__title">Account Name</p>
        <p className="details__text">Lofty Heights Limited</p>
        <p className="details__title">Account Number</p>
        <p className="details__text">0122552117</p>
        <button className="btn btn__inner" id="bankPay">Next</button>
      </div>
      </div>
    )
  }

/* <div id="card__payed" style="display: none;">
  <div className="inner__payed">
    <svg className="inner__svg" width="30%" height="30%" viewBox="0 0 128 128" fill="none"
      xmlns="http://www.w3.org/2000/svg">
      <path
        d="M37.76 51.84L28.8 60.8L57.6 89.6L121.6 25.6L112.64 16.64L57.6 71.68L37.76 51.84ZM115.2 64C115.2 92.16 92.16 115.2 64 115.2C35.84 115.2 12.8 92.16 12.8 64C12.8 35.84 35.84 12.8 64 12.8C69.12 12.8 73.6 13.44 78.08 14.72L88.3203 4.48C80.64 1.92 72.32 0 64 0C28.8 0 0 28.8 0 64C0 99.2 28.8 128 64 128C99.2 128 128 99.2 128 64H115.2Z"
        fill="#6FCF97" />
    </svg>
    <p className="inner__sucess">Payment Successful</p>
  </div>
</div>
<div id="bank__payed" style="display: none;">
  <div className="inner__payed">
    <svg className="inner__svg" width="30%" height="30%" viewBox="0 0 128 128" fill="none"
      xmlns="http://www.w3.org/2000/svg">
      <path
        d="M37.76 51.84L28.8 60.8L57.6 89.6L121.6 25.6L112.64 16.64L57.6 71.68L37.76 51.84ZM115.2 64C115.2 92.16 92.16 115.2 64 115.2C35.84 115.2 12.8 92.16 12.8 64C12.8 35.84 35.84 12.8 64 12.8C69.12 12.8 73.6 13.44 78.08 14.72L88.3203 4.48C80.64 1.92 72.32 0 64 0C28.8 0 0 28.8 0 64C0 99.2 28.8 128 64 128C99.2 128 128 99.2 128 64H115.2Z"
        fill="#6FCF97" />
    </svg>
    <p className="inner__sucess">Thank You</p>
    <p className="inner__sucess--sub">The property will added to your dashboard once approved</p>
  </div>
</div> */

  calEarnedAmt = (e) => {
    e.preventDefault()
    this.setState({
      earnedAmt: (parseInt(this.props.prop.price)/this.state.duration).toLocaleString(),
      payment: {
        ...this.state.payment,
        earnedAmt: (parseInt(this.props.prop.price)/this.state.duration).toFixed(2),
        [e.target.name]: this.state.duration
      }
    })
  }

  myFunction = (e) => {
    e.preventDefault()

    var x = this.demo.current
    if (x.className.indexOf("show") == -1) {
      x.className += " show";
    } else {
      x.className = x.className.replace(" show", "");
    }
    const { path } = this.props.match

    if(path == ''){

    }
  }

  secondSubmit = e => {
    e.preventDefault()
    this.setState({
      paymentSlide: this.state.paymentSlide + 1,
    })
  }

  thirdSubmit = e => {
    e.preventDefault();
    const { duration } = this.state;
    const propertyPrice = this.props.prop.price;
    // const num = parseInt(propertyPrice)
    // console.log(duration)
    this.setState({
      monthlyPay: (parseInt(this.props.prop.price)/parseInt(duration)).toFixed(2),
      paymentSlide: this.state.paymentSlide + 1,
    })
  }

  fourthSubmit = e => {
    e.preventDefault();
    const { duration, paymentMethod, directDebit, monthlyPay } = this.state;
    const num = parseInt(duration)
    console.log(monthlyPay)
    if (paymentMethod === 'debitCard') {
      // this.setState({
      //   earnedAmt: (parseInt(this.props.prop.price)/this.state.duration).toLocaleString(),
      //   payment: {
      //     ...this.state.payment,
      //     earnedAmt: (parseInt(this.props.prop.price)/this.state.duration).toFixed(2),
      //     [e.target.name]: this.state.duration
      //   }
      // })
      this.submitForm(e)
    } else {
      console.log('bank transfer')
    }
  }

  showMainCard = () => {
    const { prop, match , id } = this.props
    // console.log(this.props)
    // console.log(this.state.paymentSlide)
    let section
      if (match.path !== "/invest/:id") {
        if (this.state.paymentSlide === 1 ) {         
        return (
          <div className="inner__main--2">
            <div className="inner__pay">   
            <div id="home">
              <button onClick={this.myFunction} className="inner__dropdown">
                Buy a home
              </button>
              <Link to={`/invest/${id}`}>
                <div ref={this.demo} id="Demo" className="inner__dropdown__content">
                  <p>Invest in a home</p>
                </div>
              </Link>
              <p className="inner__pay-title">‎₦{ prop ? parseInt(prop.price, 10).toLocaleString() : null }</p>
              <p className="inner__pay-sub">Initial Deposit: ₦1,000,000</p>
              <p className="inner__pay-info">
                Note: Your initial deposit is non-refundable
              </p>
              {/* <p className="inner__pay-sub">Amount to be earned ‎₦ { this.state.earnedAmt == 'Infinity' ? 0 : this.state.earnedAmt }</p> */}
              {/* <p className="inner__pay-sub">Number of Months:</p>
              <input 
                type="number" 
                className="input__field" 
                placeholder="months"
                onKeyUp={this.calEarnedAmt}
                onChange={ this.calEarnedAmt }
                name="number_of_months"
                style={{width: '20%'}}
                required
              />                     */}
              <p className="inner__pay-discount">
                <a href="#" className="inner__pay-link">
                  Get 20% discount by using Riby Cobanking
                  <span className="inner__pay-arrow">&#8594;</span></a>
              </p>
              <div className="inner__buttons">
              <button onClick={this.submitForm} className="btn btn__inner">Pay</button>
              
              <button id="payIst" className="btn btn__inner btn__inner--install" onClick={e => this.secondSubmit(e)}>
                  Pay Installmentally
                </button>
              </div>
            </div>




            </div>
          </div>              
        )
      } else if (this.state.paymentSlide === 2) {
        return this.showMonthCard()
      } else if (this.state.paymentSlide === 3) {
        return this.showPaymentCard()
      }
    }else {
      return (
        <div className="inner__main--2">
          <div className="inner__pay">
            <button onClick={this.myFunction} className="inner__dropdown">
              Invest in a home
            </button>
            <Link to={`/flats/${id}`}>
              <div ref={this.demo} id="Demo" className="inner__dropdown__content">
                <p>Buy a home</p>
              </div>
            </Link>
            <p className="inner__pay-title">‎₦{parseInt(prop.price, 10).toLocaleString()}</p>
            <p className="inner__pay-sub">Amount to be earned ‎₦{prop.price ? ((1+(prop.interest_rate/100)) * prop.price).toLocaleString() : 0}</p>
            <p className="inner__pay-sub">Rate: {prop.interest_rate}%</p>
            <p className="inner__pay-sub">Duration: { prop.invtmnt_months } months</p>
            <p className="inner__pay-discount">
              <a href="#" className="inner__pay-link"
                >Get 20% discount by using Riby Cobanking
                <span className="inner__pay-arrow">&#8594;</span></a>
            </p>
            <button onClick={this.submitForm} className="btn btn__inner">Pay</button>
          </div>
        </div>                
      )
    }

  } 
  

  render() {
    const { prop, match , id, similar} = this.props;
    
    return (
      <div>
        <section className="inner">
          <div id="paystackEmbedContainer"></div>
          <div className="inner__heading">
            <div className="inner__header">
              <h1 className="inner__title">{ prop ? prop.state : null }</h1>
              <p className="inner__subt">Lagos</p>
            </div>
          </div>
          <div className="inner__main">
          <div className="inner__main--1" style={{marginBottom: "200px"}}>
            {/* <div className="inner__main--1"> */}
              <Gallery folder={this.state.imgFolder} />
              {/* <img
                src={HOUSEIMG}
                alt="House Image"
                className="inner__main__img"
              /> */}
              {/* <div className="swiper-container gallery-top">
                <div className="swiper-wrapper">
                  <div className="swiper-slide"><img src="../assets/img/abuja7.jpg" alt="House" className="inner__img" /></div>
                  <div className="swiper-slide"><img src="../assets/img/abuja7.jpg" alt="House" className="inner__img" /></div>
                  <div className="swiper-slide"><img src="../assets/img/abuja7.jpg" alt="House" className="inner__img" /></div>
                  <div className="swiper-slide"><img src="../assets/img/abuja7.jpg" alt="House" className="inner__img" /></div>
                  <div className="swiper-slide"><img src="../assets/img/abuja7.jpg" alt="House" className="inner__img" /></div>
                  <div className="swiper-slide"><img src="../assets/img/abuja7.jpg" alt="House" className="inner__img" /></div>
                  <div className="swiper-slide"><img src="../assets/img/abuja7.jpg" alt="House" className="inner__img" /></div>
                  <div className="swiper-slide"><img src="../assets/img/abuja7.jpg" alt="House" className="inner__img" /></div>
                  <div className="swiper-slide"><img src="../assets/img/abuja7.jpg" alt="House" className="inner__img" /></div>
                  <div className="swiper-slide"><img src="../assets/img/abuja7.jpg" alt="House" className="inner__img" /></div>
                </div>

                <div className="swiper-button-next swiper-button-white"></div>
                <div className="swiper-button-prev swiper-button-white"></div>
              </div>
              <div className="swiper-container gallery-thumbs swiper-container-initialized swiper-container-horizontal swiper-container-free-mode swiper-container-thumbs">
                <div className="swiper-wrapper" style={{transform: "translate3d(-788.75px, 0px, 0px)", transitionDuration: "0ms"}}>
                  <div className="swiper-slide swiper-slide-duplicate" data-swiper-slide-index="5" style={{width: "147.75px", marginRight: "10px"}}><img src="../assets/img/abuja7.jpg" alt="House" className="inner__img" /></div>
                  <div className="swiper-slide swiper-slide-duplicate" data-swiper-slide-index="5" style={{width: "147.75px", marginRight: "10px"}}><img src="../assets/img/abuja7.jpg" alt="House" className="inner__img" /></div>
                  <div className="swiper-slide"><img src="../assets/img/abuja7.jpg" alt="House" className="inner__img" /></div>
                  <div className="swiper-slide"><img src="../assets/img/abuja7.jpg" alt="House" className="inner__img" /></div>
                  <div className="swiper-slide"><img src="../assets/img/abuja7.jpg" alt="House" className="inner__img" /></div>
                  <div className="swiper-slide"><img src="../assets/img/abuja7.jpg" alt="House" className="inner__img" /></div>
                  <div className="swiper-slide"><img src="../assets/img/abuja7.jpg" alt="House" className="inner__img" /></div>
                  <div className="swiper-slide"><img src="../assets/img/abuja7.jpg" alt="House" className="inner__img" /></div>
                  <div className="swiper-slide"><img src="../assets/img/abuja7.jpg" alt="House" className="inner__img" /></div>
                  <div className="swiper-slide"><img src="../assets/img/abuja7.jpg" alt="House" className="inner__img" />></div>
                </div>
              </div> */}
            {/* </div> */}
            </div>

              { this.showMainCard() }


          </div>
          <div className="inner__sub">
            <div className="inner__sub--1">
              <div className="inner__folders">
                <button className="inner__folder"
                onClick={e => this.handleImgChange(e, 'landSurvey')}>
                  <img src={FOLDER} alt="folder" />
                  <p className="folder">Land & survey</p>
                </button>
                <button className="inner__folder"
                onClick={e => this.handleImgChange(e, 'development')}>
                  <img src={FOLDER} alt="folder" />
                  <p className="folder">Development</p>
                </button>
                <button className="inner__folder"
                onClick={e => this.handleImgChange(e, 'completion')}>
                  <img src={FOLDER} alt="folder" />
                  <p className="folder">Completion</p>
                </button>
              </div>
            </div>
            <div className="inner__sub--2">
              <h4 className="features-title">Key Features</h4>
              <div className="inner__line"></div>
              <ul className="inner__list">
                <li className="inner__list__item">
                  18” kitchen/diner overlooking garden
                </li>
                <li className="inner__list__item">Fully integrated appliances</li>
                <li className="inner__list__item">
                  Fitted kitchen with soft close doors and drawers
                </li>
                <li className="inner__list__item">Beatiful tiling to bathroom</li>
                <li className="inner__list__item">Two parking spaces</li>
                <li className="inner__list__item">Excellent transport links</li>
              </ul>
            </div>
          </div>
          <div className="inner__detail">
            <div className="inner__detail--1">
              <h4 className="features-title">Details</h4>
              <div className="inner__line"></div>
              <p className="features-paragraph">
                The property is a four-bedroom home at 1087 Sq. Ft., it boasts a
                master bedroom with ensuite, south-east facing garden, extensive
                storage, 18ft kitchen/diner with integrated appliances, the bathroom
                has a beautiful tiling and aluminium taps and shower and two side by
                side parking spaces. Yaba bus stop is only 100 metres away and the
                property has been carefully designed with todays lifestyle in mind.
                Inviting landscaped gardens to give a welcoming feel, and the
                well-proportioned apartments will make you instantly feel at home.
              </p>
            </div>
            <div className="inner__detail--2">
              <div className="inner__features">
                <div className="inner__feature">
                  <img src={BED} alt="Bed" />
                  <p className="features-sub">{ this.props ? prop.number_of_bedrooms : null }</p>
                </div>
                <div className="inner__feature">
                  <img src={BATHROOM} alt="Bath" />
                  <p className="features-sub">{ this.props ? prop.nob : null }</p>
                </div>
              </div>
            </div>
          </div>
        </section>
        <Proress />
        <MapSection />  
        <RelatedProps props={similar}/>        
      </div>
    )    
  }
}

const mapStateToProps = (state) => {
  return {
    token: state.signInToken.signedIn
  }
}

export default connect(mapStateToProps)(withRouter(TopSection))
