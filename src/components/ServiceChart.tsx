import { motion } from 'framer-motion'
import {
  Cell,
  Legend,
  Pie,
  PieChart,
  ResponsiveContainer,
  Tooltip,
} from 'recharts'
import { transportImages } from '../data/transport-images'
import { scrollTransitionWithDelay, scrollViewport } from '../motion/scroll'
import { SectionHeading } from './SectionHeading'
import { AnimatedCounter } from './AnimatedCounter'

const distribution = [
  { name: 'House shifting', value: 15, color: '#9333ea' },
  { name: 'Office relocation', value: 9, color: '#7c3aed' },
  { name: 'Goods transportation', value: 70, color: '#a855f7' },
  { name: 'Loading & unloading', value: 6, color: '#d8b4fe' },
]

export function ServiceChart() {
  return (
    <section
      id="stats"
      className="relative overflow-hidden bg-white py-20 dark:bg-transparent md:py-28"
      aria-labelledby="stats-heading"
    >
      {/* Light mode: subtle photo textures */}
      <div
        className="pointer-events-none absolute inset-0 bg-cover bg-center opacity-[0.12] motion-safe:animate-[insights-bg_32s_ease-in-out_infinite_alternate] dark:hidden"
        style={{
          backgroundImage: `url(${transportImages.bgInsights})`,
        }}
        aria-hidden
      />
      <div
        className="pointer-events-none absolute inset-0 bg-cover bg-center opacity-[0.05] mix-blend-soft-light dark:hidden"
        style={{
          backgroundImage: `url(${transportImages.chartBg})`,
        }}
        aria-hidden
      />

      {/* Dark mode: base + animated wave-style gradients */}
      <div
        className="pointer-events-none absolute inset-0 hidden bg-stone-950 dark:block"
        aria-hidden
      />
      {/* Primary flowing gradient (dark) */}
      <div
        aria-hidden
        className="pointer-events-none absolute inset-0 hidden bg-[length:400%_400%] motion-safe:animate-[stats-wave-flow_34s_ease-in-out_infinite_alternate] motion-reduce:animate-none dark:block"
        style={{
          backgroundImage: `linear-gradient(
            118deg,
            rgb(12 10 9) 0%,
            rgb(30 27 75 / 0.55) 22%,
            rgb(49 46 129 / 0.45) 40%,
            rgb(67 56 202 / 0.35) 52%,
            rgb(30 58 138 / 0.3) 68%,
            rgb(28 25 23) 88%,
            rgb(12 10 9) 100%
          )`,
        }}
      />
      {/* Soft drifting “mist” — smooth clouds, no stripe bands */}
      <div
        aria-hidden
        className="pointer-events-none absolute inset-0 hidden bg-[length:155%_155%] opacity-[0.92] motion-safe:animate-[stats-snapshot-mist_50s_ease-in-out_infinite_alternate] motion-reduce:animate-none dark:block"
        style={{
          backgroundImage: `
            radial-gradient(ellipse 82% 68% at 22% 32%, rgba(139, 92, 246, 0.26) 0%, transparent 54%),
            radial-gradient(ellipse 72% 58% at 78% 22%, rgba(59, 130, 246, 0.2) 0%, transparent 50%),
            radial-gradient(ellipse 95% 72% at 48% 88%, rgba(30, 41, 59, 0.48) 0%, transparent 58%),
            radial-gradient(ellipse 60% 48% at 65% 48%, rgba(168, 85, 247, 0.16) 0%, transparent 46%)
          `,
        }}
      />
      {/* Slow sweeping highlight */}
      <div
        aria-hidden
        className="pointer-events-none absolute inset-0 hidden bg-[length:280%_280%] opacity-65 mix-blend-soft-light motion-safe:animate-[stats-snapshot-sheen_30s_ease-in-out_infinite_alternate] motion-reduce:animate-none dark:block"
        style={{
          backgroundImage: `linear-gradient(
            108deg,
            transparent 0%,
            rgba(167, 139, 250, 0.2) 38%,
            rgba(99, 102, 241, 0.16) 50%,
            rgba(192, 132, 252, 0.14) 62%,
            transparent 100%
          )`,
        }}
      />

      <div className="relative z-10 mx-auto max-w-6xl px-4 md:px-6">
        <div className="dark:[&_p:last-of-type]:text-stone-200">
          <SectionHeading
            eyebrow="Performance snapshot"
            titleId="stats-heading"
            title="Where our bookings concentrate"
            subtitle="Illustrative mix of service categories—your quote is always based on actual inventory, distance, and access."
          />
        </div>

        <div className="mb-14 grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
          {[
            { label: 'Completed deliveries (est.)', value: 3200, suffix: '+' },
            { label: 'Customer satisfaction', value: 97, suffix: '%' },
            { label: 'Cities regularly served', value: 45, suffix: '+' },
            { label: 'Avg. response time', value: 2, suffix: ' hrs' },
          ].map((stat, i) => (
            <motion.div
              key={stat.label}
              className="rounded-2xl border border-brand-100 bg-white p-6 text-center shadow-sm dark:border-stone-800 dark:bg-stone-900/80"
              initial={{ opacity: 0, y: 16 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={scrollViewport}
              transition={scrollTransitionWithDelay(i * 0.06)}
            >
              <div className="font-display text-3xl font-bold text-brand-600 dark:text-brand-400">
                <AnimatedCounter value={stat.value} suffix={stat.suffix} />
              </div>
              <p className="mt-2 text-sm text-stone-600 dark:text-stone-400">
                {stat.label}
              </p>
            </motion.div>
          ))}
        </div>

        <motion.div
          className="rounded-2xl border border-stone-200 bg-white/95 p-4 shadow-xl dark:border-stone-800 dark:bg-stone-900/95 md:p-8"
          initial={{ opacity: 0, y: 24 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={scrollViewport}
          transition={scrollTransitionWithDelay(0.12)}
        >
          <h3 className="mb-6 text-center font-display text-lg font-semibold text-stone-900 dark:text-white">
            Service mix by category
          </h3>
          <div className="h-[360px] w-full min-w-0 md:h-[400px]">
            <ResponsiveContainer
              width="100%"
              height="100%"
              minHeight={280}
              initialDimension={{ width: 400, height: 360 }}
            >
              <PieChart>
                <Pie
                  data={distribution}
                  dataKey="value"
                  nameKey="name"
                  cx="50%"
                  cy="50%"
                  innerRadius={60}
                  outerRadius={120}
                  paddingAngle={3}
                  animationBegin={0}
                  animationDuration={900}
                  label={({ name, percent }) =>
                    `${name}: ${((percent ?? 0) * 100).toFixed(0)}%`
                  }
                >
                  {distribution.map((entry) => (
                    <Cell key={entry.name} fill={entry.color} stroke="none" />
                  ))}
                </Pie>
                <Tooltip
                  formatter={(value) => [`${value ?? 0}%`, 'Share']}
                  contentStyle={{
                    borderRadius: '12px',
                    border: '1px solid #e7e5e4',
                  }}
                />
                <Legend
                  verticalAlign="bottom"
                  height={36}
                  formatter={(value) => (
                    <span className="text-stone-700 dark:text-stone-300">
                      {value}
                    </span>
                  )}
                />
              </PieChart>
            </ResponsiveContainer>
          </div>
        </motion.div>
      </div>
      <style>{`
        @keyframes insights-bg {
          from { transform: scale(1.03); }
          to { transform: scale(1.08); }
        }
        @keyframes stats-wave-flow {
          0% {
            background-position: 0% 45%;
          }
          100% {
            background-position: 100% 55%;
          }
        }
        @keyframes stats-snapshot-mist {
          0% {
            background-position: 8% 12%;
          }
          100% {
            background-position: 92% 88%;
          }
        }
        @keyframes stats-snapshot-sheen {
          0% {
            background-position: 0% 50%;
          }
          100% {
            background-position: 100% 50%;
          }
        }
      `}</style>
    </section>
  )
}
