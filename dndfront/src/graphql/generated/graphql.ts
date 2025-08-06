/* eslint-disable */
import { TypedDocumentNode as DocumentNode } from '@graphql-typed-document-node/core';
export type Maybe<T> = T | null;
export type InputMaybe<T> = Maybe<T>;
export type Exact<T extends { [key: string]: unknown }> = { [K in keyof T]: T[K] };
export type MakeOptional<T, K extends keyof T> = Omit<T, K> & { [SubKey in K]?: Maybe<T[SubKey]> };
export type MakeMaybe<T, K extends keyof T> = Omit<T, K> & { [SubKey in K]: Maybe<T[SubKey]> };
export type MakeEmpty<T extends { [key: string]: unknown }, K extends keyof T> = { [_ in K]?: never };
export type Incremental<T> = T | { [P in keyof T]?: P extends ' $fragmentName' | '__typename' ? T[P] : never };
/** All built-in and custom scalars, mapped to their actual values */
export type Scalars = {
  ID: { input: string; output: string; }
  String: { input: string; output: string; }
  Boolean: { input: boolean; output: boolean; }
  Int: { input: number; output: number; }
  Float: { input: number; output: number; }
  /** A date-time string at UTC, such as 2019-12-03T09:54:33Z, compliant with the date-time format. */
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
  updatedAt: Scalars['DateTime']['output'];
  username: Scalars['String']['output'];
};

export type UserFieldsFragment = { __typename?: 'User', id: number, email: string, username: string } & { ' $fragmentName'?: 'UserFieldsFragment' };

export const UserFieldsFragmentDoc = {"kind":"Document","definitions":[{"kind":"FragmentDefinition","name":{"kind":"Name","value":"UserFields"},"typeCondition":{"kind":"NamedType","name":{"kind":"Name","value":"User"}},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"email"}},{"kind":"Field","name":{"kind":"Name","value":"username"}}]}}]} as unknown as DocumentNode<UserFieldsFragment, unknown>;