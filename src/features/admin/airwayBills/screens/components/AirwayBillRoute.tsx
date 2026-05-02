import React from "react";
import { View, Text } from "react-native";
import { Ionicons } from "@expo/vector-icons";
import { styles } from "./AirwayBillCard.styles";

interface AirwayBillRouteProps {
  departureAirport: string;
  arrivalAirport: string;
  flightLabel: string;
  colors: { primary: { main: string }; text: { secondary: string; primary: string }; neutral: Record<string, string> };
}

export const AirwayBillRoute: React.FC<AirwayBillRouteProps> = ({
  departureAirport, arrivalAirport, flightLabel, colors,
}) => (
  <>
    <View style={styles.flightRow}>
      <Ionicons name="airplane" size={14} color={colors.text.secondary} />
      <Text style={[styles.flightText, { color: colors.text.secondary }]}>{flightLabel}</Text>
    </View>

    <View style={styles.routeContainer}>
      <View style={styles.airportBlock}>
        <Text style={[styles.airportCode, { color: colors.text.primary }]}>{departureAirport}</Text>
        <Text style={[styles.airportLabel, { color: colors.text.secondary }]}>Départ</Text>
      </View>

      <View style={styles.routeLine}>
        <View style={[styles.dashedLine, { borderBottomColor: colors.border }]} />
        <View style={[styles.planeIconContainer, { backgroundColor: colors.background.default }]}>
          <Ionicons name="airplane" size={14} color={colors.primary.main} style={styles.planeIcon} />
        </View>
      </View>

      <View style={[styles.airportBlock, styles.airportBlockRight]}>
        <Text style={[styles.airportCode, { color: colors.text.primary }]}>{arrivalAirport}</Text>
        <Text style={[styles.airportLabel, { color: colors.text.secondary }]}>Arrivée</Text>
      </View>
    </View>
  </>
);
