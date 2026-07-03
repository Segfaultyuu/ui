export type Market = {
  symbol: string
  name: string
  price: number
  change: number
  volume: string
  spark: number[]
}

export const MARKETS: Market[] = [
  {
    symbol: "BTC/USD",
    name: "Bitcoin",
    price: 68412.55,
    change: 3.21,
    volume: "42.1B",
    spark: [61, 62, 60, 63, 65, 64, 66, 68, 67, 69, 68.4],
  },
  {
    symbol: "ETH/USD",
    name: "Ethereum",
    price: 3564.18,
    change: 1.84,
    volume: "18.7B",
    spark: [33, 34, 33, 35, 34, 36, 35, 36, 35, 36, 35.6],
  },
  {
    symbol: "SOL/USD",
    name: "Solana",
    price: 172.44,
    change: -2.07,
    volume: "3.9B",
    spark: [18, 19, 18.5, 18, 17.5, 17.8, 17.2, 17.6, 17.1, 17.4, 17.2],
  },
  {
    symbol: "AVAX/USD",
    name: "Avalanche",
    price: 41.29,
    change: 5.63,
    volume: "912M",
    spark: [3.6, 3.7, 3.8, 3.9, 4.0, 3.95, 4.05, 4.1, 4.08, 4.12, 4.13],
  },
  {
    symbol: "LINK/USD",
    name: "Chainlink",
    price: 18.06,
    change: -0.94,
    volume: "654M",
    spark: [1.9, 1.88, 1.85, 1.86, 1.82, 1.83, 1.81, 1.8, 1.79, 1.81, 1.8],
  },
  {
    symbol: "DOGE/USD",
    name: "Dogecoin",
    price: 0.1642,
    change: 2.48,
    volume: "1.2B",
    spark: [0.15, 0.16, 0.155, 0.158, 0.16, 0.162, 0.161, 0.163, 0.162, 0.164, 0.164],
  },
]

export type Candle = { t: string; price: number }

// Deterministic intraday series for the featured market.
export const PRICE_SERIES: Record<string, Candle[]> = {
  "1H": buildSeries(66200, 24, 7),
  "1D": buildSeries(64800, 32, 26),
  "1W": buildSeries(61200, 40, 60),
  "1M": buildSeries(52400, 48, 130),
  "1Y": buildSeries(38200, 56, 420),
}

function buildSeries(base: number, points: number, amplitude: number): Candle[] {
  const out: Candle[] = []
  let value = base
  for (let i = 0; i < points; i++) {
    const wave = Math.sin(i / 3.1) * amplitude
    const drift = (i / points) * amplitude * 6
    const jitter = ((i * 928371) % 100) / 100 - 0.5
    value = base + drift + wave + jitter * amplitude * 1.4
    out.push({ t: String(i), price: Math.max(0, value) })
  }
  return out
}

export const ORDER_BOOK = {
  asks: [
    { price: 68450.0, size: 0.842, total: 0.842 },
    { price: 68442.5, size: 1.204, total: 2.046 },
    { price: 68436.0, size: 0.518, total: 2.564 },
    { price: 68429.5, size: 2.111, total: 4.675 },
    { price: 68421.0, size: 0.964, total: 5.639 },
    { price: 68416.5, size: 1.457, total: 7.096 },
  ],
  bids: [
    { price: 68408.0, size: 1.023, total: 1.023 },
    { price: 68401.5, size: 0.744, total: 1.767 },
    { price: 68395.0, size: 1.892, total: 3.659 },
    { price: 68388.5, size: 0.612, total: 4.271 },
    { price: 68380.0, size: 2.348, total: 6.619 },
    { price: 68374.5, size: 1.106, total: 7.725 },
  ],
}

export type Position = {
  symbol: string
  side: "Long" | "Short"
  size: string
  entry: number
  mark: number
  pnl: number
  pnlPct: number
}

export const POSITIONS: Position[] = [
  {
    symbol: "BTC/USD",
    side: "Long",
    size: "0.85 BTC",
    entry: 64120.0,
    mark: 68412.55,
    pnl: 3648.67,
    pnlPct: 6.7,
  },
  {
    symbol: "ETH/USD",
    side: "Long",
    size: "12.0 ETH",
    entry: 3390.5,
    mark: 3564.18,
    pnl: 2084.16,
    pnlPct: 5.12,
  },
  {
    symbol: "SOL/USD",
    side: "Short",
    size: "140 SOL",
    entry: 168.2,
    mark: 172.44,
    pnl: -593.6,
    pnlPct: -2.52,
  },
  {
    symbol: "AVAX/USD",
    side: "Long",
    size: "320 AVAX",
    entry: 39.1,
    mark: 41.29,
    pnl: 700.8,
    pnlPct: 5.6,
  },
]

export type OrderRow = {
  time: string
  symbol: string
  side: "Buy" | "Sell"
  type: string
  price: number
  amount: string
  status: "Open" | "Filled" | "Partial"
}

export const OPEN_ORDERS: OrderRow[] = [
  {
    time: "14:32:08",
    symbol: "BTC/USD",
    side: "Buy",
    type: "Limit",
    price: 67800.0,
    amount: "0.25 BTC",
    status: "Open",
  },
  {
    time: "14:18:44",
    symbol: "ETH/USD",
    side: "Sell",
    type: "Limit",
    price: 3620.0,
    amount: "4.0 ETH",
    status: "Partial",
  },
  {
    time: "13:57:12",
    symbol: "SOL/USD",
    side: "Buy",
    type: "Market",
    price: 171.9,
    amount: "60 SOL",
    status: "Filled",
  },
  {
    time: "13:41:29",
    symbol: "AVAX/USD",
    side: "Buy",
    type: "Limit",
    price: 40.5,
    amount: "120 AVAX",
    status: "Open",
  },
]

export function formatUsd(value: number, fractionDigits = 2) {
  return value.toLocaleString("en-US", {
    minimumFractionDigits: fractionDigits,
    maximumFractionDigits: fractionDigits,
  })
}

export function formatSignedPct(value: number) {
  const sign = value > 0 ? "+" : ""
  return `${sign}${value.toFixed(2)}%`
}
