import { gql } from "@apollo/client";

export const queryCountry = gql`
    query Country($code: String!) {
        country(code: $code) {
            id
            name
            code
            emoji
            continent {
                id
                name
            }
        }
    }
`;