import React from "react";
import { View, Text, Image } from "react-native";
import { RFValue } from "react-native-responsive-fontsize";
import { COLORS } from "@src/constants/Colors";
import { HEIGHTTODP, WIDTHTODP } from "@src/constants/Dimensions";

import { IMAGES } from "@src/constants/Images";

//list that content all the bottom images
const images = [
  IMAGES.homeBlue,
  IMAGES.home,
  IMAGES.heartBlue,
  IMAGES.heart,
  IMAGES.plus,
  IMAGES.reservationBlue,
  IMAGES.reservation,

  IMAGES.profileBlue,
  IMAGES.profile,
];

const BottomNavigation = ({
  index,
  name,
  active,
}: {
  index: number;
  name?: string;
  active?: boolean;
}) => {
  return (
    <View style={{ justifyContent: "center", alignItems: "center" }}>
      <View
        style={{
          height: HEIGHTTODP(24),
          width: WIDTHTODP(24),
          justifyContent: "center",
          alignItems: "center",
        }}
      >
        <Image
          source={images[index]}
          style={{ height: HEIGHTTODP(24), width: WIDTHTODP(24) }}
          resizeMode={"contain"}
        />
      </View>
      {name && (
        <View
          style={{
            width: WIDTHTODP(80),
            alignItems: "center",
          }}
        >
          <Text
            numberOfLines={1}
            style={{
              fontWeight: active ? "500" : "400",
              color: active ? COLORS.blueShade : COLORS.SlateGray,
              fontSize: RFValue(8),
            }}
          >
            {name}
          </Text>
        </View>
      )}
    </View>
  );
};

export default BottomNavigation;
