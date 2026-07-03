"use client"

import { cn } from "@/lib/utils"
import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
} from "@/styles/base-rhea/ui/card"

import { MARKETS, type Market, formatSignedPct, formatUsd } from "../data"

function Sparkline({ data, positive }: { data: number[]; positive: boolean }) {
  const min = Math.min(...data)
  const max = Math.max(...data)
  const range = max - min || 1
  const stepX = 100 / (data.length - 1)
  const path = data
    .map((value, index) => {
      const x = index * stepX
      const y = 28 - ((value - min) / range) * 24 - 2
      return `${index === 0 ? "M" : "L"} ${x.toFixed(1)} ${y.toFixed(1)}`
    })
    .join(" ")

  return (
    <svg
      viewBox="0 0 100 28"
      preserveAspectRatio="none"
      className={cn("h-7 w-16", positive ? "text-success" : "text-destructive")}
      aria-hidden="true"
    >
      <path
        d={path}
        fill="none"
        stroke="currentColor"
        strokeWidth="1.5"
        vectorEffect="non-scaling-stroke"
      />
    </svg>
  )
}

export function Watchlist({
  activeSymbol,
  onSelect,
}: {
  activeSymbol: string
  onSelect: (market: Market) => void
}) {
  return (
    <Card>
      <CardHeader>
        <CardTitle>Watchlist</CardTitle>
      </CardHeader>
      <CardContent className="flex flex-col gap-1">
        {MARKETS.map((market) => {
          const positive = market.change >= 0
          const isActive = market.symbol === activeSymbol
          return (
            <button
              key={market.symbol}
              type="button"
              onClick={() => onSelect(market)}
              aria-pressed={isActive}
              className={cn(
                "flex items-center gap-3 rounded-2xl px-3 py-2.5 text-left transition-colors",
                isActive ? "bg-muted" : "hover:bg-muted/60"
              )}
            >
              <div className="flex min-w-0 flex-1 flex-col">
                <span className="text-sm font-medium">{market.symbol}</span>
                <span className="truncate text-xs text-muted-foreground">
                  {market.name}
                </span>
              </div>
              <Sparkline data={market.spark} positive={positive} />
              <div className="flex w-24 flex-col items-end">
                <span className="font-mono text-sm tabular-nums">
                  ${formatUsd(market.price, market.price < 1 ? 4 : 2)}
                </span>
                <span
                  className={cn(
                    "font-mono text-xs tabular-nums",
                    positive ? "text-success" : "text-destructive"
                  )}
                >
                  {formatSignedPct(market.change)}
                </span>
              </div>
            </button>
          )
        })}
      </CardContent>
    </Card>
  )
}
