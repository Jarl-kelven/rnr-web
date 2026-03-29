'use client';
import ReviewStep from '@/components/hotel-manager-dashboard/listing-editor/ReviewStep';
import { Text } from '@/components/ui/text';
import { UseListings } from '@/context/ListingContect'
import { ChevronLeft } from 'lucide-react';
import Link from 'next/link';
import { useParams } from 'next/navigation';

export default function Page() {
  const params = useParams();
  const { listings } = UseListings();
  const id = params.id;

  if (!id) return;

  const listing = listings.find(l => l.id === id)

  if (!listing) return (
    <div className="space-y-8 animate-in fade-in duration-500">
      <div className='h-screen w-full flex justify-center items-center'>
        <Text>
          Nothing found
        </Text>
      </div>
    </div>
  )

  return (
    <div className="space-y-8 animate-in fade-in duration-500">
      <header className="flex">
        <Link href="/dashboard/hotel-manager/listings" className="flex items-center gap-2">
          <ChevronLeft size={20} /> <Text className="font-bold">Back</Text>
        </Link>
      </header>
      <ReviewStep
        where='display'
        data={listing}
      />
    </div>
  )
}
