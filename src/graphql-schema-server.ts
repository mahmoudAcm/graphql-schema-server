class serverOptions {
    typeDefs: string;
    resolvers: any;

    constructor(builder: any) {
        this.typeDefs = builder.typeDefs || ``;
        this.resolvers = builder.resolvers || {};
    }
}

export default serverOptions;