import React, { PropTypes } from 'react'
import moment from 'moment'

class Wiz extends React.Component{
  constructor(props, context){
    super(props, context)

    this.state = {
      active: 'none'
    }
  }

  onChangeActive = (activeAction) => {
    this.setState({
      active: activeAction
    })
  }

  render(){
    const { active } = this.state

    return(
      <section className="aim-panel">
        <header>
          <h1>Action Items for</h1>
        </header>
        <div className="row">
          <button className="btn btn-block btn-slim btn-light btn-actions">Medications and Supplements</button>
          {active !== 'labs' && <button className="btn btn-block btn-slim btn-light btn-actions" onClick={() => {this.onChangeActive('labs')}}>Labs and Tests</button>}
          {active === 'labs' &&
            <div>
              Labs and Tests for
              <form>
                <div className="row">
                  <select name="" id="" className="form-control">
                    <option disabled selected>Add Existing</option>
                  </select>
                </div>
                <div className="row">
                  <input type="text" className="form-control"/>
                </div>
                <div className="row">
                  <div className="col-xs-5">
                    <label htmlFor="">Test Date</label>
                  </div>
                  <div className="col-xs-7">
                    <input type="text" className="form-control"/>
                  </div>               
                </div>
                <div className="row">
                  <textarea name="" id="" cols="30" rows="10" className="form-control"></textarea>
                </div>
                <div className="row">
                  <button className="btn btn-block btn-light btn-slim">Add Another</button>
                  <button className="btn btn-block btn-light btn-slim">Save and Continue</button>
                </div>   
              </form>
            </div>
          }
          <button className="btn btn-block btn-slim btn-light btn-actions">Vaccines</button>
          <button className="btn btn-block btn-slim btn-light btn-actions">Procedures</button>
          <button className="btn btn-block btn-slim btn-light btn-actions">Doctor and Provider Visits</button>
          <button className="btn btn-block btn-slim btn-light btn-actions">Monitoring</button>
          <button className="btn btn-block btn-slim btn-light btn-actions">Data Collection</button>
          <button className="btn btn-block btn-slim btn-light btn-actions">Add Custom</button>
        </div>
      </section>
    )
  }
}

export default Wiz