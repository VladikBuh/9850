import type {ParkingSpace, ParkingSpaceStatus} from '../types';

const RESERVED = new Set([7, 14, 21]);
const ACCESSIBLE = new Set([11, 22]);
const EV_CHARGING = new Set([9, 18]);

function statusFor(id: number): ParkingSpaceStatus {
  if (RESERVED.has(id)) {
    return 'reserved';
  }
  if (ACCESSIBLE.has(id)) {
    return 'accessible';
  }
  if (EV_CHARGING.has(id)) {
    return 'evCharging';
  }
  return 'available';
}

function typeFor(status: ParkingSpaceStatus): string {
  if (status === 'accessible') {
    return 'Accessible';
  }
  if (status === 'evCharging') {
    return 'EV Charging';
  }
  return 'Standard';
}

export const PARKING_SPACES: ParkingSpace[] = Array.from({length: 24}, (_, i) => {
  const id = i + 1;
  const status = statusFor(id);
  const zone = id <= 12 ? 'Zone A' : 'Zone B';
  const distance = 60 + (id % 6) * 15;
  return {
    id,
    status,
    zone,
    distanceLabel: `${distance}m to entrance`,
    type: typeFor(status),
  };
});
