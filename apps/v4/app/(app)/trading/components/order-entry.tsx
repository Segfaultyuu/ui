"use client"

import * as React from "react"

import { Button } from "@/styles/base-rhea/ui/button"
import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
} from "@/styles/base-rhea/ui/card"
import { Field, FieldLabel } from "@/styles/base-rhea/ui/field"
import { Input } from "@/styles/base-rhea/ui/input"
import { Label } from "@/styles/base-rhea/ui/label"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/styles/base-rhea/ui/tabs"

import { formatUsd } from "../data"

const PERCENTAGES = [25, 50, 75, 100]
const ORDER_TYPES = ["Market", "Limit", "Stop"]

export function OrderEntry({
  symbol,
  price,
}: {
  symbol: string
  price: number
}) {
  const [side, setSide] = React.useState("buy")
  const [orderType, setOrderType] = React.useState("Limit")
  const [amount, setAmount] = React.useState("0.25")
  const [limitPrice, setLimitPrice] = React.useState(price.toFixed(2))

  const base = symbol.split("/")[0]
  const numericAmount = Number.parseFloat(amount) || 0
  const numericPrice =
    orderType === "Market" ? price : Number.parseFloat(limitPrice) || price
  const total = numericAmount * numericPrice
  const isBuy = side === "buy"

  return (
    <Card>
      <CardHeader>
        <CardTitle>Place Order</CardTitle>
      </CardHeader>
      <CardContent className="flex flex-col gap-4">
        <Tabs value={side} onValueChange={setSide}>
          <TabsList className="w-full">
            <TabsTrigger
              value="buy"
              className="data-active:bg-success data-active:text-success-foreground"
            >
              Buy
            </TabsTrigger>
            <TabsTrigger
              value="sell"
              className="data-active:bg-destructive data-active:text-destructive-foreground"
            >
              Sell
            </TabsTrigger>
          </TabsList>

          <TabsContent value={side} className="mt-4 flex flex-col gap-4">
            <div className="flex gap-1.5">
              {ORDER_TYPES.map((type) => (
                <Button
                  key={type}
                  type="button"
                  variant={orderType === type ? "secondary" : "ghost"}
                  size="sm"
                  className="flex-1"
                  onClick={() => setOrderType(type)}
                >
                  {type}
                </Button>
              ))}
            </div>

            <Field>
              <FieldLabel htmlFor="order-price">Limit Price (USD)</FieldLabel>
              <Input
                id="order-price"
                inputMode="decimal"
                value={orderType === "Market" ? "Market Price" : limitPrice}
                disabled={orderType === "Market"}
                onChange={(event) => setLimitPrice(event.target.value)}
              />
            </Field>

            <Field>
              <FieldLabel htmlFor="order-amount">Amount ({base})</FieldLabel>
              <Input
                id="order-amount"
                inputMode="decimal"
                value={amount}
                onChange={(event) => setAmount(event.target.value)}
              />
            </Field>

            <div className="flex gap-1.5">
              {PERCENTAGES.map((pct) => (
                <Button
                  key={pct}
                  type="button"
                  variant="outline"
                  size="xs"
                  className="flex-1"
                  onClick={() =>
                    setAmount(((pct / 100) * 1).toFixed(2))
                  }
                >
                  {pct}%
                </Button>
              ))}
            </div>

            <div className="flex flex-col gap-2 rounded-2xl bg-muted/50 p-3.5">
              <Row label="Order Value" value={`$${formatUsd(total)}`} />
              <Row label="Est. Fee (0.10%)" value={`$${formatUsd(total * 0.001)}`} />
              <Row
                label="Available"
                value="$24,850.00"
                muted
              />
            </div>

            <Button
              className={
                isBuy
                  ? "w-full bg-success text-success-foreground hover:bg-success/90"
                  : "w-full bg-destructive text-destructive-foreground hover:bg-destructive/90"
              }
              size="lg"
            >
              {isBuy ? "Buy" : "Sell"} {base}
            </Button>
          </TabsContent>
        </Tabs>
      </CardContent>
    </Card>
  )
}

function Row({
  label,
  value,
  muted,
}: {
  label: string
  value: string
  muted?: boolean
}) {
  return (
    <div className="flex items-center justify-between text-sm">
      <Label className="text-muted-foreground">{label}</Label>
      <span className={muted ? "text-muted-foreground" : "font-medium"}>
        {value}
      </span>
    </div>
  )
}
