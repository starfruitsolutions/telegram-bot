/* eslint-disable */
// this is an auto generated file. This will be overwritten

export const onCreateBot = /* GraphQL */ `
  subscription OnCreateBot {
    onCreateBot {
      id
      name
      description
      createdAt
      updatedAt
      commands {
        items {
          id
          name
          description
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
export const onUpdateBot = /* GraphQL */ `
  subscription OnUpdateBot {
    onUpdateBot {
      id
      name
      description
      createdAt
      updatedAt
      commands {
        items {
          id
          name
          description
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
export const onDeleteBot = /* GraphQL */ `
  subscription OnDeleteBot {
    onDeleteBot {
      id
      name
      description
      createdAt
      updatedAt
      commands {
        items {
          id
          name
          description
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
export const onCreateCommand = /* GraphQL */ `
  subscription OnCreateCommand {
    onCreateCommand {
      id
      name
      description
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
          name
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
export const onUpdateCommand = /* GraphQL */ `
  subscription OnUpdateCommand {
    onUpdateCommand {
      id
      name
      description
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
          name
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
export const onDeleteCommand = /* GraphQL */ `
  subscription OnDeleteCommand {
    onDeleteCommand {
      id
      name
      description
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
          name
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
export const onCreateSource = /* GraphQL */ `
  subscription OnCreateSource {
    onCreateSource {
      id
      name
      method
      url
      body
      createdAt
      updatedAt
      command {
        id
        name
        description
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
export const onUpdateSource = /* GraphQL */ `
  subscription OnUpdateSource {
    onUpdateSource {
      id
      name
      method
      url
      body
      createdAt
      updatedAt
      command {
        id
        name
        description
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
export const onDeleteSource = /* GraphQL */ `
  subscription OnDeleteSource {
    onDeleteSource {
      id
      name
      method
      url
      body
      createdAt
      updatedAt
      command {
        id
        name
        description
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
