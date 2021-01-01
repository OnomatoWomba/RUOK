const addMove = document.querySelector("#add_move");
const moveList = document.querySelector("#move_holder");
const roundScaling = document.querySelector("#round");

function checkMoveList(){
  var damage = 0;
  var postMoveDamage = 0;
  var damageScaling = 1.0;
  var lastProration = 1.0;

  moveList.childNodes[moveList.children.length - 1].style.backgroundColor = "green";
  moveList.childNodes[0].style.backgroundColor = "green";

  for(i=0;i<moveList.children.length;i++){
      //Get the current move without the previous proration.
      if(i>1){
        lastProration = damageScaling / Number(moveList.childNodes[i-1].childNodes[3].value);  
      }
      postMoveDamage = Number(moveList.childNodes[i].childNodes[1].value) * lastProration;

      //Get the current damage with all moves.
      damage += Number(moveList.childNodes[i].childNodes[1].value) * damageScaling;
      if(roundScaling.checked == true){
        damage = Math.floor(damage);
      }
      
      //Set damage scaling with all moves.
      damageScaling *= Number(moveList.childNodes[i].childNodes[3].value);
      if(roundScaling.checked == true){
        damageScaling = Math.floor(damageScaling*100)/100
      }
    
      //Math it up and find the approximate move damage without the previous move. (Seems to be 99% accurate!)
      if(i>=2){
        console.log(damage, damageScaling, Number(moveList.childNodes[i].childNodes[1].value) * (damageScaling / Number(moveList.childNodes[i].childNodes[3].value)));
        if ((damage - Number(moveList.childNodes[i].childNodes[1].value) * (damageScaling / Number(moveList.childNodes[i].childNodes[3].value)) + postMoveDamage - (Number(moveList.childNodes[i-1].childNodes[1].value) * lastProration) > damage)){
          moveList.childNodes[i-1].style.backgroundColor = "red";
        }
        else{
          moveList.childNodes[i-1].style.backgroundColor = "green";
        }
      }
  }
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