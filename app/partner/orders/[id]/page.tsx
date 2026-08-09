import PartnerApp from '@/components/partner/partner-app'

export default async function PartnerOrderPage({ params }: { params: Promise<{ id: string }> }) {
  const { id } = await params
  return <PartnerApp orderId={id} />
}
