import DashboardApp from '@/components/dashboard/dashboard-app'
export default async function DashboardSectionPage({ params }: { params: Promise<{ section: string }> }) { const { section } = await params; return <DashboardApp section={section} /> }
