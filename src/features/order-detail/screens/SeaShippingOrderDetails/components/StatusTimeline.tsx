import React, { useState, useEffect } from 'react';
import { View, Text, Animated, Easing, StyleSheet } from 'react-native';
import { MaterialCommunityIcons } from '@expo/vector-icons';
import { COLORS } from '@src/constants/Colors';
import { Fonts } from '@src/constants/Fonts';
import { formatDate } from '@src/utils/formatDate';

interface RouteItem {
  title?: string;
  time?: string;
  coordinates?: Array<{ note?: string }>;
}

interface StatusStep {
  _id: string;
  title: string;
}

interface StatusTimelineProps {
  statusData: StatusStep[];
  currentStatus: string;
  route: RouteItem[];
}

const getStatusIcon = (status: string): string => {
  const icons: { [key: string]: string } = {
    'Le client a passé une commande': 'cart',
    "Les colis sont chargés dans le conteneur et prêts pour l'expédition": 'package',
    'Le conteneur a quitté le terminal de Nansha (GZ Ocean Terminal)': 'ship-wheel',
    'Le conteneur est en route vers le port de Tanjung Pelepas': 'navigation',
    'Le conteneur a fait escale à Tanjung Pelepas (Pelabuhan Tanjung Pelepas Terminal)': 'anchor',
  };
  return icons[status] || 'circle';
};

export const StatusTimeline: React.FC<StatusTimelineProps> = ({
  statusData,
  currentStatus,
  route,
}) => {
  const [animations] = useState(() => statusData.map(() => new Animated.Value(0)));
  const currentStatusIndex = statusData.findIndex((step) => step.title === currentStatus);

  useEffect(() => {
    statusData.forEach((_, index) => {
      Animated.timing(animations[index], {
        toValue: 1,
        duration: 800,
        delay: index * 50,
        easing: Easing.out(Easing.quad),
        useNativeDriver: true,
      }).start();
    });
  }, []);

  return (
    <View style={styles.container}>
      {statusData.map((step, index) => {
        const match = route.find((r) => r?.title?.toLowerCase() === step?.title?.toLowerCase());
        const formattedDate = match ? formatDate(match.time) : 'Non spécifié';
        const isCompleted = index < currentStatusIndex;
        const isCurrent = index === currentStatusIndex;

        return (
          <View key={step._id} style={styles.stepContainer}>
            <View
              style={[
                styles.circle,
                isCompleted && styles.completedCircle,
                isCurrent && styles.currentCircle,
                !isCompleted && !isCurrent && styles.futureCircle,
              ]}
            >
              <MaterialCommunityIcons
                name={getStatusIcon(step.title)}
                size={20}
                color={COLORS.white}
              />
            </View>

            <View style={styles.contentWrapper}>
              <Text
                style={[
                  styles.date,
                  isCompleted && styles.completedText,
                  isCurrent && styles.currentText,
                  !isCompleted && !isCurrent && styles.futureText,
                ]}
              >
                {formattedDate}
              </Text>
              <Text
                style={[
                  styles.title,
                  isCompleted && styles.completedText,
                  isCurrent && styles.currentText,
                  !isCompleted && !isCurrent && styles.futureText,
                ]}
              >
                {step.title}
              </Text>
            </View>

            {index < statusData.length - 1 && (
              <View
                style={[
                  styles.line,
                  isCompleted ? styles.completedLine : isCurrent ? styles.currentLine : styles.futureLine,
                ]}
              />
            )}
          </View>
        );
      })}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    backgroundColor: COLORS.white,
    borderRadius: 20,
    padding: 20,
    margin: 20,
    shadowColor: COLORS.black,
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.1,
    shadowRadius: 8,
    elevation: 3,
  },
  stepContainer: {
    flexDirection: 'row',
    alignItems: 'flex-start',
    marginBottom: 24,
    minHeight: 60,
  },
  circle: {
    width: 40,
    height: 40,
    borderRadius: 20,
    alignItems: 'center',
    justifyContent: 'center',
    marginRight: 16,
  },
  completedCircle: {
    backgroundColor: COLORS.success,
  },
  currentCircle: {
    backgroundColor: COLORS.green,
  },
  futureCircle: {
    backgroundColor: COLORS.grey,
  },
  contentWrapper: {
    flex: 1,
    paddingRight: 16,
  },
  date: {
    fontFamily: Fonts.meduim,
    fontSize: 12,
  },
  title: {
    fontFamily: Fonts.meduim,
    fontSize: 14,
    marginTop: 4,
    lineHeight: 20,
  },
  completedText: {
    color: COLORS.success,
  },
  currentText: {
    color: COLORS.green,
  },
  futureText: {
    color: COLORS.grey,
  },
  line: {
    position: 'absolute',
    left: 19,
    top: 40,
    width: 2,
    height: 40,
  },
  completedLine: {
    backgroundColor: COLORS.success,
  },
  currentLine: {
    backgroundColor: COLORS.green,
  },
  futureLine: {
    backgroundColor: COLORS.grey,
  },
});
