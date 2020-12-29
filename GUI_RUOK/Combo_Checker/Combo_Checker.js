const addMove = document.querySelector("#add_move");
const moveList = document.querySelector("#move_holder");
const roundScaling = document.querySelector("#round");

function checkMoveList(){
  //Given a moveList, check all moves to ensure they are in a good order.
  var damageScaling = 1.0;
  var damagePre = 0;
  var damagePost = 0;

  for(i=0;i<moveList.children.length;i++){
    damageScaling = 1.0;
    damagePre = 0;
    damagePost = 0;

    moveList.childNodes[moveList.children.length - 1].style.backgroundColor = "green";
    moveList.childNodes[0].style.backgroundColor = "green";

    for(j=0;j<=i;j++){
      damagePre += Number(moveList.childNodes[j].childNodes[1].value) * damageScaling;
      damageScaling *= Number(moveList.childNodes[j].childNodes[3].value);
      if(roundScaling.checked == true){
        damagePre = Math.floor(damagePre);
        damageScaling *= 100;
        damageScaling = Math.floor(damageScaling);
        damageScaling /= 100;
      }
    }
    damageScaling = 1.0;
    for(j=0;j<=i;j++){
      if(j!=i-1){
        damagePost += Number(moveList.childNodes[j].childNodes[1].value) * damageScaling;
        damageScaling *= Number(moveList.childNodes[j].childNodes[3].value);
        if(roundScaling.checked == true){
          damagePost = Math.floor(damagePost);
          damageScaling *= 100;
          damageScaling = Math.floor(damageScaling);
          damageScaling /= 100;
        }
      }
    }
    if(damagePre >= damagePost && j-2 >= 1){
      moveList.childNodes[j-2].style.backgroundColor = "green";
    }
    else if(j-2 >= 1){
      moveList.childNodes[j-2].style.backgroundColor = "red";
    }
  }
  document.querySelector("p#move_est").textContent = damagePre;
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

document.querySelector("body").onkeyup = function(){
  checkMoveList();
}