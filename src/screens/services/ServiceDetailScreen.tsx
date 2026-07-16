import React from 'react';
import {
  Animated,
  ScrollView,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from 'react-native';
import LinearGradient from 'react-native-linear-gradient';

import { BackHeader } from '../../components/BackHeader';

import { useOverlayAnimation } from '../../hooks/useOverlayAnimation';
import { Colors } from '../../theme/colors';

import { useAppNavigation } from '../../navigation/NavigationContext';
import { useRequestsState } from '../../navigation/RequestsContext';
import type { RequestCategory, ServiceCategory } from '../../types';

const CATEGORY_LABELS: Record<ServiceCategory, RequestCategory> = {
  resort: 'Resort Services',
  golfClub: 'Golf Club Services',
  parking: 'Parking',
};

export function ServiceDetailScreen() {
  const { serviceDetail, closeServiceDetail, showRequestSent } =
    useAppNavigation();
  const { submitRequest } = useRequestsState();
  const { renderedValue, animatedStyle } = useOverlayAnimation(serviceDetail);

  if (!renderedValue) {
    return null;
  }

  const service = renderedValue;

  const submit = () => {
    submitRequest(CATEGORY_LABELS[service.category], service.title);
    closeServiceDetail();
    showRequestSent(service.title);
  };

  return (
    <Animated.View style={[styles.ServiceDetailScreenContainer, animatedStyle]}>
      <BackHeader title={service.title} onBack={closeServiceDetail} />

      <ScrollView
        showsVerticalScrollIndicator={false}
        contentContainerStyle={styles.ServiceDetailScreenBody}
      >
        <Text style={styles.ServiceDetailScreenDescription}>
          {service.description}
        </Text>

        <View style={styles.ServiceDetailScreenInfoRow}>
          <View style={styles.ServiceDetailScreenInfoCard}>
            <Text style={styles.ServiceDetailScreenInfoLabel}>
              AVAILABILITY
            </Text>
            <Text style={styles.ServiceDetailScreenInfoValue}>
              {service.availabilityLabel}
            </Text>
          </View>
          <View style={styles.ServiceDetailScreenInfoCard}>
            <Text style={styles.ServiceDetailScreenInfoLabel}>
              RESPONSE TIME
            </Text>
            <Text style={styles.ServiceDetailScreenInfoValue}>
              {service.responseTime}
            </Text>
          </View>
        </View>

        <Text style={styles.ServiceDetailScreenConditionsLabel}>
          Request Conditions
        </Text>
        <Text style={styles.ServiceDetailScreenConditionsText}>
          {service.conditions}
        </Text>
      </ScrollView>

      <View style={styles.ServiceDetailScreenFooter}>
        <TouchableOpacity onPress={submit}>
          <LinearGradient
            colors={[Colors.goldLight, Colors.gold]}
            start={{ x: 0, y: 0 }}
            end={{ x: 1, y: 0 }}
            style={styles.ServiceDetailScreenCta}
          >
            <Text style={styles.ServiceDetailScreenCtaText}>
              Submit Request
            </Text>
          </LinearGradient>
        </TouchableOpacity>
      </View>
    </Animated.View>
  );
}

const styles = StyleSheet.create({
  ServiceDetailScreenContainer: {
    position: 'absolute',
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
    backgroundColor: Colors.background,
  },

  ServiceDetailScreenBody: {
    paddingHorizontal: 18,
    paddingTop: 4,
    paddingBottom: 24,
  },
  ServiceDetailScreenDescription: {
    fontSize: 13,
    lineHeight: 20.8,
    color: Colors.ivoryMuted,
    marginBottom: 20,
  },

  ServiceDetailScreenInfoRow: {
    flexDirection: 'row',
    gap: 10,
    marginBottom: 20,
  },
  ServiceDetailScreenInfoCard: {
    flex: 1,
    backgroundColor: Colors.surface,
    borderRadius: 14,
    padding: 12,
  },
  ServiceDetailScreenInfoLabel: {
    fontSize: 10,
    color: Colors.textFaint,
    marginBottom: 8,
  },

  ServiceDetailScreenInfoValue: {
    fontSize: 13,
    fontWeight: '600',
    color: Colors.ivory,
  },
  ServiceDetailScreenConditionsLabel: {
    fontSize: 12,
    color: Colors.textFaint,
    marginBottom: 10,
  },

  ServiceDetailScreenConditionsText: {
    fontSize: 12.5,
    lineHeight: 19.4,
    color: Colors.ivoryMuted,
  },
  ServiceDetailScreenFooter: {
    borderTopWidth: 1,
    borderTopColor: Colors.headerBorder,
    padding: 18,
    marginBottom: 25,
  },
  ServiceDetailScreenCta: {
    height: 47.5,
    borderRadius: 16,
    alignItems: 'center',
    justifyContent: 'center',
  },

  ServiceDetailScreenCtaText: {
    fontSize: 14.5,
    fontWeight: '700',
    color: Colors.buttonText,
  },
});
