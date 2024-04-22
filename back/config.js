module.exports = {
    port: 3000,
    jwtSecret: '!!CryptoCat@!!',
    // jwtExpirationInSeconds: 60 * 15, // 
    jwtExpirationInSeconds: 60 * 1000, // dev
    roles: {
      USER: 'user',
      ADMIN: 'admin'
    }
}
// des lors que je suis login et que je recois mon token, je le stock coté client
// A chaque fois que je ferais une requete il faudra envoyer mon token et toutes les routes
// devront vérifier si j'ai mon token 
// authentication != authorization