/* eslint-disable */
// this is an auto generated file. This will be overwritten

export const onCreateBot = /* GraphQL */ `
  subscription OnCreateBot {
    onCreateBot {
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
export const onUpdateBot = /* GraphQL */ `
  subscription OnUpdateBot {
    onUpdateBot {
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
export const onDeleteBot = /* GraphQL */ `
  subscription OnDeleteBot {
    onDeleteBot {
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
export const onCreateCommand = /* GraphQL */ `
  subscription OnCreateCommand {
    onCreateCommand {
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
export const onUpdateCommand = /* GraphQL */ `
  subscription OnUpdateCommand {
    onUpdateCommand {
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
export const onDeleteCommand = /* GraphQL */ `
  subscription OnDeleteCommand {
    onDeleteCommand {
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
