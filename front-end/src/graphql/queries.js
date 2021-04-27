/* eslint-disable */
// this is an auto generated file. This will be overwritten

export const getBot = /* GraphQL */ `
  query GetBot($id: ID!) {
    getBot(id: $id) {
      id
      name
      description
      commands {
        items {
          id
          name
          description
          type
          definition
          createdAt
          updatedAt
        }
        nextToken
      }
      createdAt
      updatedAt
    }
  }
`;
export const listBots = /* GraphQL */ `
  query ListBots(
    $filter: ModelBotFilterInput
    $limit: Int
    $nextToken: String
  ) {
    listBots(filter: $filter, limit: $limit, nextToken: $nextToken) {
      items {
        id
        name
        description
        commands {
          nextToken
        }
        createdAt
        updatedAt
      }
      nextToken
    }
  }
`;
export const getCommand = /* GraphQL */ `
  query GetCommand($id: ID!) {
    getCommand(id: $id) {
      id
      bot {
        id
        name
        description
        commands {
          nextToken
        }
        createdAt
        updatedAt
      }
      name
      description
      type
      definition
      createdAt
      updatedAt
    }
  }
`;
export const listCommands = /* GraphQL */ `
  query ListCommands(
    $filter: ModelCommandFilterInput
    $limit: Int
    $nextToken: String
  ) {
    listCommands(filter: $filter, limit: $limit, nextToken: $nextToken) {
      items {
        id
        bot {
          id
          name
          description
          createdAt
          updatedAt
        }
        name
        description
        type
        definition
        createdAt
        updatedAt
      }
      nextToken
    }
  }
`;
