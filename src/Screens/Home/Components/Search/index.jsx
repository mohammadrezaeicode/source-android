import React, { Fragment, useEffect, useState } from "react";
import {
  Modal,
  ScrollView,
  StyleSheet,
  TextInput,
  TouchableOpacity,
  TouchableWithoutFeedback,
  View,
} from "react-native";
import {
  boxShdaow,
  Color,
  HeightPercent,
  WidthPercent,
} from "../../../../Common/Util";
import Text from "../../../../Common/Components/Text";
import Icon from "react-native-vector-icons/AntDesign";
import Entypo from "react-native-vector-icons/Entypo";
import { useDispatch, useSelector } from "react-redux";
// Entypo
function Index({
  provinecs,
  citeis,
  regions,
  set,
  category,
  search,
  citySearch,
}) {
  const [listselect, setListselect] = useState([]);
  const [modal, setModal] = useState(false);
  const [name, setName] = useState("");
  const [selected, setSelected] = useState(false);
  const dispatch = useDispatch();
  const { city } = useSelector((state) => state);

  const SelectedAddress = (item) => {
    setSelected(item);
    set({ id: item.id, type: selected.type });
    citySearch(item.id, category.id);
    if (item.id != "") {
      dispatch({
        local_storage: {
          key: "city",
          value: {
            item,
          },
        },
        payload: { city: item },
        type: "SET",
      });
    }
  };

  const OpenModal = (type, list) => {
    setSelected({ ...selected, type: type });
    switch (type) {
      case "provinec":
        if (provinecs) {
          setListselect(provinecs);
          setModal(true);
        }
        break;
      case "city":
        setListselect(list);
        setModal(true);
        break;
      case "region":
        if (regions) {
          setListselect(regions);
          setModal(true);
        }
        break;
    }
  };
  return (
    <Fragment>
      <View
        style={{
          flexDirection: "row",
          alignItems: "center",
          justifyContent: "space-between",
          marginTop: 15,
          borderRadius: 25,
          backgroundColor: "#fff",
          marginBottom: WidthPercent(2),
        }}
      >
        <TouchableOpacity
          onPress={() => OpenModal("city")}
          style={{
            backgroundColor: Color.primary,
            padding: 9,
            borderRadius: 10,
            ...boxShdaow,
          }}
        >
          {city && city.name ? (
            <Text style={{ color: Color.white }}>{city.name}</Text>
          ) : (
            <Entypo
              name="location-pin"
              style={{
                backgroundColor: Color.primary,

                borderRadius: 16,
                ...boxShdaow,
              }}
              size={WidthPercent(5)}
              color={Color.white}
            />
          )}
        </TouchableOpacity>
        <TextInput
          onChangeText={(text) => {
            if (text == "") {
              search("");
            }
            setName(text);
          }}
          placeholderTextColor={Color.text}
          style={{
            flex: 1,
            padding: WidthPercent(1.5),
            fontFamily: "IRANSansMedium",
            fontSize: WidthPercent(3),
            backgroundColor: Color.white,
            borderTopRightRadius: 10,
            borderBottomRightRadius: 10,
            marginLeft: WidthPercent(2),
            color: Color.black,
            ...boxShdaow,
          }}
          placeholder={`جستجو ${
            category ? category.name : "سالن , استخر , باشگاه و مربی"
          }`}
        />
        <TouchableOpacity
          onPress={() => {
            search(name);
          }}
          style={{
            backgroundColor: Color.primary,
            padding: 9,
            borderTopRightRadius: 10,
            borderBottomRightRadius: 10,
            ...boxShdaow,
          }}
        >
          <Icon name="search1" size={WidthPercent(5)} color={Color.white} />
        </TouchableOpacity>
      </View>

      <ModalSearch
        setVisible={setModal}
        visible={modal}
        list={listselect}
        set={SelectedAddress}
      />

      <ModalSearch
        setVisible={setModal}
        visible={modal}
        list={[
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
        ]}
        set={SelectedAddress}
      />
    </Fragment>
  );
}
const ModalSearch = ({ setVisible, visible, list, set }) => {
  const [input, setInput] = useState();
  const [active, setActive] = useState(0);
  const [newlist, setList] = useState([]);
  const Item = ({ i, item }) => {
    return (
      <TouchableOpacity
        onPress={() => {
          set(item);
          setInput("");
          setActive(0);
          setVisible(false);
        }}
        style={{
          marginVertical: WidthPercent(2),
        }}
      >
        <View style={{}}>
          <Text
            style={{
              textAlign: "center",
              fontSize: WidthPercent(4),
              color: "#000",
            }}
          >
            {item.label ? item.label : item.name}
          </Text>
          <View style={{}}></View>
        </View>
      </TouchableOpacity>
    );
  };
  const Empty = () => {
    return (
      <View style={[Style.row]}>
        <Text>موردی یافت نشد</Text>
      </View>
    );
  };
  return (
    <Modal
      visible={visible}
      onRequestClose={() => {
        setVisible(false);
        setList([]);
      }}
      transparent={true}
    >
      <TouchableOpacity
        onPressOut={() => {
          setVisible(false);
          set({
            id: "",
            label: "انتخاب",
          });
        }}
        style={Style.containerModal}
      >
        <TouchableWithoutFeedback>
          <View style={Style.contentModal}>
            {/* <View style={Style.containerSearchModal}>
              <TextInput
                placeholder="جستجو ..."
                style={Style.inputModal}
                value={input}
                onChangeText={e => {
                  setInput(e);
                  if (e != "") {
                    setList(list.filter(item => item.label.includes(e)));
                  } else {
                    setList(list);
                  }
                }}
              />
              <TouchableOpacity
                style={Style.btnModal}
                onPress={() => {
                  setInput("");
                  setList(list);
                }}
              >
                <Icon name="close" size={WidthPercent(4.5)} color={"#000"} />
              </TouchableOpacity>
            </View> */}
            <ScrollView>
              {newlist.length > 0 ? (
                newlist.map((item, i) => {
                  return <Item i={i + 1} key={i} item={item} />;
                })
              ) : typeof list == "object" && list.length > 0 ? (
                list.map((item, i) => {
                  return <Item i={i + 1} key={i} item={item} />;
                })
              ) : (
                <Empty />
              )}
            </ScrollView>
          </View>
        </TouchableWithoutFeedback>
      </TouchableOpacity>
    </Modal>
  );
};

const Style = StyleSheet.create({
  row: {
    marginTop: WidthPercent(3),
    flexDirection: "row",
    flexWrap: "wrap",
    justifyContent: "space-around",
    alignItems: "center",
  },
  text: {
    fontSize: WidthPercent(3),
  },
  textbtnModal: {
    fontSize: WidthPercent(3),
    color: Color.white,
  },
  colInput: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    borderRadius: WidthPercent(2.5),
    width: WidthPercent(30),
    paddingVertical: WidthPercent(2.8),
    paddingHorizontal: WidthPercent(2),
    borderColor: Color.primary,
    borderWidth: 1,
  },
  input: {
    width: "85%",
    height: WidthPercent(12),
    textAlign: "right",
    paddingHorizontal: WidthPercent(5),
    fontFamily: "IRANSansMedium",
    color: Color.text,
  },
  btn: {
    backgroundColor: Color.primary,
    height: WidthPercent(12),
    width: "15%",
    borderTopEndRadius: WidthPercent(3),
    borderBottomEndRadius: WidthPercent(3),
    alignItems: "center",
    justifyContent: "center",
  },
  containerSearch: {
    marginTop: WidthPercent(3),
    flexDirection: "row",
    alignItems: "center",
    overflow: "hidden",
    justifyContent: "space-between",
    height: WidthPercent(12),
    borderWidth: 1,
    borderRadius: WidthPercent(3),
    borderColor: Color.primary,
  },
  containerModal: {
    backgroundColor: "#11111177",
    flex: 1,
  },
  contentModal: {
    width: WidthPercent(100),
    position: "absolute",
    bottom: 0,
    left: 0,
    borderTopStartRadius: WidthPercent(5),
    borderTopEndRadius: WidthPercent(5),
    backgroundColor: Color.white,
    paddingHorizontal: WidthPercent(3),
    paddingTop: WidthPercent(5),
    maxHeight: HeightPercent(50),
    zIndex: 100,
  },
  inputModal: {
    width: WidthPercent(65),
    fontFamily: "IRANSansMedium",
    color: Color.text,
  },
  btnModal: {
    // backgroundColor: Color.gray,
    width: WidthPercent(5),
    height: WidthPercent(5),
    justifyContent: "center",
    alignItems: "center",
    borderRadius: WidthPercent(5),
  },
  check: {
    borderWidth: 2,
    borderColor: Color.primary,
    borderRadius: WidthPercent(4),
    width: WidthPercent(4),
    height: WidthPercent(4),
  },
  containerSearchModal: {
    flexDirection: "row",
    alignItems: "center",
    overflow: "hidden",
    justifyContent: "space-between",
    height: WidthPercent(12),
    borderWidth: 1,
    paddingHorizontal: WidthPercent(2),
    borderRadius: WidthPercent(3),
    borderColor: Color.lightgray,
    // backgroundColor: Color.lightgray,
  },
  select: {
    justifyContent: "space-between",
    borderBottomColor: Color.gray,
    borderBottomWidth: 1,
    paddingVertical: WidthPercent(2),
    paddingHorizontal: WidthPercent(5),
  },
});

export default Index;
