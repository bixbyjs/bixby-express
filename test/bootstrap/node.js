var chai = require('chai');

chai.use(require('sinon-chai'));


global.$require = require('proxyquire');
global.expect = chai.expect;
