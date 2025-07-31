# BillSplit Protocol

A decentralized restaurant bill splitting platform built on the Stacks blockchain, enabling secure and transparent bill sharing among multiple participants.

## 🌟 Features

### Core Functionality
- **Restaurant Registration**: Restaurants can register and create bill splitting sessions
- **Bill Splitting Sessions**: Create sessions for splitting restaurant bills among multiple participants
- **Secure Payments**: Participants contribute their share with automatic tip and platform fee calculation
- **Dispute Resolution**: Built-in dispute mechanism for handling payment conflicts
- **Refund System**: Automatic refunds for expired sessions
- **Rating System**: Rate restaurants to build reputation and trust

### Security Features
- **Blacklist Management**: Prevent malicious users and restaurants from participating
- **Emergency Shutdown**: Contract owner can disable operations in emergencies
- **Session Expiration**: Automatic session timeout after 24 hours
- **Duplicate Prevention**: Prevents double spending and duplicate claims
- **Amount Validation**: Enforces minimum and maximum bill amounts

## 🏗️ Architecture

### Smart Contract Structure

```
BillSplitProtocol.clar
├── Error Constants (16 error types)
├── System Constants (operational parameters)
├── Data Structures
│   ├── restaurant-registry (restaurant information)
│   ├── bill-splitting-sessions (session data)
│   ├── session-participants (participant details)
│   └── Security maps (blacklists, ratings, disputes)
├── Read-Only Functions (data retrieval)
├── Private Utility Functions (internal logic)
└── Public Functions
    ├── Restaurant Management
    ├── Session Management
    ├── Payment Processing
    ├── Dispute Resolution
    └── Administration
```

### Key Data Structures

#### Restaurant Registry
```clarity
{
  name: (string-ascii 50),
  is-verified: bool,
  total-sessions-created: uint,
  reputation-score: uint,
  is-blacklisted: bool,
  last-activity-block: uint
}
```

#### Bill Splitting Sessions
```clarity
{
  restaurant-owner: principal,
  total-bill-amount: uint,
  amount-collected: uint,
  participant-count: uint,
  session-status: (string-ascii 10),
  created-at-block: uint,
  expires-at-block: uint,
  minimum-contribution: uint,
  dispute-count: uint,
  tip-percentage: uint
}
```

## 🚀 Getting Started

### Prerequisites
- [Clarinet](https://github.com/hirosystems/clarinet) - Stacks smart contract development tool
- [Node.js](https://nodejs.org/) - For running tests
- [Git](https://git-scm.com/) - Version control

### Installation

1. Clone the repository:
```bash
git clone <repository-url>
cd BillSplit-Protocol
```

2. Install dependencies:
```bash
npm install
```

3. Run tests:
```bash
npm test
```

4. Run tests with coverage:
```bash
npm run test:coverage
```

### Development Workflow

1. **Start development**:
```bash
clarinet console
```

2. **Run specific tests**:
```bash
npm run test:watch
```

3. **Generate test reports**:
```bash
npm run test:report
```

## 📖 Usage Guide

### For Restaurants

1. **Register your restaurant**:
```clarity
(contract-call? .BillSplitProtocol register-restaurant "Restaurant Name")
```

2. **Create a bill splitting session**:
```clarity
(contract-call? .BillSplitProtocol create-bill-session 
  'SP1RESTAURANT... ;; restaurant principal
  u1000000        ;; total bill (1 STX)
  u100000         ;; minimum per person (0.1 STX)
  u15)            ;; tip percentage (15%)
```

3. **Complete payment when bill is fully covered**:
```clarity
(contract-call? .BillSplitProtocol complete-session-payment u1)
```

### For Participants

1. **Join a bill splitting session**:
```clarity
(contract-call? .BillSplitProtocol join-bill-session 
  u1       ;; session ID
  u200000) ;; contribution amount (0.2 STX)
```

2. **Raise a dispute if needed**:
```clarity
(contract-call? .BillSplitProtocol raise-session-dispute u1)
```

3. **Claim refund for expired sessions**:
```clarity
(contract-call? .BillSplitProtocol claim-session-refund u1)
```

### For Everyone

**Rate a restaurant**:
```clarity
(contract-call? .BillSplitProtocol submit-restaurant-rating 
  'SP1RESTAURANT... ;; restaurant principal
  u5)               ;; rating (1-5 stars)
```

## 🔧 Configuration

### System Constants
- `MAX_PARTICIPANTS_PER_SESSION`: 20 participants
- `SESSION_DURATION_BLOCKS`: 144 blocks (~24 hours)
- `MAX_BILL_AMOUNT`: 1,000,000,000 microSTX (1000 STX)
- `MIN_BILL_AMOUNT`: 1,000 microSTX (0.001 STX)
- `MAX_TIP_PERCENTAGE`: 30%
- `PLATFORM_FEE_PERCENTAGE`: 1%

## 🧪 Testing

The project includes comprehensive tests covering:

- Contract initialization
- Restaurant registration and management
- Bill session creation and management
- Participant joining and contribution tracking
- Payment processing and completion
- Dispute resolution mechanisms
- Refund processing
- Rating system functionality
- Error handling and edge cases

Run the full test suite:
```bash
npm test
```

## 🛡️ Security Considerations

- **Input Validation**: All user inputs are validated for type and range
- **Access Control**: Functions are restricted to appropriate user roles
- **Reentrancy Protection**: State changes occur before external calls
- **Integer Overflow**: Uses safe arithmetic operations
- **Emergency Controls**: Contract owner can halt operations if needed

## 📄 License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

## 🤝 Contributing

1. Fork the repository
2. Create a feature branch (`git checkout -b feature/amazing-feature`)
3. Commit your changes (`git commit -m 'Add amazing feature'`)
4. Push to the branch (`git push origin feature/amazing-feature`)
5. Open a Pull Request

## 📞 Support

For support and questions:
- Create an issue in the GitHub repository
- Contact the SplitBill Team

---

**Built with ❤️ by the SpillBill Team**
