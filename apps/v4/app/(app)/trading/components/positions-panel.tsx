"use client"

import { cn } from "@/lib/utils"
import { Badge } from "@/styles/base-rhea/ui/badge"
import { Button } from "@/styles/base-rhea/ui/button"
import { Card, CardContent } from "@/styles/base-rhea/ui/card"
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/styles/base-rhea/ui/table"
import {
  Tabs,
  TabsContent,
  TabsList,
  TabsTrigger,
} from "@/styles/base-rhea/ui/tabs"

import {
  OPEN_ORDERS,
  POSITIONS,
  formatSignedPct,
  formatUsd,
} from "../data"

export function PositionsPanel() {
  return (
    <Card>
      <CardContent className="pt-1">
        <Tabs defaultValue="positions">
          <TabsList>
            <TabsTrigger value="positions">
              Positions
              <Badge variant="secondary">{POSITIONS.length}</Badge>
            </TabsTrigger>
            <TabsTrigger value="orders">
              Open Orders
              <Badge variant="secondary">{OPEN_ORDERS.length}</Badge>
            </TabsTrigger>
          </TabsList>

          <TabsContent value="positions" className="mt-3 overflow-x-auto">
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>Market</TableHead>
                  <TableHead>Side</TableHead>
                  <TableHead>Size</TableHead>
                  <TableHead className="text-right">Entry</TableHead>
                  <TableHead className="text-right">Mark</TableHead>
                  <TableHead className="text-right">PnL</TableHead>
                  <TableHead className="text-right">Action</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {POSITIONS.map((position) => {
                  const positive = position.pnl >= 0
                  return (
                    <TableRow key={position.symbol}>
                      <TableCell className="font-medium">
                        {position.symbol}
                      </TableCell>
                      <TableCell>
                        <Badge
                          variant={
                            position.side === "Long" ? "outline" : "outline"
                          }
                          className={cn(
                            position.side === "Long"
                              ? "text-success"
                              : "text-destructive"
                          )}
                        >
                          {position.side}
                        </Badge>
                      </TableCell>
                      <TableCell className="text-muted-foreground">
                        {position.size}
                      </TableCell>
                      <TableCell className="text-right font-mono tabular-nums">
                        ${formatUsd(position.entry)}
                      </TableCell>
                      <TableCell className="text-right font-mono tabular-nums">
                        ${formatUsd(position.mark)}
                      </TableCell>
                      <TableCell
                        className={cn(
                          "text-right font-mono tabular-nums",
                          positive ? "text-success" : "text-destructive"
                        )}
                      >
                        {positive ? "+" : "-"}$
                        {formatUsd(Math.abs(position.pnl))}
                        <span className="ml-1 text-xs">
                          ({formatSignedPct(position.pnlPct)})
                        </span>
                      </TableCell>
                      <TableCell className="text-right">
                        <Button variant="ghost" size="xs">
                          Close
                        </Button>
                      </TableCell>
                    </TableRow>
                  )
                })}
              </TableBody>
            </Table>
          </TabsContent>

          <TabsContent value="orders" className="mt-3 overflow-x-auto">
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>Time</TableHead>
                  <TableHead>Market</TableHead>
                  <TableHead>Side</TableHead>
                  <TableHead>Type</TableHead>
                  <TableHead className="text-right">Price</TableHead>
                  <TableHead className="text-right">Amount</TableHead>
                  <TableHead className="text-right">Status</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {OPEN_ORDERS.map((order) => (
                  <TableRow key={`${order.time}-${order.symbol}`}>
                    <TableCell className="font-mono text-xs text-muted-foreground tabular-nums">
                      {order.time}
                    </TableCell>
                    <TableCell className="font-medium">{order.symbol}</TableCell>
                    <TableCell
                      className={cn(
                        "font-medium",
                        order.side === "Buy"
                          ? "text-success"
                          : "text-destructive"
                      )}
                    >
                      {order.side}
                    </TableCell>
                    <TableCell className="text-muted-foreground">
                      {order.type}
                    </TableCell>
                    <TableCell className="text-right font-mono tabular-nums">
                      ${formatUsd(order.price)}
                    </TableCell>
                    <TableCell className="text-right text-muted-foreground">
                      {order.amount}
                    </TableCell>
                    <TableCell className="text-right">
                      <Badge
                        variant={
                          order.status === "Filled" ? "secondary" : "outline"
                        }
                      >
                        {order.status}
                      </Badge>
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </TabsContent>
        </Tabs>
      </CardContent>
    </Card>
  )
}
