package stage.votingOnline.loginservice;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import java.util.*;

@Service
public class UserService {
	
	@Autowired
	 private UserRepository userRepo;
	
	public List<User> getAllUsers(){
		List<User> users = new ArrayList<>();
		userRepo.findAll().forEach(users::add);
		return users;
	}
	
	public void addUser(User user) {
		userRepo.save(user);
	}
	
	public User getUserById(String id) {
		return userRepo.findById(id).get();
	}
	
	public boolean existById(String userId) {
		if(userRepo.findById(userId).get() != null) {
			return true;
		} return false;
	}
	
	public boolean loggedUser(String userid) {
		return userRepo.existsById(userid);
	}
}
