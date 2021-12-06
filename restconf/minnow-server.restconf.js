module.exports = {
  file: '/home/wpomier/progs/minnow/restconf/minnow-server.yaml',
  projects: [
    {
      name: 'minnow-server',
      type: 'express',
      dir: '/home/wpomier/progs/minnow',
      model: {
        dir: 'app/openapi/model',
        beforeAll: 'clean',
        suffix: 'Dto'
      },
      params: {
        dir: 'app/openapi/params',
        beforeAll: 'clean',
        suffix: 'Param'
      },
      services: {
        dir: 'app/openapi/services',
        beforeAll: "clean",
        suffix: 'Api'
      },
      other: {
        beforeAll: "none",
        overwrite: "true"
      },
      databasePool: {
        type: 'firebird',
        size: 10,
        options: {
          host: 'localhost',
          port: 3050,
          user: 'minnow',
          password: 'minnow',
          database: '/firebird/data/minnow.fdb'
        }
      }
    }
  ]
}