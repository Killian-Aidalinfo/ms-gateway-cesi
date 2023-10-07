import { ApolloServer } from '@apollo/server';
import { startStandaloneServer } from '@apollo/server/standalone';
import { ApolloGateway, IntrospectAndCompose } from '@apollo/gateway';

// Parsez la variable d'environnement MSConnect pour obtenir la liste des services
const services = process.env.MSConnect.split(',');

// Générez la subgraphs basée sur les services
const subgraphs = services.map(service => ({
    name: service.trim(),
    url: `http://${service.trim()}:4000/`,
}));

console.log('Tentative de connexion aux services...');
subgraphs.forEach(service => {
    console.log(`En attente de la connexion au service: ${service.name} à l'URL ${service.url}`);
});

const gateway = new ApolloGateway({
    supergraphSdl: new IntrospectAndCompose({
        subgraphs,
    }),
});

const server = new ApolloServer({
    gateway,
    introspection: true,
    playground: true,
    subscriptions: false,
});

// server.listen({ port: 4000 }).then(({ url }) => {
//     console.log(`🚀 Apollo Gateway prêt à: ${url}`);
//     console.log('Tous les services sont connectés avec succès!');
// });
const { url } = await startStandaloneServer(server, {
    listen: { port: 4000 },
});

console.log(`🚀  Server ready at: ${url}`)