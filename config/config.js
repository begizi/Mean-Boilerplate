var path = require('path'),
    rootPath = path.normalize(__dirname + '/..');

module.exports = {
    development: {
        db: 'mongodb://localhost/vcms-dev',
        root: rootPath,
        publicFolder: '/dev',
        app: {
            name: 'VCMS - Dev'
        }
    },
    production: {
        db: 'mongodb://localhost/vcms',
        root: rootPath,
        publicFolder: '/public',
        app: {
            name: 'Vyykn Vcms'
        }
    },
    test: {
        db: 'mongodb://localhost/vcms-test',
        root: rootPath,
        publicFolder: '/test',
        app: {
            name: 'VCMS - Test'
        }
    }
};
