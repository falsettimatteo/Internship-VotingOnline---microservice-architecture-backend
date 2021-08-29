package votingOnline.votingCatalog;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;
import java.util.*;

@RestController
@RequestMapping("/vote")
public class CatalogController { 
	
	@Autowired
	private CatalogService catalogService;
	
	
	@RequestMapping(value = "/add",consumes = "application/json",method = RequestMethod.POST)
	public String addVote(@RequestBody Nominee nominee) {
		return catalogService.addNominee(nominee);
	}
	
	@RequestMapping("/all")
	public List<Nominee> returnAll(){
		return catalogService.getAllNominee();
	}
	
}
	
