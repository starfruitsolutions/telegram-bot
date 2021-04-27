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
      description
      type
      definition
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
      description
      type
      definition
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
      description
      type
      definition
      createdAt
      updatedAt
    }
  }
`;
