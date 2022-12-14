import {
  Box,
  Card,
  CardBody,
  CardHeader,
  Center,
  Text,
} from "@chakra-ui/react";
import { ItemsWrapper, RecipientAddress } from "../Registrations/styled";
import React from "react";
import { Query } from "../../__generated__/graphql";
import { Loader } from "../Loader/Loader";
import { DomainWrapper } from "./styled";
import { formatTimestamp } from "../utils";

export const DomainCard = ({
  domainData,
  loading,
}: {
  domainData?: Query;
  loading: boolean;
}) => {
  const foundDomain = domainData?.domains[0];
  const registrations = foundDomain?.resolvedAddress!.registrations;
  const lastRegistration =
    registrations && registrations[registrations?.length - 1];

  return (
    <DomainWrapper>
      <Card background="#fff">
        {foundDomain && (
          <CardHeader>
            <Text fontWeight="bold" fontSize="lg">
              Domain info
            </Text>
          </CardHeader>
        )}
        <CardBody padding=".5rem 1rem">
          {loading ? (
            <Center>
              <Loader color="#8ae3a8" />
            </Center>
          ) : foundDomain ? (
            <ItemsWrapper flexWrap="wrap">
              <Box flexBasis="300px">
                <b>Registrant address:</b>
                <RecipientAddress>{foundDomain?.owner.id}</RecipientAddress>
              </Box>
              <Box>
                <b>Assigned ETH address</b>
                <p>{foundDomain?.name}</p>
              </Box>
              <Box>
                <b>Registration date:</b>
                <p>{formatTimestamp(lastRegistration?.registrationDate)}</p>
              </Box>
              <Box>
                <b>Expiry date:</b>
                <p>{formatTimestamp(lastRegistration?.expiryDate)}</p>
              </Box>
            </ItemsWrapper>
          ) : (
            <Center marginY="1rem">
              <Text fontSize="lg">Domain info not found</Text>
            </Center>
          )}
        </CardBody>
      </Card>
    </DomainWrapper>
  );
};
