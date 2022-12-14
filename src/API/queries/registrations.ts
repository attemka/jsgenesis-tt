import { gql } from "@apollo/client";

const GET_LAST_REGISTRATIONS_INFO = gql`
  query Subscription($skip: Int!, $first: Int!) {
    registrations(
      first: $first
      skip: $skip
      orderBy: registrationDate
      orderDirection: desc
    ) {
      id
      registrationDate
      expiryDate
      registrant {
        id
      }
      domain {
        name
      }
    }
  }
`;

export default GET_LAST_REGISTRATIONS_INFO;
