import serverOptions from "./graphql-schema-server-builder";

const Schema = serverOptions();

const userType = `
   type User {
       id: ID!
       name: String!
       email: String!
   }    
`;

const userQuery = `
   user: User!
`;

Schema.setTypeDefsTypes([userType]).setTypeDefsQueries([userQuery]);

const userResolver = {
  user(){
      return {
        id: "1-2",
        name: "Mahmoud",
        email: "mahmoud@gmail.com"
      };
  }
};

Schema.setResolversQueries([userResolver]);

const schema = Schema.build();

console.log(schema);