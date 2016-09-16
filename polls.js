
var pollsContract = web3.eth.contract([ {
	"constant" : false,
	"inputs" : [ {
		"name" : "_proposalNumber",
		"type" : "uint256"
	} ],
	"name" : "closeProposal",
	"outputs" : [],
	"payable" : false,
	"type" : "function"
}, {
	"constant" : false,
	"inputs" : [ {
		"name" : "_alias",
		"type" : "string"
	}, {
		"name" : "_memberGroup",
		"type" : "uint256"
	} ],
	"name" : "registerMember",
	"outputs" : [],
	"payable" : false,
	"type" : "function"
}, {
	"constant" : true,
	"inputs" : [ {
		"name" : "_getMember",
		"type" : "address"
	} ],
	"name" : "getMember",
	"outputs" : [ {
		"name" : "",
		"type" : "address"
	}, {
		"name" : "",
		"type" : "uint256"
	}, {
		"name" : "",
		"type" : "string"
	} ],
	"payable" : false,
	"type" : "function"
}, {
	"constant" : true,
	"inputs" : [ {
		"name" : "_proposalNumber",
		"type" : "uint256"
	} ],
	"name" : "getProposalVotes",
	"outputs" : [ {
		"name" : "",
		"type" : "uint256"
	}, {
		"name" : "",
		"type" : "int256"
	}, {
		"name" : "",
		"type" : "bool"
	}, {
		"name" : "",
		"type" : "bool"
	} ],
	"payable" : false,
	"type" : "function"
}, {
	"constant" : false,
	"inputs" : [],
	"name" : "createGroup",
	"outputs" : [],
	"payable" : false,
	"type" : "function"
}, {
	"constant" : true,
	"inputs" : [],
	"name" : "getTotals",
	"outputs" : [ {
		"name" : "",
		"type" : "uint256"
	}, {
		"name" : "",
		"type" : "uint256"
	}, {
		"name" : "",
		"type" : "uint256"
	} ],
	"payable" : false,
	"type" : "function"
}, {
	"constant" : false,
	"inputs" : [ {
		"name" : "_proposalGroup",
		"type" : "uint256"
	}, {
		"name" : "_description",
		"type" : "string"
	}, {
		"name" : "_days",
		"type" : "uint256"
	}, {
		"name" : "_quorum",
		"type" : "uint256"
	} ],
	"name" : "newProposal",
	"outputs" : [],
	"payable" : false,
	"type" : "function"
}, {
	"constant" : true,
	"inputs" : [ {
		"name" : "_memberGroup",
		"type" : "uint256"
	} ],
	"name" : "getNrMembersGroup",
	"outputs" : [ {
		"name" : "",
		"type" : "uint256"
	} ],
	"payable" : false,
	"type" : "function"
}, {
	"constant" : true,
	"inputs" : [ {
		"name" : "_proposalNumber",
		"type" : "uint256"
	} ],
	"name" : "getProposal",
	"outputs" : [ {
		"name" : "",
		"type" : "uint256"
	}, {
		"name" : "",
		"type" : "string"
	}, {
		"name" : "",
		"type" : "uint256"
	}, {
		"name" : "",
		"type" : "uint256"
	}, {
		"name" : "",
		"type" : "address"
	} ],
	"payable" : false,
	"type" : "function"
}, {
	"constant" : true,
	"inputs" : [ {
		"name" : "_group",
		"type" : "uint256"
	} ],
	"name" : "getGroup",
	"outputs" : [ {
		"name" : "",
		"type" : "uint256"
	} ],
	"payable" : false,
	"type" : "function"
}, {
	"constant" : true,
	"inputs" : [ {
		"name" : "_proposalNumber",
		"type" : "uint256"
	}, {
		"name" : "_member",
		"type" : "address"
	} ],
	"name" : "getIfVoted",
	"outputs" : [ {
		"name" : "",
		"type" : "bool"
	} ],
	"payable" : false,
	"type" : "function"
}, {
	"constant" : false,
	"inputs" : [ {
		"name" : "_proposalNumber",
		"type" : "uint256"
	}, {
		"name" : "_choice",
		"type" : "int8"
	} ],
	"name" : "vote",
	"outputs" : [],
	"payable" : false,
	"type" : "function"
}, {
	"inputs" : [],
	"type" : "constructor"
}, {
	"anonymous" : false,
	"inputs" : [ {
		"indexed" : false,
		"name" : "proposalNumber",
		"type" : "uint256"
	}, {
		"indexed" : false,
		"name" : "group",
		"type" : "uint256"
	}, {
		"indexed" : false,
		"name" : "description",
		"type" : "string"
	}, {
		"indexed" : false,
		"name" : "creator",
		"type" : "address"
	} ],
	"name" : "ProposalAdded",
	"type" : "event"
}, {
	"anonymous" : false,
	"inputs" : [ {
		"indexed" : false,
		"name" : "voter",
		"type" : "address"
	}, {
		"indexed" : false,
		"name" : "proposalNumber",
		"type" : "uint256"
	}, {
		"indexed" : false,
		"name" : "vote",
		"type" : "int8"
	}, {
		"indexed" : false,
		"name" : "result",
		"type" : "int256"
	} ],
	"name" : "Voted",
	"type" : "event"
}, {
	"anonymous" : false,
	"inputs" : [ {
		"indexed" : false,
		"name" : "proposalNumber",
		"type" : "uint256"
	}, {
		"indexed" : false,
		"name" : "result",
		"type" : "int256"
	}, {
		"indexed" : false,
		"name" : "quorum",
		"type" : "uint256"
	}, {
		"indexed" : false,
		"name" : "active",
		"type" : "bool"
	} ],
	"name" : "ProposalResult",
	"type" : "event"
} ]);

var polls = pollsContract.at("0xf025d81196b72fba60a1d4dddad12eeb8360d828");

var totals = polls.getTotals();
var totalNrMembers = totals[0];
var nrGroups = totals[1];
var nrProposals = totals[2];
