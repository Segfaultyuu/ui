import { type Metadata } from "next"

import { TradingDashboard } from "./components/trading-dashboard"

const title = "Trading Terminal"
const description =
  "A trading terminal built with the design system — live markets, order entry, order book, and open positions."

export const dynamic = "force-static"
export const revalidate = false

export const metadata: Metadata = {
  title,
  description,
}

export default function TradingPage() {
  return (
    <div className="theme-neutral flex flex-1 flex-col bg-muted dark:bg-background">
      <TradingDashboard />
    </div>
  )
}
