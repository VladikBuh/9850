import React from 'react';

import {
  Image,
  ScrollView,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from 'react-native';
import LinearGradient from 'react-native-linear-gradient';

import { BackHeader } from '../../components/BackHeader';
import { Fonts } from '../../constants/theme';

import { useAppNavigation } from '../../navigation/NavigationContext';
import { useRequestsState } from '../../navigation/RequestsContext';
import { Colors } from '../../theme/colors';

import { getEventDayLabel } from '../../utils/date';

export function EventDetailScreen() {
  const { eventDetail, closeEventDetail, showRequestSent } = useAppNavigation();
  const { submitRequest } = useRequestsState();

  if (!eventDetail) {
    return null;
  }

  const event = eventDetail;

  return (
    <View style={styles.EventDetailScreenContainer}>
      <BackHeader title="Event Details" onBack={closeEventDetail} />

      <ScrollView showsVerticalScrollIndicator={false}>
        <Image
          source={event.image}
          style={styles.EventDetailScreenImage}
          resizeMode="cover"
        />

        <View style={styles.EventDetailScreenBody}>
          <View style={styles.EventDetailScreenCategoryBadge}>
            <Text style={styles.EventDetailScreenCategoryText}>
              {event.category}
            </Text>
          </View>

          <Text style={styles.EventDetailScreenTitle}>{event.title}</Text>
          <Text style={styles.EventDetailScreenDescription}>
            {event.fullDescription}
          </Text>

          <View style={styles.EventDetailScreenInfoRow}>
            <View style={styles.EventDetailScreenInfoCard}>
              <Text style={styles.EventDetailScreenInfoLabel}>DATE & TIME</Text>
              <Text style={styles.EventDetailScreenInfoValue}>
                {getEventDayLabel(event.daysFromToday)}
              </Text>
              <Text style={styles.EventDetailScreenInfoValue}>
                {event.timeLabel}
              </Text>
            </View>
            <View style={styles.EventDetailScreenInfoCard}>
              <Text style={styles.EventDetailScreenInfoLabel}>LOCATION</Text>
              <Text style={styles.EventDetailScreenInfoValue}>
                {event.location}
              </Text>
            </View>
          </View>

          <Text style={styles.EventDetailScreenSectionLabel}>Schedule</Text>
          {event.schedule.map((item, i) => (
            <View key={i} style={styles.EventDetailScreenScheduleRow}>
              <Text style={styles.EventDetailScreenScheduleTime}>
                {item.time}
              </Text>
              <Text style={styles.EventDetailScreenScheduleLabel}>
                {item.label}
              </Text>
            </View>
          ))}

          <Text style={styles.EventDetailScreenSectionLabel}>
            Included & Requirements
          </Text>
          <View style={styles.EventDetailScreenTagsRow}>
            {event.included.map(tag => (
              <View key={tag} style={styles.EventDetailScreenTag}>
                <Text style={styles.EventDetailScreenTagText}>{tag}</Text>
              </View>
            ))}
          </View>
          <Text style={styles.EventDetailScreenRequirementsNote}>
            {event.requirementsNote}
          </Text>

          <Text style={styles.EventDetailScreenPlaces}>
            {event.placesLabel}
          </Text>
        </View>
      </ScrollView>

      <View style={styles.EventDetailScreenFooter}>
        <TouchableOpacity
          onPress={() => {
            submitRequest('Events', event.title);
            showRequestSent(event.title);
          }}
        >
          <LinearGradient
            colors={[Colors.goldLight, Colors.gold]}
            start={{ x: 0, y: 0 }}
            end={{ x: 1, y: 0 }}
            style={styles.EventDetailScreenCta}
          >
            <Text style={styles.EventDetailScreenCtaText}>
              Send Attendance Request
            </Text>
          </LinearGradient>
        </TouchableOpacity>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  EventDetailScreenContainer: {
    flex: 1,
    backgroundColor: Colors.background,
  },
  EventDetailScreenImage: {
    width: '100%',
    height: 182,
  },
  EventDetailScreenBody: {
    padding: 18,
  },
  EventDetailScreenCategoryBadge: {
    alignSelf: 'flex-start',
    backgroundColor: Colors.goldSoftBg,
    borderWidth: 1,
    borderColor: Colors.goldSoftBorder,
    borderRadius: 20,
    paddingHorizontal: 11,
    paddingVertical: 4,
    marginBottom: 12,
  },
  EventDetailScreenCategoryText: {
    fontSize: 11,
    fontWeight: '600',
    color: Colors.goldLight,
  },

  EventDetailScreenTitle: {
    fontFamily: Fonts.headingSemiBold,
    fontSize: 23,
    color: Colors.ivory,
    marginBottom: 12,
  },

  EventDetailScreenDescription: {
    fontSize: 13,
    lineHeight: 20.8,
    color: Colors.ivoryMuted,
    marginBottom: 20,
  },

  EventDetailScreenInfoRow: {
    flexDirection: 'row',
    gap: 10,
    marginBottom: 24,
  },
  EventDetailScreenInfoCard: {
    flex: 1,
    backgroundColor: Colors.surface,
    borderRadius: 14,
    padding: 12,
  },
  EventDetailScreenInfoLabel: {
    fontSize: 10,
    color: Colors.textFaint,
    marginBottom: 8,
  },
  EventDetailScreenInfoValue: {
    fontSize: 13,
    fontWeight: '600',
    color: Colors.ivory,
  },
  EventDetailScreenSectionLabel: {
    fontSize: 12,
    color: Colors.textFaint,
    marginBottom: 10,
  },

  EventDetailScreenScheduleRow: {
    flexDirection: 'row',
    marginBottom: 8,
  },
  EventDetailScreenScheduleTime: {
    width: 74,
    fontSize: 12,
    fontWeight: '600',
    color: Colors.goldLight,
  },

  EventDetailScreenScheduleLabel: {
    flex: 1,
    fontSize: 12.5,
    color: Colors.ivoryMuted,
  },

  EventDetailScreenTagsRow: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: 8,
    marginBottom: 16,
    marginTop: 4,
  },
  EventDetailScreenTag: {
    backgroundColor: '#1b1f27',
    borderWidth: 1,
    borderColor: 'rgba(233,205,110,0.22)',
    borderRadius: 20,
    paddingHorizontal: 12,
    paddingVertical: 6,
  },
  EventDetailScreenTagText: {
    fontSize: 11.5,
    color: Colors.ivoryMuted,
  },
  EventDetailScreenRequirementsNote: {
    fontSize: 12.5,
    lineHeight: 18,
    color: Colors.textFainter,
    marginBottom: 20,
  },
  EventDetailScreenPlaces: {
    fontSize: 13,
    fontWeight: '600',
    color: Colors.goldLight,
    marginBottom: 24,
  },
  EventDetailScreenFooter: {
    borderTopWidth: 1,
    borderTopColor: Colors.headerBorder,
    padding: 18,
  },

  EventDetailScreenCta: {
    height: 47.5,
    borderRadius: 16,
    alignItems: 'center',
    justifyContent: 'center',
  },

  EventDetailScreenCtaText: {
    fontSize: 14.5,
    fontWeight: '700',
    color: Colors.buttonText,
  },
});
