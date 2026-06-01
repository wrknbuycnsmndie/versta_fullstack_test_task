import { Route, Routes } from 'react-router-dom'

import { AppShell } from './components/layout/app-shell'
import { LandingPage } from './pages/landing-page'
import { NotFoundPage } from './pages/not-found-page'
import { OrderDetailsPage } from './pages/order-details-page'
import { OrdersPage } from './pages/orders-page'

function App() {
  return (
    <AppShell>
      <Routes>
        <Route path="/" element={<LandingPage />} />
        <Route path="/orders" element={<OrdersPage />} />
        <Route path="/orders/:id" element={<OrderDetailsPage />} />
        <Route path="*" element={<NotFoundPage />} />
      </Routes>
    </AppShell>
  )
}

export default App
