import styled from "styled-components/native";

export const FullScreenContainer = styled.View`
  flex: 1;
  align-items: center;
  justify-content: center;
  flex-direction: ${props => props.direction || "column"};
`;
