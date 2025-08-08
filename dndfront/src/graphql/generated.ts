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

export type AuthPayload = {
  __typename?: 'AuthPayload';
  token: Scalars['String']['output'];
  user: User;
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

export type JoinCampaignInput = {
  campaignId: Scalars['Int']['input'];
};

export type Mutation = {
  __typename?: 'Mutation';
  confirmEmail: User;
  createCampaign: CampaignModel;
  declineInvitation: Scalars['Boolean']['output'];
  deleteInvitationAsDm: Scalars['Boolean']['output'];
  inviteToCampaign: Scalars['Boolean']['output'];
  joinCampaign: CampaignModel;
  login: AuthPayload;
  register: Scalars['String']['output'];
};


export type MutationConfirmEmailArgs = {
  token: Scalars['String']['input'];
};


export type MutationCreateCampaignArgs = {
  data: CreateCampaignInput;
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


export type MutationLoginArgs = {
  email: Scalars['String']['input'];
  password: Scalars['String']['input'];
};


export type MutationRegisterArgs = {
  email: Scalars['String']['input'];
  password: Scalars['String']['input'];
  username: Scalars['String']['input'];
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

export type UserFieldsFragment = { __typename?: 'User', id: number, email: string, username: string, isConfirmed: boolean };

export type ConfirmEmailMutationVariables = Exact<{
  token: Scalars['String']['input'];
}>;


export type ConfirmEmailMutation = { __typename?: 'Mutation', confirmEmail: { __typename?: 'User', id: number, email: string, username: string, isConfirmed: boolean } };

export type LoginMutationVariables = Exact<{
  email: Scalars['String']['input'];
  password: Scalars['String']['input'];
}>;


export type LoginMutation = { __typename?: 'Mutation', login: { __typename?: 'AuthPayload', token: string, user: { __typename?: 'User', id: number, email: string, username: string, isConfirmed: boolean } } };

export type RegisterMutationVariables = Exact<{
  email: Scalars['String']['input'];
  username: Scalars['String']['input'];
  password: Scalars['String']['input'];
}>;


export type RegisterMutation = { __typename?: 'Mutation', register: string };

export const UserFieldsFragmentDoc = gql`
    fragment UserFields on User {
  id
  email
  username
  isConfirmed
}
    `;
export const ConfirmEmailDocument = gql`
    mutation ConfirmEmail($token: String!) {
  confirmEmail(token: $token) {
    id
    email
    username
    isConfirmed
  }
}
    `;
export type ConfirmEmailMutationFn = Apollo.MutationFunction<ConfirmEmailMutation, ConfirmEmailMutationVariables>;

/**
 * __useConfirmEmailMutation__
 *
 * To run a mutation, you first call `useConfirmEmailMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useConfirmEmailMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [confirmEmailMutation, { data, loading, error }] = useConfirmEmailMutation({
 *   variables: {
 *      token: // value for 'token'
 *   },
 * });
 */
export function useConfirmEmailMutation(baseOptions?: Apollo.MutationHookOptions<ConfirmEmailMutation, ConfirmEmailMutationVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useMutation<ConfirmEmailMutation, ConfirmEmailMutationVariables>(ConfirmEmailDocument, options);
      }
export type ConfirmEmailMutationHookResult = ReturnType<typeof useConfirmEmailMutation>;
export type ConfirmEmailMutationResult = Apollo.MutationResult<ConfirmEmailMutation>;
export type ConfirmEmailMutationOptions = Apollo.BaseMutationOptions<ConfirmEmailMutation, ConfirmEmailMutationVariables>;
export const LoginDocument = gql`
    mutation Login($email: String!, $password: String!) {
  login(email: $email, password: $password) {
    token
    user {
      ...UserFields
    }
  }
}
    ${UserFieldsFragmentDoc}`;
export type LoginMutationFn = Apollo.MutationFunction<LoginMutation, LoginMutationVariables>;

/**
 * __useLoginMutation__
 *
 * To run a mutation, you first call `useLoginMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useLoginMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [loginMutation, { data, loading, error }] = useLoginMutation({
 *   variables: {
 *      email: // value for 'email'
 *      password: // value for 'password'
 *   },
 * });
 */
export function useLoginMutation(baseOptions?: Apollo.MutationHookOptions<LoginMutation, LoginMutationVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useMutation<LoginMutation, LoginMutationVariables>(LoginDocument, options);
      }
export type LoginMutationHookResult = ReturnType<typeof useLoginMutation>;
export type LoginMutationResult = Apollo.MutationResult<LoginMutation>;
export type LoginMutationOptions = Apollo.BaseMutationOptions<LoginMutation, LoginMutationVariables>;
export const RegisterDocument = gql`
    mutation Register($email: String!, $username: String!, $password: String!) {
  register(email: $email, username: $username, password: $password)
}
    `;
export type RegisterMutationFn = Apollo.MutationFunction<RegisterMutation, RegisterMutationVariables>;

/**
 * __useRegisterMutation__
 *
 * To run a mutation, you first call `useRegisterMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useRegisterMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [registerMutation, { data, loading, error }] = useRegisterMutation({
 *   variables: {
 *      email: // value for 'email'
 *      username: // value for 'username'
 *      password: // value for 'password'
 *   },
 * });
 */
export function useRegisterMutation(baseOptions?: Apollo.MutationHookOptions<RegisterMutation, RegisterMutationVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useMutation<RegisterMutation, RegisterMutationVariables>(RegisterDocument, options);
      }
export type RegisterMutationHookResult = ReturnType<typeof useRegisterMutation>;
export type RegisterMutationResult = Apollo.MutationResult<RegisterMutation>;
export type RegisterMutationOptions = Apollo.BaseMutationOptions<RegisterMutation, RegisterMutationVariables>;