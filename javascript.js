function Repository(id,name,numberDevelopers)
{
this.id=id;
this.name=name;
this.numberDevelopers=numberDevelopers

}

function Developer(id,name,email)
{
this.id=id;
this.name=name;
this.email=email;
this.repositories=new Array(); //Array of repositories the developer is working on 
this.commits=new Array(); // Array containing the number of commits by this developer  (commit[1] is the number of commits by this developer in repository[1])
}

function Domain_aptitude(id,name,desc)
{
this.id=id;
this.name=name;
this.desc=desc;

}

function Concrete_aptitude(id,name,desc)
{
this.id=id;
this.name=name;
this.desc=desc;

}


function maFonction(){
$.getJSON( "http://flouistherese.vvv.enseirb-matmeca.fr/JSON/report.json", function( data ) {

   var node = document.getElementById('node-id');
   var repo=Array(); //Array of repository objects
   var developers=Array(); //Array of developer objects
   var idDevelopers=Array();//Array of developer IDs
   var totalDevelopers=0; //Total number of developers
   // document.write("Repositories :<br>");
    for (var i=0; i<data.repositories.length; i++) { //Processing repositories and developers
    repo[i]= new Repository(data.repositories[i].id,data.repositories[i].name,data.repositories[i].developers.length); //Create new Repository object
	 // document.write("Id : "+repo[i].id+"<br>" );
	// document.write("Name :"+repo[i].name+"<br>");
	// document.write("Number of developers :"+repo[i].numberDevelopers+"<br>"); 
		// document.write("Developers :<br>");
		for (var j=0; j<data.repositories[i].developers.length; j++) { //Process through every developer on this repository
			if(idDevelopers.indexOf(data.repositories[i].developers[j].id)==-1){ //If the developer is not listed yet
			developers[totalDevelopers]=new Developer(data.repositories[i].developers[j].id,data.repositories[i].developers[j].name,data.repositories[i].developers[j].email);
			idDevelopers[totalDevelopers]=data.repositories[i].developers[j].id;
			developers[totalDevelopers].repositories[0]=data.repositories[i].id;
			developers[totalDevelopers].commits[0]=data.repositories[i].developers[j].commits;
			// document.write("Id : "+developers[totalDevelopers].id+"<br>" );
			// document.write("Name :"+developers[totalDevelopers].name+"<br>");
			// document.write("Email :"+developers[totalDevelopers].email+"</p>");
			// document.write("Commits :"+developers[totalDevelopers].commits[0]+"</p>");
			
			totalDevelopers++;
			}
			else{ //If the developer already exists
			var numberRepo=developers[idDevelopers.indexOf(data.repositories[i].developers[j].id)].repositories.length;
			var numberCommits=developers[idDevelopers.indexOf(data.repositories[i].developers[j].id)].commits.length;
			developers[idDevelopers.indexOf(data.repositories[i].developers[j].id)].repositories[numberRepo]=data.repositories[i].id;
			developers[idDevelopers.indexOf(data.repositories[i].developers[j].id)].commits[numberCommits]=data.repositories[i].developers[j].commits;
			// document.write("Id : "+developers[idDevelopers.indexOf(data.repositories[i].developers[j].id)].id+"<br>" );
			// document.write("Name :"+developers[idDevelopers.indexOf(data.repositories[i].developers[j].id)].name+"<br>");
			// document.write("Email :"+developers[idDevelopers.indexOf(data.repositories[i].developers[j].id)].email+"</p>");
			// document.write("Commits :"+developers[idDevelopers.indexOf(data.repositories[i].developers[j].id)].commits[numberCommits]+"</p>");
			}
    }
		}
		
		
		
		var totalConcreteAptitudes=0; //Total number of concrete aptitudes
		var domainAptitudes=new Array();
		var concreteAptitudes=new Array();
		 for (var i=0; i<data.domain_aptitudes.length; i++) { //Processing domain aptitudes and concrete aptitudes
			domainAptitudes[i]= new Domain_aptitude(data.domain_aptitudes[i].id,data.domain_aptitudes[i].name,data.domain_aptitudes[i].desc); //Create new Domain_aptitude object
			document.write("Domain Aptitudes :<br>");
	 document.write("Id : "+domainAptitudes[i].id+"<br>" );
	document.write("Name :"+domainAptitudes[i].name+"<br>");
	document.write("Description :"+domainAptitudes[i].desc+"<br>"); 
		document.write("Concrete Aptitudes :<br>");
		for (var j=0; j<data.domain_aptitudes[i].concrete_aptitudes.length; j++) { //Process through every concrete aptitude per domain aptitude
			concreteAptitudes[totalConcreteAptitudes]=new Concrete_aptitude(data.domain_aptitudes[i].concrete_aptitudes[j].id,data.domain_aptitudes[i].concrete_aptitudes[j].name,data.domain_aptitudes[i].concrete_aptitudes[j].desc);
			document.write("Id : "+concreteAptitudes[totalConcreteAptitudes].id+"<br>" );
			document.write("Name :"+concreteAptitudes[totalConcreteAptitudes].name+"<br>");
			document.write("Desc :"+concreteAptitudes[totalConcreteAptitudes].desc+"</p>");
			totalConcreteAptitudes++;
    }
		}
});
}


