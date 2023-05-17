import { observable, action } from 'mobx'

class BitcoinStore {

  // for bitcoin

  @observable btcAddress = '';
  @observable btcPrivateKey = '';
  @observable btcBalance = '';
  @observable connected = false;

  @action setConnected (connected) {
    this.connected = connected
  }

  @action getAddress (address) {
    this.btcAddress = address // update store by re-assigning
  }

  @action getBalance (balance) {
    this.btcBalance = balance
  }

  @action getPrivateKey (privateKey) {
    this.btcPrivateKey = privateKey
  }

  // for polygon

  @observable maticAddress = '';
  @observable maticPrivateKey = '';
  @observable maticBalance = '';
  @observable maticConnected = false;

  @action setMaticConnected (connected) {
    this.maticConnected = connected
  }

  @action getMaticAddress (address) {
    this.maticAddress = address // update store by re-assigning
  }

  @action getMaticBalance (balance) {
    this.maticBalance = balance
  }

  @action getMaticPrivateKey (privateKey) {
    this.maticPrivateKey = privateKey
  }
}

const btcStore = new BitcoinStore()
export default btcStore