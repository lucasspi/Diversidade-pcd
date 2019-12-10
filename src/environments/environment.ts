// The file contents for the current environment will overwrite these during build.
// The build system defaults to .the dev environment which uses `environment.ts`, but if you do
// `ng build --env=prod` then `environment.prod.ts` will be used instead.
// The list of which env maps to which file can be found in `.angular-cli.json`.

export const environment = {
  production: false,
  useNewRsp: false,
  api: {
    // url: 'http://localhost:3000'
    url: 'https://api-v1.diversidademais.com.br'
    // lambda: 'http://localhost:3000/'
  },
  session: {
    key: 'SESSION',
    expiresIn: 5,
    keepLogged: 9999999999
  },
  name: 'dev'
};
