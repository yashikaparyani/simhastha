import React, { useMemo, useState } from 'react';
import { useNavigation } from '@react-navigation/native';
import { View, Text, StyleSheet, ScrollView, TouchableOpacity, FlatList } from 'react-native';
import { Image as ExpoImage } from 'expo-image';
import { Colors } from '@/constants/Colors';

type Txn = { id: string; title: string; amount: number; type: 'credit' | 'debit'; date: string; status: 'Success' | 'Pending' | 'Failed' };

export default function Wallet() {
  const navigation = useNavigation();
  const [balance, setBalance] = useState<number>(1250);
  const [txns, setTxns] = useState<Txn[]>([
    { id: 't1', title: 'Top-up (UPI)', amount: 500, type: 'credit', date: '2025-09-01 10:30', status: 'Success' },
    { id: 't2', title: 'Temple Pass', amount: 200, type: 'debit', date: '2025-09-02 14:10', status: 'Success' },
    { id: 't3', title: 'Food Stall', amount: 120, type: 'debit', date: '2025-09-03 12:05', status: 'Pending' },
  ]);

  const balanceText = useMemo(() => `₹ ${balance.toFixed(2)}`, [balance]);

  return (
    <ScrollView contentContainerStyle={styles.container}>
      <ExpoImage source={require('@/assets/images/kumbh.jpeg')} style={styles.logo} contentFit="cover" />
      <Text style={styles.header}>My Wallet</Text>

      <View style={styles.balanceCard}>
        <Text style={styles.balanceLabel}>Current Balance</Text>
        <Text style={styles.balanceValue}>{balanceText}</Text>
      </View>

      <View style={styles.actionRow}>
        <TouchableOpacity style={styles.actionBtn} onPress={() => navigation.navigate('wallet-add-money' as never)}>
          <Text style={styles.actionEmoji}>➕</Text>
          <Text style={styles.actionText}>Add Money</Text>
        </TouchableOpacity>
        <TouchableOpacity style={styles.actionBtn} onPress={() => navigation.navigate('wallet-scan-pay' as never)}>
          <Text style={styles.actionEmoji}>📷</Text>
          <Text style={styles.actionText}>Scan & Pay</Text>
        </TouchableOpacity>
        <TouchableOpacity style={styles.actionBtn} onPress={() => navigation.navigate('wallet-withdraw' as never)}>
          <Text style={styles.actionEmoji}>↩️</Text>
          <Text style={styles.actionText}>Withdraw</Text>
        </TouchableOpacity>
      </View>

      <Text style={styles.sectionTitle}>Recent Transactions</Text>

      <View style={styles.listCard}>
        {txns.map(t => (
          <View key={t.id} style={styles.txnRow}>
            <View style={{ flex: 1 }}>
              <Text style={styles.txnTitle}>{t.title}</Text>
              <Text style={styles.txnMeta}>{t.date} • {t.status}</Text>
            </View>
            <Text style={[styles.txnAmount, { color: t.type === 'credit' ? '#2e7d32' : '#c62828' }]}>
              {t.type === 'credit' ? '+ ' : '- '}₹{t.amount.toFixed(2)}
            </Text>
          </View>
        ))}
      </View>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    flexGrow: 1,
    alignItems: 'center',
    padding: 20,
    backgroundColor: Colors.light.background,
  },
  logo: {
    width: 90,
    height: 90,
    borderRadius: 45,
    borderWidth: 2,
    borderColor: Colors.light.accentOrange,
    marginTop: 10,
  },
  header: {
    marginTop: 12,
    width: '100%',
    textAlign: 'center',
    backgroundColor: Colors.light.card,
    color: Colors.light.accentBlue,
    fontWeight: 'bold',
    paddingVertical: 12,
    borderRadius: 10,
    fontSize: 20,
    marginBottom: 12,
  },
  balanceCard: {
    width: '100%',
    backgroundColor: Colors.light.card,
    borderWidth: 1,
    borderColor: Colors.light.border,
    borderRadius: 16,
    padding: 16,
    alignItems: 'center',
    marginBottom: 12,
  },
  balanceLabel: { color: Colors.light.text, opacity: 0.7, marginBottom: 6 },
  balanceValue: { color: Colors.light.accentBlue, fontSize: 28, fontWeight: '800' },
  actionRow: { flexDirection: 'row', justifyContent: 'space-between', width: '100%', marginBottom: 12 },
  actionBtn: {
    width: '32%',
    backgroundColor: Colors.light.background,
    borderWidth: 1,
    borderColor: Colors.light.border,
    borderRadius: 12,
    paddingVertical: 16,
    alignItems: 'center',
  },
  actionEmoji: { fontSize: 20, marginBottom: 6 },
  actionText: { color: Colors.light.text, fontWeight: '600' },
  sectionTitle: { width: '100%', color: Colors.light.accentBlue, fontWeight: '700', marginVertical: 8 },
  listCard: { width: '100%', backgroundColor: Colors.light.card, borderWidth: 1, borderColor: Colors.light.border, borderRadius: 12, padding: 8 },
  txnRow: { flexDirection: 'row', alignItems: 'center', paddingVertical: 10, borderBottomWidth: 1, borderBottomColor: Colors.light.border },
  txnTitle: { color: Colors.light.text, fontWeight: '600', marginBottom: 2 },
  txnMeta: { color: Colors.light.text, opacity: 0.6, fontSize: 12 },
  txnAmount: { fontWeight: '800' },
});



