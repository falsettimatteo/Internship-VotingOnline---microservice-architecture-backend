package votingOnline.votingCatalog;

import javax.persistence.Column;
import javax.persistence.Entity;
import javax.persistence.Id;
import javax.persistence.Table;

@Entity
@Table(name = "NomineeTable")
public class Nominee {
	
	@Id
	private String id;
	private String nominee;
	
	public Nominee() {}
	public Nominee(String id,String nominee) {
		super();
		this.id=id;
		this.nominee=nominee;
	}
	
	@Id
	public String getId() {
		return id;
	}
	
	public void setId(String id) {
		this.id = id;
	}
	
	@Column(name = "nominee")
	public String getNominee() {
		return nominee;
	}
	public void setNominee(String nominee) {
		this.nominee = nominee;
	}
	

}