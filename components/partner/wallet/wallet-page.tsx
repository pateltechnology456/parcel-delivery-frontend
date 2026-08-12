'use client'

import { useState, useEffect } from 'react'
import { CreditCard, ChevronRight, ArrowUpRight, ArrowDownLeft, Landmark, Wallet, Loader2 } from 'lucide-react'
import { PageHeading, Button, Status, money } from '../ui/partner-ui'
import * as partnerService from '@/services/partner.service'
import type { WalletTransaction } from '@/types/partner'

export function WalletPage() {
  const [transactions, setTransactions] = useState<WalletTransaction[]>([])
  const [loading, setLoading] = useState(true)
  const [balance] = useState({ available: 8420, pending: 3200 })
  const [withdrawAmount, setWithdrawAmount] = useState('')
  const [withdrawing, setWithdrawing] = useState(false)
  const [message, setMessage] = useState('')

  useEffect(() => {
    partnerService.getWalletTransactions().then(t => { setTransactions(t); setLoading(false) })
  }, [])

  const handleWithdraw = async () => {
    const amount = parseInt(withdrawAmount)
    if (!amount || amount <= 0) return
    setWithdrawing(true)
    const result = await partnerService.requestWithdrawal(amount)
    setMessage(result.message)
    setWithdrawing(false)
    setWithdrawAmount('')
  }

  return (
    <>
      <PageHeading eyebrow="Partner workspace / Finance" title="Wallet" description="Manage your balance, transactions, and withdrawals." />
      <div className="partner-stat-grid" style={{ gridTemplateColumns: 'repeat(2, 1fr)' }}>
        <div className="partner-stat">
          <span className="partner-stat-icon green"><Wallet /></span>
          <div><p>Available balance</p><strong>{money(balance.available)}</strong><small>Ready to withdraw</small></div>
        </div>
        <div className="partner-stat">
          <span className="partner-stat-icon orange"><CreditCard /></span>
          <div><p>Pending</p><strong>{money(balance.pending)}</strong><small>Being processed</small></div>
        </div>
      </div>

      <div className="partner-card" style={{ padding: 20, marginBottom: 14 }}>
        <h2 style={{ margin: '0 0 14px', fontSize: 14, color: '#0b2a62' }}>Withdraw funds</h2>
        {message && <div className="parcel-upload-msg success" style={{ marginBottom: 12 }}>{message}</div>}
        <div style={{ display: 'flex', gap: 8 }}>
          <div className="partner-mini-search" style={{ flex: 1, width: 'auto' }}>
            <span style={{ color: '#8a9aae', fontSize: 14, fontWeight: 700 }}>₹</span>
            <input
              type="number"
              placeholder="Enter amount"
              value={withdrawAmount}
              onChange={e => setWithdrawAmount(e.target.value)}
              style={{ fontSize: 13 }}
            />
          </div>
          <Button onClick={handleWithdraw} disabled={withdrawing || !withdrawAmount}>
            {withdrawing ? <Loader2 size={14} className="slide-spinner" /> : <Landmark size={14} />} Withdraw
          </Button>
        </div>
      </div>

      <div className="partner-card" style={{ padding: 20 }}>
        <div className="partner-card-title" style={{ marginBottom: 16 }}>
          <div><h2>Transaction history</h2><p>Your recent wallet activity</p></div>
        </div>
        {loading ? (
          <div className="partner-empty"><Loader2 className="slide-spinner" /><b>Loading transactions...</b></div>
        ) : transactions.length === 0 ? (
          <div className="partner-empty"><CreditCard /><b>No transactions yet</b><span>Your transaction history will appear here.</span></div>
        ) : (
          transactions.map(tx => (
            <div className="payout-row" key={tx.id}>
              <span className="payout-icon" style={{ background: tx.type === 'credit' ? '#e7faf0' : '#fff0e8', color: tx.type === 'credit' ? '#2dbb76' : '#ff6b2c' }}>
                {tx.type === 'credit' ? <ArrowDownLeft /> : <ArrowUpRight />}
              </span>
              <div><b>{tx.description}</b><small>{tx.date}</small></div>
              <strong style={{ color: tx.type === 'credit' ? '#2dbb76' : '#ff6b2c' }}>
                {tx.type === 'credit' ? '+' : '-'}{money(tx.amount)}
              </strong>
              <Status color={tx.status === 'completed' ? 'green' : tx.status === 'pending' ? 'orange' : 'red'}>{tx.status}</Status>
            </div>
          ))
        )}
      </div>
    </>
  )
}
