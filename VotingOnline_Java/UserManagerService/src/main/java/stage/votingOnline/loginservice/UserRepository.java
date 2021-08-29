package stage.votingOnline.loginservice;


import org.springframework.data.repository.CrudRepository;


public interface UserRepository extends CrudRepository<User, String> {

}
