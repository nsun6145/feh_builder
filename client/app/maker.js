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
  loadDomosFromServer();
  });
  
           
  return false;
};
           
const DomoForm = (props) => {
  
    return (
    <form id="domoForm"
     onSubmit={handleDomo}
      name="domoForm"
      action="/maker"
      method="POST"
      className="domoForm"
     >
      <label htmlFor="name">Name: </label>
      <select id="domoName" name="name" placeholder="Name">
      <option value="Abel">Abel</option>
      </select>
      <label htmlFor="level"> Level: </label>
      <input id="domoLevel" type= "number" name="level" placeholder="Level"/>
      <label htmlFor="weapon"> Weapon: </label>
      <input id="domoWeapon" type= "text" name="weapon" placeholder="Weapon"/>
      <label htmlFor="assist"> Assist: </label>
      <select id="unitAssist" name="assist" placeholder="Assist"></select>
      <label htmlFor="special"> Special: </label>
      <select id="unitSpecial" name="special" placeholder="Special"></select>
      <label htmlFor="skillA"> A Skill: </label>
      <select id="unitSkillA" name="skillA" placeholder="A Skill"></select>
        <label htmlFor="skillB"> B Skill: </label>
      <select id="unitSkillB" name="skillB" placeholder="B Skill"></select>
        <label htmlFor="skillC"> C Skill: </label>
      <select id="unitSkillC" name="skillC" placeholder="C Skill"></select>
      <label htmlFor="seal"> Seal: </label>
      <select id="unitSeal" name="seal" placeholder="Seal"></select>
      <input type="hidden" name="_csrf" value={props.csrf}/>
      <input className="makeDomoSubmit" type="submit" value="Create Unit" />
    </form>
    );
  };

const DomoList = function(props){
  
  
  
  if(props.domos.length === 0){
    return(
      <div className= "domoList">
      <h3 className="emptyDomo">No units yet</h3>
      </div>
    );
  }
  <div class="navlink"><a id="teamButton" href="/login">Team</a></div>
  let domoText = '';
  const domoNodes = props.domos.map(function(domo){
    
    domoText += `Name: ${domo.name} Level: ${domo.level} Weapon: ${domo.weapon} Assist: ${domo.assist} Special: ${domo.special} A Skill: ${domo.skillA} B Skill : ${domo.skillB} C Skill: ${domo.skillC}  Seal: ${domo.seal}  \n`;
    const id = e.target.attribute("data-key");
    return(
    <div data-key={domo._id} className="domo">
      <img src="/assets/img/domoface.jpeg" alt="domo face" className="domoFace" />
        <h3 className="domoName"> Name: {domo.name}</h3>
        <h3 className="domoLevel"> Level: {domo.level}</h3>
        <h3 className="domoWeapon"> Weapon: {domo.weapon}</h3>
        <h3 className = "unitAssist">Assist: {domo.assist}</h3>
        <h3 className = "unitSpecial">Special: {domo.special}</h3>
        <h3 className = "unitSkillA">A Skill: {domo.skillA}</h3>
        <h3 className = "unitSkillB">B Skill: {domo.skillB}</h3>
        <h3 className = "unitSkillC">C Skill: {domo.skillC}</h3>
        <h3 className = "unitSeal">Seal: {domo.seal}</h3>
        
        <input data-key={domo._id} className="domoDelete" type="button" value="Delete" onClick = db.collection.remove(id,true)/>
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



const loadDomosFromServer = () => {
  sendAjax('GET', '/getDomos', null, (data) =>{
   ReactDOM.render(
     <DomoList domos={data.domos} />, document.querySelector("#domos")
   ); 
  });
};

const teamForm = function(props) =>{
  
   const teamNodes = props.domo.map(function(domo){
    return(
      <option value={domo.name} >{domo.name}</option>
    );
  });
  
  
  return (
    <form id="teamForm"
     onSubmit={handleDomo}
      name="teamForm"
      action="/teamMaker"
      method="POST"
      className="teamForm"
     >
      
      <div class="navlink"><a id="unitButton" href="/login">Unit</a></div>
      
      <label htmlFor="name">Unit: </label>
      <select id="unitName1" name="name" placeholder="Name">
      {teamNodes}
      </select>
      
      <label htmlFor="name">Unit: </label>
      <select id="unitName2" name="name" placeholder="Name">
      {teamNodes}
      </select>
      
      <label htmlFor="name">Unit: </label>
      <select id="unitName3" name="name" placeholder="Name">
      {teamNodes}
      </select>
      
      <label htmlFor="name">Unit: </label>
      <select id="unitName4" name="name" placeholder="Name">
      {teamNodes}
      </select>
      
      <input id= "teamAdd" type="submit"></input>
    </form>
    );
  
};

const teamList = function(props){
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

const setup = function(csrf){
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
  
    loginButton.addEventListener("click", (e) =>{
    e.preventDefault();
    createLoginWindow(csrf);
    return false;
  });
  
};

const createUnitMaker = function(csrf){
  ReactDOM.render(
  <DomoForm csrf={csrf}/>, document.querySelector("#maker")
  );
  
  ReactDOM.render(
    <DomoList domos={[]} />, document.querySelector("#list")
  );
  loadDomosFromServer();
}

const createTeamBuilder = function(csrf){
  ReactDOM.render(
  <TeamForm csrf={csrf}/>, document.querySelector("#maker")
  );
  ReactDOM.render(
  <TeamList csrf={csrf}/>, document.querySelector("#list")
  );
};

const getToken = () =>{
   sendAjax('GET', '/getToken', null, (result) => {
     setup(result.csrfToken);
   });
};

$(document).ready(function(){
  getToken();
});