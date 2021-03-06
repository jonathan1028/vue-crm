import gql from 'graphql-tag'

// ----------------------------------------- Queries ---------------------------------------------
export const ALL_USERS_QUERY = gql`
  query AllUsersQuery {
    allUsers {
      id
      name
      email
      createdAt
      updatedAt
    }
  }
`

export const ALL_LINKS_QUERY = gql`
  query AllLinksQuery($first: Int, $skip: Int, $orderBy: LinkOrderBy) {
    allLinks(first: $first, skip: $skip, orderBy: $orderBy) {
      id
      createdAt
      url
      description
      postedBy {
        id
        name
      }
      votes {
        id
        user {
          id
        }
      }
    }
    # gives you access to the count of the links
    _allLinksMeta {
      count
    }
  }
`

export const ALL_PEOPLE_QUERY = gql`
  query AllPersonsQuery {
    allPersons {
      id
      createdAt
      displayName
      firstName
      lastName
      phone1
      email
      ownedBy {
        id
        name
      }
    }
  }
`
export const ALL_OPPORTUNITIES_QUERY = gql`
  query AllOpportunitiesQuery {
    allOpportunities {
      id
      jobName
      stage
      status
      amount
      source
      estimatedCloseDate
      probability
      ownedBy {
        id
        name
      }
      contacts {
        id
        displayName
      }
    }
  }
`

export const ALL_LINKS_SEARCH_QUERY = gql`
  query AllLinksSearchQuery($searchText: String!) {
    allLinks(filter: {
      OR: [{
        url_contains: $searchText
      }, {
        description_contains: $searchText
      }]
    }) {
      id
      url
      description
      createdAt
      postedBy {
        id
        name
      }
      votes {
        id
        user {
          id
        }
      }
    }
  }
`
// ----------------------------------------- Mutations ---------------------------------------------

// Two mutations defined at once!
// the execution order is always from top to bottom.
// CreateUser mutation will be executed before the signinUser mutation.
// Bundling two mutations like this allows you to sign up and login in a single request!
export const CREATE_USER_MUTATION = gql`
  mutation CreateUserMutation($name: String!, $email: String!, $password: String!) {
    createUser(
      name: $name,
      authProvider: {
        email: {
          email: $email,
          password: $password
        }
      }
    ) {
      id
    }

    signinUser(email: {
      email: $email,
      password: $password
    }) {
      token
      user {
        id
      }
    }
  }
`

export const SIGNIN_USER_MUTATION = gql`
  mutation SigninUserMutation($email: String!, $password: String!) {
    signinUser(email: {
      email: $email,
      password: $password
    }) {
      token
      user {
        id
      }
    }
  }
`

export const CREATE_PERSON_MUTATION = gql`
  mutation CreatePersonMutation($displayName: String!, $firstName: String, $lastName: String, 
    $phone1: String, $email: String, $ownedById: ID!) {
    createPerson(
      displayName: $displayName,
      firstName: $firstName,
      lastName: $lastName,
      phone1: $phone1,
      email: $email,
      ownedById: $ownedById
    ) {
      id
      createdAt
      displayName 
      firstName
      lastName
      phone1
      email
      ownedBy {
        id
        name
      }
    }
  }
`

export const CREATE_OPPORTUNITY_MUTATION = gql`
  mutation CreateOpportunityMutation($jobName: String, $ownedById: ID!, $source: String, $contacts: [ID!], $stage: String, $status: String,
  $amount: Float, $probability: Int) {
    createOpportunity(
      jobName: $jobName
      contactsIds: $contacts
      ownedById: $ownedById
      source: $source
      stage: $stage
      status: $status
      amount: $amount
      probability: $probability
    ) {
      id
    }
  }
`

export const UPDATE_USER_MUTATION = gql`
  mutation UpdateUserMutation($id: ID!,  $name: String) {
    updateUser(
      id: $id,
      name: $name,
    ) {
      id
      name
    }
  }
`

export const UPDATE_PERSON_MUTATION = gql`
  mutation UpdatePersonMutation($id: ID!, $displayName: String!, $firstName: String, 
  $lastName: String, $phone1: String, $email: String) {
    updatePerson(
      id: $id,
      displayName: $displayName,
      firstName: $firstName,
      lastName: $lastName,
      phone1: $phone1, 
      email: $email
    ) {
      id
      displayName
    }
  }
`

export const DELETE_USER_MUTATION = gql`
  mutation DeleteUserMutation($id: ID!) {
    deleteUser(
      id: $id,
    ) {
      id
    }
  }
`

export const DELETE_PERSON_MUTATION = gql`
  mutation DeletePersonMutation($id: ID!) {
    deletePerson(
      id: $id,
    ) {
      id
    }
  }
`

export const CREATE_LINK_MUTATION = gql`
  mutation CreateLinkMutation($description: String!, $url: String!, $postedById: ID!) {
    createLink(
      description: $description,
      url: $url,
      postedById: $postedById
    ) {
      id
      createdAt
      url
      description
      postedBy {
        id
        name
      }
    }
  }
`

export const CREATE_VOTE_MUTATION = gql`
  mutation CreateVoteMutation($userId: ID!, $linkId: ID!) {
    createVote(userId: $userId, linkId: $linkId) {
      id
      link {
        id
        votes {
          id
          user {
            id
          }
        }
      }
      user {
        id
      }
    }
  }
`
// ----------------------------------------- Subscriptions ---------------------------------------------

export const NEW_PEOPLE_SUBSCRIPTION = gql`
  subscription {
    Person(filter: {
      mutation_in: [CREATED]
    }) {
      node {
        id
        createdAt
        displayName 
        firstName
        lastName
        phone1
        email
        ownedBy {
          id
        }
      }
    }
  }
`

export const NEW_LINKS_SUBSCRIPTION = gql`
  subscription {
    Link(filter: {
      mutation_in: [CREATED]
    }) {
      node {
        id
        url
        description
        createdAt
        postedBy {
          id
          name
        }
        votes {
          id
          user {
            id
          }
        }
      }
    }
  }
`

export const NEW_VOTES_SUBSCRIPTION = gql`
  subscription {
    Vote(filter: { mutation_in: [CREATED] }) 
    {
      node {
        id
        link {
          id
          url
          description
          createdAt
          postedBy {
            id
            name
          }
          votes {
            id
            user {
              id
            }
          }
        }
        user {
          id
        }
      }
    }
  }
`
