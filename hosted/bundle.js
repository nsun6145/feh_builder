"use strict";

var handleDomo = function handleDomo(e) {
  e.preventDefault();

  $("#domoMessage").animate({ width: 'hide' }, 450);

  if ($("#domoName").val() == '' || $("#domoLevel").val() == '') {
    handleError("Name and Level are required");
    return false;
  }

  sendAjax('POST', $("#domoForm").attr("action"), $("#domoForm").serialize(), function () {
    loadDomosFromServer();
  });

  return false;
};

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
    ),
    React.createElement(
      "label",
      { htmlFor: "level" },
      " Level: "
    ),
    React.createElement("input", { id: "domoLevel", type: "number", name: "level", placeholder: "Level" }),
    React.createElement(
      "label",
      { htmlFor: "weapon" },
      " Weapon: "
    ),
    React.createElement("input", { id: "domoWeapon", type: "text", name: "weapon", placeholder: "Weapon" }),
    React.createElement(
      "label",
      { htmlFor: "assist" },
      " Assist: "
    ),
    React.createElement("select", { id: "unitAssist", name: "assist", placeholder: "Assist" }),
    React.createElement(
      "label",
      { htmlFor: "special" },
      " Special: "
    ),
    React.createElement("select", { id: "unitSpecial", name: "special", placeholder: "Special" }),
    React.createElement(
      "label",
      { htmlFor: "skillA" },
      " A Skill: "
    ),
    React.createElement("select", { id: "unitSkillA", name: "skillA", placeholder: "A Skill" }),
    React.createElement(
      "label",
      { htmlFor: "skillB" },
      " B Skill: "
    ),
    React.createElement("select", { id: "unitSkillB", name: "skillB", placeholder: "B Skill" }),
    React.createElement(
      "label",
      { htmlFor: "skillC" },
      " C Skill: "
    ),
    React.createElement("select", { id: "unitSkillC", name: "skillC", placeholder: "C Skill" }),
    React.createElement(
      "label",
      { htmlFor: "seal" },
      " Seal: "
    ),
    React.createElement("select", { id: "unitSeal", name: "seal", placeholder: "Seal" }),
    React.createElement("input", { type: "hidden", name: "_csrf", value: props.csrf }),
    React.createElement("input", { className: "makeDomoSubmit", type: "submit", value: "Create Unit" })
  );
};

var DomoList = function DomoList(props) {
  if (props.domos.length === 0) {
    return React.createElement(
      "div",
      { className: "domoList" },
      React.createElement(
        "h3",
        { className: "emptyDomo" },
        "No units yet"
      )
    );
  }

  var domoText = '';
  var domoNodes = props.domos.map(function (domo) {

    domoText += "Name: " + domo.name + " Level: " + domo.level + " Weapon: " + domo.weapon + " \n";

    return React.createElement(
      "div",
      { key: domo._id, className: "domo" },
      React.createElement("img", { src: "/assets/img/domoface.jpeg", alt: "domo face", className: "domoFace" }),
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
        { className: "domoWeapon" },
        " Weapon: ",
        domo.weapon
      ),
      React.createElement(
        "h3",
        { className: "unitAssist" },
        "Assist: ",
        domo.assist
      ),
      React.createElement(
        "h3",
        { className: "unitSpecial" },
        "Special: ",
        domo.special
      ),
      React.createElement(
        "h3",
        { className: "unitSkillA" },
        "A Skill: ",
        domo.skillA
      ),
      React.createElement(
        "h3",
        { className: "unitSkillB" },
        "B Skill: ",
        domo.skillB
      ),
      React.createElement(
        "h3",
        { className: "unitSkillC" },
        "C Skill: ",
        domo.skillC
      ),
      React.createElement(
        "h3",
        { className: "unitSeal" },
        "Seal: ",
        domo.seal
      ),
      React.createElement("input", { className: "domoDelete", type: "submit", value: "Delete" })
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

var loadDomosFromServer = function loadDomosFromServer() {
  sendAjax('GET', '/getDomos', null, function (data) {
    ReactDOM.render(React.createElement(DomoList, { domos: data.domos }), document.querySelector("#domos"));
  });
};

var setup = function setup(csrf) {
  ReactDOM.render(React.createElement(DomoForm, { csrf: csrf }), document.querySelector("#makeDomo"));

  ReactDOM.render(React.createElement(DomoList, { domos: [] }), document.querySelector("#domos"));
  loadDomosFromServer();
};

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
