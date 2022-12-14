import {
  ItemsWrapper,
  RecipientAddress,
  RegistrationCard,
  RegistrationItem,
} from "./styled";
import { Box, CardBody, Center } from "@chakra-ui/react";
import { format } from "date-fns";
import { LoaderWrapper } from "../Loader/style";
import { Loader } from "../Loader/Loader";
import React, { useEffect, useState } from "react";
import useVirtual from "react-cool-virtual";
import { PAGINATION_DEFAULT_LIMIT } from "../../utils/consts";
import { useQuery } from "@apollo/client";
import GET_LAST_REGISTRATIONS_INFO from "../../API/queries/registrations";
import { client } from "../../API";
import { formatTimestamp } from "../utils";

export const Registrations = () => {
  const [limit, setLimit] = useState(PAGINATION_DEFAULT_LIMIT);
  const [regLoadedArray, setRegLoadedArray] = useState<boolean[]>([]);
  console.log(limit);

  const {
    data: registrationsData,
    fetchMore: fetchMoreRegistrations,
    startPolling,
    stopPolling,
    loading,
  } = useQuery(GET_LAST_REGISTRATIONS_INFO, {
    client,
    variables: {
      first: PAGINATION_DEFAULT_LIMIT,
      skip: 0,
    },
  });

  const { outerRef, innerRef, items } = useVirtual<HTMLDivElement>({
    itemCount: registrationsData?.registrations.length || 0,
    loadMoreCount: PAGINATION_DEFAULT_LIMIT,
    loadMore: (e) => {
      setRegLoadedArray((prevArr) => {
        prevArr[e.loadIndex] = true;
        return prevArr;
      });
      fetchMoreRegistrations({
        variables: {
          skip: e.loadIndex * PAGINATION_DEFAULT_LIMIT,
          limit: PAGINATION_DEFAULT_LIMIT,
        },
      }).then((fetchMoreResult) => {
        if (!registrationsData) return;
        setLimit(
          registrationsData?.registrations.length +
            fetchMoreResult.data.registrations.length
        );
      });
    },
    isItemLoaded: (loadIndex) => regLoadedArray[loadIndex],
  });

  useEffect(() => {
    // https://github.com/apollographql/apollo-client/issues/9819
    if (startPolling) {
      startPolling(2000);
    }
    return () => {
      stopPolling();
    };
  }, [startPolling, stopPolling]);

  return (
    <div
      ref={outerRef}
      className="outer"
      style={{
        width: "100%",
        flex: "1 1 auto",
        justifyContent: "flex-start",
        alignContent: "flex-start",
        overflow: "auto",
      }}
    >
      <div ref={innerRef}>
        {!registrationsData && loading && (
          <Center>
            <Loader />
          </Center>
        )}
        {items.map(({ index, isScrolling, measureRef }) => {
          const showLoading =
            index === registrationsData?.registrations.length - 1 &&
            registrationsData?.registrations.length < 1000;

          return (
            <RegistrationItem key={index}>
              <RegistrationCard
                background="#fff"
                key={index}
                w="100%"
                ref={measureRef}
              >
                <CardBody padding=".5rem 1rem">
                  <ItemsWrapper flexWrap="wrap">
                    <Box flexBasis="350px">
                      <b>Registrant address:</b>
                      <RecipientAddress>
                        {registrationsData?.registrations[index]?.registrant.id}
                      </RecipientAddress>
                    </Box>
                    <Box>
                      <b>Assigned ETH address:</b>
                      <p>
                        {registrationsData?.registrations[index]?.domain.name}
                      </p>
                    </Box>
                    <Box>
                      <b>Registration date:</b>
                      <p>
                        {formatTimestamp(
                          registrationsData?.registrations[index]
                            ?.registrationDate
                        )}
                      </p>
                    </Box>
                    <Box>
                      <b>Expiry date:</b>
                      <p>
                        {formatTimestamp(
                          registrationsData?.registrations[index]?.expiryDate
                        )}
                      </p>
                    </Box>
                  </ItemsWrapper>
                </CardBody>
              </RegistrationCard>
              {showLoading && (
                <LoaderWrapper>
                  <Loader />
                </LoaderWrapper>
              )}
            </RegistrationItem>
          );
        })}
      </div>
    </div>
  );
};
