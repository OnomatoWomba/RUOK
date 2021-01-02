const addMove = document.querySelector("#add_move");
const moveList = document.querySelector("#move_holder");
const roundScaling = document.querySelector("#round");

function isOptimal(m1d, m2d, m1p, m2p){
  return (1/(m1d/m2d)*(m1p-(1-(m1d/m2d)))) < m2p;
}

function checkMoveList(){
  var damage = 0;
  var unscaledDamage = 0;
  var damageScaling = 1.0;
  var effectiveScaling = 0.0;

  for(i=0;i<moveList.children.length;i++){
    //Get the current damage with all moves.
    damage += Number(moveList.childNodes[i].childNodes[1].value) * damageScaling;
    unscaledDamage += Number(moveList.childNodes[i].childNodes[1].value);
    damageScaling *= moveList.childNodes[i].childNodes[3].value;
    if(roundScaling.checked == true){
     damage = Math.floor(damage);
    }
  }
  damageScaling = 1.0;
  effectiveScaling = damage/unscaledDamage;
  for(i=1;i<moveList.children.length;i++){
    damageScaling *= moveList.childNodes[i-1].childNodes[3].value;
    if(isOptimal(moveList.childNodes[i-1].childNodes[1].value, moveList.childNodes[i].childNodes[1].value, moveList.childNodes[i-1].childNodes[3].value, moveList.childNodes[i].childNodes[3].value)){
      moveList.childNodes[i].style.backgroundColor = "green";
    }
    else{
      console.log("Effective Scaling:",effectiveScaling);
      console.log("Damage Scaling:",damageScaling);
      if(damage < ((effectiveScaling * (1/damageScaling) / effectiveScaling)*effectiveScaling) * (unscaledDamage - Number(moveList.childNodes[i].childNodes[1].value))){
        moveList.childNodes[i].style.backgroundColor = "red";
      }
      else{
        moveList.childNodes[i].style.backgroundColor = "green";
      }
    }
  }  
    

  moveList.childNodes[moveList.children.length - 1].style.backgroundColor = "green";
  moveList.childNodes[0].style.backgroundColor = "green";
  document.querySelector("p#move_est").textContent = damage;
}

function appendMove(){
  //Variable declaration.
  var move = document.createElement("div");
  var damageInput = document.createElement("input");
  var prorationInput = document.createElement("input");
  var removeButton = document.createElement("button");
  var moveButton = document.createElement("button");

  //Add ability to remove with a click of the X button.
  removeButton.append(document.createTextNode("X"));
  removeButton.setAttribute("onclick", "parentNode.parentNode.removeChild(parentNode);checkMoveList();");
  removeButton.setAttribute("tabindex", -1);

  //Add ability to swap moves with a click of the v button.
  moveButton.append(document.createTextNode("v"));
  moveButton.setAttribute("onclick", "[parentNode.nextSibling.childNodes[1].value, parentNode.nextSibling.childNodes[3].value, parentNode.childNodes[1].value, parentNode.childNodes[3].value] = [parentNode.childNodes[1].value, parentNode.childNodes[3].value, parentNode.nextSibling.childNodes[1].value, parentNode.nextSibling.childNodes[3].value]; checkMoveList();");
  moveButton.setAttribute("tabindex", -1);

  //Limit to numbers in input.
  damageInput.setAttribute("type","text");
  damageInput.setAttribute("pattern","[0-9.]+");
  prorationInput.setAttribute("type","text");
  prorationInput.setAttribute("pattern","[0-9.]+");

  //Formatting the form, starting with Damage.
  move.append(document.createTextNode("Move Damage:"));
  move.append(damageInput);
  move.append(document.createTextNode("Proration Rate:"));
  move.append(prorationInput);
  move.append(removeButton);
  move.append(moveButton);
  moveList.appendChild(move);
}

roundScaling.checked = true;

addMove.addEventListener("click",() => {
  appendMove();
});

roundScaling.addEventListener("click", () => {
  checkMoveList();
});

document.querySelector("body").onkeyup = () => {
  checkMoveList();
}