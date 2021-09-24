import React, { useEffect, useState } from "react";
import {
  StyleSheet,
  View,
  Text,
  ScrollView,
  TouchableOpacity,
} from "react-native";
import {  COLORS, SIZES, FONTS } from "../constants";
import { PriceAlert, Header } from "../components";
import { useDispatch, useSelector } from "react-redux";
import { getData } from "../redux/ducks/getData";

const Home = () => {

  const dispatch = useDispatch();
  const data = useSelector((store) => store.getData.data);

  useEffect(() => {
    dispatch(getData());
  }, []);

  function renderNotice() {
    return (
      <View
        style={{
          marginTop: SIZES.padding,
          marginHorizontal: SIZES.padding,
          padding: 20,
          borderRadius: SIZES.radius,
          backgroundColor: COLORS.secondary,
          ...styles.shadow,
        }}
      >
        <Text style={{ color: COLORS.white, ...FONTS.h3 }}>
          Datos sobre Bitcoin
        </Text>
        <Text
          style={{
            marginTop: SIZES.base,
            color: COLORS.white,
            ...FONTS.body4,
            lineHeight: 18,
          }}
        >
          Bitcoin es la primer moneda digital y descentralizada. La creó Satoshi
          Nakamoto el 2 de enero de 2009, un personaje cuya identidad, al día de
          hoy, sigue siendo anónima.
        </Text>
      </View>
    );
  }

  return (
    <ScrollView>
      <View style={{ flex: 1, paddingBottom: 130 }}>
        <Header />
        {renderNotice()}
      </View>
    </ScrollView>
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

export default Home;
