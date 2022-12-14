import styled from "@emotion/styled";
import { Box, Card, Flex } from "@chakra-ui/react";

export const ItemsWrapper = styled(Flex)`
  justify-content: space-around;

  & > div {
    //margin: 0 2rem;
  }

  @media only screen and (max-width: 1400px) {
    & > div {
      flex-basis: 50%;
    }
  }

  @media only screen and (max-width: 900px) {
    justify-content: center;
    & > div {
      display: flex;
      flex-direction: column;
      align-items: center;
      margin: 0 auto;
      flex-basis: 100%;
    }
  }
`;

export const RecipientAddress = styled.p`
  @media only screen and (max-width: 900px) {
    word-break: break-word;
    text-align: center;
  }
`;
export const RegistrationItem = styled(Flex)`
  flex-direction: column;
  align-items: center;
`;

export const RegistrationCard = styled(Card)`
  margin-bottom: 1rem;
`;
