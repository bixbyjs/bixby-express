# Changelog
All notable changes to this project will be documented in this file.

The format is based on [Keep a Changelog](https://keepachangelog.com/en/1.0.0/),
and this project adheres to [Semantic Versioning](https://semver.org/spec/v2.0.0.html).

## [Unreleased]
### Added
- Exposed `auth/authenticator` component that implements `module:passport.Authenticator`
interface.
- `session/stores/memory` component that implements `module:express-session.Store`
interface and is suitable for use with service discovery.
- `session/stores/redis` component that implements `module:express-session.Store`
interface and is suitable for use with service discovery.
- `state/store/session` component that implements `module:flowstate.Store` interface.

### Changed
- Default Express app sets `'view engine'` to registered template engine type if
only one template engine component is loaded.
- Default Express app adds application-level middleware that implement `module:express.ApplicationRequestHandler` interface.
- Default Express app adds locals variables that implement
`module:express.Locals` interface.
- `auth/authenticator` component requires `module:passport.SessionManager`
interface.
- `auth/authenticator` component loads components that implement `module:passport.Strategy`
interface rather than `http://i.bixbyjs.org/http/auth/Scheme`, adopting [JSDoc](https://jsdoc.app/) [namepaths](https://jsdoc.app/about-namepaths.html) for interface names.
- `gateway/http` component creates instance of `module:http.Server` interface
rather than `http://i.bixbyjs.org/http/Server`, adopting [JSDoc](https://jsdoc.app/) [namepaths](https://jsdoc.app/about-namepaths.html) for interface names.
Corresponds with change in [`bixby-http@0.2.3`](https://github.com/bixbyjs/bixby-http/tree/v0.2.3).

### Removed
- Removed `middleware/authenticate` component.  Routes should `@require = 'module:passport.Authenticator'`
and add `authenticator.authenticate()` to the handler stack instead.
- Removed `middleware/cleanstate` component.  Routes should `require('flowstate')`
instead.  Note that that package is currently undergoing a major refactoring.
- Removed `middleware/cors` component.  Routes should `require('cors')` instead.
- Removed `middleware/csrfprotection` component.  Routes should `require('csurf')`
instead.
- Removed `middleware/errorlogging` component.
- Removed `middleware/logging` component.  Default app requires `morgan` internally.
- Removed `middleware/parse` component.  Routes should `require('body-parser')`
instead.
- Removed `middleware/parsecookies` component.  Routes should `require('cookie-parser')`
instead. ???
- Removed `middleware/session` component.  Routes should `require('express-session')`
instead, optionally with session store that implements `module:express-session.Store`
interface.
- Removed `middleware/state` component.  Routes should `require('flowstate')`
instead, optionally with state store that implements `module:flowstate.Store`
interface.

## [0.2.3] - 2021-11-17
### Added
- Default Express app sets `'view'` and `'view engine'` settings and registers
template engine components.
- Default Express app serves static files from `public` directory.
- Added `middleware/state` and `middleware/cleanstate`.

### Changed
- Application-specific Express app created from `app/app` rather than
`app/service`.
- Obtain secret for session middleware from `http://i.bixbyjs.org/security/credentials/SecretVault`
component instead of `http://i.bixbyjs.org/security/Keyring`.
- Obtain secret for cookie parser middleware from `http://i.bixbyjs.org/security/credentials/SecretVault`
component instead of `http://i.bixbyjs.org/security/Keyring`.
- Session store interface renamed to `http://i.bixbyjs.org/http/SessionStore` from
`http://i.bixbyjs.org/http/ISessionStore`.
- Connection to session store is no longer established by this package, and is
now expected to be established by the component that creates the store.
- State store no longer attempts to create components that implement
`http://i.bixbyjs.org/http/state/StoreProvider`.  It defers to application-
supplied component and defaults to a session store.
- Updated to `flowstate@0.5.x`.

### Removed
- Removed `middleware/ceremony`.  Use `middleware/state` instead.
- Removed `middleware/initialize`.

## [0.2.2] - 2020-10-01

[Unreleased]: https://github.com/bixbyjs/bixby-express/compare/v0.2.3...HEAD
[0.2.3]: https://github.com/bixbyjs/bixby-express/compare/v0.2.2...v0.2.3
[0.2.2]: https://github.com/bixbyjs/bixby-express/compare/v0.2.1...v0.2.2
