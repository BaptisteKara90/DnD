import { gql } from '@apollo/client';
import * as Apollo from '@apollo/client';
export type Maybe<T> = T | null;
export type InputMaybe<T> = Maybe<T>;
export type Exact<T extends { [key: string]: unknown }> = { [K in keyof T]: T[K] };
export type MakeOptional<T, K extends keyof T> = Omit<T, K> & { [SubKey in K]?: Maybe<T[SubKey]> };
export type MakeMaybe<T, K extends keyof T> = Omit<T, K> & { [SubKey in K]: Maybe<T[SubKey]> };
export type MakeEmpty<T extends { [key: string]: unknown }, K extends keyof T> = { [_ in K]?: never };
export type Incremental<T> = T | { [P in keyof T]?: P extends ' $fragmentName' | '__typename' ? T[P] : never };
const defaultOptions = {} as const;
/** All built-in and custom scalars, mapped to their actual values */
export type Scalars = {
  ID: { input: string; output: string; }
  String: { input: string; output: string; }
  Boolean: { input: boolean; output: boolean; }
  Int: { input: number; output: number; }
  Float: { input: number; output: number; }
  DateTime: { input: any; output: any; }
};

export type CampaignInvitationModel = {
  __typename?: 'CampaignInvitationModel';
  accepted: Scalars['Boolean']['output'];
  campaignId: Scalars['Int']['output'];
  campaignName: Scalars['String']['output'];
  createdAt: Scalars['DateTime']['output'];
  email: Scalars['String']['output'];
  id: Scalars['Int']['output'];
  invitedByUsername: Scalars['String']['output'];
  updatedAt: Scalars['DateTime']['output'];
};

export type CampaignModel = {
  __typename?: 'CampaignModel';
  createdAt: Scalars['DateTime']['output'];
  description?: Maybe<Scalars['String']['output']>;
  id: Scalars['Int']['output'];
  name: Scalars['String']['output'];
  ownerId: Scalars['Int']['output'];
  role: CampaignRole;
  summary?: Maybe<Scalars['String']['output']>;
  updatedAt: Scalars['DateTime']['output'];
};

export enum CampaignRole {
  Dm = 'DM',
  Player = 'PLAYER'
}

export type CreateCampaignInput = {
  description?: InputMaybe<Scalars['String']['input']>;
  name: Scalars['String']['input'];
};

export type CreateCampaignInvitationInput = {
  campaignId: Scalars['Float']['input'];
  email: Scalars['String']['input'];
};

export type CreateUserInput = {
  email: Scalars['String']['input'];
  password: Scalars['String']['input'];
  username: Scalars['String']['input'];
};

export type JoinCampaignInput = {
  campaignId: Scalars['Int']['input'];
};

export type Mutation = {
  __typename?: 'Mutation';
  createCampaign: CampaignModel;
  createUser: User;
  declineInvitation: Scalars['Boolean']['output'];
  deleteInvitationAsDm: Scalars['Boolean']['output'];
  inviteToCampaign: Scalars['Boolean']['output'];
  joinCampaign: CampaignModel;
};


export type MutationCreateCampaignArgs = {
  data: CreateCampaignInput;
};


export type MutationCreateUserArgs = {
  data: CreateUserInput;
};


export type MutationDeclineInvitationArgs = {
  invitationId: Scalars['Int']['input'];
};


export type MutationDeleteInvitationAsDmArgs = {
  invitationId: Scalars['Int']['input'];
};


export type MutationInviteToCampaignArgs = {
  data: CreateCampaignInvitationInput;
};


export type MutationJoinCampaignArgs = {
  data: JoinCampaignInput;
};

export type Query = {
  __typename?: 'Query';
  getUserCampaigns: Array<CampaignModel>;
  myPendingInvitations: Array<CampaignInvitationModel>;
  user?: Maybe<User>;
  users: Array<User>;
};


export type QueryUserArgs = {
  id: Scalars['Int']['input'];
};

export type User = {
  __typename?: 'User';
  createdAt: Scalars['DateTime']['output'];
  email: Scalars['String']['output'];
  id: Scalars['Int']['output'];
  isConfirmed: Scalars['Boolean']['output'];
  updatedAt: Scalars['DateTime']['output'];
  username: Scalars['String']['output'];
};

export type UserFieldsFragment = { __typename?: 'User', id: number, email: string, username: string };

export type CreateUserMutationVariables = Exact<{
  data: CreateUserInput;
}>;


export type CreateUserMutation = { __typename?: 'Mutation', createUser: { __typename?: 'User', id: number, email: string, username: string } };

export const UserFieldsFragmentDoc = gql`
    fragment UserFields on User {
  id
  email
  username
}
    `;
export const CreateUserDocument = gql`
    mutation CreateUser($data: CreateUserInput!) {
  createUser(data: $data) {
    ...UserFields
  }
}
    ${UserFieldsFragmentDoc}`;
export type CreateUserMutationFn = Apollo.MutationFunction<CreateUserMutation, CreateUserMutationVariables>;

/**
 * __useCreateUserMutation__
 *
 * To run a mutation, you first call `useCreateUserMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useCreateUserMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [createUserMutation, { data, loading, error }] = useCreateUserMutation({
 *   variables: {
 *      data: // value for 'data'
 *   },
 * });
 */
export function useCreateUserMutation(baseOptions?: Apollo.MutationHookOptions<CreateUserMutation, CreateUserMutationVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useMutation<CreateUserMutation, CreateUserMutationVariables>(CreateUserDocument, options);
      }
export type CreateUserMutationHookResult = ReturnType<typeof useCreateUserMutation>;
export type CreateUserMutationResult = Apollo.MutationResult<CreateUserMutation>;
export type CreateUserMutationOptions = Apollo.BaseMutationOptions<CreateUserMutation, CreateUserMutationVariables>;