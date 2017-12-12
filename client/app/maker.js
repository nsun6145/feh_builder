//The two below handle requests for respectives
const handleDomo = (e) => {
  e.preventDefault();
  
  $("#domoMessage").animate({width:'hide'}, 450);
  
  if($("#domoName").val() == '' || $("#domoLevel").val() == ''){
    handleError("Name and Level are required bud");
    return false;
  }
  
  sendAjax('POST', $("#domoForm").attr("action"), $("#domoForm").serialize(), function(){
  loadDomosFromServer();
  });
  
           
  return false;
};

const handleTeam = (e) => {
    e.preventDefault();
  
  $("#domoMessage").animate({width:'hide'}, 450);
  
  sendAjax('POST', $("#teamForm").attr("action"), $("#teamForm").serialize(), function(){
  loadTeamsFromServer();
  });
  
           
  return false;
};

//Handles form for creating units
const DomoForm = (props) => {
  
    return (
    <form id="domoForm"
     onSubmit={handleDomo}
      name="domoForm"
      action="/maker"
      method="POST"
      className="domoForm"
     >
      <ul>
      <li>
      <label htmlFor="name">Name: </label>
      <select id="domoName" name="name" placeholder="Name">
      <option value="Abel">Abel</option>
      </select>
        </li>
        
      <li>
      <label htmlFor="level"> Level: </label>
      <input id="domoName" type= "number" name="level" placeholder="Level"/>
        </li>
      
        <li>
      <label htmlFor="weapon"> Weapon: </label>
      <input id="domoName" type= "text" name="weapon" placeholder="Weapon"/>
        </li>
      
        <li>
      <label htmlFor="assist"> Assist: </label>
      <select id="domoName" name="assist" placeholder="Assist">
      <option value="Drag Back">Drag Back</option>  
      </select>
      </li>  
      <label htmlFor="special"> Special: </label>
      <select id="domoName" name="special" placeholder="Special">
      <option value="Moonbow">Moonbow</option>   
      </select>
        
      <li>  
      <label htmlFor="skillA"> A Skill: </label>
      <select id="domoName" name="skillA" placeholder="A Skill">
        <option value="Death Blow 3">Death Blow 3</option> 
        </select>
      </li>
        
      <li>
      <label htmlFor="name"> B Skill: </label>
      <select id="domoName" name="skillB" placeholder="B Skill">
      <option value="Vantage 3">Vantage 3</option> 
      </select>
      </li>
        
      <li>
      <label htmlFor="name"> C Skill: </label>
      <select id="domoName" name="skillC" placeholder="C Skill">
      <option value="Hone Spd 3">Hone Spd 3</option> 
      </select>
      </li>
        
      <li>
      <label htmlFor="name"> Seal: </label>
      <select id="domoName" name="seal" placeholder="Seal">
      <option value="Quickened Pulse">Quickened Pulse</option> 
      </select>
        </li>
        
      <li>  
      <label htmlFor="name"> Note: </label>
      <textarea rows="5" col = "8" name = "note"></textarea>  
      </li>  
      <input type="hidden" name="_csrf" value={props.csrf}/>
      <input className="makeDomoSubmit" type="submit" value="Create Unit" />
    </ul>
    </form>
  
    );
  };

//displays list of units
const DomoList = function(props){

  //if there is no units made
  if(props.domos.length === 0){
    return(
      <div className= "domoList">
      <h3 className="emptyDomo">Nothing yet.</h3>
      </div>
    );
  }
  
  let domoText = '';
  const domoNodes = props.domos.map(function(domo){
    
    domoText += `Name: ${domo.name} Level: ${domo.level} Weapon: ${domo.weapon} Assist: ${domo.assist} Special: ${domo.special} A Skill: ${domo.skillA} B Skill : ${domo.skillB} C Skill: ${domo.skillC}  Seal: ${domo.seal}  \n`;
    //const id = e.target.attribute("data-key");
    //const remove = db.collection.remove(id,true);
    return(
    <div data-key={domo._id} className="domo">
      <img src="/assets/img/stone_icon.png" alt="domo face" className="domoFace" />
        <h3 className="domoName"> Name: {domo.name}</h3>
        
        <h3 className="domoLevel"> Level: {domo.level}</h3>
        
        <h3 className="unitP"> Weapon: {domo.weapon}</h3>
        <h3 className = "unitP">Assist: {domo.assist}</h3>
        <h3 className = "unitP">Special: {domo.special}</h3>
        <h3 className = "unitP">A Skill: {domo.skillA}</h3>
        <h3 className = "unitP">B Skill: {domo.skillB}</h3>
        <h3 className = "unitP">C Skill: {domo.skillC}</h3>
        <h3 className = "unitP">Seal: {domo.seal}</h3>
        <h3 className = "unitP">Notes: {domo.note}</h3>
        <div id = "note">
        <textarea rows="5" cols= "20"></textarea>
        </div>
        <input data-key={domo._id} className="noteAdd" type="button" value="Add/Replace Note"/>
        
        <input data-key={domo._id} className="domoDelete" type="button" value="Delete Unit"/>
       </div>
    );
  });
  
  return(
  <div className="domoList">
  {domoNodes}
  <textarea rows="10" cols="50" id='export'>
    {domoText}
    </textarea>
  </div>
  );
};


//loads units from server
const loadDomosFromServer = () => {
  sendAjax('GET', '/getDomos', null, (data) =>{
   ReactDOM.render(
     <DomoList domos={data.domos} />, document.querySelector("#list")
   ); 
  });
};

//form for creating teams
const TeamForm = (props) => {

  let teamNodes;
  
  try{
   teamNodes = props.domos.map(function(domo){
    return(
      <option value={domo.name} >{domo.name}</option>
    );
  });
}
  
  catch(err){
    console.dir("No units made yet.");
    teamNodes = ["No Units"];
    console.dir("The error is " + err);
  }
console.dir(teamNodes);
  return (
    <form id="teamForm"
     onSubmit={handleDomo}
      name="teamForm"
      action="/teamMaker"
      method="POST"
      className="teamForm"
     >
      <ul> 
        <li>
      <label htmlFor="name">Unit: </label>
      <select id="unitName" name="name1" placeholder="Name">
      {teamNodes}
      </select>
        </li>
        <li>
      <label htmlFor="name">Unit: </label>
      <select id="unitName" name="name2" placeholder="Name">
      {teamNodes}
      </select>
        </li>
        
        <li>
      <label htmlFor="name">Unit: </label>
      <select id="unitName" name="name3" placeholder="Name">
      {teamNodes}
      </select>
        </li>
        <li>
      <label htmlFor="name">Unit: </label>
      <select id="unitName" name="name4" placeholder="Name">
      {teamNodes}
      </select>
        </li>
      <input id= "teamAdd" type="submit"></input>
      </ul>
    </form>
      
    );
  
};

//displays teams
const TeamList = function(props){
  if(props.teams.length === 0){
    return(
      <div className= "teamList">
      <h3 className="emptyTeam">No teams yet.</h3>
      </div>
    );
  }
  const teamNodes = props.teams.map(function(team){
  const id = e.target.attribute("data-key");
  return(
    <div data-key={team._id} className="team">
    <h3 className = "unit">{team.unit1}</h3>
    <h3 className = "unit">{team.unit2}</h3>
    <h3 className = "unit">{team.unit3}</h3>
    <h3 className = "unit">{team.unit4}</h3>
    </div>
  );
     
  });
  
};

//self-explanatory
const loadTeamsFromServer = () =>{
  sendAjax('GET', '/getTeams', null, (data) =>{
   ReactDOM.render(
     <DomoList domos={data.teams} />, document.querySelector("#list")
   ); 
  });
};

//initial page setup
const setup = function(csrf){
  
  const teamButton = document.querySelector("#teamButton");
  const unitButton = document.querySelector("#unitButton");
  
  
  ReactDOM.render(
  <DomoForm csrf={csrf}/>, document.querySelector("#maker")
  );
  
  ReactDOM.render(
    <DomoList domos={[]} />, document.querySelector("#list")
  );
  loadDomosFromServer();
  
  teamButton.addEventListener("click", (e) =>{
    e.preventDefault();
    createTeamBuilder(csrf);
    return false;
  });
  
  unitButton.addEventListener("click", (e) =>{
    e.preventDefault();
    createUnitMaker(csrf);
    return false;
  });
  /*
    loginButton.addEventListener("click", (e) =>{
    e.preventDefault();
    createLoginWindow(csrf);
    return false;
  });
  */
  
};

//loads unit view
const createUnitMaker = function(csrf){
  ReactDOM.render(
  <DomoForm csrf={csrf}/>, document.querySelector("#maker")
  );
  
  ReactDOM.render(
    <DomoList domos={[]} />, document.querySelector("#list")
  );
  loadDomosFromServer();
  
}

//loads team view
const createTeamBuilder = function(csrf){
  ReactDOM.render(
  <TeamForm csrf={csrf}/>, document.querySelector("#maker")
  );
  ReactDOM.render(
  <TeamList teams={[]}/>, document.querySelector("#list")
  );
  //loadTeamsFromServer();
};

//getting user token
const getToken = () =>{
   sendAjax('GET', '/getToken', null, (result) => {
     setup(result.csrfToken);
   });
};

$(document).ready(function(){
  getToken();
});