import { LandingPage } from '@/components/LandingPage'
import { StayPage } from '@/components/StayPage'
import { ExperienceSection } from '@/components/ExperienceSection'
import { Owner } from '@/components/Owner'
import { RoomsPage } from '@/components/RoomsPage'
import { PlacesPage } from '@/components/PlacesPage'
import { GalleryPage } from '@/components/GalleryPage'
import { ReviewsPage } from '@/components/ReviewsPage'
import { MapsPage } from '@/components/MapsPage'
import { ContactPage } from '@/components/ContactPage'
import { FooterPage } from '@/components/FooterPage'

export default function HomePage() {
  return (
    <>
      <LandingPage />
      <main>
        <StayPage />
        <ExperienceSection />
        <Owner />
        <RoomsPage />
        <PlacesPage />
        <GalleryPage />
        <ReviewsPage />
        <MapsPage />
        <ContactPage />
      </main>
      <FooterPage />
    </>
  )
}
