import AdminApp from '@/components/admin/admin-app'

export default async function AdminSectionPage({ params }: { params: Promise<{ section: string }> }) {
  await params
  return <AdminApp />
}
