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
          arguments
          template
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
          arguments
          template
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
          arguments
          template
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
      arguments
      sources {
        items {
          id
          name
          method
          url
          template
          createdAt
          updatedAt
        }
        nextToken
      }
      template
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
      arguments
      sources {
        items {
          id
          name
          method
          url
          template
          createdAt
          updatedAt
        }
        nextToken
      }
      template
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
      arguments
      sources {
        items {
          id
          name
          method
          url
          template
          createdAt
          updatedAt
        }
        nextToken
      }
      template
      createdAt
      updatedAt
    }
  }
`;
export const onCreateSource = /* GraphQL */ `
  subscription OnCreateSource {
    onCreateSource {
      id
      name
      command {
        id
        bot {
          id
          name
          description
          createdAt
          updatedAt
        }
        name
        arguments
        sources {
          nextToken
        }
        template
        createdAt
        updatedAt
      }
      method
      url
      template
      createdAt
      updatedAt
    }
  }
`;
export const onUpdateSource = /* GraphQL */ `
  subscription OnUpdateSource {
    onUpdateSource {
      id
      name
      command {
        id
        bot {
          id
          name
          description
          createdAt
          updatedAt
        }
        name
        arguments
        sources {
          nextToken
        }
        template
        createdAt
        updatedAt
      }
      method
      url
      template
      createdAt
      updatedAt
    }
  }
`;
export const onDeleteSource = /* GraphQL */ `
  subscription OnDeleteSource {
    onDeleteSource {
      id
      name
      command {
        id
        bot {
          id
          name
          description
          createdAt
          updatedAt
        }
        name
        arguments
        sources {
          nextToken
        }
        template
        createdAt
        updatedAt
      }
      method
      url
      template
      createdAt
      updatedAt
    }
  }
`;
