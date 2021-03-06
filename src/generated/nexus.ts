/**
 * This file was generated by Nexus Schema
 * Do not make changes to this file directly
 */

import * as Context from "../context"



declare global {
  interface NexusGenCustomOutputProperties<TypeName extends string> {
    crud: NexusPrisma<TypeName, 'crud'>
    model: NexusPrisma<TypeName, 'model'>
  }
}

declare global {
  interface NexusGen extends NexusGenTypes {}
}

export interface NexusGenInputs {
  MessageCreateInput: { // input type
    createdAt?: NexusGenScalars['DateTime'] | null; // DateTime
    message: string; // String!
    receiver: string; // String!
    sender: string; // String!
    subject: string; // String!
  }
  MessageWhereUniqueInput: { // input type
    id?: number | null; // Int
  }
  UserCreateInput: { // input type
    senderId: string; // String!
  }
}

export interface NexusGenEnums {
}

export interface NexusGenScalars {
  String: string
  Int: number
  Float: number
  Boolean: boolean
  ID: string
  DateTime: any
}

export interface NexusGenRootTypes {
  LoginPayload: { // root type
    accessToken?: string | null; // String
    user?: NexusGenRootTypes['User'] | null; // User
  }
  Message: { // root type
    createdAt: NexusGenScalars['DateTime']; // DateTime!
    id: number; // Int!
    message: string; // String!
    receiver: string; // String!
    sender: string; // String!
    subject: string; // String!
  }
  Mutation: {};
  Query: {};
  Subscription: {};
  User: { // root type
    id: number; // Int!
    senderId: string; // String!
  }
  UserMessages: { // root type
    received?: Array<NexusGenRootTypes['Message'] | null> | null; // [Message]
    sent?: Array<NexusGenRootTypes['Message'] | null> | null; // [Message]
  }
}

export interface NexusGenAllTypes extends NexusGenRootTypes {
  MessageCreateInput: NexusGenInputs['MessageCreateInput'];
  MessageWhereUniqueInput: NexusGenInputs['MessageWhereUniqueInput'];
  UserCreateInput: NexusGenInputs['UserCreateInput'];
  String: NexusGenScalars['String'];
  Int: NexusGenScalars['Int'];
  Float: NexusGenScalars['Float'];
  Boolean: NexusGenScalars['Boolean'];
  ID: NexusGenScalars['ID'];
  DateTime: NexusGenScalars['DateTime'];
}

export interface NexusGenFieldTypes {
  LoginPayload: { // field return type
    accessToken: string | null; // String
    user: NexusGenRootTypes['User'] | null; // User
  }
  Message: { // field return type
    createdAt: NexusGenScalars['DateTime']; // DateTime!
    id: number; // Int!
    message: string; // String!
    receiver: string; // String!
    sender: string; // String!
    subject: string; // String!
  }
  Mutation: { // field return type
    createOneMessage: NexusGenRootTypes['Message']; // Message!
    createOneUser: NexusGenRootTypes['User']; // User!
    deleteOneMessage: NexusGenRootTypes['Message'] | null; // Message
    login: NexusGenRootTypes['LoginPayload'] | null; // LoginPayload
  }
  Query: { // field return type
    messages: Array<NexusGenRootTypes['Message'] | null> | null; // [Message]
    user: NexusGenRootTypes['User'] | null; // User
    userMessages: NexusGenRootTypes['UserMessages'] | null; // UserMessages
    users: Array<NexusGenRootTypes['User'] | null> | null; // [User]
  }
  Subscription: { // field return type
    messageCreated: NexusGenRootTypes['Message'] | null; // Message
  }
  User: { // field return type
    id: number; // Int!
    senderId: string; // String!
  }
  UserMessages: { // field return type
    received: Array<NexusGenRootTypes['Message'] | null> | null; // [Message]
    sent: Array<NexusGenRootTypes['Message'] | null> | null; // [Message]
  }
}

export interface NexusGenArgTypes {
  Mutation: {
    createOneMessage: { // args
      data: NexusGenInputs['MessageCreateInput']; // MessageCreateInput!
    }
    createOneUser: { // args
      data: NexusGenInputs['UserCreateInput']; // UserCreateInput!
    }
    deleteOneMessage: { // args
      where: NexusGenInputs['MessageWhereUniqueInput']; // MessageWhereUniqueInput!
    }
    login: { // args
      id: string; // String!
    }
  }
  Query: {
    userMessages: { // args
      id?: string | null; // String
    }
    users: { // args
      q?: string | null; // String
    }
  }
}

export interface NexusGenAbstractResolveReturnTypes {
}

export interface NexusGenInheritedFields {}

export type NexusGenObjectNames = "LoginPayload" | "Message" | "Mutation" | "Query" | "Subscription" | "User" | "UserMessages";

export type NexusGenInputNames = "MessageCreateInput" | "MessageWhereUniqueInput" | "UserCreateInput";

export type NexusGenEnumNames = never;

export type NexusGenInterfaceNames = never;

export type NexusGenScalarNames = "Boolean" | "DateTime" | "Float" | "ID" | "Int" | "String";

export type NexusGenUnionNames = never;

export interface NexusGenTypes {
  context: Context.Context;
  inputTypes: NexusGenInputs;
  rootTypes: NexusGenRootTypes;
  argTypes: NexusGenArgTypes;
  fieldTypes: NexusGenFieldTypes;
  allTypes: NexusGenAllTypes;
  inheritedFields: NexusGenInheritedFields;
  objectNames: NexusGenObjectNames;
  inputNames: NexusGenInputNames;
  enumNames: NexusGenEnumNames;
  interfaceNames: NexusGenInterfaceNames;
  scalarNames: NexusGenScalarNames;
  unionNames: NexusGenUnionNames;
  allInputTypes: NexusGenTypes['inputNames'] | NexusGenTypes['enumNames'] | NexusGenTypes['scalarNames'];
  allOutputTypes: NexusGenTypes['objectNames'] | NexusGenTypes['enumNames'] | NexusGenTypes['unionNames'] | NexusGenTypes['interfaceNames'] | NexusGenTypes['scalarNames'];
  allNamedTypes: NexusGenTypes['allInputTypes'] | NexusGenTypes['allOutputTypes']
  abstractTypes: NexusGenTypes['interfaceNames'] | NexusGenTypes['unionNames'];
  abstractResolveReturn: NexusGenAbstractResolveReturnTypes;
}


declare global {
  interface NexusGenPluginTypeConfig<TypeName extends string> {
  }
  interface NexusGenPluginFieldConfig<TypeName extends string, FieldName extends string> {
  }
  interface NexusGenPluginSchemaConfig {
  }
}