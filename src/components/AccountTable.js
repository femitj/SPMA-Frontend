import React from 'react'
import { Link } from 'react-router-dom'

const AccountTable = ({ data }) => {
  let tableData;
  if(data.length < 1){
    tableData = <p style={{ textAlign: 'center' }}>No recent Transactions</p>
  }else{
    tableData = data.map((trans, index) => {
      return (
        <tr key={index}>
          <td className="payment__text phone-sx-d">{ trans.created_at.slice(0, 10) || ''}</td>
          <td className="payment__text phone-d">{trans.lga + " " + trans.state}</td>
          <td className="payment__text">{trans.paymentHistory.amount_recieved || 0}</td>
          <td className="green-color">{ trans.paymentHistory.principal - trans.paymentHistory.amount_due }</td>
          <td className="payment__text">{ trans.paymentHistory.channel || ''}</td>
          {/* <td className="green-color">
            <Link to={ 
              trans.property_id.type === 'Buy' ? 
                (`/installments/${trans.transaction_id}`)  

              : trans.property_id.type === 'Invest' && trans.installment_transactions.length ? (
                (`/installments/${trans.transaction_id}`)
              )                 

              : trans.property_id.type === 'Invest' ? (
                (`/interest/${trans.transaction_id}`)
              )
              
              : (
                (`/interest/${trans.transaction_id}`)
              )
            }>
              View</Link></td> */}
        </tr>           
      )
    })
  }
  return (
    <tbody>
      { tableData }
    </tbody> 
  )
}

export default AccountTable;
