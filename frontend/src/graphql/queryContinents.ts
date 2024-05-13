import { gql } from "@apollo/client";

export const queryContinents = gql`
    query Query {
        continents {
            id
            name
        }
    }
`;