import { useNavigation } from '@react-navigation/native';
import React, { useState } from 'react';
import { View, Text, TouchableOpacity, ScrollView } from 'react-native';
import { observer } from 'mobx-react';
import btcStore from '../stores/btcStore';
import { getBitcoinTrxnOnly, getPolygonTrxnOnly } from '../helpers/Wallet';

interface Transaction {
  id: number;
  amount: number;
  hex: string;
}

const TransactionsScreen: React.FC = () => {
  // Dummy data for Bitcoin transactions
  const BTC: Transaction[] = [
    { id: 1, amount: 0.5, hex: '2022-01-01' },
    { id: 2, amount: 1.0, hex: '2022-01-02' },
    { id: 3, amount: 1.5, hex: '2022-01-03' },
  ];

  // Dummy data for Polygon transactions
  const USDC: Transaction[] = [
    { id: 1, amount: 100, hex: '2022-01-01' },
    { id: 2, amount: 200, hex: '2022-01-02' },
    { id: 3, amount: 300, hex: '2022-01-03' },
  ];

  // State variable to keep track of the currently active tab
  const [activeTab, setActiveTab] = useState<'BTC' | 'USDC'>('BTC');
  const [btcTrx, setBtcTrx] = useState<Transaction[]>([]);
  const [maticTrx, setMaticTrx] = useState<Transaction[]>([]);
  const navigation = useNavigation();
  
  React.useEffect(() => {
    if(btcStore.btcAddress.length > 0){
      getBitcoinTrxnOnly(btcStore.btcAddress).then(trxn => {
        console.log("btcTrx: ", trxn[0]);
        setBtcTrx(prev => {
          if(prev.length === trxn.length){
            return prev;
          } else {
            const newObj = [
              ...prev,
              {
                id: trxn[0].tx_hash,
                amount: trxn[0].value,
                hex: trxn[0].tx_hash,
              },
            ];
            return [...new Set(newObj)];
          }
        });
      })
    }

    if(btcStore.maticAddress.length > 0){
      getPolygonTrxnOnly(btcStore.maticAddress).then(({transaction}) => {
        // console.log("maticTrx: ", transaction.result[0]);
        transaction.result.forEach((element: any) => {
          setMaticTrx((prev) => {
            if(prev.length === transaction.result.length){
              return prev;
            } else {
              const newObj = [
                ...prev,
                {
                  id: element.blockHash,
                  amount: element.value,
                  hex: element.blockHash,
                },
              ];
              return [...new Set(newObj)];
            }
          });
        });
      })
    }
  }, []);

  return (
    <View style={{ flex: 1 }}>
      {/* Header */}
      <View style={{ flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between', padding: 16 }}>
        <Text style={{ fontSize: 24, fontWeight: 'bold' }}>Transactions</Text>
        <TouchableOpacity onPress={() => navigation.goBack()}>
          <Text style={{ fontSize: 16, color: '#888' }}>Go back</Text>
        </TouchableOpacity>
      </View>

      {/* Tab bar */}
      <View style={{ flexDirection: 'row', justifyContent: 'space-around', backgroundColor: '#eee' }}>
        <TouchableOpacity onPress={() => setActiveTab('BTC')} style={{ padding: 16, borderBottomWidth: activeTab === 'BTC' ? 2 : 0 }}>
          <Text style={{ fontSize: 16 }}>Bitcoin</Text>
        </TouchableOpacity>
        <TouchableOpacity onPress={() => setActiveTab('USDC')} style={{ padding: 16, borderBottomWidth: activeTab === 'USDC' ? 2 : 0 }}>
          <Text style={{ fontSize: 16 }}>Polygon</Text>
        </TouchableOpacity>
      </View>

      {/* Transaction list */}
      <ScrollView>
        {activeTab === 'BTC' && btcTrx.length > 0 ? btcTrx.map((transaction) => (
          <View key={transaction.id} style={{ flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center', padding: 16 }}>
            <Text style={{ fontSize: 16 }}>Hex: {transaction.hex.substring(0, 10) + '...'}</Text>
            <Text style={{ fontSize: 12, color: '#888' }}>Amount: {transaction.amount}</Text>
          </View>
        ))
        :
        activeTab === 'BTC' && <View style={{ flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center', padding: 16 }}>
          <Text style={{ fontSize: 16 }}>No data yet</Text>
        </View>
      }
        {activeTab === 'USDC' && maticTrx.length > 0 ? maticTrx.map((transaction) => (
          <View key={transaction.id} style={{ flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center', padding: 16 }}>
            <Text style={{ fontSize: 16 }}>Hex: {transaction.hex.substring(0, 10) + '...'}</Text>
            <Text style={{ fontSize: 12, color: '#888' }}>Amount: {transaction.amount}</Text>
          </View>
        ))
      :
      activeTab === 'USDC' && <View style={{ flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center', padding: 16 }}>
        <Text style={{ fontSize: 16 }}>No data yet</Text>
      </View>
      }
      </ScrollView>
    </View>
  );
};

export default observer(TransactionsScreen);
