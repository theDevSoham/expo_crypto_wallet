import { observable, action } from 'mobx'

class BitcoinStore {

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
}

const btcStore = new BitcoinStore()
export default btcStore