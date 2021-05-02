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
export const updateBot = /* GraphQL */ `
  mutation UpdateBot(
    $input: UpdateBotInput!
    $condition: ModelBotConditionInput
  ) {
    updateBot(input: $input, condition: $condition) {
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
export const deleteBot = /* GraphQL */ `
  mutation DeleteBot(
    $input: DeleteBotInput!
    $condition: ModelBotConditionInput
  ) {
    deleteBot(input: $input, condition: $condition) {
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
export const createCommand = /* GraphQL */ `
  mutation CreateCommand(
    $input: CreateCommandInput!
    $condition: ModelCommandConditionInput
  ) {
    createCommand(input: $input, condition: $condition) {
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
export const updateCommand = /* GraphQL */ `
  mutation UpdateCommand(
    $input: UpdateCommandInput!
    $condition: ModelCommandConditionInput
  ) {
    updateCommand(input: $input, condition: $condition) {
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
export const deleteCommand = /* GraphQL */ `
  mutation DeleteCommand(
    $input: DeleteCommandInput!
    $condition: ModelCommandConditionInput
  ) {
    deleteCommand(input: $input, condition: $condition) {
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
export const createSource = /* GraphQL */ `
  mutation CreateSource(
    $input: CreateSourceInput!
    $condition: ModelSourceConditionInput
  ) {
    createSource(input: $input, condition: $condition) {
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
export const updateSource = /* GraphQL */ `
  mutation UpdateSource(
    $input: UpdateSourceInput!
    $condition: ModelSourceConditionInput
  ) {
    updateSource(input: $input, condition: $condition) {
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
export const deleteSource = /* GraphQL */ `
  mutation DeleteSource(
    $input: DeleteSourceInput!
    $condition: ModelSourceConditionInput
  ) {
    deleteSource(input: $input, condition: $condition) {
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
