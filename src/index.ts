import serverOptions from "./graphql-schema-server-builder";

const Schema = serverOptions();

const schema = Schema.build();

console.log(schema);