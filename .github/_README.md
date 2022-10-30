# GitHub Configurations

This folder contains GitHub configurations for the project, including these features:

- GitHub Actions (./workflows)
  - [CI][CI] - all CI jobs for the project
    - lints the code
    - `typecheck`s the code
    - automatically fixes & applies code style updates
    - runs tests (unit, end-to-end)
    - runs on `ubuntu-latest` with `node-versions` set to `[16x, 18x]`
  - [Lock Closed Issues][Lock Closed Issues] - Locks all closed issues after 14 days of being closed
  - [Release][Release] - automates the release process & changelog generation
- Renovate
  - automatically updates all the dependencies listed in all package.json files throughout the monorepo

Aside from these implemented features, this folder also contains the issue templates used to create new GitHub issues.

## 💪🏼 Contributing

Please see [CONTRIBUTING](./CONTRIBUTING.md) for details.

## 🏝 Community

For help, discussion about best practices, or any other conversation that would benefit from being searchable:

- TODO

## 📄 License

The MIT License (MIT). Please see [LICENSE](../LICENSE.md) for more information.

Made with ❤️

[CI]: ./workflows/ci.yml
[Release]: ./workflows/release.yml
[Lock Closed Issues]: ./workflows/lock-closed-issues.yml
