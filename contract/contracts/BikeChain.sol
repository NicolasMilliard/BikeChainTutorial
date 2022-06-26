// SPDX-License-Identifier: Unlicensed

pragma solidity ^0.8.7;

contract BikeChain {
    address owner;
    uint ownerBalance;

    constructor() {
        owner = msg.sender;
    }

    struct Renter {
        address payable walletAddress;
        string firstName;
        string lastName;
        bool canRent;
        bool active;
        uint balance;
        uint due;
        uint start;
        uint end;
    }

    mapping (address => Renter) public renters;

    // add the Renter to the blockchain
    function addRenter(address payable walletAddress, string memory firstName, string memory lastName, bool canRent, bool active, uint balance, uint due, uint start, uint end) public {
        renters[walletAddress] = Renter(walletAddress, firstName, lastName, canRent, active, balance, due, start, end);
    }

    modifier isRenter(address walletAddress) {
        require(msg.sender == walletAddress, "You can only manage your account");
        _;
    }

    modifier onlyOwner() {
        require(msg.sender == owner, "You are not allowed to access this");
        _;
    }

    // checkOut the bike
    function checkOut(address walletAddress) public isRenter(walletAddress) {
        require(renters[walletAddress].due == 0, "You have a pending balance.");
        require(renters[walletAddress].canRent == true, "You cannot rent at this time.");

        renters[walletAddress].active = true;
        renters[walletAddress].start = block.timestamp;
        renters[walletAddress].canRent = false;
    }

    // checkIn a bike, require to checkOut a bike before
    function checkIn(address walletAddress) public isRenter(walletAddress) {
        require(renters[walletAddress].active == true, "Please checkout a bike first.");
        renters[walletAddress].active = false;
        renters[walletAddress].end = block.timestamp;
        // set the amount due
        setDue(walletAddress);
    }

    // calculate the duration of the rent
    function renterTimespan(uint start, uint end) internal pure returns(uint) {
        return end - start;
    }

    function getTotalDuration(address walletAddress) public isRenter(walletAddress) view returns(uint) {
        if(renters[walletAddress].start == 0 || renters[walletAddress].end == 0) {
            return 0;
        } else {
            uint timespan = renterTimespan(renters[walletAddress].start, renters[walletAddress].end);
            uint timespanInMinutes = timespan / 60;
            return timespanInMinutes;
            // return 5;
        }
    }

    // get the contract balance
    function balanceOf() public onlyOwner() view returns(uint) {
        return address(this).balance;
    }

    function isOwner() view public returns(bool) {
        return owner == msg.sender;
    }

    function getOwnerBalance() view public onlyOwner() returns(uint) {
        return ownerBalance;
    }

    function withdrawOwnerBalance() payable public {
        payable(owner).transfer(ownerBalance);
        ownerBalance = 0;
    }

    // get the renter balance
    function balanceOfRenter(address walletAddress) public isRenter(walletAddress) view returns(uint) {
        return renters[walletAddress].balance;
    }

    function setDue(address walletAddress) internal {
        uint timespanInMinutes = getTotalDuration(walletAddress);
        renters[walletAddress].due = timespanInMinutes * 1000000000000000; // 0.001 BNB
    }

    function getDue(address walletAddress) public isRenter(walletAddress) view returns(uint) {
        return renters[walletAddress].due;
    }

    function canRentBike(address walletAddress) public isRenter(walletAddress) view returns(bool) {
        return renters[walletAddress].canRent;
    }

    // deposit to the renter balance
    function deposit(address walletAddress) isRenter(walletAddress) payable public {
        renters[walletAddress].balance += msg.value;
    }

    // make the payment
    function makePayment(address walletAddress, uint amount) public isRenter(walletAddress) {
        require(renters[walletAddress].due > 0, "You do not have anything due at this time.");
        require(renters[walletAddress].balance > amount, "You do not have enough funds to cover payment. Please make a deposit.");

        renters[walletAddress].balance -= amount;
        ownerBalance += amount;
        // balance is paid, renter can rent again
        renters[walletAddress].canRent = true;
        renters[walletAddress].due = 0;
        renters[walletAddress].start = 0;
        renters[walletAddress].end = 0;
    }

    function getRenter(address walletAddress) public isRenter(walletAddress) view returns(string memory firstName, string memory lastName, bool canRent, bool active) {
        firstName = renters[walletAddress].firstName;
        lastName = renters[walletAddress].lastName;
        canRent = renters[walletAddress].canRent;
        active = renters[walletAddress].active;        
    }

     function renterExists(address walletAddress) public isRenter(walletAddress) view returns(bool) {
        if(renters[walletAddress].walletAddress != address(0)) {
            return true;
        }
        return false;
    }
}