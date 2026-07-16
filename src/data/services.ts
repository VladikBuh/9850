import type {ServiceItem} from '../types';

export const SERVICES: ServiceItem[] = [
  // Resort
  {
    id: 'private-dining-request',
    category: 'resort',
    icon: '🍽️',
    title: 'Private Dining Request',
    description:
      'Arrange an intimate dining experience for a celebration, business meeting, or quiet evening. The resort team coordinates the setting, menu preferences, seating arrangement, and other important details.',
    availabilityLabel: '48h notice',
    responseTime: 'Within 30 minutes',
    conditions:
      'Subject to dining room and culinary team availability. Dietary requirements must be included in the request. Cancellations are accepted up to 2 hours before the reserved time.',
  },
  {
    id: 'lounge-reservation',
    category: 'resort',
    icon: '🛋️',
    title: 'Lounge Reservation',
    description:
      'Reserve a comfortable lounge area for a private conversation, informal meeting, or relaxing break during your visit. Seating can be prepared according to the number of guests and preferred atmosphere.',
    availabilityLabel: 'Same day',
    responseTime: 'Within 20 minutes',
    conditions:
      'Reservations depend on current lounge capacity. Seating locations cannot be guaranteed, but preferences will be considered whenever possible.',
  },
  {
    id: 'special-occasion-setup',
    category: 'resort',
    icon: '🎉',
    title: 'Special Occasion Setup',
    description:
      'Prepare a refined setting for a birthday, anniversary, engagement, or other meaningful occasion. The team can arrange table décor, flowers, a personalized greeting, and coordinated food service.',
    availabilityLabel: '72h notice',
    responseTime: 'Within 1 hour',
    conditions:
      'Available décor and setup options depend on the selected venue. Additional charges may apply after the requested details are reviewed and confirmed.',
  },
  {
    id: 'taxi-request',
    category: 'resort',
    icon: '🚕',
    title: 'Taxi Request',
    description:
      'Request a taxi for arrival, departure, or transportation to another location in Madrid. Provide the preferred pickup time, number of passengers, and destination.',
    availabilityLabel: 'Daily',
    responseTime: 'Within 15 minutes',
    conditions:
      'Pickup time depends on local traffic and taxi availability. Guests should be ready at the confirmed meeting point at least 5 minutes before departure.',
  },
  {
    id: 'coat-storage',
    category: 'resort',
    icon: '🧥',
    title: 'Coat Storage',
    description:
      'Leave coats, umbrellas, and small personal items in a supervised storage area while using the resort facilities. A collection reference is provided when items are accepted.',
    availabilityLabel: 'During opening hours',
    responseTime: 'Immediate',
    conditions:
      'Large luggage, fragile objects, and valuable items may require separate handling. The service is available only to registered visitors.',
  },
  {
    id: 'accessibility-support',
    category: 'resort',
    icon: '♿',
    title: 'Accessibility Support',
    description:
      'Request assistance with accessible entrances, seating, mobility access, elevators, or transportation between resort areas. The team will review individual requirements before the visit.',
    availabilityLabel: 'Daily',
    responseTime: 'Within 20 minutes',
    conditions:
      'Submit the request before arrival whenever possible. Include any mobility equipment, companion assistance, or seating requirements that should be considered.',
  },
  {
    id: 'event-space-inquiry',
    category: 'resort',
    icon: '🎟️',
    title: 'Event Space Inquiry',
    description:
      'Request information about a private room or resort space for a reception, meeting, presentation, or social gathering. The team can recommend a suitable venue based on group size and event format.',
    availabilityLabel: "5 days' notice",
    responseTime: 'Within 2 hours',
    conditions:
      'Submitting an inquiry does not confirm the space. Final availability, capacity, setup, and service conditions are provided after review by the events team.',
  },
  {
    id: 'flower-arrangement-request',
    category: 'resort',
    icon: '💐',
    title: 'Flower Arrangement Request',
    description:
      'Order a floral arrangement for a dining table, lounge reservation, celebration, or welcome gesture. Guests can indicate the occasion, preferred style, size, and delivery location.',
    availabilityLabel: '24h notice',
    responseTime: 'Within 45 minutes',
    conditions:
      'Specific flower varieties depend on seasonal availability. The team may suggest suitable alternatives when the requested flowers cannot be provided.',
  },
  {
    id: 'lost-item-assistance',
    category: 'resort',
    icon: '👜',
    title: 'Lost Item Assistance',
    description:
      'Report an item that may have been left in the resort, clubhouse, restaurant, parking area, or event space. Provide a detailed description and the last known location.',
    availabilityLabel: 'Daily',
    responseTime: 'Within 1 hour',
    conditions:
      'Recovery cannot be guaranteed. Verified items are stored for a limited period and released after ownership details have been confirmed.',
  },
  {
    id: 'preferred-seating-request',
    category: 'resort',
    icon: '🪑',
    title: 'Preferred Seating Request',
    description:
      'Request a preferred table or seating area for a restaurant, lounge, terrace, or scheduled event. Options may include quieter seating, accessible placement, or space for a larger group.',
    availabilityLabel: 'Same day',
    responseTime: 'Within 20 minutes',
    conditions:
      'Preferred seating is subject to current capacity and venue layout. The team will provide the closest available alternative when the selected area is unavailable.',
  },
  {
    id: 'personal-item-delivery',
    category: 'resort',
    icon: '📦',
    title: 'Personal Item Delivery',
    description:
      'Request delivery of a small personal item, document, gift, or prepared package between designated resort areas. The recipient and delivery location must be clearly specified.',
    availabilityLabel: 'During opening hours',
    responseTime: 'Within 30 minutes',
    conditions:
      'Sealed, restricted, valuable, or oversized items may not be accepted. Delivery is limited to approved locations within the resort.',
  },
  {
    id: 'general-guest-assistance',
    category: 'resort',
    icon: '👤',
    title: 'General Guest Assistance',
    description:
      'Send a request when you need help that does not match another service category. The guest team can assist with resort navigation, opening hours, reservations, venue information, and visit planning.',
    availabilityLabel: 'Daily',
    responseTime: 'Within 15 minutes',
    conditions:
      'Provide a clear description of the assistance required. Complex requests may be transferred to the relevant resort or golf club department.',
  },

  // Golf Club
  {
    id: 'golf-cart-reservation',
    category: 'golfClub',
    icon: '🛺',
    title: 'Golf Cart Reservation',
    description:
      'Reserve a golf cart for convenient transportation around the course. Select the preferred date, start time, rental duration, number of passengers, and pickup location.',
    availabilityLabel: 'Same day',
    responseTime: 'Within 20 minutes',
    conditions:
      'Subject to cart availability and course conditions. The designated driver must follow all cart paths, safety instructions, and restricted-area rules.',
  },
  {
    id: 'golf-club-set-rental',
    category: 'golfClub',
    icon: '⛳',
    title: 'Golf Club Set Rental',
    description:
      'Request a complete golf club set suited to your playing level and preferred hand. Adult and junior sets may include woods, irons, wedges, a putter, and a golf bag.',
    availabilityLabel: 'Daily',
    responseTime: 'Within 20 minutes',
    conditions:
      'Right-handed and left-handed sets are subject to availability. Equipment must be returned after the reserved period in the same condition in which it was received.',
  },
  {
    id: 'golf-lesson-request',
    category: 'golfClub',
    icon: '🏌️',
    title: 'Golf Lesson Request',
    description:
      'Arrange an individual or group lesson with a golf instructor. Sessions can focus on swing fundamentals, putting, short-game technique, course strategy, or general skill development.',
    availabilityLabel: '24h notice',
    responseTime: 'Within 1 hour',
    conditions:
      'Instructor availability depends on the selected date and lesson format. Include your current skill level and main training goal when submitting the request.',
  },
  {
    id: 'caddie-request',
    category: 'golfClub',
    icon: '👤',
    title: 'Caddie Request',
    description:
      'Request assistance from a caddie during your round. The caddie can help carry equipment, read the course, estimate distances, maintain pace, and provide general playing guidance.',
    availabilityLabel: '48h notice',
    responseTime: 'Within 1 hour',
    conditions:
      'Caddie assignment depends on staff availability and the selected tee time. Playing decisions remain the responsibility of the golfer.',
  },
  {
    id: 'practice-area-reservation',
    category: 'golfClub',
    icon: '🎯',
    title: 'Practice Area Reservation',
    description:
      'Reserve time in a designated practice area for driving, pitching, chipping, or putting. Choose the preferred training zone, session duration, and number of participants.',
    availabilityLabel: 'Same day',
    responseTime: 'Within 20 minutes',
    conditions:
      'Practice access depends on current capacity and scheduled training sessions. Golf balls and equipment may need to be requested separately.',
  },
  {
    id: 'locker-reservation',
    category: 'golfClub',
    icon: '🚪',
    title: 'Locker Reservation',
    description:
      'Reserve a secure locker for clothing, footwear, and small personal items during your golf visit. Standard and larger locker options may be available.',
    availabilityLabel: 'Daily',
    responseTime: 'Within 15 minutes',
    conditions:
      'Lockers are provided for the confirmed reservation period only. Valuable, fragile, or prohibited items should not be stored inside.',
  },
  {
    id: 'golf-shoe-rental',
    category: 'golfClub',
    icon: '👟',
    title: 'Golf Shoe Rental',
    description:
      'Request golf footwear for use on the course or practice grounds. Select the required size and preferred fit when submitting the reservation.',
    availabilityLabel: 'Daily',
    responseTime: 'Within 15 minutes',
    conditions:
      'Available sizes and models may vary. Shoes must be worn with suitable socks and returned after use in acceptable condition.',
  },
  {
    id: 'golf-bag-rental',
    category: 'golfClub',
    icon: '🎒',
    title: 'Golf Bag Rental',
    description:
      'Reserve a lightweight carry bag or trolley-compatible golf bag for your round. The service is useful for guests bringing individual clubs without a complete bag.',
    availabilityLabel: 'Daily',
    responseTime: 'Within 15 minutes',
    conditions:
      'Golf clubs and accessories are not automatically included. The bag must be returned to the designated service point after the reserved period.',
  },
  {
    id: 'equipment-storage',
    category: 'golfClub',
    icon: '📦',
    title: 'Equipment Storage',
    description:
      'Request temporary storage for a golf bag, club set, trolley, or selected accessories between scheduled games or practice sessions.',
    availabilityLabel: '24h notice',
    responseTime: 'Within 30 minutes',
    conditions:
      'Storage duration and available space are limited. All equipment must be identified and collected using the provided reference details.',
  },
  {
    id: 'club-adjustment-assistance',
    category: 'golfClub',
    icon: '🔧',
    title: 'Club Adjustment Assistance',
    description:
      'Request basic assistance with grip checks, club cleaning, loft and lie inspection, or minor equipment adjustments before a game.',
    availabilityLabel: 'During service hours',
    responseTime: 'Within 45 minutes',
    conditions:
      'The service covers inspection and minor adjustments only. Complex repairs or replacement parts may require additional time and separate confirmation.',
  },
  {
    id: 'equipment-fitting-session',
    category: 'golfClub',
    icon: '📏',
    title: 'Equipment Fitting Session',
    description:
      'Arrange a guided fitting session to compare club length, shaft flexibility, grip size, clubhead type, and general equipment suitability.',
    availabilityLabel: '48h notice',
    responseTime: 'Within 2 hours',
    conditions:
      'Fitting sessions depend on specialist availability. Recommendations are informational and do not include equipment purchase or custom manufacturing.',
  },
  {
    id: 'tee-time-request',
    category: 'golfClub',
    icon: '🏁',
    title: 'Tee Time Request',
    description:
      'Submit a preferred start time for a 9-hole or 18-hole round. Include the number of players, playing format, experience level, and any required rental services.',
    availabilityLabel: 'Up to 7 days ahead',
    responseTime: 'Within 30 minutes',
    conditions:
      'Submitting a request does not immediately confirm the tee time. Final approval depends on course capacity, maintenance schedules, events, and weather conditions.',
  },
  {
    id: 'junior-golf-equipment-request',
    category: 'golfClub',
    icon: '🧒',
    title: 'Junior Golf Equipment Request',
    description:
      'Reserve age-appropriate clubs and lightweight equipment for a junior player. The set can be selected according to height, dominant hand, and experience level.',
    availabilityLabel: '24h notice',
    responseTime: 'Within 30 minutes',
    conditions:
      'Junior players must remain accompanied by an adult unless participating in a supervised club activity. Equipment sizes depend on current availability.',
  },
  {
    id: 'golf-accessories-request',
    category: 'golfClub',
    icon: '🧤',
    title: 'Golf Accessories Request',
    description:
      'Request useful accessories such as gloves, golf balls, tees, towels, umbrellas, or ball markers before a game or training session.',
    availabilityLabel: 'Same day',
    responseTime: 'Within 15 minutes',
    conditions:
      'Requested items depend on available stock. Disposable or personal-use accessories may involve an additional charge confirmed before collection.',
  },
  {
    id: 'course-orientation-request',
    category: 'golfClub',
    icon: '🗺️',
    title: 'Course Orientation Request',
    description:
      'Arrange a brief introduction to the course before beginning a round. A team member can explain starting points, cart paths, practice areas, rest zones, and important local rules.',
    availabilityLabel: 'Daily',
    responseTime: 'Within 20 minutes',
    conditions:
      'Orientation does not replace a full golf lesson or personal caddie service. Guests should arrive at the meeting point before the confirmed time.',
  },
  {
    id: 'clubhouse-table-reservation',
    category: 'golfClub',
    icon: '🍽️',
    title: 'Clubhouse Table Reservation',
    description:
      'Reserve a table in the clubhouse before or after a round. Indicate the preferred time, number of guests, seating area, and any dietary requirements.',
    availabilityLabel: 'Same day',
    responseTime: 'Within 20 minutes',
    conditions:
      'Table placement depends on clubhouse capacity and scheduled events. Outdoor seating may be changed due to weather conditions.',
  },
];
