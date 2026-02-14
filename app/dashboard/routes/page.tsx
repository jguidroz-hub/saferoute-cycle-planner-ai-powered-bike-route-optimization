'use client';
import { useState } from 'react';
import Link from 'next/link';

type Route = { id: string; name: string; distance: string; elevation: string; safety: number; surface: string; trafficLevel: 'low' | 'medium' | 'high'; bikeInfra: string; estimatedTime: string; hazards: string[]; };

const DEMO: Route[] = [
  { id: '1', name: 'Lakefront Trail → Downtown', distance: '8.2 mi', elevation: '+45 ft', safety: 92, surface: 'Paved path', trafficLevel: 'low', bikeInfra: 'Protected lane', estimatedTime: '35 min', hazards: [] },
  { id: '2', name: 'University Loop', distance: '5.1 mi', elevation: '+120 ft', safety: 85, surface: 'Mixed', trafficLevel: 'medium', bikeInfra: 'Bike lane', estimatedTime: '25 min', hazards: ['Construction on Oak St'] },
  { id: '3', name: 'River Valley Express', distance: '12.4 mi', elevation: '+280 ft', safety: 78, surface: 'Paved road', trafficLevel: 'medium', bikeInfra: 'Shared lane', estimatedTime: '55 min', hazards: ['Heavy traffic 5-6pm', 'No shoulder on bridge'] },
  { id: '4', name: 'Park District Circuit', distance: '3.8 mi', elevation: '+15 ft', safety: 96, surface: 'Paved path', trafficLevel: 'low', bikeInfra: 'Car-free path', estimatedTime: '18 min', hazards: [] },
  { id: '5', name: 'Industrial Shortcut', distance: '6.7 mi', elevation: '+60 ft', safety: 62, surface: 'Mixed', trafficLevel: 'high', bikeInfra: 'None', estimatedTime: '30 min', hazards: ['Truck traffic', 'Poor lighting', 'No bike infra'] },
];

export default function RoutesPage() {
  const [sort, setSort] = useState<'safety' | 'distance'>('safety');
  const sorted = [...DEMO].sort((a, b) => sort === 'safety' ? b.safety - a.safety : parseFloat(a.distance) - parseFloat(b.distance));

  return (
    <div className="min-h-screen bg-gray-50">
      <header className="bg-white border-b px-6 py-3 flex items-center justify-between">
        <div className="flex items-center gap-4">
          <Link href="/dashboard" className="text-gray-500 hover:text-gray-700">← Dashboard</Link>
          <h1 className="font-bold text-lg">🚴 Route Planner</h1>
        </div>
        <button className="px-4 py-2 bg-black text-white text-sm rounded-lg">📍 Plan New Route</button>
      </header>
      <div className="max-w-5xl mx-auto px-6 py-8">
        <div className="flex gap-2 mb-6">
          <button onClick={()=>setSort('safety')} className={`px-3 py-1.5 text-xs rounded-lg font-medium ${sort==='safety'?'bg-black text-white':'bg-white border'}`}>Sort by Safety</button>
          <button onClick={()=>setSort('distance')} className={`px-3 py-1.5 text-xs rounded-lg font-medium ${sort==='distance'?'bg-black text-white':'bg-white border'}`}>Sort by Distance</button>
        </div>
        <div className="space-y-4">
          {sorted.map(route=>{
            const color = route.safety >= 90 ? '#22c55e' : route.safety >= 75 ? '#eab308' : '#ef4444';
            return (
              <div key={route.id} className="bg-white rounded-xl border p-5 hover:shadow-md transition-shadow">
                <div className="flex items-start justify-between mb-3">
                  <div>
                    <h3 className="font-semibold text-lg">{route.name}</h3>
                    <div className="flex items-center gap-4 mt-1 text-sm text-gray-500">
                      <span>📏 {route.distance}</span><span>⛰️ {route.elevation}</span><span>⏱️ {route.estimatedTime}</span>
                      <span>🛣️ {route.surface}</span><span>🚲 {route.bikeInfra}</span>
                    </div>
                  </div>
                  <div className="text-center">
                    <div className="w-16 h-16 rounded-full border-4 flex items-center justify-center" style={{borderColor: color}}>
                      <span className="text-lg font-bold" style={{color}}>{route.safety}</span>
                    </div>
                    <p className="text-xs text-gray-400 mt-1">Safety</p>
                  </div>
                </div>
                {route.hazards.length > 0 && (
                  <div className="flex flex-wrap gap-2 mt-2">
                    {route.hazards.map((h,i)=>(
                      <span key={i} className="text-xs bg-red-50 text-red-600 px-2 py-1 rounded">⚠️ {h}</span>
                    ))}
                  </div>
                )}
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
}
