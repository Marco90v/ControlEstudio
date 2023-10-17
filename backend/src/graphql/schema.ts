const typeDefs = `#graphql
  type Query {
    me: User, 
    login(user:String, pass:String): Token
  }

  type User {
    id: ID!
    username: String
  }

  type Token {
    token:String
  }

`
export default typeDefs