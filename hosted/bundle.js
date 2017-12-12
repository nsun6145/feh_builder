"use strict";

//The two below handle requests for respectives
var handleDomo = function handleDomo(e) {
  e.preventDefault();

  $("#domoMessage").animate({ width: 'hide' }, 450);

  if ($("#domoName").val() == '' || $("#domoLevel").val() == '') {
    handleError("Name and Level are required bud");
    return false;
  }

  sendAjax('POST', $("#domoForm").attr("action"), $("#domoForm").serialize(), function () {
    loadDomosFromServer();
  });

  return false;
};

var handleTeam = function handleTeam(e) {
  e.preventDefault();

  $("#domoMessage").animate({ width: 'hide' }, 450);

  sendAjax('POST', $("#teamForm").attr("action"), $("#teamForm").serialize(), function () {
    loadTeamsFromServer();
  });

  return false;
};

//Handles form for creating units
var DomoForm = function DomoForm(props) {

  return React.createElement(
    "form",
    { id: "domoForm",
      onSubmit: handleDomo,
      name: "domoForm",
      action: "/maker",
      method: "POST",
      className: "domoForm"
    },
    React.createElement(
      "ul",
      null,
      React.createElement(
        "li",
        null,
        React.createElement(
          "label",
          { htmlFor: "name" },
          "Name: "
        ),
        React.createElement(
          "select",
          { id: "domoName", name: "name", placeholder: "Name" },
          React.createElement(
            "option",
            { value: "Abel" },
            "Abel"
          )
        )
      ),
      React.createElement(
        "li",
        null,
        React.createElement(
          "label",
          { htmlFor: "level" },
          " Level: "
        ),
        React.createElement("input", { id: "domoName", type: "number", name: "level", placeholder: "Level" })
      ),
      React.createElement(
        "li",
        null,
        React.createElement(
          "label",
          { htmlFor: "weapon" },
          " Weapon: "
        ),
        React.createElement("input", { id: "domoName", type: "text", name: "weapon", placeholder: "Weapon" })
      ),
      React.createElement(
        "li",
        null,
        React.createElement(
          "label",
          { htmlFor: "assist" },
          " Assist: "
        ),
        React.createElement(
          "select",
          { id: "domoName", name: "assist", placeholder: "Assist" },
          React.createElement(
            "option",
            { value: "Drag Back" },
            "Drag Back"
          )
        )
      ),
      React.createElement(
        "label",
        { htmlFor: "special" },
        " Special: "
      ),
      React.createElement(
        "select",
        { id: "domoName", name: "special", placeholder: "Special" },
        React.createElement(
          "option",
          { value: "Moonbow" },
          "Moonbow"
        )
      ),
      React.createElement(
        "li",
        null,
        React.createElement(
          "label",
          { htmlFor: "skillA" },
          " A Skill: "
        ),
        React.createElement(
          "select",
          { id: "domoName", name: "skillA", placeholder: "A Skill" },
          React.createElement(
            "option",
            { value: "Death Blow 3" },
            "Death Blow 3"
          )
        )
      ),
      React.createElement(
        "li",
        null,
        React.createElement(
          "label",
          { htmlFor: "name" },
          " B Skill: "
        ),
        React.createElement(
          "select",
          { id: "domoName", name: "skillB", placeholder: "B Skill" },
          React.createElement(
            "option",
            { value: "Vantage 3" },
            "Vantage 3"
          )
        )
      ),
      React.createElement(
        "li",
        null,
        React.createElement(
          "label",
          { htmlFor: "name" },
          " C Skill: "
        ),
        React.createElement(
          "select",
          { id: "domoName", name: "skillC", placeholder: "C Skill" },
          React.createElement(
            "option",
            { value: "Hone Spd 3" },
            "Hone Spd 3"
          )
        )
      ),
      React.createElement(
        "li",
        null,
        React.createElement(
          "label",
          { htmlFor: "name" },
          " Seal: "
        ),
        React.createElement(
          "select",
          { id: "domoName", name: "seal", placeholder: "Seal" },
          React.createElement(
            "option",
            { value: "Quickened Pulse" },
            "Quickened Pulse"
          )
        )
      ),
      React.createElement(
        "li",
        null,
        React.createElement(
          "label",
          { htmlFor: "name" },
          " Note: "
        ),
        React.createElement("textarea", { rows: "5", col: "8", name: "note" })
      ),
      React.createElement("input", { type: "hidden", name: "_csrf", value: props.csrf }),
      React.createElement("input", { className: "makeDomoSubmit", type: "submit", value: "Create Unit" })
    )
  );
};

//displays list of units
var DomoList = function DomoList(props) {

  //if there is no units made
  if (props.domos.length === 0) {
    return React.createElement(
      "div",
      { className: "domoList" },
      React.createElement(
        "h3",
        { className: "emptyDomo" },
        "Nothing yet."
      )
    );
  }

  var domoText = '';
  var domoNodes = props.domos.map(function (domo) {

    domoText += "Name: " + domo.name + " Level: " + domo.level + " Weapon: " + domo.weapon + " Assist: " + domo.assist + " Special: " + domo.special + " A Skill: " + domo.skillA + " B Skill : " + domo.skillB + " C Skill: " + domo.skillC + "  Seal: " + domo.seal + "  \n";
    //const id = e.target.attribute("data-key");
    //const remove = db.collection.remove(id,true);
    return React.createElement(
      "div",
      { "data-key": domo._id, className: "domo" },
      React.createElement("img", { src: "/assets/img/stone_icon.png", alt: "domo face", className: "domoFace" }),
      React.createElement(
        "h3",
        { className: "domoName" },
        " Name: ",
        domo.name
      ),
      React.createElement(
        "h3",
        { className: "domoLevel" },
        " Level: ",
        domo.level
      ),
      React.createElement(
        "h3",
        { className: "unitP" },
        " Weapon: ",
        domo.weapon
      ),
      React.createElement(
        "h3",
        { className: "unitP" },
        "Assist: ",
        domo.assist
      ),
      React.createElement(
        "h3",
        { className: "unitP" },
        "Special: ",
        domo.special
      ),
      React.createElement(
        "h3",
        { className: "unitP" },
        "A Skill: ",
        domo.skillA
      ),
      React.createElement(
        "h3",
        { className: "unitP" },
        "B Skill: ",
        domo.skillB
      ),
      React.createElement(
        "h3",
        { className: "unitP" },
        "C Skill: ",
        domo.skillC
      ),
      React.createElement(
        "h3",
        { className: "unitP" },
        "Seal: ",
        domo.seal
      ),
      React.createElement(
        "h3",
        { className: "unitP" },
        "Notes: ",
        domo.note
      ),
      React.createElement(
        "div",
        { id: "note" },
        React.createElement("textarea", { rows: "5", cols: "20" })
      ),
      React.createElement("input", { "data-key": domo._id, className: "noteAdd", type: "button", value: "Add/Replace Note" }),
      React.createElement("input", { "data-key": domo._id, className: "domoDelete", type: "button", value: "Delete Unit" })
    );
  });

  return React.createElement(
    "div",
    { className: "domoList" },
    domoNodes,
    React.createElement(
      "textarea",
      { rows: "10", cols: "50", id: "export" },
      domoText
    )
  );
};

//loads units from server
var loadDomosFromServer = function loadDomosFromServer() {
  sendAjax('GET', '/getDomos', null, function (data) {
    ReactDOM.render(React.createElement(DomoList, { domos: data.domos }), document.querySelector("#list"));
  });
};

//form for creating teams
var TeamForm = function TeamForm(props) {

  var teamNodes = void 0;

  try {
    teamNodes = props.domos.map(function (domo) {
      return React.createElement(
        "option",
        { value: domo.name },
        domo.name
      );
    });
  } catch (err) {
    console.dir("No units made yet.");
    teamNodes = ["No Units"];
    console.dir("The error is " + err);
  }
  console.dir(teamNodes);
  return React.createElement(
    "form",
    { id: "teamForm",
      onSubmit: handleDomo,
      name: "teamForm",
      action: "/teamMaker",
      method: "POST",
      className: "teamForm"
    },
    React.createElement(
      "ul",
      null,
      React.createElement(
        "li",
        null,
        React.createElement(
          "label",
          { htmlFor: "name" },
          "Unit: "
        ),
        React.createElement(
          "select",
          { id: "unitName", name: "name1", placeholder: "Name" },
          teamNodes
        )
      ),
      React.createElement(
        "li",
        null,
        React.createElement(
          "label",
          { htmlFor: "name" },
          "Unit: "
        ),
        React.createElement(
          "select",
          { id: "unitName", name: "name2", placeholder: "Name" },
          teamNodes
        )
      ),
      React.createElement(
        "li",
        null,
        React.createElement(
          "label",
          { htmlFor: "name" },
          "Unit: "
        ),
        React.createElement(
          "select",
          { id: "unitName", name: "name3", placeholder: "Name" },
          teamNodes
        )
      ),
      React.createElement(
        "li",
        null,
        React.createElement(
          "label",
          { htmlFor: "name" },
          "Unit: "
        ),
        React.createElement(
          "select",
          { id: "unitName", name: "name4", placeholder: "Name" },
          teamNodes
        )
      ),
      React.createElement("input", { id: "teamAdd", type: "submit" })
    )
  );
};

//displays teams
var TeamList = function TeamList(props) {
  if (props.teams.length === 0) {
    return React.createElement(
      "div",
      { className: "teamList" },
      React.createElement(
        "h3",
        { className: "emptyTeam" },
        "No teams yet."
      )
    );
  }
  var teamNodes = props.teams.map(function (team) {
    var id = e.target.attribute("data-key");
    return React.createElement(
      "div",
      { "data-key": team._id, className: "team" },
      React.createElement(
        "h3",
        { className: "unit" },
        team.unit1
      ),
      React.createElement(
        "h3",
        { className: "unit" },
        team.unit2
      ),
      React.createElement(
        "h3",
        { className: "unit" },
        team.unit3
      ),
      React.createElement(
        "h3",
        { className: "unit" },
        team.unit4
      )
    );
  });
};

//self-explanatory
var loadTeamsFromServer = function loadTeamsFromServer() {
  sendAjax('GET', '/getTeams', null, function (data) {
    ReactDOM.render(React.createElement(DomoList, { domos: data.teams }), document.querySelector("#list"));
  });
};

//initial page setup
var setup = function setup(csrf) {

  var teamButton = document.querySelector("#teamButton");
  var unitButton = document.querySelector("#unitButton");

  ReactDOM.render(React.createElement(DomoForm, { csrf: csrf }), document.querySelector("#maker"));

  ReactDOM.render(React.createElement(DomoList, { domos: [] }), document.querySelector("#list"));
  loadDomosFromServer();

  teamButton.addEventListener("click", function (e) {
    e.preventDefault();
    createTeamBuilder(csrf);
    return false;
  });

  unitButton.addEventListener("click", function (e) {
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
var createUnitMaker = function createUnitMaker(csrf) {
  ReactDOM.render(React.createElement(DomoForm, { csrf: csrf }), document.querySelector("#maker"));

  ReactDOM.render(React.createElement(DomoList, { domos: [] }), document.querySelector("#list"));
  loadDomosFromServer();
};

//loads team view
var createTeamBuilder = function createTeamBuilder(csrf) {
  ReactDOM.render(React.createElement(TeamForm, { csrf: csrf }), document.querySelector("#maker"));
  ReactDOM.render(React.createElement(TeamList, { teams: [] }), document.querySelector("#list"));
  //loadTeamsFromServer();
};

//getting user token
var getToken = function getToken() {
  sendAjax('GET', '/getToken', null, function (result) {
    setup(result.csrfToken);
  });
};

$(document).ready(function () {
  getToken();
});
"use strict";

var handleError = function handleError(message) {
  $("#errorMessage").text(message);
  $("#domoMessage").animate({ width: 'toggle' }, 550);
};

var redirect = function redirect(response) {
  $("#domoMessage").animate({ width: 'hide' }, 550);
  window.location = response.redirect;
};

var sendAjax = function sendAjax(type, action, data, success) {
  $.ajax({
    cache: false,
    type: type,
    url: action,
    data: data,
    dataType: "json",
    success: success,
    error: function error(xhr, status, _error) {
      var messageObj = JSON.parse(xhr.responseText);
      handleError(messageObj.error);
    }
  });
};
