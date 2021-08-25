package votingOnline.votingCatalog;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;


import java.util.*;

@Service
public class CatalogService {
	
	@Autowired
	private CatalogRepository catalogRepo;
	
	public String addNominee(Nominee nominee) {
		if(!catalogRepo.existsById(nominee.getId()) ) {
			return ("Nominee already exist");
		}
		catalogRepo.save(nominee);
		return ("Nominee successfully added");
	}
	
	public List<Nominee> getAllNominee(){
		List<Nominee> nominee = new ArrayList<>();
		catalogRepo.findAll().forEach(nominee::add);
		return nominee;
	}




}
