package stage.votingOnline.loginservice;

import javax.persistence.Column;
import javax.persistence.Entity;
import javax.persistence.Id;
import javax.persistence.Table;

@Entity
@Table(name = "UserData")
public class User {
	
	@Id
	private String id;
	private String username;
	private String password;
	
	public User() {
		
	}
	
	public User(String id,String username, String password) {
		super();
		this.id = id;
		this.username = username;
		this.password = password;
	}
	
	@Id
	public String getId() {
		return id;
	}

	public void setId(String id) {
		this.id = id;
	}

	@Column(name = "username")
	public String getUsername() {
		return username;
	}

	public void setUsername(String username) {
		this.username = username;
	}

	@Column(name = "password")
	public String getPassword() {
		return password;
	}

	public void setPassword(String password) {
		this.password = password;
	}

	
	
}