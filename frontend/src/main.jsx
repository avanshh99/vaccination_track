import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import App from './App.jsx'
import Header from './Components/Header.jsx'
import ProfileVaccination from './Components/ProfileVaccination.jsx'
import UpcomingVaccinations from './Components/UpcomingVaccinations.jsx'
import FAQSection from './Components/FAQSection.jsx'

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <Header></Header>
    <ProfileVaccination></ProfileVaccination>
    <UpcomingVaccinations></UpcomingVaccinations>
    <FAQSection></FAQSection>
  </StrictMode>,
)
