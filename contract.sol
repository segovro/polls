contract polls  {
	
	uint totalNrMembers;
	uint nrGroups;
	uint nrProposals;
	
	function polls() {
	    totalNrMembers = 0;
	    nrGroups = 0;
	    nrProposals = 0;
	}

    event ProposalAdded(uint proposalNumber, uint group, string description, address creator);
    event Voted(address voter, uint proposalNumber, int8 vote, int result);
    event ProposalResult(uint proposalNumber, int result, uint quorum, bool active);
    
    struct Groups {
    	uint nrMembers;
    }

    mapping(uint => Groups) group;
    
    function createGroup () {
    	nrGroups ++;
    	uint groupNr = nrGroups;    	
    	group[groupNr].nrMembers = 0;
    }
    
    struct Members {
        uint memberGroup;
        string alias;
    }
    
    mapping(address => Members) member; 

    
    function registerMember (string _alias, uint _memberGroup) {
		// @notice the caller provides a valid alias
		if (bytes(_alias).length != 0) {
		// @notice the caller is not already the system
			if (bytes(member[msg.sender].alias).length == 0) {
			member[msg.sender].alias = _alias;
			member[msg.sender].memberGroup = _memberGroup;
			group[_memberGroup].nrMembers += 1;
			totalNrMembers += 1;
				} 
			} 
		}
    
    function getNrMembersGroup (uint _memberGroup) constant returns (uint) {
    	return (group[_memberGroup].nrMembers);
    }
    
    struct Proposals {
		address creator;
    	uint proposalGroup;
        string description;
        uint votingDeadline;
        uint quorumProposal;
        bool closed;
        bool proposalPassed;
        uint numberOfVotes;
        int currentResult;
		mapping (address => Voters) voters;
    }	
	
	struct Voters {
		bool alreadyVoted;
		
	}
 
	mapping (uint => Proposals) proposal;
	
    /* Function to create a new proposal */
    function newProposal(
    	uint _proposalGroup,
        string _description,
        uint _days,
    	uint _quorum
    )
    {   if (member[msg.sender].memberGroup == _proposalGroup)  {
        nrProposals ++;
        uint proposalNumber = nrProposals;
		proposal[proposalNumber].creator = msg.sender;
        proposal[proposalNumber].proposalGroup = _proposalGroup;
        proposal[proposalNumber].description = _description;
        proposal[proposalNumber].votingDeadline = now + _days * 1 days;
        proposal[proposalNumber].quorumProposal = _quorum;
        proposal[proposalNumber].closed = false;
        proposal[proposalNumber].proposalPassed = false;
        proposal[proposalNumber].numberOfVotes = 0;
        proposal[proposalNumber].currentResult = 0;
		proposal[proposalNumber].voters[msg.sender].alreadyVoted = false; 		
        ProposalAdded(proposalNumber, _proposalGroup, _description, msg.sender);
        }
    }
	
    function vote(
        uint _proposalNumber,
        int8 _choice
    )
        {
		if (now > proposal[_proposalNumber].votingDeadline) {closeProposal(_proposalNumber);}	
		if (proposal[_proposalNumber].closed == false) {
		if (member[msg.sender].memberGroup == proposal[_proposalNumber].proposalGroup) {
					if (proposal[_proposalNumber].voters[msg.sender].alreadyVoted == false) {                
        				proposal[_proposalNumber].numberOfVotes += 1;    
						proposal[_proposalNumber].voters[msg.sender].alreadyVoted = true;  
			if (_choice == 1) {proposal[_proposalNumber].currentResult += 1; } 
			if (_choice == -1) {proposal[_proposalNumber].currentResult -= 1; }
        // Create a log of this event
        Voted(msg.sender, _proposalNumber, _choice, proposal[_proposalNumber].currentResult);
					}
					}
				}
			}

    function closeProposal(uint _proposalNumber) {           
        /* If difference between support and opposition is larger than margin */
		if (now > proposal[_proposalNumber].votingDeadline) {
		if (proposal[_proposalNumber].closed == false) {
        if ((proposal[_proposalNumber].numberOfVotes > proposal[_proposalNumber].quorumProposal) 
        		|| (proposal[_proposalNumber].currentResult > 0))
        {
            proposal[_proposalNumber].proposalPassed = true;
        } else {
            proposal[_proposalNumber].proposalPassed = false;
        }
        // Fire Events
        ProposalResult(_proposalNumber, proposal[_proposalNumber].currentResult, proposal[_proposalNumber].numberOfVotes, proposal[_proposalNumber].proposalPassed);
			}}}
    
    function getTotals () constant returns (uint, uint, uint) {
    	return (totalNrMembers, nrGroups, nrProposals);
    }
    
    function getMember (address _getMember) constant returns (address, uint, string) {
    	return (_getMember, member[_getMember].memberGroup, member[_getMember].alias);
    }
    
    function getGroup (uint _group) constant returns (uint) {
    	return (group[_group].nrMembers);
    }
    
    function getProposal (uint _proposalNumber) constant returns (uint, string, uint, uint, address) {
		if (now > proposal[_proposalNumber].votingDeadline) {closeProposal(_proposalNumber);}	
    	return (proposal[_proposalNumber].proposalGroup, 
    			proposal[_proposalNumber].description, 
    			proposal[_proposalNumber].quorumProposal,
    			proposal[_proposalNumber].votingDeadline,
				proposal[_proposalNumber].creator
    			);
    }
	
	function getIfVoted (uint _proposalNumber, address _member) constant returns (bool) {
		return (proposal[_proposalNumber].voters[msg.sender].alreadyVoted);
	}
    
    function getProposalVotes (uint _proposalNumber) constant returns (uint, int, bool, bool) {
    	return (proposal[_proposalNumber].numberOfVotes, 
    			proposal[_proposalNumber].currentResult,
    			proposal[_proposalNumber].closed,
    			proposal[_proposalNumber].proposalPassed    			
    			);
    }
}
