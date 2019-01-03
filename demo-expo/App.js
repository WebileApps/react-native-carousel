import React from "react";
import {
  View,
  Image,
  TouchableOpacity,
  FlatList,
  Dimensions,
  StyleSheet
} from "react-native";
import Carousel from "@webileapps/react-native-banner-carousel";

const images = [
  "https://d2d1onm4pyv21t.cloudfront.net/1542715150710-wrwghu.png",
  "https://d2d1onm4pyv21t.cloudfront.net/1542715154026-ygpy.jpg",
  "https://d2d1onm4pyv21t.cloudfront.net/1542715158624-eqepyq.jpg",
  "https://d2d1onm4pyv21t.cloudfront.net/1542715175420-jzeaug.jpg",
  "https://d2d1onm4pyv21t.cloudfront.net/1542715182667-venieu.jpg"
];
export default class App extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      imageIndex: 0
    };
  }
  bgCarouselWidth = Dimensions.get("window").width;
  bgCarouselHeight = 0.625 * this.bgCarouselWidth;
  renderPage(image, index) {
    return (
      <View key={index} style={{ alignItems: "center" }}>
        <Image
          style={
            index === 0
              ? {
                  width: this.bgCarouselWidth,
                  height: this.bgCarouselHeight
                }
              : { width: this.bgCarouselWidth, height: "100%" }
          }
          source={{ uri: image }}
          resizeMode="contain"
        />
      </View>
    );
  }
  allImages = ({ item, index }) => {
    return (
      <TouchableOpacity onPress={this.setImageIndex(index)}>
        <View
          style={[
            { alignItems: "center" },
            this.state.imageIndex === index && styles.ativeEvent
          ]}
        >
          <Image
            resizeMode="stretch"
            style={[{ width: 50, height: 45, margin: 5 }]}
            source={{ uri: item }}
          />
        </View>
      </TouchableOpacity>
    );
  };

  setImageIndex = imageIndex => () => {
    this.setState({ imageIndex });
  };

  changedIndex = index => {
    console.log("onPageChanged", index);
    this.setState({ imageIndex: index });
  };
  render() {
    return (
      <View style={[styles.container]}>
        <View
          style={{
            width: "100%",
            height: "50%",
            alignItems: "center",
            justifyContent: "center"
          }}
        >
          <Carousel
            autoplay={false}
            loop={false}
            index={this.state.imageIndex}
            pageSize={this.bgCarouselWidth + 5}
            styles={{ alignItems: "center", flex: 1 }}
            pageIndicatorStyle={{
              top: 30,
              backgroundColor: "#FFFFFF",
              borderWidth: 1,
              borderColor: "blue",
              marginBottom: 2
            }}
            activePageIndicatorStyle={{ backgroundColor: "blue" }}
            onPageChanged={this.changedIndex}
          >
            {images.map((image, index) => this.renderPage(image, index))}
          </Carousel>
        </View>
        <View
          style={{
            flexDirection: "row",
            justifyContent: "center",
            marginTop: 65
          }}
        >
          <FlatList
            data={images}
            keyExtractor={(item, index) => index + ""}
            renderItem={this.allImages}
            horizontal={true}
            contentContainerStyle={{ width: "100%", justifyContent: "center" }}
          />
        </View>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
    alignItems: "center",
    justifyContent: "center"
  },
  ativeEvent: {
    borderColor: "blue",
    borderWidth: 2
  }
});
