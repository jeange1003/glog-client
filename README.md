# blog client

# env: 
config in pm2 ecosystem.config.js
env_production
- NODE_ENV: 'production'
- PORT: the port website to be access
- API_PORT: the api port for the server side to access
- BASE_ROUTE: set the env if deploy site in subdirectory '/blog'

# start

pm2 init

config [https://pm2.io/doc/en/runtime/guide/ecosystem-file/](ecosystem.config.js)

pm2 start ecosystem.config.js --env production