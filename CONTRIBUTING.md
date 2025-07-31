# Contributing to BillSplit Protocol

Thank you for your interest in contributing to the BillSplit Protocol! This document provides guidelines and information for contributors.

## 🚀 Getting Started

### Prerequisites

Before you begin, ensure you have the following installed:
- [Node.js](https://nodejs.org/) (v18 or higher)
- [Clarinet](https://github.com/hirosystems/clarinet) (latest version)
- [Git](https://git-scm.com/)

### Setting Up Your Development Environment

1. **Fork the repository** on GitHub
2. **Clone your fork** locally:
   ```bash
   git clone https://github.com/YOUR_USERNAME/Splitting-Bill.git
   cd Splitting-Bill
   ```
3. **Install dependencies**:
   ```bash
   npm install
   ```
4. **Run tests** to ensure everything is working:
   ```bash
   npm test
   ```

## 🔄 Development Workflow

### Creating a Feature Branch

1. Create a new branch from `main`:
   ```bash
   git checkout main
   git pull origin main
   git checkout -b feature/your-feature-name
   ```

2. Use descriptive branch names:
   - `feature/add-multi-currency-support`
   - `fix/session-expiration-bug`
   - `docs/update-api-documentation`

### Making Changes

1. **Write tests first** (TDD approach recommended)
2. **Implement your changes**
3. **Ensure all tests pass**:
   ```bash
   npm test
   npm run test:coverage
   ```
4. **Follow coding standards** (see below)

### Committing Changes

1. **Stage your changes**:
   ```bash
   git add .
   ```

2. **Write clear commit messages**:
   ```bash
   git commit -m "feat: add multi-currency support for bill sessions"
   ```

3. **Use conventional commit format**:
   - `feat:` - New features
   - `fix:` - Bug fixes
   - `docs:` - Documentation changes
   - `test:` - Test additions or modifications
   - `refactor:` - Code refactoring
   - `style:` - Code style changes
   - `chore:` - Maintenance tasks

## 🧪 Testing Guidelines

### Running Tests

```bash
# Run all tests
npm test

# Run tests with coverage
npm run test:coverage

# Watch mode for development
npm run test:watch
```

### Writing Tests

- **Test file naming**: `*.test.ts`
- **Test structure**: Use `describe` and `it` blocks
- **Test coverage**: Aim for >90% coverage
- **Edge cases**: Test error conditions and boundary cases

Example test structure:
```typescript
describe("Feature Name", () => {
  beforeEach(() => {
    // Setup code
  });

  it("should handle normal case", () => {
    // Test implementation
  });

  it("should handle error case", () => {
    // Error test implementation
  });
});
```

## 📝 Code Style Guidelines

### Clarity Smart Contracts

- Use descriptive function and variable names
- Add comprehensive comments for complex logic
- Follow Clarity best practices for security
- Use consistent indentation (2 spaces)

### TypeScript/JavaScript

- Use TypeScript for all new code
- Follow ESLint configuration
- Use meaningful variable names
- Add JSDoc comments for public functions

### Documentation

- Update README.md for user-facing changes
- Add inline comments for complex logic
- Update API documentation when needed

## 🔍 Code Review Process

### Before Submitting a PR

1. **Self-review your code**
2. **Run all tests locally**
3. **Check test coverage**
4. **Update documentation if needed**
5. **Rebase on latest main** if necessary

### Pull Request Guidelines

1. **Use descriptive PR titles**
2. **Fill out the PR template completely**
3. **Link related issues**
4. **Add screenshots for UI changes**
5. **Request review from maintainers**

### Review Criteria

- Code quality and readability
- Test coverage and quality
- Documentation updates
- Security considerations
- Performance impact

## 🐛 Reporting Issues

### Bug Reports

When reporting bugs, please include:
- **Clear description** of the issue
- **Steps to reproduce** the problem
- **Expected vs actual behavior**
- **Environment details** (OS, Node version, etc.)
- **Error messages** or logs

### Feature Requests

For feature requests, please provide:
- **Clear description** of the feature
- **Use case** and motivation
- **Proposed implementation** (if any)
- **Potential impact** on existing functionality

## 🔒 Security

### Reporting Security Issues

- **Do not** open public issues for security vulnerabilities
- **Email** security concerns to the maintainers
- **Provide** detailed information about the vulnerability
- **Allow** reasonable time for response before disclosure

### Security Best Practices

- Follow Clarity security guidelines
- Validate all inputs
- Use safe arithmetic operations
- Implement proper access controls
- Test for common vulnerabilities

## 📋 Checklist for Contributors

Before submitting your contribution:

- [ ] Code follows project style guidelines
- [ ] Tests are written and passing
- [ ] Documentation is updated
- [ ] Commit messages follow conventional format
- [ ] PR description is clear and complete
- [ ] Security implications are considered
- [ ] Breaking changes are documented

## 🤝 Community Guidelines

- **Be respectful** and inclusive
- **Help others** learn and grow
- **Provide constructive feedback**
- **Follow the code of conduct**
- **Ask questions** when unsure

## 📞 Getting Help

- **GitHub Issues**: For bugs and feature requests
- **GitHub Discussions**: For questions and general discussion
- **Documentation**: Check README.md and inline comments

## 🙏 Recognition

Contributors will be recognized in:
- README.md contributors section
- Release notes for significant contributions
- GitHub contributor graphs

Thank you for contributing to BillSplit Protocol! 🎉
