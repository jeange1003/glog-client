export const upload = {
    dev: 'http://localhost:3099/files',
    production: 'https://jeange.com/files'
}[process.env.NODE_ENV]
