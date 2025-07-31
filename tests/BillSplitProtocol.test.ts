
import { describe, expect, it, beforeEach } from "vitest";

// ============================================================================
// BillSplit Protocol Test Suite
// ============================================================================

const accounts = simnet.getAccounts();
const deployer = accounts.get("deployer")!;
const restaurant1 = accounts.get("wallet_1")!;
const restaurant2 = accounts.get("wallet_2")!;
const participant1 = accounts.get("wallet_3")!;
const participant2 = accounts.get("wallet_4")!;
const participant3 = accounts.get("wallet_5")!;

const CONTRACT_NAME = "BillSplitProtocol";

// Test constants
const TEST_RESTAURANT_NAME = "Test Restaurant";
const TEST_BILL_AMOUNT = 1000000; // 1 STX in microSTX
const TEST_MIN_CONTRIBUTION = 100000; // 0.1 STX in microSTX
const TEST_TIP_PERCENTAGE = 15; // 15%

describe("BillSplit Protocol - Core Functionality", () => {

  beforeEach(() => {
    // Reset simnet state before each test
    simnet.mineEmptyBlocks(1);
  });

  describe("Contract Initialization", () => {
    it("should initialize contract with correct default values", () => {
      const contractInfo = simnet.callReadOnlyFn(
        CONTRACT_NAME,
        "get-contract-status",
        [],
        deployer
      );

      expect(contractInfo.result).toBeOk();
      const info = contractInfo.result.expectOk().expectTuple();
      expect(info.owner).toBeStandardPrincipal(deployer);
      expect(info["is-emergency-shutdown"]).toBeBool(false);
      expect(info["platform-fee-rate"]).toBeUint(1);
      expect(info["next-session-id"]).toBeUint(1);
    });
  });

  describe("Restaurant Registration", () => {
    it("should allow restaurant registration with valid name", () => {
      const registerResult = simnet.callPublicFn(
        CONTRACT_NAME,
        "register-restaurant",
        [Cl.stringAscii(TEST_RESTAURANT_NAME)],
        restaurant1
      );

      expect(registerResult.result).toBeOk();
      expect(registerResult.result.expectOk()).toBeBool(true);
    });

    it("should store restaurant information correctly", () => {
      // Register restaurant
      simnet.callPublicFn(
        CONTRACT_NAME,
        "register-restaurant",
        [Cl.stringAscii(TEST_RESTAURANT_NAME)],
        restaurant1
      );

      // Check stored information
      const restaurantInfo = simnet.callReadOnlyFn(
        CONTRACT_NAME,
        "get-restaurant-info",
        [Cl.principal(restaurant1)],
        deployer
      );

      expect(restaurantInfo.result).toBeSome();
      const info = restaurantInfo.result.expectSome().expectTuple();
      expect(info.name).toBeStringAscii(TEST_RESTAURANT_NAME);
      expect(info["is-verified"]).toBeBool(true);
      expect(info["total-sessions-created"]).toBeUint(0);
      expect(info["is-blacklisted"]).toBeBool(false);
    });

    it("should prevent duplicate restaurant registration", () => {
      // First registration should succeed
      simnet.callPublicFn(
        CONTRACT_NAME,
        "register-restaurant",
        [Cl.stringAscii(TEST_RESTAURANT_NAME)],
        restaurant1
      );

      // Second registration should fail
      const secondRegister = simnet.callPublicFn(
        CONTRACT_NAME,
        "register-restaurant",
        [Cl.stringAscii("Another Name")],
        restaurant1
      );

      expect(secondRegister.result).toBeErr();
    });
  });

  describe("Bill Session Management", () => {
    beforeEach(() => {
      // Register restaurant before each session test
      simnet.callPublicFn(
        CONTRACT_NAME,
        "register-restaurant",
        [Cl.stringAscii(TEST_RESTAURANT_NAME)],
        restaurant1
      );
    });

    it("should create a new bill session successfully", () => {
      const createResult = simnet.callPublicFn(
        CONTRACT_NAME,
        "create-bill-session",
        [
          Cl.principal(restaurant1),
          Cl.uint(TEST_BILL_AMOUNT),
          Cl.uint(TEST_MIN_CONTRIBUTION),
          Cl.uint(TEST_TIP_PERCENTAGE)
        ],
        restaurant1
      );

      expect(createResult.result).toBeOk();
      expect(createResult.result.expectOk()).toBeUint(1); // First session ID
    });

    it("should store session information correctly", () => {
      // Create session
      simnet.callPublicFn(
        CONTRACT_NAME,
        "create-bill-session",
        [
          Cl.principal(restaurant1),
          Cl.uint(TEST_BILL_AMOUNT),
          Cl.uint(TEST_MIN_CONTRIBUTION),
          Cl.uint(TEST_TIP_PERCENTAGE)
        ],
        restaurant1
      );

      // Check session info
      const sessionInfo = simnet.callReadOnlyFn(
        CONTRACT_NAME,
        "get-session-info",
        [Cl.uint(1)],
        deployer
      );

      expect(sessionInfo.result).toBeSome();
      const session = sessionInfo.result.expectSome().expectTuple();
      expect(session["restaurant-owner"]).toBeStandardPrincipal(restaurant1);
      expect(session["total-bill-amount"]).toBeUint(TEST_BILL_AMOUNT);
      expect(session["session-status"]).toBeStringAscii("OPEN");
      expect(session["participant-count"]).toBeUint(0);
    });

    it("should reject session creation with invalid tip percentage", () => {
      const createResult = simnet.callPublicFn(
        CONTRACT_NAME,
        "create-bill-session",
        [
          Cl.principal(restaurant1),
          Cl.uint(TEST_BILL_AMOUNT),
          Cl.uint(TEST_MIN_CONTRIBUTION),
          Cl.uint(50) // 50% tips - should be rejected
        ],
        restaurant1
      );

      expect(createResult.result).toBeErr();
    });
  });

  describe("Participant Management", () => {
    beforeEach(() => {
      // Setup: Register restaurant and create session
      simnet.callPublicFn(
        CONTRACT_NAME,
        "register-restaurant",
        [Cl.stringAscii(TEST_RESTAURANT_NAME)],
        restaurant1
      );

      simnet.callPublicFn(
        CONTRACT_NAME,
        "create-bill-session",
        [
          Cl.principal(restaurant1),
          Cl.uint(TEST_BILL_AMOUNT),
          Cl.uint(TEST_MIN_CONTRIBUTION),
          Cl.uint(TEST_TIP_PERCENTAGE)
        ],
        restaurant1
      );
    });

    it("should allow participant to join session", () => {
      const joinResult = simnet.callPublicFn(
        CONTRACT_NAME,
        "join-bill-session",
        [Cl.uint(1), Cl.uint(TEST_MIN_CONTRIBUTION)],
        participant1
      );

      expect(joinResult.result).toBeOk();
    });

    it("should update session participant count after joining", () => {
      // Join session
      simnet.callPublicFn(
        CONTRACT_NAME,
        "join-bill-session",
        [Cl.uint(1), Cl.uint(TEST_MIN_CONTRIBUTION)],
        participant1
      );

      // Check updated session info
      const sessionInfo = simnet.callReadOnlyFn(
        CONTRACT_NAME,
        "get-session-info",
        [Cl.uint(1)],
        deployer
      );

      const session = sessionInfo.result.expectSome().expectTuple();
      expect(session["participant-count"]).toBeUint(1);
      expect(session["amount-collected"]).toBeUint(TEST_MIN_CONTRIBUTION);
    });

    it("should store participant details correctly", () => {
      // Join session
      simnet.callPublicFn(
        CONTRACT_NAME,
        "join-bill-session",
        [Cl.uint(1), Cl.uint(TEST_MIN_CONTRIBUTION)],
        participant1
      );

      // Check participant details
      const participantInfo = simnet.callReadOnlyFn(
        CONTRACT_NAME,
        "get-participant-details",
        [Cl.uint(1), Cl.principal(participant1)],
        deployer
      );

      expect(participantInfo.result).toBeSome();
      const details = participantInfo.result.expectSome().expectTuple();
      expect(details["contribution-amount"]).toBeUint(TEST_MIN_CONTRIBUTION);
      expect(details["payment-completed"]).toBeBool(false);
      expect(details["has-raised-dispute"]).toBeBool(false);
    });
  });
});
