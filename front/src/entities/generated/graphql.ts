/* eslint-disable */
export type Maybe<T> = T | null;
export type InputMaybe<T> = Maybe<T>;
export type Exact<T extends { [key: string]: unknown }> = { [K in keyof T]: T[K] };
export type MakeOptional<T, K extends keyof T> = Omit<T, K> & { [SubKey in K]?: Maybe<T[SubKey]> };
export type MakeMaybe<T, K extends keyof T> = Omit<T, K> & { [SubKey in K]: Maybe<T[SubKey]> };
export type MakeEmpty<T extends { [key: string]: unknown }, K extends keyof T> = { [_ in K]?: never };
export type Incremental<T> = T | { [P in keyof T]?: P extends ' $fragmentName' | '__typename' ? T[P] : never };
/** All built-in and custom scalars, mapped to their actual values */
export interface Scalars {
  ID: { input: string; output: string; }
  String: { input: string; output: string; }
  Boolean: { input: boolean; output: boolean; }
  Int: { input: number; output: number; }
  Float: { input: number; output: number; }
  DateTimeISO: { input: any; output: any; }
}

export interface DateTimeIso_FilterInputType {
  EQ: InputMaybe<Scalars['DateTimeISO']['input']>;
  IN: InputMaybe<Array<Scalars['DateTimeISO']['input']>>;
  NOT_EQ: InputMaybe<Scalars['DateTimeISO']['input']>;
  NOT_IN: InputMaybe<Array<Scalars['DateTimeISO']['input']>>;
  NULL: InputMaybe<Scalars['Boolean']['input']>;
}

export enum EOrderMethod {
  Asc = 'ASC',
  Desc = 'DESC'
}

export enum EOrderNulls {
  First = 'FIRST',
  Last = 'LAST'
}

export enum EVotingStatusId {
  Completed = 'COMPLETED',
  InProgress = 'IN_PROGRESS',
  NotStarted = 'NOT_STARTED'
}

export interface Id_FilterInputType {
  EQ: InputMaybe<Scalars['ID']['input']>;
  GT: InputMaybe<Scalars['ID']['input']>;
  GTE: InputMaybe<Scalars['ID']['input']>;
  IN: InputMaybe<Array<Scalars['ID']['input']>>;
  LT: InputMaybe<Scalars['ID']['input']>;
  LTE: InputMaybe<Scalars['ID']['input']>;
  NOT_EQ: InputMaybe<Scalars['ID']['input']>;
  NOT_IN: InputMaybe<Array<Scalars['ID']['input']>>;
  NULL: InputMaybe<Scalars['Boolean']['input']>;
}

export interface Mutation {
  __typename?: 'Mutation';
  roomCreate: Room;
  roomDelete: Room;
  roomUpdate: Room;
  roomUserUpdate: RoomUser;
  taskChangeStatus: Task;
  taskCreate: Task;
  taskDelete: Task;
  taskSetCurrent: Task;
  taskUpdate: Task;
  userUpdate: User;
  voteChange: VoteChangeOjectDto;
}


export interface MutationRoomCreateArgs {
  data: RoomCreateDto;
}


export interface MutationRoomDeleteArgs {
  data: RoomDeleteDto;
}


export interface MutationRoomUpdateArgs {
  data: RoomUpdateDto;
}


export interface MutationRoomUserUpdateArgs {
  data: RoomUserUpdateDto;
}


export interface MutationTaskChangeStatusArgs {
  data: TaskChangeStatusDto;
}


export interface MutationTaskCreateArgs {
  data: TaskCreateDto;
}


export interface MutationTaskDeleteArgs {
  data: TaskDeleteDto;
}


export interface MutationTaskSetCurrentArgs {
  data: TaskChangeStatusDto;
}


export interface MutationTaskUpdateArgs {
  data: TaskUpdateDto;
}


export interface MutationUserUpdateArgs {
  data: UserUpdateDto;
}


export interface MutationVoteChangeArgs {
  data: VoteChangeDto;
}

export interface PaginationInputType {
  page: InputMaybe<Scalars['Int']['input']>;
  per_page: Scalars['Int']['input'];
}

export interface Query {
  __typename?: 'Query';
  currentUser: User;
  rooms: Array<Room>;
  tasks: Array<Task>;
  users: Array<User>;
  votes: Array<Vote>;
}


export interface QueryRoomsArgs {
  ORDER: InputMaybe<Room_OrderInputType>;
  PAGINATION: InputMaybe<PaginationInputType>;
  WHERE: InputMaybe<Room_FilterInputType>;
}


export interface QueryTasksArgs {
  ORDER: InputMaybe<Task_OrderInputType>;
  PAGINATION: InputMaybe<PaginationInputType>;
  WHERE: InputMaybe<Task_FilterInputType>;
}


export interface QueryUsersArgs {
  ORDER: InputMaybe<User_OrderInputType>;
  PAGINATION: InputMaybe<PaginationInputType>;
  WHERE: InputMaybe<User_FilterInputType>;
}


export interface QueryVotesArgs {
  ORDER: InputMaybe<Vote_OrderInputType>;
  PAGINATION: InputMaybe<PaginationInputType>;
  WHERE: InputMaybe<Vote_FilterInputType>;
}

export interface Room {
  __typename?: 'Room';
  created_at: Scalars['DateTimeISO']['output'];
  current_task_id: Maybe<Scalars['ID']['output']>;
  id: Scalars['ID']['output'];
  room_users: Maybe<Array<RoomUser>>;
  tasks: Maybe<Array<Task>>;
  title: Maybe<Scalars['String']['output']>;
  updated_at: Scalars['DateTimeISO']['output'];
}


export interface RoomRoom_UsersArgs {
  ORDER: InputMaybe<RoomUser_OrderInputType>;
  WHERE: InputMaybe<RoomUser_FilterInputType>;
}


export interface RoomTasksArgs {
  ORDER: InputMaybe<Task_OrderInputType>;
  WHERE: InputMaybe<Task_FilterInputType>;
}

export interface RoomCreateDto {
  title: Scalars['String']['input'];
}

export interface RoomDeleteDto {
  id: Scalars['ID']['input'];
}

export interface RoomUpdateDto {
  id: Scalars['ID']['input'];
  title: Scalars['String']['input'];
}

export interface RoomUser {
  __typename?: 'RoomUser';
  created_at: Scalars['DateTimeISO']['output'];
  id: Scalars['ID']['output'];
  room_id: Scalars['ID']['output'];
  updated_at: Scalars['DateTimeISO']['output'];
  user: User;
  user_id: Scalars['ID']['output'];
}

export interface RoomUserUpdateDto {
  name: Scalars['String']['input'];
  room_id: Scalars['ID']['input'];
}

export interface RoomUser_FilterInputType {
  AND: InputMaybe<Array<RoomUser_FilterInputType>>;
  OR: InputMaybe<Array<RoomUser_FilterInputType>>;
  id: InputMaybe<Id_FilterInputType>;
  room_id: InputMaybe<Id_FilterInputType>;
  user_id: InputMaybe<Id_FilterInputType>;
}

export interface RoomUser_OrderInputType {
  created_at: InputMaybe<Field_OrderInputType>;
  id: InputMaybe<Field_OrderInputType>;
  room_id: InputMaybe<Field_OrderInputType>;
  updated_at: InputMaybe<Field_OrderInputType>;
  user_id: InputMaybe<Field_OrderInputType>;
}

export interface Room_FilterInputType {
  AND: InputMaybe<Array<Room_FilterInputType>>;
  OR: InputMaybe<Array<Room_FilterInputType>>;
  created_at: InputMaybe<DateTimeIso_FilterInputType>;
  current_task_id: InputMaybe<Id_FilterInputType>;
  id: InputMaybe<Id_FilterInputType>;
  title: InputMaybe<String_FilterInputType>;
}

export interface Room_OrderInputType {
  created_at: InputMaybe<Field_OrderInputType>;
  current_task_id: InputMaybe<Field_OrderInputType>;
  id: InputMaybe<Field_OrderInputType>;
  title: InputMaybe<Field_OrderInputType>;
  updated_at: InputMaybe<Field_OrderInputType>;
}

export interface String_FilterInputType {
  EQ: InputMaybe<Scalars['String']['input']>;
  ILIKE: InputMaybe<Scalars['String']['input']>;
  IN: InputMaybe<Array<Scalars['String']['input']>>;
  NOT_EQ: InputMaybe<Scalars['String']['input']>;
  NOT_ILIKE: InputMaybe<Scalars['String']['input']>;
  NOT_IN: InputMaybe<Array<Scalars['String']['input']>>;
  NULL: InputMaybe<Scalars['Boolean']['input']>;
}

export interface Subscription {
  __typename?: 'Subscription';
  roomCreateEvent: Room;
  roomDeleteEvent: Room;
  roomUpdateEvent: Room;
  roomUserUpdateEvent: RoomUser;
  taskChangeStatusEvent: Task;
  taskCreateEvent: Task;
  taskDeleteEvent: Task;
  taskSetCurrentEvent: Task;
  taskUpdateEvent: Task;
  voteChangeEvent: VoteChangeOjectDto;
}


export interface SubscriptionRoomDeleteEventArgs {
  channel_id: InputMaybe<Scalars['ID']['input']>;
}


export interface SubscriptionRoomUpdateEventArgs {
  channel_id: InputMaybe<Scalars['ID']['input']>;
}


export interface SubscriptionRoomUserUpdateEventArgs {
  channel_id: Scalars['ID']['input'];
}


export interface SubscriptionTaskChangeStatusEventArgs {
  channel_id: Scalars['ID']['input'];
}


export interface SubscriptionTaskCreateEventArgs {
  channel_id: Scalars['ID']['input'];
}


export interface SubscriptionTaskDeleteEventArgs {
  channel_id: Scalars['ID']['input'];
}


export interface SubscriptionTaskSetCurrentEventArgs {
  channel_id: Scalars['ID']['input'];
}


export interface SubscriptionTaskUpdateEventArgs {
  channel_id: Scalars['ID']['input'];
}


export interface SubscriptionVoteChangeEventArgs {
  channel_id: Scalars['ID']['input'];
}

export interface Task {
  __typename?: 'Task';
  avg_point: Maybe<Scalars['Float']['output']>;
  created_at: Scalars['DateTimeISO']['output'];
  id: Scalars['ID']['output'];
  point: Maybe<Scalars['Int']['output']>;
  room_id: Scalars['ID']['output'];
  title: Scalars['String']['output'];
  updated_at: Scalars['DateTimeISO']['output'];
  votes: Maybe<Array<Vote>>;
  voting_status_id: EVotingStatusId;
}


export interface TaskVotesArgs {
  ORDER: InputMaybe<Vote_OrderInputType>;
  WHERE: InputMaybe<Vote_FilterInputType>;
}

export interface TaskChangeStatusDto {
  id: Scalars['ID']['input'];
  voting_status_id: EVotingStatusId;
}

export interface TaskCreateDto {
  room_id: Scalars['ID']['input'];
  title: Scalars['String']['input'];
}

export interface TaskDeleteDto {
  id: Scalars['ID']['input'];
}

export interface TaskUpdateDto {
  id: Scalars['ID']['input'];
  title: Scalars['String']['input'];
}

export interface Task_FilterInputType {
  AND: InputMaybe<Array<Task_FilterInputType>>;
  OR: InputMaybe<Array<Task_FilterInputType>>;
  id: InputMaybe<Id_FilterInputType>;
  room_id: InputMaybe<Id_FilterInputType>;
  title: InputMaybe<String_FilterInputType>;
}

export interface Task_OrderInputType {
  created_at: InputMaybe<Field_OrderInputType>;
  id: InputMaybe<Field_OrderInputType>;
  room_id: InputMaybe<Field_OrderInputType>;
  title: InputMaybe<Field_OrderInputType>;
  updated_at: InputMaybe<Field_OrderInputType>;
}

export interface User {
  __typename?: 'User';
  created_at: Scalars['DateTimeISO']['output'];
  id: Scalars['ID']['output'];
  name: Scalars['String']['output'];
  updated_at: Scalars['DateTimeISO']['output'];
}

export interface UserUpdateDto {
  name: Scalars['String']['input'];
}

export interface User_FilterInputType {
  AND: InputMaybe<Array<User_FilterInputType>>;
  OR: InputMaybe<Array<User_FilterInputType>>;
  id: InputMaybe<Id_FilterInputType>;
  name: InputMaybe<String_FilterInputType>;
}

export interface User_OrderInputType {
  created_at: InputMaybe<Field_OrderInputType>;
  id: InputMaybe<Field_OrderInputType>;
  name: InputMaybe<Field_OrderInputType>;
  updated_at: InputMaybe<Field_OrderInputType>;
}

export interface Vote {
  __typename?: 'Vote';
  created_at: Scalars['DateTimeISO']['output'];
  id: Scalars['ID']['output'];
  point: Scalars['Int']['output'];
  room_user_id: Scalars['ID']['output'];
  task_id: Scalars['ID']['output'];
  updated_at: Scalars['DateTimeISO']['output'];
}

export interface VoteChangeDto {
  point: Scalars['Int']['input'];
  task_id: Scalars['ID']['input'];
}

export interface VoteChangeOjectDto {
  __typename?: 'VoteChangeOjectDTO';
  room_user_id: Scalars['ID']['output'];
  task_id: Scalars['ID']['output'];
}

export interface Vote_FilterInputType {
  AND: InputMaybe<Array<Vote_FilterInputType>>;
  OR: InputMaybe<Array<Vote_FilterInputType>>;
  id: InputMaybe<Id_FilterInputType>;
  room_user_id: InputMaybe<Id_FilterInputType>;
  task_id: InputMaybe<Id_FilterInputType>;
}

export interface Vote_OrderInputType {
  created_at: InputMaybe<Field_OrderInputType>;
  id: InputMaybe<Field_OrderInputType>;
  room_user_id: InputMaybe<Field_OrderInputType>;
  task_id: InputMaybe<Field_OrderInputType>;
  updated_at: InputMaybe<Field_OrderInputType>;
}

export interface Field_OrderInputType {
  NULLS: InputMaybe<EOrderNulls>;
  SORT: EOrderMethod;
}
