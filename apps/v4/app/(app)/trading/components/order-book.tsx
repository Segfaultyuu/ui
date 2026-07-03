import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/styles/base-rhea/ui/card"

import { ORDER_BOOK, formatUsd } from "../data"

type Level = { price: number; size: number; total: number }

function BookSide({
  levels,
  tone,
}: {
  levels: Level[]
  tone: "ask" | "bid"
}) {
  const maxTotal = Math.max(...levels.map((level) => level.total))
  const barColor = tone === "ask" ? "bg-destructive/10" : "bg-success/10"
  const priceColor = tone === "ask" ? "text-destructive" : "text-success"
  const rows = tone === "ask" ? [...levels].reverse() : levels

  return (
    <div className="flex flex-col gap-1">
      {rows.map((level) => (
        <div
          key={level.price}
          className="relative grid grid-cols-3 items-center rounded-md px-2 py-1 font-mono text-xs tabular-nums"
        >
          <div
            aria-hidden="true"
            className={`absolute inset-y-0 right-0 rounded-md ${barColor}`}
            style={{ width: `${(level.total / maxTotal) * 100}%` }}
          />
          <span className={`relative z-10 font-medium ${priceColor}`}>
            {formatUsd(level.price)}
          </span>
          <span className="relative z-10 text-right text-muted-foreground">
            {level.size.toFixed(3)}
          </span>
          <span className="relative z-10 text-right text-foreground">
            {level.total.toFixed(3)}
          </span>
        </div>
      ))}
    </div>
  )
}

export function OrderBook({ price }: { price: number }) {
  return (
    <Card>
      <CardHeader>
        <CardTitle>Order Book</CardTitle>
        <CardDescription>BTC/USD depth</CardDescription>
      </CardHeader>
      <CardContent className="flex flex-col gap-2">
        <div className="grid grid-cols-3 px-2 text-[11px] font-medium tracking-wide text-muted-foreground uppercase">
          <span>Price</span>
          <span className="text-right">Size</span>
          <span className="text-right">Total</span>
        </div>
        <BookSide levels={ORDER_BOOK.asks} tone="ask" />
        <div className="flex items-baseline justify-between rounded-lg bg-muted/50 px-2 py-1.5 font-mono text-sm font-semibold tabular-nums text-success">
          {formatUsd(price)}
          <span className="text-[11px] font-normal text-muted-foreground">
            Spread 0.06%
          </span>
        </div>
        <BookSide levels={ORDER_BOOK.bids} tone="bid" />
      </CardContent>
    </Card>
  )
}
