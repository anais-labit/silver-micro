module.exports = {
    port: 3000,
    jwtSecret: '!!CryptoCat@!!',
    // jwtExpirationInSeconds: 60 * 15, // 
    jwtExpirationInSeconds: 60 * 1000, // dev
    roles: {
      ROOT : 'root',
      USER: 'user',
      OWNER: 'owner'
    }
}
