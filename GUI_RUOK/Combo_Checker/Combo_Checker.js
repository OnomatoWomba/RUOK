const addMove = document.querySelector("#add_move");
const addMoveStart = document.querySelector("#add_move_start");
const moveList = document.querySelector("#move_holder");
const roundScaling = document.querySelector("#round");

function checkMoveList(){
  var damage = 0;
  var damageArray = [];
  var damageScaling = 1.0;
  var nuDamage = 0;

  if(moveList.children.length == 0){
    document.querySelector("p#move_est").textContent = damage;
    return;
  }

  for(i=0;i<moveList.children.length;i++){
    //Get the current damage with all moves.
    damage += Number(moveList.childNodes[i].childNodes[3].value) * damageScaling;
    damageArray.push(Number(moveList.childNodes[i].childNodes[3].value) * damageScaling);
    damageScaling *= moveList.childNodes[i].childNodes[5].value;
    if(roundScaling.checked == true){
     damage = Math.floor(damage);
     damageArray[i] = Math.floor(damageArray[i]);
     damageScaling = Math.floor(damageScaling*100)/100;
    }
  }
  
  damageScaling = Number(moveList.childNodes[0].childNodes[5].value);
  nuDamage = Number(moveList.childNodes[0].childNodes[3].value);
  var accum = damage;

  for(i=0;i<damageArray.length;i++){
    //Accumulator is the sum of all damage after this loop.
    accum -= damageArray[i];

    if(damage < (((accum/damageScaling) * (damageScaling / moveList.childNodes[i].childNodes[5].value)) + (nuDamage - damageArray[i]))){
      moveList.childNodes[i].style.backgroundColor = "red";
    }
    else{
      moveList.childNodes[i].style.backgroundColor = "green";
      if(moveList.childNodes[i-1]){
        if(moveList.childNodes[i-1].childNodes[5].value < moveList.childNodes[i].childNodes[5].value){
          moveList.childNodes[i].style.backgroundColor = "darkgoldenrod";
        }
      }
    }

    //nuDamage is the sum of all of the damage before this loop.
    nuDamage += damageArray[i+1];


    //damageScaling is used to invert the post-damage.
    if(moveList.childNodes[i+1]){
      damageScaling *= moveList.childNodes[i+1].childNodes[5].value;
    }
  }
  moveList.childNodes[moveList.children.length - 1].style.backgroundColor = "green";
  moveList.childNodes[0].style.backgroundColor = "green";
  document.querySelector("p#move_est").textContent = damage;
}

function appendMove(first = false){
  //Variable declaration.
  var move = document.createElement("div");
  var lockButton = document.createElement("input");
  var damageInput = document.createElement("input");
  var prorationInput = document.createElement("input");
  var removeButton = document.createElement("button");
  var moveButton = document.createElement("button");
  var moveButtonUp = document.createElement("button");

  //Add ability to lock moves from being removed.
  lockButton.setAttribute("type", "checkbox");
  lockButton.setAttribute("tabindex", -1);
  
  //Add ability to remove with a click of the ❌ button.
  removeButton.append(document.createTextNode("❌"));
  removeButton.setAttribute("onclick", "if(!parentNode.childNodes[1].checked){parentNode.parentNode.removeChild(parentNode);}checkMoveList();");
  removeButton.setAttribute("tabindex", -1);

  //Add ability to swap moves with a click of the ⬇️ button.
  moveButton.append(document.createTextNode("⬇️"));
  moveButton.setAttribute("onclick", "if(!parentNode.childNodes[1].checked){[parentNode.nextSibling.childNodes[3].value, parentNode.nextSibling.childNodes[5].value, parentNode.childNodes[3].value, parentNode.childNodes[5].value] = [parentNode.childNodes[3].value, parentNode.childNodes[5].value, parentNode.nextSibling.childNodes[3].value, parentNode.nextSibling.childNodes[5].value];} checkMoveList();");
  moveButton.setAttribute("tabindex", -1);

  //Add ability to swap moves above the current move with a click of the ⬆️ button.
  moveButtonUp.append(document.createTextNode("⬆️"));
  moveButtonUp.setAttribute("onclick","if(!parentNode.childNodes[1].checked){[parentNode.previousSibling.childNodes[3].value, parentNode.previousSibling.childNodes[5].value, parentNode.childNodes[3].value, parentNode.childNodes[5].value] = [parentNode.childNodes[3].value, parentNode.childNodes[5].value, parentNode.previousSibling.childNodes[3].value, parentNode.previousSibling.childNodes[5].value];} checkMoveList();")
  moveButtonUp.setAttribute("tabindex", -1);

  //Limit to numbers in input.
  damageInput.setAttribute("type","text");
  damageInput.setAttribute("pattern","[0-9.]+");
  prorationInput.setAttribute("type","text");
  prorationInput.setAttribute("pattern","[0-9.]+");

  //Formatting the form, starting with Damage.
  move.append(document.createTextNode("🔒"));               // 0
  move.append(lockButton);                                  // 1
  move.append(document.createTextNode("Move Damage:"));     // 2
  move.append(damageInput);                                 // 3
  move.append(document.createTextNode("Proration Rate:"));  // 4
  move.append(prorationInput);                              // 5
  move.append(removeButton);                                // 6
  move.append(moveButton);                                  // 7
  move.append(moveButtonUp);                                // 8
  if(first == false){
    moveList.appendChild(move);
  }
  else{
    moveList.insertBefore(move, moveList.childNodes[0]);
  }
}

roundScaling.checked = true;

addMove.addEventListener("click",() => {
  appendMove();
});

addMoveStart.addEventListener("click",() => {
  appendMove(true);
})

roundScaling.addEventListener("click", () => {
  checkMoveList();
});

document.querySelector("body").onkeyup = () => {
  checkMoveList();
}