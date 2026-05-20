// SPDX-License-Identifier: MIT
pragma solidity ^0.8.24;

contract PayrollStream {
    struct Stream {
        address employee;
        address employer;
        uint256 hourlyRate;
        uint256 lockedPercentage;
        uint256 startTimestamp;
        bool active;
    }

    mapping(address => Stream) public streams;

    event PayrollStreamStarted(address indexed employee, address indexed employer, uint256 hourlyRate, uint256 lockedPercentage);
    event PayrollStreamPaused(address indexed employee);
    event PayrollStreamResumed(address indexed employee);
    event PayrollStreamStopped(address indexed employee);
    event PayrollWithdrawn(address indexed employee, uint256 amount);

    function startStream(address employee, uint256 hourlyRate, uint256 lockedPercentage) external {
        require(employee != address(0), 'employee required');
        require(hourlyRate > 0, 'hourly rate required');
        require(lockedPercentage <= 100, 'invalid locked percentage');

        streams[employee] = Stream({
            employee: employee,
            employer: msg.sender,
            hourlyRate: hourlyRate,
            lockedPercentage: lockedPercentage,
            startTimestamp: block.timestamp,
            active: true
        });

        emit PayrollStreamStarted(employee, msg.sender, hourlyRate, lockedPercentage);
    }

    function pauseStream(address employee) external {
        require(streams[employee].employer == msg.sender, 'not authorized');
        streams[employee].active = false;
        emit PayrollStreamPaused(employee);
    }

    function resumeStream(address employee) external {
        require(streams[employee].employer == msg.sender, 'not authorized');
        streams[employee].active = true;
        emit PayrollStreamResumed(employee);
    }

    function stopStream(address employee) external {
        require(streams[employee].employer == msg.sender, 'not authorized');
        delete streams[employee];
        emit PayrollStreamStopped(employee);
    }

    function withdraw(address employee, uint256 amount) external {
        require(streams[employee].employee == msg.sender, 'not authorized');
        emit PayrollWithdrawn(employee, amount);
    }
}
