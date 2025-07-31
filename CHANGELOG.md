# Changelog

All notable changes to the BillSplit Protocol project will be documented in this file.

The format is based on [Keep a Changelog](https://keepachangelog.com/en/1.0.0/),
and this project adheres to [Semantic Versioning](https://semver.org/spec/v2.0.0.html).

## [Unreleased]

### Added
- Contributing guidelines in CONTRIBUTING.md
- Changelog file for tracking project changes
- Enhanced project documentation and structure
- GitHub workflow templates for CI/CD

### Changed
- Improved README.md formatting and content organization
- Enhanced package.json with additional scripts and metadata

### Security
- Added security reporting guidelines in CONTRIBUTING.md

## [2.0.0] - 2024-01-15

### Added
- Complete BillSplit Protocol smart contract implementation
- Comprehensive test suite with 90%+ coverage
- Restaurant registration and verification system
- Bill splitting session management
- Participant contribution tracking
- Dispute resolution mechanism
- Automatic refund system for expired sessions
- Restaurant rating and reputation system
- Blacklist management for security
- Emergency shutdown functionality
- Platform fee collection system
- Multi-participant session support (up to 20 participants)

### Features
- **Restaurant Management**
  - Restaurant registration with name validation
  - Verification status tracking
  - Reputation scoring system
  - Activity monitoring
  - Blacklist management

- **Session Management**
  - Bill session creation with customizable parameters
  - Automatic session expiration (24 hours)
  - Session status tracking (OPEN, COMPLETED, EXPIRED, DISPUTED)
  - Minimum contribution enforcement
  - Tip percentage configuration

- **Payment Processing**
  - Secure STX token transfers
  - Automatic tip and platform fee calculation
  - Payment completion verification
  - Refund processing for expired sessions

- **Security Features**
  - Input validation and sanitization
  - Access control mechanisms
  - Duplicate prevention
  - Amount validation (min/max limits)
  - Emergency shutdown capability

### Technical Specifications
- **Smart Contract**: Clarity v2 on Stacks blockchain
- **Testing Framework**: Vitest with Clarinet SDK
- **Development Tools**: TypeScript, Node.js, Clarinet
- **Test Coverage**: >90% code coverage
- **Security**: Comprehensive input validation and access controls

### Constants and Limits
- Maximum participants per session: 20
- Session duration: 144 blocks (~24 hours)
- Maximum bill amount: 1,000 STX
- Minimum bill amount: 0.001 STX
- Maximum tip percentage: 30%
- Platform fee: 1%

### Error Handling
- 16 distinct error types for comprehensive error handling
- Clear error messages for debugging
- Graceful failure modes

## [1.0.0] - 2023-12-01

### Added
- Initial project setup
- Basic smart contract structure
- Core data structures design
- Initial test framework setup
- Project documentation

### Technical Details
- Clarinet project initialization
- Basic Clarity contract template
- Test environment configuration
- Development workflow establishment

---

## Release Notes Format

### Types of Changes
- **Added** for new features
- **Changed** for changes in existing functionality
- **Deprecated** for soon-to-be removed features
- **Removed** for now removed features
- **Fixed** for any bug fixes
- **Security** for vulnerability fixes

### Version Numbering
This project follows [Semantic Versioning](https://semver.org/):
- **MAJOR** version for incompatible API changes
- **MINOR** version for backwards-compatible functionality additions
- **PATCH** version for backwards-compatible bug fixes

### Release Process
1. Update version in package.json
2. Update CHANGELOG.md with new version
3. Create git tag with version number
4. Create GitHub release with release notes
5. Deploy to appropriate networks (testnet/mainnet)

---

## Contributing to Changelog

When contributing to this project:
1. Add your changes to the [Unreleased] section
2. Follow the established format and categories
3. Include relevant technical details
4. Reference issue numbers when applicable
5. Maintain chronological order within sections

For more information on contributing, see [CONTRIBUTING.md](CONTRIBUTING.md).
