import React, { Component } from 'react';

class Main extends Component {

  render() {
    return (
    
      <div id="content">

        <h3>Add Owner</h3>
        
        <form onSubmit={(event) => {
          event.preventDefault()
          const OwnerID = this.OwnerName.value
          const OPin = this.OwnerPin.value
          this.props.createOwner(OwnerID, OPin)
           
        }}>
            
          <div className="form-group mr-sm-2">
            <input
              id="OwnerName"
              type="text"
              ref={(input) => { this.OwnerName = input }}
              className="form-control"
              placeholder="Owner Name"
              required />
          </div>
          <div className="form-group mr-sm-2">
            <input
              id="OwnerPin"
              type="number"
              ref={(input) => { this.OwnerPin = input }}
              className="form-control"
              placeholder="Pin number"
              required />
          </div>
          <button type="submit" className="btn btn-primary">Add Owner</button>
        </form>
        <p>&nbsp;</p>
        
      
        <h3>Add Dealer</h3>
        <form onSubmit={(event) => {
          event.preventDefault()
          const DealerID = this.DealerName.value
          const DPin = this.DealerPin.value
          this.props.createDealer(DealerID, DPin)
           
        }}>
           <div className="form-group mr-sm-2">
            <input
              id="DealerName"
              type="text"
              ref={(input) => { this.DealerName = input }}
              className="form-control"
              placeholder="Dealer Name"
              required />
          </div>
          <div className="form-group mr-sm-2">
            <input
              id="DealerPin"
              type="number"
              ref={(input) => { this.DealerPin = input }}
              className="form-control"
              placeholder="Pin number"
              required />
          </div>
          <button type="submit" className="btn btn-primary">Add Dealer</button>
        </form>
        <p>&nbsp;</p>
        
        
        <h3>Register a car</h3>
        <form onSubmit={(event) => {
          event.preventDefault()
          const DealerID = this.iDealerID.value
          const DPIN = this.iDPIN.value
          const CarID = this.iCarID.value
          const BID = this.iBID.value
          const BuyerID = this.iBuyerID.value          
          this.props.createDealer(DealerID, DPIN, CarID, BID, BuyerID)
           
        }}>
          <div className="form-group mr-sm-2">
            <input
              id="iDealerID"
              type="text"
              ref={(input) => { this.iDealerID = input }}
              className="form-control"
              placeholder="Dealer Name"
              required />
          </div>
          <div className="form-group mr-sm-2">
            <input
              id="iDPin"
              type="number"
              ref={(input) => { this.iDPin = input }}
              className="form-control"
              placeholder="Dealer Pin"
              required />
          </div>
          <div className="form-group mr-sm-2">
            <input
              id="iBID"
              type="text"
              ref={(input) => { this.iCarID = input }}
              className="form-control"
              placeholder="Car ID"
              required />
          </div>
          <div className="form-group mr-sm-2">
            <input
              id="iBID"
              type="number"
              ref={(input) => { this.iBID = input }}
              className="form-control"
              placeholder="Buyer Hash"
              required />
          </div>
          <div className="form-group mr-sm-2">
            <input
              id="iBuyerID"
              type="number"
              ref={(input) => { this.iBuyerID = input }}
              className="form-control"
              placeholder="Buyer ID"
              required />
          </div>
          <button type="submit" className="btn btn-primary">Change Car Owner</button>
        </form>
        <p>&nbsp;</p>
                
        <h3>Change Car Onwer</h3>
        <form onSubmit={(event) => {
          event.preventDefault()
          const OwnerID = this.iOwnerID.value
          const OPin = this.iOPin.value
          const CarID = this.iCarID.value
          const BID = this.iBID.value
          const BuyerID = this.iBuyerID.value          
          this.props.createDealer(OwnerID, OPin, CarID, BID, BuyerID)
           
        }}>
          <div className="form-group mr-sm-2">
            <input
              id="iOwnerID"
              type="text"
              ref={(input) => { this.iOwnerID = input }}
              className="form-control"
              placeholder="Owner Name"
              required />
          </div>
          <div className="form-group mr-sm-2">
            <input
              id="iOPin"
              type="number"
              ref={(input) => { this.iOPin = input }}
              className="form-control"
              placeholder="Owner Pin"
              required />
          </div>
          <div className="form-group mr-sm-2">
            <input
              id="iBID"
              type="text"
              ref={(input) => { this.iCarID = input }}
              className="form-control"
              placeholder="Car ID"
              required />
          </div>
          <div className="form-group mr-sm-2">
            <input
              id="iBID"
              type="number"
              ref={(input) => { this.iBID = input }}
              className="form-control"
              placeholder="Buyer Hash"
              required />
          </div>
          <div className="form-group mr-sm-2">
            <input
              id="iBuyerID"
              type="number"
              ref={(input) => { this.iBuyerID = input }}
              className="form-control"
              placeholder="Buyer ID"
              required />
          </div>
          <button type="submit" className="btn btn-primary">Change Car Owner</button>
        </form>
        <p>&nbsp;</p>
        
        
       
        <h3>Get Owner</h3>
        <form onSubmit={(event) => {
          event.preventDefault()
          const OwnerId = this.iOwnerId.value
          this.props.getOwner(OwnerId)
           
        }}>
           <div className="form-group mr-sm-2">
            <input
              id="iOwnerId"
              type="text"
              ref={(input) => { this.iOwnerId = input }}
              className="form-control"
              placeholder="Owner hash"
              required />
          </div>
          <button type="submit" className="btn btn-primary">Get Owner</button>
        </form>
        <p>&nbsp;</p>
        
        <h3>Get Hash of ID</h3>
        <form onSubmit={(event) => {
          event.preventDefault()
          const OwnerId = this.iOwnerId.value
          const OPin = this.iOPin.value
          this.props.createDealer(OwnerId, OPin)
           
        }}>
           <div className="form-group mr-sm-2">
            <input
              id="iOwnerId"
              type="text"
              ref={(input) => { this.iOwnerId = input }}
              className="form-control"
              placeholder="User Name"
              required />
          </div>
          <div className="form-group mr-sm-2">
            <input
              id="iOPin"
              type="number"
              ref={(input) => { this.iOPin = input }}
              className="form-control"
              placeholder="Pin number"
              required />
          </div>
          <button type="submit" className="btn btn-primary">Get Hash of ID</button>
        </form>
        <p>&nbsp;</p>
                    
        
      </div>
      
      
      
    );
  }
}

export default Main;