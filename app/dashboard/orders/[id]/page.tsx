import DashboardApp from '@/components/dashboard/dashboard-app'
export default async function OrderDetailPage({ params }: { params: Promise<{ id: string }> }) { const { id } = await params; return <DashboardApp orderId={id} /> }
