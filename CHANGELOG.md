# Changelog
All notable changes to this project will be documented in this file.

The format is based on [Keep a Changelog](https://keepachangelog.com/en/1.0.0/),
and this project adheres to [Semantic Versioning](https://semver.org/spec/v2.0.0.html).

## [Unreleased]
### Changed
- `session/store` component throws, rather than returning null, when unable to
create store in non-development environment.

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
