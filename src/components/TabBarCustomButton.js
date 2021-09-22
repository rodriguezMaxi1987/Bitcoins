import React from "react";
import { StyleSheet, TouchableOpacity } from "react-native";
import { COLORS } from "../constants";
import LinearGradient from "react-native-linear-gradient";
import { useNavigation } from "@react-navigation/core";

const TabBarCustomButton = ({ children }) => {
  const navigation = useNavigation();

  return (
    <TouchableOpacity
      style={{
        top: -5,
        justifyContent: "center",
        alignItems: "center",
        ...styles.shadow,
      }}
      onPress={() => navigation.navigate("Compra")}
    >
      <LinearGradient
        colors={[COLORS.primary, COLORS.secondary]}
        style={{
          width: 50,
          height: 50,
          borderRadius: 35,
        }}
      >
        {children}
      </LinearGradient>
    </TouchableOpacity>
  );
};
const styles = StyleSheet.create({
  shadow: {
    shadowColor: COLORS.primary,
    shadowOffset: {
      width: 0,
      height: 10,
    },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,

    elevation: 5,
  },
});

export default TabBarCustomButton;
