package votingOnline.votingController;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;
import org.springframework.web.bind.annotation.RestController;
import org.springframework.web.reactive.function.client.WebClient;

import reactor.core.publisher.Mono;


@RestController
@RequestMapping("/votingOnline")
public class VotingController {
	
	@Autowired
	private WebClient.Builder WebClientBuilder;
	
	@Autowired
	private VotingService votingService;

	//voto dell'user
	@RequestMapping( value = "/vote",consumes = "application/json",method = RequestMethod.POST)
	public String makeVote(@RequestBody Vote vote) {
		boolean isUserLogged = WebClientBuilder.build().get()
					.uri("http://localhost:8080/user/" + vote.getUserId())
					.retrieve()
					.bodyToMono(boolean.class)
					.block();
		if(isUserLogged) {
			if(votingService.alreadyVoted(vote.getUserId())) {
				return ("YOU HAVE ALREADY VOTED");
			}else{
				votingService.addVote(vote);
				return ("YOUR VOTE HAS BEEN SAVED");
			}
		}return ("YOU FIRST NEED TO REGISTER INTO THE PLATFORM");
		
	}
	
	//Registrazione dell'user
	
	@RequestMapping(value = "/register",consumes = "application/json",method = RequestMethod.POST)
	public String registerUser(@RequestBody User user) {
		return WebClientBuilder.build().post()
				.uri("http://localhost:8080/user/add")
				.body(Mono.just(user), User.class)
				.retrieve()
				.bodyToMono(String.class)
				.block();
		
	}
	
	@RequestMapping("/counting/{nomineeId}")
	public int countVoters(@PathVariable String nomineeId) {
		return votingService.voteCounter(nomineeId);
	}

}

