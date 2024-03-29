import styled from "styled-components/native";
import React, { useState } from "react";
import { Dimensions, TouchableOpacity } from "react-native";
import { Scedule } from "./Scedule";

const windowWidth = Dimensions.get("window").width;

export const PlaceCard = ({ data, expandedCadr, setExpanded, navigation }) => {
  const [isFavorite, setIsfavorite] = useState(false);
  const { title, businesSubType, photo, description } = data;

  const isExpanded = expandedCadr === data.id;

  const NavigateToplace = () => {
    navigation.navigate("RentPlace");
  };

  return (
    <Container>
      <Box>
        <TouchableOpacity style={ImageWrap} onPress={NavigateToplace}>
          <PlaceImage source={photo[0]} />
        </TouchableOpacity>
        <CardContent>
          <CardLabel>
            <BusinesType>{businesSubType}</BusinesType>
            {isFavorite ? (
              <TouchableOpacity onPress={() => setIsfavorite(!isFavorite)}>
                <FavoriteWrap>
                  <FavoriteIcon source={require("../icons/likeBlue.png")} />
                </FavoriteWrap>
              </TouchableOpacity>
            ) : (
              <TouchableOpacity onPress={() => setIsfavorite(!isFavorite)}>
                <FavoriteWrap>
                  <FavoriteIcon source={require("../icons/like.png")} />
                </FavoriteWrap>
              </TouchableOpacity>
            )}
          </CardLabel>
          <Title>{title}</Title>
          <Description numberOfLines={windowWidth > 414 ? 4 : 2}>
            {description}
          </Description>
        </CardContent>
      </Box>
      <Scedule
        setExpanded={() => setExpanded(isExpanded ? 0 : data.id)}
        isExpanded={isExpanded}
        scedule={data.scedule}
      />
    </Container>
  );
};

const maxHeight = windowWidth > 414 ? 150 : 100;

const Box = styled.View`
  width: 100%;
  flex-direction: row;
  padding: 15px 0px 0px 0px;
`;
const Container = styled.View`
  width: 100%;
`;
const PlaceImage = styled.Image`
  width: 100%;
  max-height: ${maxHeight};
  border-radius: 5px;
`;

const ImageWrap = {
  width: "30%",
  maxHeight: maxHeight,
};
const FavoriteIcon = styled.Image`
  width: 22px;
  height: 22px;
`;

const FavoriteWrap = styled.View`
  width: 80px;
  height: 80px;
  justify-content: flex-start;
  align-items: flex-end;
  position: absolute;
  padding-right: 2px;
  right: 0;
  top: 0;
`;

const Title = styled.Text`
  font-size: 20px;
  font-weight: bold;
`;

const CardContent = styled.View`
  padding-left: 3%;
  width: 100%;
`;

const CardLabel = styled.View`
  flex-direction: row;
  padding-bottom: 5px;
  justify-content: space-between;
  width: 67%;
  align-items: center;
`;

const BusinesType = styled.Text`
  font-size: 16px;
  color: #808080;
`;

const Description = styled.Text`
  padding-top: 5px;
  font-size: 16px;
  width: 70%;
  max-width: 300px;
  color: #5c677d;
`;



