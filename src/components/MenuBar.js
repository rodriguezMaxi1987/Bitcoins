import React from "react";
import { View, Text, TouchableOpacity, Image } from "react-native";
import { useNavigation } from "@react-navigation/core";
import { COLORS, SIZES, FONTS, icons } from "../constants";

const MenuBar = ({ rigth }) => {
  const navigation = useNavigation();
  return (
    <View
      style={{
        paddingHorizontal: SIZES.padding,
        flexDirection: "row",
        paddingTop: SIZES.h2,
      }}
    >
      <View style={{ flex: 1, alignItems: "flex-start" }}>
        <TouchableOpacity
          style={{
            flexDirection: "row",
            alignItems: "center",
          }}
          onPress={() => navigation.goBack()}
        >
          <Image
            source={icons.back_arrow}
            resizeMode="contain"
            style={{
              width: 20,
              height: 20,
              tintColor: COLORS.gray,
            }}
          />
          <Text style={{ marginLeft: SIZES.base, ...FONTS.h3 }}>Volver</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
};

export default MenuBar;
