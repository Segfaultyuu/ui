"use client"

import * as React from "react"

import { cn } from "@/lib/utils"
import { Badge } from "@/styles/base-rhea/ui/badge"
import { Button } from "@/styles/base-rhea/ui/button"
import {
  Card,
  CardContent,
  CardHeader,
} from "@/styles/base-rhea/ui/card"
import { Separator } from "@/styles/base-rhea/ui/separator"
import {
  Tabs,
  TabsList,
  TabsTrigger,
} from "@/styles/base-rhea/ui/tabs"

import {
  MARKETS,
  PRICE_SERIES,
  type Market,
  formatSignedPct,
  formatUsd,
} from "../data"
import { OrderBook } from "./order-book"
import { OrderEntry } from "./order-entry"
import { PositionsPanel } from "./positions-panel"
import { PriceChart } from "./price-chart"
import { Watchlist } from "./watchlist"

const TIMEFRAMES = ["1H", "1D", "1W", "1M", "1Y"]

function Stat({ label, value }: { label: string; value: string }) {
  return (
    <div className="flex flex-col gap-0.5">
      <span className="text-xs text-muted-foreground">{label}</span>
      <span className="font-mono text-sm font-medium tabular-nums">{value}</span>
    </div>
  )
}

export function TradingDashboard() {
  const [market, setMarket] = React.useState<Market>(MARKETS[0])
  const [timeframe, setTimeframe] = React.useState("1D")

  const positive = market.change >= 0
  const series = PRICE_SERIES[timeframe]
  const changeAbs = (market.price * market.change) / 100

  return (
    <div className="mx-auto flex w-full max-w-[1600px] flex-col gap-4 p-4 md:p-6">
      {/* Market header */}
      <Card>
        <CardHeader className="gap-0">
          <div className="flex flex-col gap-4 lg:flex-row lg:items-center lg:justify-between">
            <div className="flex flex-wrap items-center gap-x-6 gap-y-3">
              <div className="flex items-center gap-3">
                <div>
                  <div className="flex items-center gap-2">
                    <h1 className="cn-font-heading text-xl font-semibold">
                      {market.symbol}
                    </h1>
                    <Badge variant="outline">{market.name}</Badge>
                  </div>
                  <div className="mt-1 flex items-baseline gap-2">
                    <span className="font-mono text-2xl font-semibold tabular-nums">
                      ${formatUsd(market.price, market.price < 1 ? 4 : 2)}
                    </span>
                    <span
                      className={cn(
                        "font-mono text-sm font-medium tabular-nums",
                        positive ? "text-success" : "text-destructive"
                      )}
                    >
                      {positive ? "+" : "-"}$
                      {formatUsd(Math.abs(changeAbs))} (
                      {formatSignedPct(market.change)})
                    </span>
                  </div>
                </div>
              </div>

              <Separator
                orientation="vertical"
                className="hidden h-10 lg:block"
              />

              <div className="flex flex-wrap gap-x-6 gap-y-3">
                <Stat
                  label="24h High"
                  value={`$${formatUsd(market.price * 1.032)}`}
                />
                <Stat
                  label="24h Low"
                  value={`$${formatUsd(market.price * 0.968)}`}
                />
                <Stat label="24h Volume" value={`$${market.volume}`} />
              </div>
            </div>
          </div>
        </CardHeader>
      </Card>

      {/* Main grid */}
      <div className="grid grid-cols-1 gap-4 xl:grid-cols-[1fr_340px]">
        <div className="flex flex-col gap-4">
          <Card>
            <CardHeader>
              <div className="flex items-center justify-between">
                <div className="flex items-baseline gap-2">
                  <span className="cn-font-heading text-base font-medium">
                    {market.symbol}
                  </span>
                  <Badge
                    className={cn(
                      positive
                        ? "bg-success/10 text-success"
                        : "bg-destructive/10 text-destructive"
                    )}
                  >
                    {formatSignedPct(market.change)}
                  </Badge>
                </div>
                <Tabs value={timeframe} onValueChange={setTimeframe}>
                  <TabsList variant="line">
                    {TIMEFRAMES.map((frame) => (
                      <TabsTrigger key={frame} value={frame}>
                        {frame}
                      </TabsTrigger>
                    ))}
                  </TabsList>
                </Tabs>
              </div>
            </CardHeader>
            <CardContent>
              <PriceChart series={series} positive={positive} />
            </CardContent>
          </Card>

          <PositionsPanel />
        </div>

        <div className="flex flex-col gap-4">
          <OrderEntry symbol={market.symbol} price={market.price} />
          <OrderBook price={market.price} />
          <Watchlist activeSymbol={market.symbol} onSelect={setMarket} />
        </div>
      </div>
    </div>
  )
}
