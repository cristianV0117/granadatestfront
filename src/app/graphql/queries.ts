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

export const GET_LOGS = gql`
  query GetLogs($start_date: String, $end_date: String) {
    getLogs(start_date: $start_date, end_date: $end_date) {
      id
      username
      request_timestamp
      num_countries_returned
      countries_details
      created_at
    }
  }
`;
