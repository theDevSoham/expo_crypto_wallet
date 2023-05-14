import { observable, action } from 'mobx'

class BitcoinStore {

  // for bitcoin

  @observable btcAddress = '';
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

  // for polygon

  @observable maticAddress = '';
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
}

const btcStore = new BitcoinStore()
export default btcStore