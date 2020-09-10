// @ts-ignore
import serverOptions from "./graphql-schema-server";

class serverOptionsBuilder {

    private typeDefs: string = ``;
    private resolvers: Partial<any> = {};

    private typeDefsTypes = ``;
    private typeDefsQueries = ``;
    private typeDefsMutations = ``;

    constructor() {
    }

    setTypeDefsTypes(Types: Array<string>){
        const types = Types.reduce((previousValue: string, currentValue: string) => {
            return previousValue + currentValue;
        });
        this.typeDefsTypes += types;
        return this;
    }

    setTypeDefsQueries(Queries: Array<string>){
        const queries = Queries.reduce((previousValue: string, currentValue: string) => {
            return previousValue + currentValue;
        });
        this.typeDefsQueries += queries;
        return this;
    }

    setTypeDefsMutation(Mutations: Array<string>){
        const mutations = Mutations.reduce((previousValue: string, currentValue: string) => {
            return previousValue + currentValue;
        });
        this.typeDefsMutations += mutations;
        return this;
    }

    private concatTypeDefs(){
        this.typeDefs = `
            ${this?.typeDefsTypes}
            ${(this.typeDefsQueries? `type Query{ ${this.typeDefsQueries} }`: '')}
            ${(this.typeDefsMutations? `type Mutation{ ${this.typeDefsMutations} }`: '')}
        `;
    }

    setResolversQueries(Queries: Array<Partial<{}>>){
        Queries.forEach((query: Partial<any>) => {
           const keys = Object.keys(query);
            if(!this.resolvers["Query"]) {
                this.resolvers["Query"] = {};
            }
           keys.forEach(key => {
                this.resolvers["Query"][key] = query[key];
           });
        });
        return this;
    }

    setResolversMutations(Mutations: Array<Partial<{}>>){
        Mutations.forEach((mutation: Partial<any>) => {
            const keys = Object.keys(mutation);
            if(!this.resolvers["Mutation"]) {
                this.resolvers["Mutation"] = {};
            }
            keys.forEach(key => {
                this.resolvers["Mutation"][key] = mutation[key];
            });
        });
        return this;
    }

    setResolversSubscriptions(Subscriptions: Array<Partial<{}>>){
        Subscriptions.forEach((subscription: Partial<any>) => {
            const keys = Object.keys(subscription);
            if(!this.resolvers["Subscription"]) {
                this.resolvers["Subscription"] = {};
            }
            keys.forEach(key => {
                this.resolvers["Subscription"][key] = subscription[key];
            });
        });
        return this;
    }

    setResolversRelations(Relations: Array<Partial<{}>>){
        Relations.forEach((relation: Partial<any>) => {
            const keys = Object.keys(relation);
            keys.forEach(key => {
                if(!this.resolvers[key]) this.resolvers[key] = {};
                this.resolvers[key] = relation[key];
            });
        });
        return this;
    }

    build(){
        this.concatTypeDefs();
        // @ts-ignore
        return new serverOptions(this);
    }
}

const ServerOptions = () => {
    return new serverOptionsBuilder();
}

export default ServerOptions;