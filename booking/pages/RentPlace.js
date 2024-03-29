import React, { useState, useCallback, useEffect } from "react";
import { TouchableOpacity } from "react-native";
import styled from "styled-components/native";
import { StatusBar } from "expo-status-bar";
import { LocationComponent } from "../components/Location";
import { Header } from "../components/Header";
import { DateTimePicker } from "../components/DateTimePicker";
import { Scedule } from "../components/Scedule";
import { Slider } from "../components/Slider";
import { ScrollView } from "react-native";
import { places } from "../mockData";
import { checkIsDayOff } from "../helpers/checkIsDayOff";

export const RentPlace = ({ navigation }) => {
  const [isFavorite, setIsfavorite] = useState(false);
  const [isSceduleOpen, setisSceduleOpen] = useState(false);
  const [date, setDate] = useState(new Date());
  const [dateOpen, setDateOpen] = useState(false);
  const [time, setTime] = useState({});
  const [timeOpen, setTimeOpen] = useState(false);

  const { scedule, photo, description, title, location, items } = places[0];

  const daysOff = scedule.filter((day) => day.dayOff);
  const daysOffCodes = daysOff.map((day) => day.code);
  const today = new Date();
  const hours = today.getHours();
  const minutes = today.getMinutes();
  const theDayCode = date.getDay();
  const todayToCompare = today.getTime() + "";
  const dateToCompare = date.getTime() + "";

  const sceduleDay = scedule.filter((day) => day.code === theDayCode);
  const { end } = sceduleDay[0].workTime;
  
  const todayInMiliseconds = hours * 3600000 + minutes * 60000;
  const endInMiliseconds = end.hours * 3600000 + end.minutes * 60000;
  const isWorkTime = endInMiliseconds >= todayInMiliseconds;
  const plussOneDay = 86400000;

  useEffect(() => {
    if (todayToCompare.slice(1, 5) !== dateToCompare.slice(1, 5)) {
      setTime(sceduleDay[0].workTime.start);
    } else {
      setTime({ hours: hours + 1, minutes: minutes });
    }
  }, [date]);

  useEffect(() => {
    if (daysOffCodes.includes(date.getDay())) {
      setDate(checkIsDayOff(date, daysOffCodes));
    }
  }, [date]);

  useEffect(() => {
    if (!isWorkTime) {
      setDate(new Date(date.getTime() + plussOneDay));
    }
  }, []);

  const onDateConfirm = useCallback(
    (params) => {
      setDateOpen(false);
      setDate(params.date);
    },
    [setDateOpen, setDate]
  );

  const onDateDismiss = useCallback(() => {
    setDateOpen(false);
  }, [setDateOpen]);

  const onTimeDismiss = useCallback(() => {
    setTimeOpen(false);
  }, [setTimeOpen]);

  const onTimeConfirm = useCallback(
    ({ hours, minutes }) => {
      setTimeOpen(false);
      setTime({ hours, minutes });
    },
    [setTimeOpen]
  );

  return (
    <Container>
      <StatusBar />
      <Header
        navigation={navigation}
        backRoute={"FindPlace"}
        backRouteText="Find a place"
        style={{ borderBottomWidth: 1 }}
      />
      <Content>
        <ScrollView
          automaticallyAdjustContentInsets={false}
          showsVerticalScrollIndicator={false}
          style={{ flex: 9 }}
        >
          <Slider photo={photo} />
          <ContentWraper>
            <TouchableOpacity onPress={() => setIsfavorite(!isFavorite)}>
              <TitleBox>
                <NameOfBusiness>{title}</NameOfBusiness>
                {isFavorite ? (
                  <FavoriteIcon source={require("../icons/likeBlue.png")} />
                ) : (
                  <FavoriteIcon source={require("../icons/like.png")} />
                )}
              </TitleBox>
            </TouchableOpacity>
            <LocationComponent location={location} />
            <Description>{description}</Description>
            <Scedule
              setExpanded={() => setisSceduleOpen(!isSceduleOpen)}
              isExpanded={isSceduleOpen}
              scedule={scedule}
            />
            <DateTimePicker
              daysOff={daysOffCodes}
              onDatePress={() => setDateOpen(true)}
              dateVisible={dateOpen}
              date={date}
              onDateConfirm={onDateConfirm}
              onDateDismiss={onDateDismiss}
              onTimePress={() => setTimeOpen(true)}
              time={time}
              timeVisible={timeOpen}
              onTimeDismiss={onTimeDismiss}
              onTimeConfirm={onTimeConfirm}
            />
          </ContentWraper>
          <Footer></Footer>
        </ScrollView>
      </Content>
    </Container>
  );
};
const Content = styled.View`
  flex: 9;
  width: 100%;
`;

const ContentWraper = styled.View`
  width: 100%;
  padding: 0 20px;
  padding-top: 20px;
`;

const Container = styled.View`
  width: 100%;
  flex: 1;
  align-items: center;
`;

const FavoriteIcon = styled.Image`
  width: 30px;
  height: 30px;
`;

const NameOfBusiness = styled.Text`
  font-size: 26px;
  font-weight: bold;
  margin-right: auto;
`;

const TitleBox = styled.View`
  flex-direction: row;
  margin-bottom: 10px;
  align-items: center;
`;

const Description = styled.Text`
  margin-top: 10px;
  font-size: 16px;
  color: #5c677d;
`;

const Footer = styled.View`
  margin-top: 20px;
  width: 100%;
  height: 100px;
  align-items: center;
`;
