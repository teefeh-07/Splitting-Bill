/**
 * Test Utilities for BillSplit Protocol
 * 
 * This file contains helper functions and utilities to make testing
 * more efficient and maintainable.
 */

import { Cl } from "@stacks/transactions";

// ============================================================================
// Test Constants
// ============================================================================

export const TEST_CONSTANTS = {
  CONTRACT_NAME: "BillSplitProtocol",
  
  // Test amounts (in microSTX)
  AMOUNTS: {
    SMALL_BILL: 100000,      // 0.1 STX
    MEDIUM_BILL: 1000000,    // 1 STX
    LARGE_BILL: 10000000,    // 10 STX
    MIN_CONTRIBUTION: 50000,  // 0.05 STX
    MAX_CONTRIBUTION: 5000000, // 5 STX
  },
  
  // Test strings
  STRINGS: {
    RESTAURANT_NAME: "Test Restaurant",
    LONG_RESTAURANT_NAME: "A".repeat(50),
    INVALID_LONG_NAME: "A".repeat(51),
    EMPTY_STRING: "",
  },
  
  // Test percentages
  PERCENTAGES: {
    LOW_TIP: 10,
    STANDARD_TIP: 15,
    HIGH_TIP: 25,
    MAX_TIP: 30,
    INVALID_TIP: 35,
  },
  
  // Session statuses
  SESSION_STATUS: {
    OPEN: "OPEN",
    COMPLETED: "COMPLETED",
    EXPIRED: "EXPIRED",
    DISPUTED: "DISPUTED",
  },
} as const;

// ============================================================================
// Test Account Helpers
// ============================================================================

export class TestAccounts {
  private accounts: Map<string, string>;
  
  constructor() {
    this.accounts = simnet.getAccounts();
  }
  
  get deployer() { return this.accounts.get("deployer")!; }
  get restaurant1() { return this.accounts.get("wallet_1")!; }
  get restaurant2() { return this.accounts.get("wallet_2")!; }
  get participant1() { return this.accounts.get("wallet_3")!; }
  get participant2() { return this.accounts.get("wallet_4")!; }
  get participant3() { return this.accounts.get("wallet_5")!; }
  get participant4() { return this.accounts.get("wallet_6")!; }
  get participant5() { return this.accounts.get("wallet_7")!; }
  
  getAllParticipants() {
    return [
      this.participant1,
      this.participant2,
      this.participant3,
      this.participant4,
      this.participant5,
    ];
  }
  
  getRandomParticipant() {
    const participants = this.getAllParticipants();
    return participants[Math.floor(Math.random() * participants.length)];
  }
}

// ============================================================================
// Contract Interaction Helpers
// ============================================================================

export class ContractHelpers {
  private contractName: string;
  
  constructor(contractName: string = TEST_CONSTANTS.CONTRACT_NAME) {
    this.contractName = contractName;
  }
  
  // Restaurant operations
  registerRestaurant(restaurantName: string, caller: string) {
    return simnet.callPublicFn(
      this.contractName,
      "register-restaurant",
      [Cl.stringAscii(restaurantName)],
      caller
    );
  }
  
  getRestaurantInfo(restaurantPrincipal: string, caller: string) {
    return simnet.callReadOnlyFn(
      this.contractName,
      "get-restaurant-info",
      [Cl.principal(restaurantPrincipal)],
      caller
    );
  }
  
  // Session operations
  createBillSession(
    restaurantOwner: string,
    totalAmount: number,
    minContribution: number,
    tipPercentage: number,
    caller: string
  ) {
    return simnet.callPublicFn(
      this.contractName,
      "create-bill-session",
      [
        Cl.principal(restaurantOwner),
        Cl.uint(totalAmount),
        Cl.uint(minContribution),
        Cl.uint(tipPercentage)
      ],
      caller
    );
  }
  
  joinBillSession(sessionId: number, contributionAmount: number, caller: string) {
    return simnet.callPublicFn(
      this.contractName,
      "join-bill-session",
      [Cl.uint(sessionId), Cl.uint(contributionAmount)],
      caller
    );
  }
  
  getSessionInfo(sessionId: number, caller: string) {
    return simnet.callReadOnlyFn(
      this.contractName,
      "get-session-info",
      [Cl.uint(sessionId)],
      caller
    );
  }
  
  getParticipantDetails(sessionId: number, participant: string, caller: string) {
    return simnet.callReadOnlyFn(
      this.contractName,
      "get-participant-details",
      [Cl.uint(sessionId), Cl.principal(participant)],
      caller
    );
  }
  
  completeSessionPayment(sessionId: number, caller: string) {
    return simnet.callPublicFn(
      this.contractName,
      "complete-session-payment",
      [Cl.uint(sessionId)],
      caller
    );
  }
  
  // Utility functions
  getContractStatus(caller: string) {
    return simnet.callReadOnlyFn(
      this.contractName,
      "get-contract-status",
      [],
      caller
    );
  }
}

// ============================================================================
// Test Scenario Builders
// ============================================================================

export class TestScenarios {
  private accounts: TestAccounts;
  private contract: ContractHelpers;
  
  constructor() {
    this.accounts = new TestAccounts();
    this.contract = new ContractHelpers();
  }
  
  /**
   * Sets up a basic restaurant and session for testing
   */
  setupBasicSession(options: {
    restaurantName?: string;
    billAmount?: number;
    minContribution?: number;
    tipPercentage?: number;
  } = {}) {
    const {
      restaurantName = TEST_CONSTANTS.STRINGS.RESTAURANT_NAME,
      billAmount = TEST_CONSTANTS.AMOUNTS.MEDIUM_BILL,
      minContribution = TEST_CONSTANTS.AMOUNTS.MIN_CONTRIBUTION,
      tipPercentage = TEST_CONSTANTS.PERCENTAGES.STANDARD_TIP,
    } = options;
    
    // Register restaurant
    const registerResult = this.contract.registerRestaurant(
      restaurantName,
      this.accounts.restaurant1
    );
    
    // Create session
    const sessionResult = this.contract.createBillSession(
      this.accounts.restaurant1,
      billAmount,
      minContribution,
      tipPercentage,
      this.accounts.restaurant1
    );
    
    return {
      registerResult,
      sessionResult,
      sessionId: sessionResult.result.isOk ? 1 : null,
      restaurant: this.accounts.restaurant1,
    };
  }
  
  /**
   * Sets up a session with multiple participants
   */
  setupSessionWithParticipants(participantCount: number = 3) {
    const setup = this.setupBasicSession();
    const participants = this.accounts.getAllParticipants().slice(0, participantCount);
    const contributionAmount = TEST_CONSTANTS.AMOUNTS.MIN_CONTRIBUTION * 2;
    
    const joinResults = participants.map(participant => 
      this.contract.joinBillSession(1, contributionAmount, participant)
    );
    
    return {
      ...setup,
      participants,
      joinResults,
      contributionAmount,
    };
  }
  
  /**
   * Sets up a completed session
   */
  setupCompletedSession() {
    const scenario = this.setupSessionWithParticipants(3);
    
    // Complete the session
    const completeResult = this.contract.completeSessionPayment(
      1,
      this.accounts.restaurant1
    );
    
    return {
      ...scenario,
      completeResult,
    };
  }
}

// ============================================================================
// Assertion Helpers
// ============================================================================

export class TestAssertions {
  /**
   * Assert that a session has the expected properties
   */
  static assertSessionProperties(session: any, expected: {
    restaurantOwner?: string;
    totalBillAmount?: number;
    sessionStatus?: string;
    participantCount?: number;
  }) {
    if (expected.restaurantOwner) {
      expect(session["restaurant-owner"]).toBeStandardPrincipal(expected.restaurantOwner);
    }
    if (expected.totalBillAmount !== undefined) {
      expect(session["total-bill-amount"]).toBeUint(expected.totalBillAmount);
    }
    if (expected.sessionStatus) {
      expect(session["session-status"]).toBeStringAscii(expected.sessionStatus);
    }
    if (expected.participantCount !== undefined) {
      expect(session["participant-count"]).toBeUint(expected.participantCount);
    }
  }
  
  /**
   * Assert that a participant has the expected properties
   */
  static assertParticipantProperties(participant: any, expected: {
    contributionAmount?: number;
    paymentCompleted?: boolean;
    hasRaisedDispute?: boolean;
  }) {
    if (expected.contributionAmount !== undefined) {
      expect(participant["contribution-amount"]).toBeUint(expected.contributionAmount);
    }
    if (expected.paymentCompleted !== undefined) {
      expect(participant["payment-completed"]).toBeBool(expected.paymentCompleted);
    }
    if (expected.hasRaisedDispute !== undefined) {
      expect(participant["has-raised-dispute"]).toBeBool(expected.hasRaisedDispute);
    }
  }
}

// ============================================================================
// Export all utilities
// ============================================================================

export const testUtils = {
  constants: TEST_CONSTANTS,
  accounts: new TestAccounts(),
  contract: new ContractHelpers(),
  scenarios: new TestScenarios(),
  assertions: TestAssertions,
};
