import {gql} from "@apollo/client";

const GET_REVERSE_RECORD = gql`
    query lookup($address: String) {
        domains(where: {
            resolvedAddress: $address, owner: $address
        }) {
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
`

export default GET_REVERSE_RECORD
