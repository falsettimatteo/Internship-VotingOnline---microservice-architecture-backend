package stage.votingOnline.loginservice;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;
import java.util.*;

@RestController
@RequestMapping("/user")
public class UserController {
	
	@Autowired
	private UserService userService;
	
	@RequestMapping("/all")
	public List<User> returnAll() {
		return userService.getAllUsers();		
	}
	
	//ritorna true se i dati di login sono presenti, altrimenti ritorna false
	@RequestMapping("/{userid}")
	public boolean isUserLogged(@PathVariable String userid) {
		 return userService.loggedUser(userid);
	}
	
	@RequestMapping(value = "/add",consumes = "application/json", method = RequestMethod.POST)
	public String addUser(@RequestBody User user) {
		if( userService.getAllUsers().size()==0 || !userService.existById(user.getId()) ) {
		userService.addUser(user);
		return ("User successfully added");
		}else return ("User already exist");
	}
}