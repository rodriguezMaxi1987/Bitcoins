import React, { useEffect, useState } from "react";

import { StyleSheet, View, Text, ScrollView, Image } from "react-native";
import { MenuBar, TransactionHistory } from "../components";
import { COLORS, SIZES, icons, FONTS } from "../constants";

const Transaction = () => {
  return (
    <View style={{ flex: 1, marginBottom: 50 }}>
      <MenuBar />
      <ScrollView>
        <View
          style={{
            flex: 1,
            paddingBottom: SIZES.padding,
          }}
        >
          <View
            style={{
              flexDirection: "row",
              marginTop: SIZES.padding,
              marginHorizontal: SIZES.padding,
              paddingVertical: SIZES.padding,
              borderRadius: SIZES.radius,
              backgroundColor: COLORS.white,
              ...styles.shadow,
            }}
          >
            <View>
              <Image
                source={icons.star}
                style={{
                  width: 30,
                  height: 30,
                  alignItems: "center",
                  marginHorizontal: SIZES.base,
                }}
              />
            </View>

            <View style={{ flex: 1, marginLeft: SIZES.base }}>
              <Text style={{ ...FONTS.h3 }}>Listado de Transacciones</Text>
              <Text style={{ ...FONTS.body4 }}>
                Aquí podras ver todas las transacciones de compre y venta que
                realizaste.
              </Text>
            </View>
          </View>
        </View>
        <TransactionHistory style={styles.shadow} />
      </ScrollView>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
  },
  shadow: {
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 4,
    },
    shadowOpacity: 0.3,
    shadowRadius: 4.65,

    elevation: 8,
  },
});

export default Transaction;
