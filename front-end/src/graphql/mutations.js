/* eslint-disable */
// this is an auto generated file. This will be overwritten

export const createBot = /* GraphQL */ `
  mutation CreateBot(
    $input: CreateBotInput!
    $condition: ModelBotConditionInput
  ) {
    createBot(input: $input, condition: $condition) {
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
export const updateBot = /* GraphQL */ `
  mutation UpdateBot(
    $input: UpdateBotInput!
    $condition: ModelBotConditionInput
  ) {
    updateBot(input: $input, condition: $condition) {
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
export const deleteBot = /* GraphQL */ `
  mutation DeleteBot(
    $input: DeleteBotInput!
    $condition: ModelBotConditionInput
  ) {
    deleteBot(input: $input, condition: $condition) {
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
export const createCommand = /* GraphQL */ `
  mutation CreateCommand(
    $input: CreateCommandInput!
    $condition: ModelCommandConditionInput
  ) {
    createCommand(input: $input, condition: $condition) {
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
export const updateCommand = /* GraphQL */ `
  mutation UpdateCommand(
    $input: UpdateCommandInput!
    $condition: ModelCommandConditionInput
  ) {
    updateCommand(input: $input, condition: $condition) {
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
export const deleteCommand = /* GraphQL */ `
  mutation DeleteCommand(
    $input: DeleteCommandInput!
    $condition: ModelCommandConditionInput
  ) {
    deleteCommand(input: $input, condition: $condition) {
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
export const createSource = /* GraphQL */ `
  mutation CreateSource(
    $input: CreateSourceInput!
    $condition: ModelSourceConditionInput
  ) {
    createSource(input: $input, condition: $condition) {
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
export const updateSource = /* GraphQL */ `
  mutation UpdateSource(
    $input: UpdateSourceInput!
    $condition: ModelSourceConditionInput
  ) {
    updateSource(input: $input, condition: $condition) {
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
export const deleteSource = /* GraphQL */ `
  mutation DeleteSource(
    $input: DeleteSourceInput!
    $condition: ModelSourceConditionInput
  ) {
    deleteSource(input: $input, condition: $condition) {
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
