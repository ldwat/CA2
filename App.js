import React, { Component } from 'react';
import Web3 from 'web3'
import logo from '../logo.png';
import './App.css';
import CarRegTracker from '../abis/CarRegTracker.json'
import Navbar from './Navbar'
import Main from './Main'


class App extends Component {

  async componentWillMount() {
    await this.loadWeb3()
    await this.loadBlockchainData()
  }

  async loadWeb3() {
    if (window.ethereum) {
      window.web3 = new Web3(window.ethereum, null)
      await window.ethereum.enable()
    }
    else if (window.web3) {
      window.web3 = new Web3(window.web3.currentProvider, null)
    }
    else {
      window.alert('Non-Ethereum browser detected. You should consider trying MetaMask!')
    }
  }

  async loadBlockchainData() {
    const web3 = window.web3
    // Load account
    const accounts = await web3.eth.getAccounts()
    this.setState({ account: accounts[0] })
    const networkId = await web3.eth.net.getId()
    const networkData = CarRegTracker.networks[networkId]
    
    if(networkData) {
      const carregtracker = web3.eth.Contract(CarRegTracker.abi, networkData.address)
      this.setState({ carregtracker })
 
//Get number of records in Counters     
      const OwnerCount = await carregtracker.methods.OwnerCount().call()
      this.setState({ OwnerCount })
        
      // Load Owners
      for (var i = 1; i <= OwnerCount; i++) {  
        const Owner = await carregtracker.methods.Owners(i).call() 
        this.setState({  
          Owners: [...this.state.Owners, Owner]  
        })  
      }  
      
      this.setState({ loading: false})
       
    } else {
      window.alert('CarRegTracker contract not deployed to detected network.')
    }
  }

  constructor(props) {
    super(props)
    this.state = {
      account: '',
      OwnerCount: 0,  
      Owners: [],  
      DealerCount: 0,  
      Dealers: [],  
      RegisterCount: 0,  
      CarRegister: [],  
      loading: true
    }

    this.createOwner = this.createOwner.bind(this)
    this.createDealer = this.createDealer.bind(this)
    this.RegisterCar = this.RegisterCar.bind(this)
    this.ChangeCarOwner = this.ChangeCarOwner.bind(this)
    this.getOwner = this.getOwner.bind(this)
    this.get_HashID_of_User = this.get_HashID_of_User.bind(this)    
    
    
    
  }

  createOwner(OwnerID, OPin) {
    this.setState({ loading: true })
    this.state.carregtracker.methods.createOwner(OwnerID, OPin).send({ from: this.state.account })
    .once('receipt', (receipt) => {
      this.setState({ loading: false })
    })

  }

  createDealer(DealerID, DPin) {
    this.setState({ loading: true })
    this.state.carregtracker.methods.createDealer(DealerID, DPin).send({ from: this.state.account })
    .once('receipt', (receipt) => {
      this.setState({ loading: false })
    })

  }
  

    RegisterCar(DealerID, DPIN, CarID, BID, BuyerID) {
    this.setState({ loading: true })
    this.state.carregtracker.methods.RegisterCar(DealerID, DPIN, CarID, BID, BuyerID).send({ from: this.state.account })
    .once('receipt', (receipt) => {
      this.setState({ loading: false })
    })

  }
  
    ChangeCarOwner(OwnerID, OPin, CarID, BID, BuyerID) {
    this.setState({ loading: true })
    this.state.carregtracker.methods.ChangeCarOwner(OwnerID, OPin, CarID, BID, BuyerID).send({ from: this.state.account })
    .once('receipt', (receipt) => {
      this.setState({ loading: false })
    })

  }
  
    getOwner(OwnerId) {
    this.setState({ loading: true })
    this.state.carregtracker.methods.getOwner(OwnerId).send({ from: this.state.account })
    .once('receipt', (receipt) => {
      this.setState({ loading: false })
    })

  }

  get_HashID_of_User(OwnerId, OPin) {
    this.setState({ loading: true })
    this.state.carregtracker.methods.createDealer(OwnerId, OPin).send({ from: this.state.account })
    .once('receipt', (receipt) => {
      this.setState({ loading: false })
    })

  }



  render() {
    return (
      <div>
        <Navbar account={this.state.account} />
        <div className="container-fluid mt-5">
          <div className="row">
            <main role="main" className="col-lg-12 d-flex">
            
              { this.state.loading
                ? <div id="loader" className="text-center"><p className="text-center">Loading...</p></div>
                : <Main 
                
                Owners={this.state.Owners}
                
                createOwner={this.createOwner}
                createDealer={this.createDealer}
                RegisterCar={this.RegisterCar}
                ChangeCarOwner={this.ChangeCarOwner}
                getOwner={this.getOwner}
                get_HashID_of_User={this.get_HashID_of_User}              
                />
              }
              
            </main>
          </div>
        </div>
      </div>
    );
  }
}



export default App;