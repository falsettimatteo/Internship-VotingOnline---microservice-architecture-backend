package votingOnline.votingController;

import org.springframework.data.repository.CrudRepository;

public interface VotingRepository extends CrudRepository<Vote,String> {

}
