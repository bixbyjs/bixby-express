# Changelog
All notable changes to this project will be documented in this file.

The format is based on [Keep a Changelog](https://keepachangelog.com/en/1.0.0/),
and this project adheres to [Semantic Versioning](https://semver.org/spec/v2.0.0.html).

## [Unreleased]
### Added
- Default Express app sets `'view'` and `'view engine'` settings and registers
template engine components.
- Default Express app serves static files from `public` directory.
- Added `middleware/state`.

### Removed
- Removed `middleware/ceremony`.  Use `middleware/state` instead.

## [0.2.2] - 2020-10-01

[Unreleased]: https://github.com/bixbyjs/bixby-express/compare/v0.2.2...HEAD
[0.2.2]: https://github.com/bixbyjs/bixby-express/compare/v0.2.1...v0.2.2
