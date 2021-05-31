/* eslint-disable */
// this is an auto generated file. This will be overwritten

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
        createdAt
        updatedAt
        commands {
          nextToken
        }
      }
      nextToken
    }
  }
`;
export const getBot = /* GraphQL */ `
  query GetBot($id: ID!) {
    getBot(id: $id) {
      id
      name
      description
      createdAt
      updatedAt
      commands {
        items {
          id
          name
          arguments
          template
          createdAt
          updatedAt
        }
        nextToken
      }
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
        name
        arguments
        template
        createdAt
        updatedAt
        bot {
          id
          name
          description
          createdAt
          updatedAt
        }
        sources {
          nextToken
        }
      }
      nextToken
    }
  }
`;
export const getCommand = /* GraphQL */ `
  query GetCommand($id: ID!) {
    getCommand(id: $id) {
      id
      name
      arguments
      template
      createdAt
      updatedAt
      bot {
        id
        name
        description
        createdAt
        updatedAt
        commands {
          nextToken
        }
      }
      sources {
        items {
          id
          method
          url
          body
          createdAt
          updatedAt
        }
        nextToken
      }
    }
  }
`;
export const getSource = /* GraphQL */ `
  query GetSource($id: ID!) {
    getSource(id: $id) {
      id
      method
      url
      body
      createdAt
      updatedAt
      command {
        id
        name
        arguments
        template
        createdAt
        updatedAt
        bot {
          id
          name
          description
          createdAt
          updatedAt
        }
        sources {
          nextToken
        }
      }
    }
  }
`;
export const listSources = /* GraphQL */ `
  query ListSources(
    $filter: ModelSourceFilterInput
    $limit: Int
    $nextToken: String
  ) {
    listSources(filter: $filter, limit: $limit, nextToken: $nextToken) {
      items {
        id
        method
        url
        body
        createdAt
        updatedAt
        command {
          id
          name
          arguments
          template
          createdAt
          updatedAt
        }
      }
      nextToken
    }
  }
`;