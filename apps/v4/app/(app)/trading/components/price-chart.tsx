import { type Candle } from "../data"

const WIDTH = 600
const HEIGHT = 240
const PAD_Y = 16

function buildPath(series: Candle[]) {
  const prices = series.map((point) => point.price)
  const min = Math.min(...prices)
  const max = Math.max(...prices)
  const range = max - min || 1

  const stepX = WIDTH / (series.length - 1)
  const toY = (price: number) =>
    PAD_Y + (1 - (price - min) / range) * (HEIGHT - PAD_Y * 2)

  const points = series.map((point, index) => ({
    x: index * stepX,
    y: toY(point.price),
  }))

  const line = points
    .map((point, index) =>
      index === 0
        ? `M ${point.x} ${point.y}`
        : `L ${point.x.toFixed(2)} ${point.y.toFixed(2)}`
    )
    .join(" ")

  const area = `${line} L ${WIDTH} ${HEIGHT} L 0 ${HEIGHT} Z`

  return { line, area, min, max, lastY: points[points.length - 1].y }
}

export function PriceChart({
  series,
  positive,
}: {
  series: Candle[]
  positive: boolean
}) {
  const { line, area, lastY } = buildPath(series)
  const tone = positive ? "text-success" : "text-destructive"
  const gridLines = [0.25, 0.5, 0.75]

  return (
    <div className="relative w-full">
      <svg
        viewBox={`0 0 ${WIDTH} ${HEIGHT}`}
        preserveAspectRatio="none"
        className={`aspect-[600/240] w-full ${tone}`}
        role="img"
        aria-label="Price movement chart"
      >
        <defs>
          <linearGradient id="price-fill" x1="0" y1="0" x2="0" y2="1">
            <stop offset="0%" stopColor="currentColor" stopOpacity="0.22" />
            <stop offset="100%" stopColor="currentColor" stopOpacity="0" />
          </linearGradient>
        </defs>
        {gridLines.map((fraction) => (
          <line
            key={fraction}
            x1="0"
            x2={WIDTH}
            y1={fraction * HEIGHT}
            y2={fraction * HEIGHT}
            className="text-border"
            stroke="currentColor"
            strokeWidth="1"
            strokeDasharray="2 6"
            vectorEffect="non-scaling-stroke"
          />
        ))}
        <path d={area} fill="url(#price-fill)" />
        <path
          d={line}
          fill="none"
          stroke="currentColor"
          strokeWidth="2"
          strokeLinejoin="round"
          strokeLinecap="round"
          vectorEffect="non-scaling-stroke"
        />
        <line
          x1={WIDTH}
          x2={WIDTH}
          y1={lastY}
          y2={lastY}
          stroke="currentColor"
          strokeWidth="6"
          strokeLinecap="round"
          vectorEffect="non-scaling-stroke"
        />
      </svg>
    </div>
  )
}
