import { notFound } from 'next/navigation'
import ServicePageView from '@/app/components/ServicePageView'
import { fetchServicePage } from '@/sanity/lib/servicePage'

export default async function Page() {
  const data = await fetchServicePage('akademia-i-szkolenia')
  if (!data) notFound()
  return <ServicePageView data={data} />
}
