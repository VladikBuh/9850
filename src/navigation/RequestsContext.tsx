import React, {createContext, useCallback, useContext, useMemo} from 'react';

import {usePersistedState} from '../hooks/usePersistedState';
import type {ParkingReservation, ParkingSpace, RequestCategory, SubmittedRequest} from '../types';

function nextRefCode(existing: SubmittedRequest[]): string {
  const maxNum = existing.reduce((max, r) => {
    const match = r.refCode.match(/(\d+)$/);
    return match ? Math.max(max, parseInt(match[1], 10)) : max;
  }, 1042);
  return `#GC-${maxNum + 1}`;
}

function submittedLabel(): string {
  return `Submitted ${new Date().toLocaleDateString('en-US', {
    month: 'short',
    day: 'numeric',
    year: 'numeric',
  })}`;
}

type RequestsContextValue = {
  submittedRequests: SubmittedRequest[];
  submitRequest: (category: RequestCategory, title: string, statusLabel?: string) => void;

  parkingReservations: ParkingReservation[];
  reserveParkingSpace: (space: ParkingSpace) => void;
};

const RequestsContext = createContext<RequestsContextValue | null>(null);

export function RequestsProvider({children}: {children: React.ReactNode}) {
  const [submittedRequests, setSubmittedRequests] = usePersistedState<SubmittedRequest[]>(
    'requests.submitted',
    [],
  );
  const [parkingReservations, setParkingReservations] = usePersistedState<ParkingReservation[]>(
    'requests.parking',
    [],
  );

  const submitRequest = useCallback(
    (category: RequestCategory, title: string, statusLabel: string = 'Under Review') => {
      setSubmittedRequests(prev => [
        {
          id: `${Date.now()}-${prev.length}`,
          refCode: nextRefCode(prev),
          title,
          category,
          status: 'active',
          statusLabel,
          submittedLabel: submittedLabel(),
          timestamp: Date.now(),
        },
        ...prev,
      ]);
    },
    [],
  );

  const reserveParkingSpace = useCallback(
    (space: ParkingSpace) => {
      const now = new Date();
      setParkingReservations(prev => [
        {
          id: `${Date.now()}`,
          spaceId: space.id,
          zone: space.zone,
          dateLabel: now.toLocaleDateString('en-US', {
            month: 'short',
            day: 'numeric',
            year: 'numeric',
          }),
          timeLabel: now.toLocaleTimeString('en-US', {hour: 'numeric', minute: '2-digit'}),
          status: 'In Progress',
        },
        ...prev,
      ]);
      submitRequest('Parking', `Parking Space ${space.id} Reservation`, 'In Progress');
    },
    [submitRequest],
  );

  const value = useMemo(
    () => ({
      submittedRequests,
      submitRequest,
      parkingReservations,
      reserveParkingSpace,
    }),
    [submittedRequests, submitRequest, parkingReservations, reserveParkingSpace],
  );

  return <RequestsContext.Provider value={value}>{children}</RequestsContext.Provider>;
}

export function useRequestsState() {
  const context = useContext(RequestsContext);
  if (!context) {
    throw new Error('useRequestsState must be used within RequestsProvider');
  }
  return context;
}
