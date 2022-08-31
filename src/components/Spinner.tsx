import React from "react";
import styled from "@emotion/styled";
import { GridLoader } from "react-spinners";

const Wrapper = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  height: 100vh;
`;

const Spinner = () => {
  return (
    <Wrapper>
      <GridLoader />
    </Wrapper>
  );
};

export default Spinner;
