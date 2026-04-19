/** Shared Unsplash URLs — trucks, lorries, road freight. */
function us(id: string, w: number, quality = 82) {
  return `https://images.unsplash.com/${id}?auto=format&fit=crop&w=${w}&q=${quality}`
}

export const transportImages = {
  /** Hero slide 1 — commercial delivery truck, golden-hour light (Unsplash). */
  heroRegionalDeliveryTruck: us('photo-1687226675098-82bfca59e5ba', 2400, 80),
  /** Hero slide — movers & packers / house shifting (Unsplash). */
  heroMoversPackers: us('photo-1768227159705-d9ed534a4e81', 1920, 80),
  heroWarehouseTruck: us('photo-1586528116311-ad8dd3c8310d', 1920),
  /** Hero slide — dedicated & shared loads / logistics (Unsplash). */
  heroLogisticsSupport: us('photo-1644749022193-d3d64bf91e81', 1920, 80),
  /** Hero slide — commercial goods / cargo transport (Unsplash, Indian highway truck). */
  heroCommercialGoods: us('photo-1621789654564-047a89bdb528', 2400, 80),
  /** Hero slide — full-truck & line-haul / highway freight (Unsplash). */
  heroRoadFreightHighway: us('photo-1765571394962-c8d03a8d0ef5', 1920, 80),
  /** Hero slide — cargo & part loads / goods carrier (Unsplash). */
  heroCargoNextMile: us('photo-1626446644149-92e5039b74f0', 2400, 80),
  aboutBg: us('photo-1566576721346-d4a3b4e8e0e0', 1600, 65),
  /** About section featured image — Indian road freight (external). */
  aboutIndianTruck:
    'https://truexautomall.com/wp-content/uploads/2025/08/Indian-truck.jpg',
  chartBg: us('photo-1601584115197-26b0c29a82dd', 1600, 55),
  /** Services section — Indian road freight / lorry (Unsplash). */
  bgServices: us('photo-1716512060259-d114cfba13e8', 1932, 80),
  bgInsights: us('photo-1516937941344-00b4e0331c28', 1600, 60),
  bgWhyUs: us('photo-1530521954074-e64f6810d32b', 1600, 58),
  /** Service coverage — mountain road / long-haul reach (Unsplash). */
  bgCoverage: us('photo-1624898115402-eddff44b6491', 1920, 80),
  bgTestimonials: us('photo-1566576721346-d4a3b4e8e0e0', 1600, 56),
} as const
