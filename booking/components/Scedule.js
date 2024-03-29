import { Accordion } from "./Accordion";
import styled from "styled-components/native";
import { timeParser } from "../helpers/timeParser";

export const Scedule = ({ isExpanded, scedule, setExpanded }) => {
  const parseWorkTimePeriod = (day) => {
    const start = timeParser(day.workTime.start);
    const end = timeParser(day.workTime.end);

    return `${start.hours}:${start.minutes} - ${end.hours}:${end.minutes}`;
  };

  const theDay = scedule.filter((day) => day.code === new Date().getDay());
  const { end } = theDay[0].workTime;
  const now = new Date();
  const nowInMiliseconds = now.getHours() * 3600000 + now.getMinutes() * 60000;
  const endInMiliseconds = end.hours * 3600000 + end.minutes * 60000;
  const isWorkTime = endInMiliseconds >= nowInMiliseconds;

  return (
    <ListContainer>
      <OpenStatusBox>
        <OpenStatus isWorkTime={isWorkTime} dayOff={theDay[0].dayOff}>
          {theDay[0].dayOff || !isWorkTime ? "Closed now" : "Open"}
        </OpenStatus>
        {!isExpanded && (
          <TimeOfClothe>
            {theDay[0].dayOff || !isWorkTime
              ? ""
              : `Closes at ${timeParser(end).hours}:${timeParser(end).minutes}`}
          </TimeOfClothe>
        )}
      </OpenStatusBox>
      <Accordion
        onPress={setExpanded}
        isExpanded={isExpanded}
        heightOfOpenState={350}
      >
        {scedule.map((day, i) => {
          return (
            <WorkDayItem
              key={i}
              code={day.code}
              dayOff={day.dayOff}
              style={{ paddingLeft: 30 }}
            >
              <Day code={day.code} dayOff={day.dayOff}>
                {day.name}
              </Day>
              <Day code={day.code} dayOff={day.dayOff}>
                {!day.dayOff ? parseWorkTimePeriod(day) : "Day off"}
              </Day>
            </WorkDayItem>
          );
        })}
      </Accordion>
    </ListContainer>
  );
};

const ListContainer = styled.View`
  width: 100%;
  border-bottom-width: 1;
  border-bottom-color: #47315a;
  padding-bottom: 10px;
`;

const OpenStatusBox = styled.View`
  flex-direction: row;
  justify-content: space-between;
  position: absolute;
  top: 18px;
  left: 5px;
`;

const OpenStatus = styled.Text`
  font-size: 16px;
  font-weight: bold;
  color: ${(props) => (props.dayOff || !props.isWorkTime ? "red" : "#6842ff")};
  margin-right: 20px;
`;
const TimeOfClothe = styled.Text`
  font-size: 16px;
  font-weight: bold;
`;

const WorkDayItem = styled.View`
  flex-direction: row;
  justify-content: space-between;
  background-color: ${(props) =>
    props.dayOff ? "#d988cd" : props.code > 5 ? "#b5179e" : "#e6e6e6"};
  padding: 5px;
  padding-right: 30px;
  margin-bottom: 10px;
  border-radius: 5px;
`;

const Day = styled.Text`
  color: ${(props) => (props.dayOff || props.code > 5 ? "white" : "#58707c")};
  font-size: 18px;
`;
