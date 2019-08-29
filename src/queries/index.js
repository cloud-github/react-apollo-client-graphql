import { gql } from 'apollo-boost';

export const GET_COUNTRIES = gql`
  {
    countries {
      name
      code
      continent {
        name
      }
      languages {
         name
      }
    }
  }
`;

export const VIEW_COUNTRY = gql`
  query ($code: String){
    country(code: $code) {
      name
      currency
      phone
    }
  }
`;
