
// SPDX-License-Identifier: MIT
pragma solidity ^0.8.0;

contract Consent {
    struct ConsentRecord {
        string userId;
        string timestamp;
    }

    mapping(string => ConsentRecord) public consents;

    function storeConsent(string memory userId, string memory timestamp) public {
        consents[userId] = ConsentRecord(userId, timestamp);
    }
}
