import React from 'react'

import DashboardContainer from './AdminPageContainer'
import axios from 'axios'
import BASE_URL from '../helpers/checkenv'

class DataTable extends React.Component{

  state = {
    properties: []
  }


 async componentDidMount() {
    const allprops = await axios.get(`${BASE_URL}/contact-us`)
    console.log(allprops.data.data)
    this.setState({
      properties: allprops.data.data
    })
    console.log(this.state.properties)
  }

  render() {

    let myTabaleData

    if (this.state.properties.length){
      myTabaleData = this.state.properties.map( tab => {
        return (
          <tr>
            <td>{tab.name}</td>
            <td>{tab.email}</td>
            <td>{tab.pnoneNumber}</td>
            <td>{tab.location}</td>
            <td>{tab.message}</td>
            <td>{tab.estimatedPropertyValue}</td>
            <td>{tab.propertyType}</td>
          </tr>
        )
      })
    }

    return (
      <DashboardContainer>
      <section class="section">

          <div class="row">
          <div class="col-lg-12">
          <div class="card">
            <div class="card-header">
              <h4>Enquiries</h4>
            </div>
            <div class="card-body">
              <div class="table-responsive">
              <table id="example" class="table table-striped table-bordered border-t0 text-nowrap w-100" >
                <thead>
                  <tr>
                    <th class="wd-15p">name</th>
                    <th class="wd-15p">email</th>
                    <th class="wd-20p">Number</th>
                    <th class="wd-15p">location</th>
                    <th class="wd-25p">amount</th>
                    <th class="wd-25p">details</th>
                    <th class="wd-25p">propertyType</th>
                  </tr>
                </thead>
                <tbody>

                  { myTabaleData }

                </tbody>
              </table>
              {
                this.state.properties.length < 1 ? (
                  <div style={{textAlign: 'center'}} >
                  <div class="spinner-border" role="status">
                    <span class="sr-only">Loading...</span>
                  </div>                    
                </div>                      
                ) : (null)
              }             
            </div>
            </div>
          </div>
          </div>
          </div>

          </section>               
      </DashboardContainer>
    );
  }
}

export default DataTable
