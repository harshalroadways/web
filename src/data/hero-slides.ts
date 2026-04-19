import { transportImages } from './transport-images'

export type HeroSlide = {
  /** Matches offerings in Services section */
  service: string
  title: string
  subtitle: string
  /** Three points for the hero glass card—aligned with this slide’s theme */
  highlights: readonly [string, string, string]
  image: string
  alt: string
  backgroundPosition?: string
}

/**
 * One background per slide — each image maps to a service theme (regional transport,
 * house moves, logistics, commercial freight, road haulage, cargo / part loads).
 */
export const heroSlides: readonly HeroSlide[] = [
  {
    service: 'Regional & intercity routes',
    title: 'Reliable Transport Service in Rajasthan',
    subtitle:
      'Door-to-door logistics with trained crews, insured handling, and transparent pricing across the state.',
    highlights: [
      'Jaipur, Jodhpur, Udaipur & statewide lanes—pickup and drop where you need them',
      'Crews briefed on your cargo type, not one generic checklist',
      'Clear quotes upfront—kilometres, vehicle class, and handling spelled out',
    ],
    image: transportImages.heroRegionalDeliveryTruck,
    alt: 'Commercial delivery truck at sunrise or sunset — regional road transport',
  },
  {
    service: 'House shifting & packing',
    title: 'Safe Movers and Packers for Home and Office',
    subtitle:
      'Careful packing, labeling, and unpacking so your furniture and valuables arrive exactly as they left.',
    highlights: [
      'Bubble wrap, cartons, and room labels so nothing gets lost in the move',
      'Floor mats and careful lifting for heavy furniture and fragile décor',
      'Unpacking and placement help so your home or office is usable sooner',
    ],
    image: transportImages.heroMoversPackers,
    alt: 'Commercial truck on an Indian road — local moving and packing services',
    backgroundPosition: 'center',
  },
  {
    service: 'Dedicated & shared loads',
    title: 'Fast, Secure, and Affordable Logistics Support',
    subtitle:
      'Intercity lanes, shared and dedicated loads, and scheduling that fits your move or business timeline.',
    highlights: [
      'Shared truck space when you want economy; full truck when the clock matters',
      'Slots aligned with your production peaks or household move dates',
      'One coordinator from booking to POD—no chasing multiple desks',
    ],
    image: transportImages.heroLogisticsSupport,
    alt: 'Decorated truck on a tree-lined Indian road — intercity lanes and shared loads',
    backgroundPosition: '58% center',
  },
  {
    service: 'Commercial goods',
    title: 'Commercial Goods Transport',
    subtitle:
      'Retail, industrial, and bulk shipments with route planning and on-time delivery commitments.',
    highlights: [
      'Right-sized vehicles for retail rolls, industrial lots, or bulk cartons',
      'Route plans that respect factory gates, markets, and delivery windows',
      'Load-secure checks and handover notes so your stock matches the invoice',
    ],
    image: transportImages.heroCommercialGoods,
    alt: 'Colourful Indian cargo truck on a highway with bougainvillea and open sky — commercial freight',
    backgroundPosition: 'left center',
  },
  {
    service: 'Full-truck & line-haul',
    title: 'Road Freight You Can Count On',
    subtitle:
      'Experienced drivers, maintained fleet, and routes tuned for timely pickup and drop across Rajasthan.',
    highlights: [
      'Full truckload (FTL) on highways and long-distance lanes you can book in advance',
      'Drivers who know major NH corridors and night-ban rules where they apply',
      'Fleet checks before dispatch—fewer breakdown surprises on the road',
    ],
    image: transportImages.heroRoadFreightHighway,
    alt: 'Multi-lane highway with goods trucks — long-distance road freight and line-haul',
    backgroundPosition: 'center',
  },
  {
    service: 'Cargo & part loads',
    title: 'Cargo Ready for the Next Mile',
    subtitle:
      'Palletised goods, part loads, and full truck options—handled with care from yard to destination.',
    highlights: [
      'Part-load pricing—you pay for the space your pallets actually need',
      'Strapping and stacking discipline for mixed cartons on shared decks',
      'Yard pickup or last-mile drop—tell us the pin codes and we propose the vehicle',
    ],
    image: transportImages.heroCargoNextMile,
    alt: 'Goods carrier truck on a scenic coastal road — full and part load transport',
    backgroundPosition: 'center',
  },
]
