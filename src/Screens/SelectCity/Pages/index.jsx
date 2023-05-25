import { StyleSheet, View, Image, TouchableOpacity } from "react-native";
import Text from "../../../Common/Components/Text";
import React from "react";
import Layout from "../../../Layout/Page/index";
import { Color, WidthPercent } from "../../../Common/Util/index";
import AntDesign from "react-native-vector-icons/AntDesign";
import Logo from "../../Auth/Components/Logo";
import { useDispatch } from "react-redux";
const Index = () => {
  const dispatch = useDispatch();
  const list = [
    {
      name: "تهران",
      id: 329,
    },
    {
      name: "مشهد",
      id: 491,
    },
    {
      name: "شاهرود",
      id: 634,
    },

    {
      name: "سمنان",
      id: 630,
    },
    {
      name: "نیشابور",
      id: 502,
    },
    {
      name: "دامغان",
      id: 626,
    },
    {
      name: "زاهدان",
      id: 654,
    },
    {
      name: "گرمسار",
      id: 638,
    },
    {
      name: "چابهار",
      id: 647,
    },
  ];
  return (
    <Layout color={Color.white} backgroundColor={Color.white}>
      <View
        style={{
          flex: 1,
        }}
      >
        <View
          style={{
            // borderWidth: 4,
            borderRadius: WidthPercent(2),
            borderColor: "#FEC838",
          }}
        >
          {/* <Logo /> */}
          <View
            style={{
              marginTop: WidthPercent(5),
              borderBottomColor: Color.gray,
              borderBottomWidth: 1,
              padding: WidthPercent(3),
            }}
          >
            <Text
              style={{
                color: Color.black,
                fontSize: 18,
              }}
            >
              لطفا شهر خود را انتخاب کنید
            </Text>
            <Text style={{ color: Color.textSecondry, fontSize: 14 }}>
              انتخاب شهر توسط شما در بهبود نمایش مجموعه و کلاس های ورزشی به ما
              کمک میکند در ادامه امکان تغییر شهر وجود دارد
            </Text>
          </View>
          <View
            style={{
              padding: WidthPercent(3),
            }}
          >
            {list.map((city, i) => (
              <TouchableOpacity
                style={{
                  flexDirection: "row",
                  alignItems: "center",
                  marginBottom: WidthPercent(1.5),
                }}
                key={i}
                onPress={() => {
                  dispatch({
                    local_storage: {
                      key: "city",
                      value: {
                        id: city.id,
                        name: city.name,
                      },
                    },
                    payload: { city: { id: city.id, name: city.name } },
                    type: "SET",
                  });
                }}
              >
                <View
                  style={{
                    backgroundColor: Color.lightgray,
                    padding: WidthPercent(2),
                    borderRadius: 5,
                  }}
                >
                  <AntDesign name="home" size={20} />
                </View>

                <View style={{ marginLeft: WidthPercent(2) }}>
                  <Text
                    style={{
                      color: Color.black,
                      fontSize: 16,
                    }}
                  >
                    {city.name}
                  </Text>
                  {/* <Text
                    style={{
                      color: Color.textSecondry,
                      fontSize: 11,
                    }}
                  >
                    256 مجموعه ورزشی
                  </Text> */}
                </View>
              </TouchableOpacity>
            ))}
          </View>
        </View>
      </View>
    </Layout>
  );
};

export default Index;

const styles = StyleSheet.create({});
