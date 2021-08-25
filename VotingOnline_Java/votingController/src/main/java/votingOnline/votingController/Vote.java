package votingOnline.votingController;

import javax.persistence.Column;
import javax.persistence.Entity;
import javax.persistence.Id;
import javax.persistence.Table;

@Entity
@Table(name = "VoteData")
public class Vote {
	
	@Id
	private String userId;
	private String nomineeId;
	
	public Vote() {}
	public Vote(String id,String nominee) {
		super();
		this.userId=id;
		this.nomineeId=nominee;
	}
	
	@Id
	public String getUserId() {
		return userId;
	}
	public void setUserId(String id) {
		this.userId = id;
	}

	@Column(name = "nomineeId")
	public String getNomineeId() {
		return nomineeId;
	}
	public void setNomineeId(String nominee) {
		this.nomineeId = nominee;
	}
	
}