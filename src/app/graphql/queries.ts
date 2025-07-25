import { gql } from 'apollo-angular';

export const GET_COUNTRIES = gql`
  query TopCountries($username: String!, $limit: Int!, $page: Int, $perPage: Int) {
    topCountries(username: $username, limit: $limit, page: $page, perPage: $perPage) {
      total
      per_page
      current_page
      from
      to
      last_page
      has_more_pages
      data {
        name
        area
        population
        density
      }
    }
  }
`;
