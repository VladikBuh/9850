import React, { useState } from 'react';
import {
  ScrollView,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from 'react-native';
import LinearGradient from 'react-native-linear-gradient';

import { FadeInItem } from '../../components/FadeInItem';

import { ScreenHeader } from '../../components/ScreenHeader';
import { Fonts } from '../../constants/theme';

import { SERVICES } from '../../data/services';
import { useAppNavigation } from '../../navigation/NavigationContext';
import { useRequestsState } from '../../navigation/RequestsContext';
import { Colors } from '../../theme/colors';

import type { ServiceCategory, ServiceItem } from '../../types';
import { MyParkingScreen } from './MyParkingScreen';
import { ParkingMapScreen } from './ParkingMapScreen';

const CATEGORIES: { key: ServiceCategory; label: string }[] = [
  { key: 'resort', label: 'Resort' },
  { key: 'golfClub', label: 'Golf Club' },
  { key: 'parking', label: 'Parking' },
];

type ParkingSegment = 'map' | 'my';

export function ServicesScreen() {
  const { openServiceRequest, openServiceDetail, openRequestCenter } =
    useAppNavigation();
  const { submittedRequests } = useRequestsState();
  const [category, setCategory] = useState<ServiceCategory>('resort');
  const [parkingSegment, setParkingSegment] = useState<ParkingSegment>('map');

  const activeRequestCount = submittedRequests.filter(
    r => r.status === 'active',
  ).length;
  const items = SERVICES.filter(service => service.category === category);

  return (
    <View style={styles.ServicesScreenContainer}>
      <ScreenHeader
        title="Services"
        subtitle="Reservations & requests"
        notificationCount={activeRequestCount}
        onPressBell={openRequestCenter}
      />

      <View style={styles.ServicesScreenSegmentControl}>
        {CATEGORIES.map(cat => {
          const isActive = cat.key === category;
          return (
            <TouchableOpacity
              key={cat.key}
              style={styles.ServicesScreenSegmentButton}
              onPress={() => setCategory(cat.key)}
            >
              {isActive ? (
                <LinearGradient
                  colors={[Colors.goldLight, Colors.gold]}
                  style={styles.ServicesScreenSegmentFill}
                >
                  <Text style={styles.ServicesScreenSegmentTextActive}>
                    {cat.label}
                  </Text>
                </LinearGradient>
              ) : (
                <Text style={styles.ServicesScreenSegmentText}>
                  {cat.label}
                </Text>
              )}
            </TouchableOpacity>
          );
        })}
      </View>

      {category === 'parking' ? (
        <>
          <View style={styles.ServicesScreenParkingSegment}>
            <TouchableOpacity
              style={[
                styles.ServicesScreenParkingSegmentButton,
                parkingSegment === 'map' &&
                  styles.ServicesScreenParkingSegmentButtonActive,
              ]}
              onPress={() => setParkingSegment('map')}
            >
              <Text
                style={[
                  styles.ServicesScreenParkingSegmentText,
                  parkingSegment === 'map' &&
                    styles.ServicesScreenParkingSegmentTextActive,
                ]}
              >
                Parking Map
              </Text>
            </TouchableOpacity>
            <TouchableOpacity
              style={[
                styles.ServicesScreenParkingSegmentButton,
                parkingSegment === 'my' &&
                  styles.ServicesScreenParkingSegmentButtonActive,
              ]}
              onPress={() => setParkingSegment('my')}
            >
              <Text
                style={[
                  styles.ServicesScreenParkingSegmentText,
                  parkingSegment === 'my' &&
                    styles.ServicesScreenParkingSegmentTextActive,
                ]}
              >
                My Parking
              </Text>
            </TouchableOpacity>
          </View>

          {parkingSegment === 'map' ? (
            <ParkingMapScreen />
          ) : (
            <MyParkingScreen />
          )}
        </>
      ) : (
        <ScrollView
          showsVerticalScrollIndicator={false}
          contentContainerStyle={styles.ServicesScreenList}
        >
          {items.map((service, i) => (
            <FadeInItem key={service.id} index={i}>
              <ServiceCard
                service={service}
                onDetails={() => openServiceDetail(service)}
                onRequest={() => openServiceRequest(service)}
              />
            </FadeInItem>
          ))}
        </ScrollView>
      )}
    </View>
  );
}

function ServiceCard({
  service,
  onDetails,
  onRequest,
}: {
  service: ServiceItem;
  onDetails: () => void;
  onRequest: () => void;
}) {
  return (
    <View style={styles.ServiceCardContainer}>
      <View style={styles.ServiceCardIconWrap}>
        <Text style={styles.ServiceCardIcon}>{service.icon}</Text>
      </View>

      <View style={styles.ServiceCardBody}>
        <Text style={styles.ServiceCardTitle}>{service.title}</Text>
        <Text style={styles.ServiceCardDescription}>{service.description}</Text>
        <Text style={styles.ServiceCardAvailability}>
          {service.availabilityLabel}
        </Text>

        <View style={styles.ServiceCardActions}>
          <TouchableOpacity
            style={styles.ServiceCardDetailsBtn}
            onPress={onDetails}
          >
            <Text style={styles.ServiceCardDetailsBtnText}>Details</Text>
          </TouchableOpacity>
          <TouchableOpacity
            style={styles.ServiceCardRequestBtnWrapper}
            onPress={onRequest}
          >
            <LinearGradient
              colors={[Colors.goldLight, Colors.gold]}
              start={{ x: 0, y: 0 }}
              end={{ x: 1, y: 0 }}
              style={styles.ServiceCardRequestBtn}
            >
              <Text style={styles.ServiceCardRequestBtnText}>Request</Text>
            </LinearGradient>
          </TouchableOpacity>
        </View>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  ServicesScreenContainer: {
    flex: 1,
    backgroundColor: Colors.background,
  },
  ServicesScreenSegmentControl: {
    flexDirection: 'row',
    backgroundColor: Colors.surface,
    borderWidth: 1,
    borderColor: Colors.surfaceBorder,
    borderRadius: 14,
    marginHorizontal: 16,
    marginTop: 16,
    padding: 4,
    gap: 4,
  },
  ServicesScreenSegmentButton: {
    flex: 1,
  },
  ServicesScreenSegmentFill: {
    height: 34.5,
    borderRadius: 9,
    alignItems: 'center',
    justifyContent: 'center',
  },

  ServicesScreenSegmentText: {
    height: 34.5,
    fontSize: 12,
    fontWeight: '600',
    color: Colors.ivoryMuted,
    textAlign: 'center',
    lineHeight: 34.5,
  },

  ServicesScreenSegmentTextActive: {
    fontSize: 12,
    fontWeight: '600',
    color: Colors.buttonText,
  },
  ServicesScreenParkingSegment: {
    flexDirection: 'row',
    backgroundColor: '#1b1f27',
    borderRadius: 10,
    marginHorizontal: 16,
    marginTop: 12,
    padding: 3,
    gap: 0,
  },

  ServicesScreenParkingSegmentButton: {
    flex: 1,
    height: 30.5,
    borderRadius: 8,
    alignItems: 'center',
    justifyContent: 'center',
  },
  ServicesScreenParkingSegmentButtonActive: {
    backgroundColor: Colors.surface,
  },
  ServicesScreenParkingSegmentText: {
    fontSize: 12,
    fontWeight: '600',
    color: Colors.textFaint,
  },

  ServicesScreenParkingSegmentTextActive: {
    color: Colors.goldLight,
  },
  ServicesScreenList: {
    paddingHorizontal: 16,
    paddingTop: 16,
    paddingBottom: 24,
  },
  ServiceCardContainer: {
    flexDirection: 'row',
    backgroundColor: Colors.surface,
    borderWidth: 1,
    borderColor: Colors.surfaceBorder,
    borderRadius: 16,
    padding: 14,
    marginBottom: 12,
  },
  ServiceCardIconWrap: {
    width: 46,
    height: 46,
    borderRadius: 12,
    borderWidth: 1,
    borderColor: 'rgba(233,205,110,0.26)',
    marginRight: 14,
    alignItems: 'center',
    justifyContent: 'center',
  },

  ServiceCardIcon: {
    fontSize: 21,
  },
  ServiceCardBody: {
    flex: 1,
  },
  ServiceCardTitle: {
    fontFamily: Fonts.headingSemiBold,
    fontSize: 14.5,
    color: Colors.ivory,
    marginBottom: 4,
  },
  ServiceCardDescription: {
    fontSize: 11.5,
    lineHeight: 16,
    color: Colors.textFainter,
    marginBottom: 8,
  },
  ServiceCardAvailability: {
    fontSize: 10.5,
    color: Colors.goldLight,
    marginBottom: 10,
  },
  ServiceCardActions: {
    flexDirection: 'row',
    gap: 8,
  },

  ServiceCardDetailsBtn: {
    flex: 1,
    height: 34.5,
    borderRadius: 10,
    borderWidth: 1,
    borderColor: Colors.goldSoftBorder,
    alignItems: 'center',
    justifyContent: 'center',
  },
  ServiceCardDetailsBtnText: {
    fontSize: 12,
    fontWeight: '600',
    color: Colors.goldLight,
  },
  ServiceCardRequestBtnWrapper: {
    flex: 1,
  },
  ServiceCardRequestBtn: {
    height: 34.5,
    borderRadius: 10,
    alignItems: 'center',
    justifyContent: 'center',
  },

  ServiceCardRequestBtnText: {
    fontSize: 12,
    fontWeight: '700',
    color: Colors.buttonText,
  },
});
