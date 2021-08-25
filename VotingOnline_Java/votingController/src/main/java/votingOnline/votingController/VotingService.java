package votingOnline.votingController;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import java.util.*;

@Service
public class VotingService {
	
	@Autowired
	private VotingRepository votingRepo;
	
	public boolean alreadyVoted(String userId) {
		return votingRepo.existsById(userId);
	}
	
	public void addVote(Vote vote) {
		votingRepo.save(vote);
	}
	
	public int voteCounter(String nomineeId) {
		int count =0;
		for(Vote vote:getAllVotes()) {
			if(vote.getNomineeId().equals(nomineeId)) {
				count += 1;
			}
		} return count;
	}
	
	public List<Vote> getAllVotes(){
		List<Vote> votes = new ArrayList<>();
		votingRepo.findAll().forEach(votes::add);
		return votes;
	}

}
