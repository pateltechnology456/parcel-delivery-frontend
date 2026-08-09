import PartnerApp from '@/components/partner/partner-app'

export default async function PartnerSectionPage({ params }: { params: Promise<{ section: string }> }) {
  const { section } = await params
  return <PartnerApp section={section} />
}
