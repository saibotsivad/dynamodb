# Changelog

All notable changes to this project will be documented in this file.

The format is based on [Keep a Changelog](http://keepachangelog.com/en/1.0.0/)
and this project adheres to [Semantic Versioning](http://semver.org/spec/v2.0.0.html).

Change categories are:

* `Added` for new features.
* `Changed` for changes in existing functionality.
* `Deprecated` for once-stable features removed in upcoming releases.
* `Removed` for deprecated features removed in this release.
* `Fixed` for any bug fixes.
* `Security` to invite users to upgrade in case of vulnerabilities.

## [Unreleased](https://github.com/saibotsivad/dynamodb/compare/v1.0.1...HEAD)
### Added
### Changed
### Deprecated
### Fixed
### Removed
### Security

## [1.1.0](https://github.com/saibotsivad/dynamodb/compare/v1.0.1...v1.1.0) - 2021-11029
### Added
- Links to the v3 AWS docs, and some notes about how to read the docs.

## [1.0.0-1.0.1](https://github.com/saibotsivad/dynamodb/compare/06622ce96f39daaaecae8d5ffc35228f1f15311b...v1.0.1) - 2021-11-26
### Added
- Tests that actually access DynamoDB to make sure everything is working.
- TypeScript type definitions.
### Changed
- BREAKING CHANGE: The request is made and handled inside, but you have to pass your `fetch` implementation in.
- BREAKING CHANGE: The signing function is no longer passed in, it's used internally.

## [0.0.0-0.0.1](https://github.com/saibotsivad/dynamodb/compare/4f5cccbded2cce99e7ea78a5c80b18856944493f...06622ce96f39daaaecae8d5ffc35228f1f15311b) - 2021-02-08
### Added
- Created the base project and touch up some stuff.
