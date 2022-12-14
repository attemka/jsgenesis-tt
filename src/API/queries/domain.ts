import { gql } from "@apollo/client";

const GET_DOMAIN_INFO = gql`
  query lookup($name: String!) {
   domains(where: {name: $name}){
       resolvedAddress {
           id
           registrations {
               registrationDate
               expiryDate
           }
       }
       owner {
           id
       }
       name
       resolver {
           texts
           coinTypes
           contentHash
       }
   }
  }
`;

export default GET_DOMAIN_INFO
