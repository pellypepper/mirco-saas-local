"use client"
import { 
 
    
  Star,
   Target, Percent
} from 'lucide-react';


const SecondaryMetrics = ({ overview, StatCard }: { overview: any; StatCard: any }) => {
  return (
  <div className="grid grid-cols-1 sm:grid-cols-3 gap-6 mb-8">
          <StatCard title="Avg Order Value" value={overview.avgOrderValue} change={0} icon={Target} color="from-chart-2 to-chart-3" prefix="£" />
          <StatCard title="Conversion Rate" value={overview.conversionRate} change={0} icon={Percent} color="from-chart-5 to-chart-5" suffix="%" />
          <StatCard title="Customer Satisfaction" value={overview.customerSatisfaction} change={0} icon={Star} color="from-chart-4 to-chart-4" suffix="/5" showTrend={false} />
        </div>
  )
}

export default SecondaryMetrics
