import React from "react";
import {
  StyleSheet,
  View,
  Text,
  TouchableOpacity,
  Image,
  ImageBackground,
} from "react-native";
import { FlatList } from "react-native-gesture-handler";
import { useSelector } from "react-redux";
import { justifyContent } from "styled-system";

import { COLORS, SIZES, FONTS } from "../constants";

const Header = () => {
  const data = useSelector((store) => store.getData.data);
  const saldo = useSelector((store) => store.BitcoinData.saldo);

  const renderItem = ({ item, index }) => (
    <TouchableOpacity
      style={{
        width: 300,
        paddingVertical: SIZES.padding,
        paddingHorizontal: SIZES.padding,
        marginLeft: 50,
        alignItems: "center",
        marginRight: SIZES.radius,
        borderRadius: 35,
        backgroundColor: COLORS.secondary,
      }}
    >
      <View
        style={{
          flexDirection: "row",
          alignItems: "center",
          justifyContent: "center",
        }}
      >
        <View>
          <Image
            source={item.image}
            resizeMode="cover"
            style={{
              marginTop: 5,
              width: 25,
              height: 25,
            }}
          />
        </View>
        <View style={{ marginLeft: SIZES.base, flexDirection: "row" }}>
          <Text style={{ ...FONTS.h2, color: COLORS.white }}>
            {item.currency}{" "}
          </Text>
          <Text style={{ color: COLORS.white, ...FONTS.h2 }}> {item.base}</Text>
        </View>
      </View>
      <View style={{ marginTop: SIZES.padding }}>
        <Text style={{ ...FONTS.h3, color: COLORS.white }}>
          Compra: $ {item.rates.ARS_BUY}
        </Text>
        <Text
          style={{
            ...FONTS.h3,
            marginTop: SIZES.radius,
            color: COLORS.white,
          }}
        >
          Venta: $ {item.rates.ARS_SELL}
        </Text>
        <View style={{ flexDirection: "row" }}>
          <View>
            <Text
              style={{
                ...FONTS.h3,
                marginTop: SIZES.radius,
                color: COLORS.white,
              }}
            >
              Variación:
            </Text>
          </View>
          <View>
            <Text
              style={{
                color:
                  String(item.variation.ARS).indexOf("+") == -1
                    ? COLORS.red
                    : COLORS.green,
                ...FONTS.h3,
                marginTop: SIZES.radius,
              }}
            >
              {" "}
              $ {item.variation.ARS}
            </Text>
          </View>
        </View>
      </View>
    </TouchableOpacity>
  );
  return (
    <View
      style={{
        width: "100%",
        height: 290,
        ...styles.shadow,
        borderBottomLeftRadius: 35,
        borderBottomRightRadius: 35,
        backgroundColor: COLORS.secondary,
      }}
    >
      <View
        style={{
          marginTop: SIZES.h1,
          alignItems: "center",
          justifyContent: "center",
        }}
      >
        <Text style={{ color: COLORS.white, ...FONTS.h1 }}>
          Tu cuenta en pesos
        </Text>
        <Text
          style={{
            marginTop: SIZES.base,
            color: COLORS.white,
            ...FONTS.h1,
          }}
        >
          ${saldo}
        </Text>
      </View>
      <View
        style={{
          position: "absolute",
          bottom: "-30%",
        }}
      >
        <FlatList
          contentContainerStyle={{ marginTop: SIZES.base }}
          data={data}
          renderItem={renderItem}
          keyExtractor={(item) => `${item.id}`}
          horizontal
          showsHorizontalScrollIndicator={false}
        />
      </View>
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

export default Header;
