import swagger from "@elysiajs/swagger";

export function setUpSwagger() {
    return swagger({
      provider: 'swagger-ui',
      documentation: {
        info: {
          title: 'Airdrops Documentation',
          version: '1.0.0',
          description: 'API for managing airdrop campaigns and distributions',
          contact: {
            name: 'Lam Tran',
            email: 'lam.tttech19@gmail.com',
          },
          license: {
            name: 'MIT',
            url: 'https://opensource.org/licenses/MIT',
          },
          termsOfService: 'No Copyright',
        },
        security: [
          {
            bearerAuth: [],
          },
        ],
        tags: [
          {
            name: 'AirDrops',
            description: 'AirDrops Endpoints',
          },
        ],
      },
    });
}