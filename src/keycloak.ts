import Keycloak from 'keycloak-js';

// Configure connection to Keycloak server
const keycloak = new Keycloak({
  url: 'http://localhost:8081',           // Keycloak server URL
  realm: 'myrealm',                          // realm name
  clientId: 'my-spa-client'                    // React client ID
});

export default keycloak;