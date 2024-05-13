import { gql } from "@apollo/client";

export const mutationAddCountry = gql`
    mutation Mutation($data: NewCountryInput!) {
        addCountry(data: $data) {
            id
        }
    }
`;