import React, { useState } from "react";

import { client } from "./API";
import { useQuery } from "@apollo/client";
import GET_DOMAIN_INFO from "./API/queries/domain";
// instead of whole web3js import
import GET_REVERSE_RECORD from "./API/queries/reverseRecord";
import {
  Input,
  Flex,
  ChakraProvider,
  FormLabel,
  Center,
  Box,
} from "@chakra-ui/react";
import styled from "@emotion/styled";
import { Registrations } from "./components/Registrations/Registrations";
import { DomainCard } from "./components/DomainCard/DomainCard";
import { isValidDomain, isValidETHAddress } from "./components/utils";

const AppWrapper = styled.div`
  background: #8ae3a8;
  padding: 2rem;
  height: 100vh;
`;

function App() {
  const [inputValue, setInputValue] = useState("");
  const inputIsValidDomain = isValidDomain(inputValue);
  const inputIsValidAddress = isValidETHAddress(inputValue);

  const { data: domainData, loading: domainDataLoading } = useQuery(
    GET_DOMAIN_INFO,
    {
      skip: !inputIsValidDomain,
      client,
      variables: { name: inputValue },
    }
  );

  const { data: reverseRecordData, loading: reverseRecordLoading } = useQuery(
    GET_REVERSE_RECORD,
    {
      skip: !inputIsValidAddress,
      client,
      variables: {
        address: inputValue,
      },
    }
  );

  return (
    <ChakraProvider>
      <AppWrapper className="App">
        <Flex height="100%" direction="column">
          <Box flex="0 1 auto">
            <FormLabel>
              <Center fontSize="xl" fontWeight="bold">
                Domain search
              </Center>
            </FormLabel>
            <Input
              placeholder="Enter address or domain"
              background="#fff"
              value={inputValue}
              onChange={(event) => {
                setInputValue(event.target.value);
              }}
            />
          </Box>
          <DomainCard
            domainData={
              inputIsValidDomain
                ? domainData
                : inputIsValidAddress
                ? reverseRecordData
                : undefined
            }
            loading={domainDataLoading || reverseRecordLoading}
          />
          <FormLabel>
            <Center fontSize="xl" fontWeight="bold">
              Latest domain registrations
            </Center>
          </FormLabel>
          <Registrations />
        </Flex>
      </AppWrapper>
    </ChakraProvider>
  );
}

export default App;
