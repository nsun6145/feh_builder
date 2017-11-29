const handleDomo = (e) => {
  e.preventDefault();
  
  $("#domoMessage").animate({width:'hide'}, 450);
  
  if($("#domoName").val() == '' || $("#domoLevel").val() == ''){
    handleError("Name and Level are required");
    return false;
  }
  
  sendAjax('POST', $("#domoForm").attr("action"), $("#domoForm").serialize(), function(){
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
  
  let domoText = '';
  const domoNodes = props.domos.map(function(domo){
    
    domoText += `Name: ${domo.name} Level: ${domo.level} Weapon: ${domo.weapon} \n`;
    
    return(
    <div key={domo._id} className="domo">
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
        
        <input className="domoDelete" type="submit" value="Delete"/>
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

const setup = function(csrf){
  ReactDOM.render(
  <DomoForm csrf={csrf}/>, document.querySelector("#makeDomo")
  );
  
  ReactDOM.render(
    <DomoList domos={[]} />, document.querySelector("#domos")
  );
  loadDomosFromServer();
};

const getToken = () =>{
   sendAjax('GET', '/getToken', null, (result) => {
     setup(result.csrfToken);
   });
};

$(document).ready(function(){
  getToken();
});