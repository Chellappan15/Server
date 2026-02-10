export const typeDefs = `
  type Post {
    title: String!,
    content: String!,
    tag: String!
    id: ID,
    author: String!,
    dateCreated: String!,
  }

  type User {
    name: String,
    username: String,
    password: String,
    success: Boolean,
    message: String
    token: String,
  }

  input PostInput {
    title: String!
    content: String!
    tag: String!
  }

  input PostUpdateInput {
    title: String,
    content: String,
    tag: String,
  }

  input NewUserInput {
    name: String!,
    password: String!,
    username: String!,
  }

  input LoginUserInput {
    username: String!,
    password: String!,
  }

  type ReturnDetails {
    success: Boolean!,
    message: String!,
  }
    
  type CreatePostResponse {
    returnDetails: ReturnDetails!,
    post: Post!,
  }

  type GetMyPostsResponse {
    posts: [Post!]!,
    returnDetails: ReturnDetails!,
  }

  type GetAllPostsResponse {
    posts: [Post!]!,
    returnDetails: ReturnDetails!,
  }

  type UpdateMyPost {
    post: Post,
    returnDetails: ReturnDetails!,
  }

  type DeleteMyPost {
    deleted: Boolean,
    returnDetails: ReturnDetails!
  }

  type GetSingleRequestedPost {
    post: Post,
    returnDetails: ReturnDetails!
  }

  type GetUserResponse {
    user: User,
    returnDetails: ReturnDetails!
  }

  type Mutation {
    createPost(post: PostInput!): CreatePostResponse,
    deleteMyPost(id: ID!): DeleteMyPost!,
    updateMyPost(id: ID!, post: PostUpdateInput!): UpdateMyPost,
    createUser(user: NewUserInput!): User,
    loginUser(user: LoginUserInput!): User
  }
    
  type Query {
    Post: [Post!]!
    getMyPosts: GetMyPostsResponse,
    getAllPosts: GetAllPostsResponse,
    getSingleRequestedPost(postId: ID!): GetSingleRequestedPost!,
    getUser: GetUserResponse!,
  }
`;