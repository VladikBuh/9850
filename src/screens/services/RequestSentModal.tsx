import React from 'react';
import { StyleSheet, Text, TouchableOpacity, View } from 'react-native';

import { AppIcon } from '../../components/icons/AppIcon';
import { Fonts } from '../../constants/theme';

import { useAppNavigation } from '../../navigation/NavigationContext';
import { Colors } from '../../theme/colors';

export function RequestSentModal() {
  const { requestSentTitle, closeRequestSent, openRequestCenter } =
    useAppNavigation();

  if (!requestSentTitle) {
    return null;
  }

  const viewRequest = () => {
    closeRequestSent();
    openRequestCenter();
  };

  return (
    <View style={styles.RequestSentModalScrim}>
      <View style={styles.RequestSentModalCard}>
        <View style={styles.RequestSentModalIconWrap}>
          <AppIcon name="checkmark" size={26} />
        </View>

        <Text style={styles.RequestSentModalTitle}>Request Sent</Text>
        <Text style={styles.RequestSentModalSubject}>{requestSentTitle}</Text>
        <Text style={styles.RequestSentModalDescription}>
          Your request has been successfully submitted. The venue team will
          review the details and update its status in the Request Center. Open
          the notification bell to follow progress and view further
          instructions.
        </Text>

        <View style={styles.RequestSentModalActions}>
          <TouchableOpacity
            style={styles.RequestSentModalSecondaryBtn}
            onPress={closeRequestSent}
          >
            <Text style={styles.RequestSentModalSecondaryBtnText}>
              Continue Browsing
            </Text>
          </TouchableOpacity>
          <TouchableOpacity
            style={styles.RequestSentModalPrimaryBtn}
            onPress={viewRequest}
          >
            <Text style={styles.RequestSentModalPrimaryBtnText}>
              View Request
            </Text>
          </TouchableOpacity>
        </View>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  RequestSentModalScrim: {
    position: 'absolute',
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
    backgroundColor: Colors.scrim,
    alignItems: 'center',
    justifyContent: 'center',
    paddingHorizontal: 20,
  },
  RequestSentModalCard: {
    width: '100%',
    maxWidth: 340,
    backgroundColor: Colors.surface,
    borderWidth: 1,
    borderColor: Colors.goldSoftBorder,
    borderRadius: 22,
    padding: 24,
    alignItems: 'center',
  },
  RequestSentModalIconWrap: {
    width: 56,
    height: 56,
    borderRadius: 28,
    backgroundColor: Colors.goldSoftBg,
    alignItems: 'center',
    justifyContent: 'center',
    marginBottom: 16,
  },
  RequestSentModalTitle: {
    fontFamily: Fonts.headingSemiBold,
    fontSize: 19,
    color: Colors.ivory,
    marginBottom: 6,
  },
  RequestSentModalSubject: {
    fontSize: 12.5,
    color: Colors.textFainter,
    marginBottom: 14,
    textAlign: 'center',
  },
  RequestSentModalDescription: {
    fontSize: 13,
    lineHeight: 20.15,
    color: Colors.ivoryMuted,
    textAlign: 'center',
    marginBottom: 20,
  },

  RequestSentModalActions: {
    flexDirection: 'row',
    gap: 10,
    width: '100%',
  },
  RequestSentModalSecondaryBtn: {
    flex: 1,
    height: 48,
    borderRadius: 14,
    borderWidth: 1,
    borderColor: Colors.goldSoftBorder,
    alignItems: 'center',
    justifyContent: 'center',
  },

  RequestSentModalSecondaryBtnText: {
    fontSize: 12.5,
    fontWeight: '600',
    color: Colors.goldLight,
    textAlign: 'center',
  },

  RequestSentModalPrimaryBtn: {
    flex: 1,
    height: 48,
    borderRadius: 14,
    backgroundColor: Colors.goldLight,
    alignItems: 'center',
    justifyContent: 'center',
  },

  RequestSentModalPrimaryBtnText: {
    fontSize: 12.5,
    fontWeight: '700',
    color: Colors.buttonText,
  },
});
