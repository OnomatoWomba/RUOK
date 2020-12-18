import sys, os, platform

Moves = []
def lin_clear(): os.system("clear")
def win_clear(): os.system("cls")

#Clear screen depending on operating system.

def ClearScreen():
    if(platform.system() == "Linux"):
        lin_clear()
    if(platform.system() == "Windows"):
        win_clear()
    else:
        pass

def PrintCheckMoves(Move1Damage, Move2Damage, Move1Proration, Move2Proration):
    print((1/(Move1Damage/Move2Damage)) * ((Move1Proration)-(1-(Move1Damage/Move2Damage))))

#Equation to find if move is optimal.

def CheckMoves(Move1Damage, Move2Damage, Move1Proration, Move2Proration):
    M2PDesired = (1/(Move1Damage/Move2Damage)) * ((Move1Proration)-(1-(Move1Damage/Move2Damage)))


    if M2PDesired > Move2Proration:
        #Move is in the right order!
        return 0
    if M2PDesired == Move2Proration:
        #Move could be replaced with the one before it.
        return 1
    if M2PDesired < Move2Proration:
        #Move is in the wrong order or is unoptimal.
        return 2

#Checks values to ensure the user input is an integer or a float.

def is_integer(check):
    try:
        int(check)
        return True
    except ValueError:
        return False

def is_float(check):
    try:
        float(check)
        return True
    except ValueError:
        return False

#Adds Damage and Proration values to the list.

def DamageAdd(first_pos):

    if(len(Moves) > 0):
        print("-------------------------------------")
        for i in range(0, len(Moves)):
            print("Move " + str(i+1))
            print("Damage: " + str(Moves[i][0]) + " Proration Value: " + str(Moves[i][1]))
            print("")
        print("-------------------------------------")
        print("What position do you want the move to be in? (1 for first move, 2 for second move, etc. Use only positive whole numbers.) Type E to exit.")
        print("")
        position = input()
        if(position.lower() == "e"):
            Main_Menu()
        if(is_integer(position)):
            position = int(position) - 1
            if(position < 0):
                ClearScreen()
                DamageAdd(0)
            print("")
        else:
            ClearScreen()
            DamageAdd(0)
    else:
        position = first_pos

    print("Please input your move's base damage value as an integer/whole number without characters. Type E to exit.")
    print("")

    Damage_Value = input()

    if(Damage_Value.lower() == "e"):
        ClearScreen()
        Main_Menu()
    if(is_integer(Damage_Value)):
        ProrationAdd(Damage_Value,position)
    else:
        ClearScreen()
        print("Please put use whole numbers when inputting a damage value.")
        DamageAdd(0)


def ProrationAdd(Damage_Value,position):
    print("")
    print("What's the proration rate of the move? Type E to exit.")
    print("")

    Proration_Value = input()

    if(Proration_Value.lower() == "e"):
        ClearScreen()
        Main_Menu()
    if(is_float(Proration_Value)):
        if(float(Proration_Value) > 1.0 or float(Proration_Value) <= 0.0):
            print("")
            print("Please add a number lower than or equal to 1 and higher than 0.")
            ProrationAdd(Damage_Value,position)
    else:
        print("")
        print("Please add a number lower than 1 and higher than 0.")
        ProrationAdd(Damage_Value,position)

    Moves.insert(position,[int(Damage_Value), float(Proration_Value)])
    Main_Menu()

#Checks Moves in sequence to see if they are in optimal order.

def StartToCheck():
    print("-------------------------------------")
    for i in range(0, len(Moves)):
        print("Move " + str(i+1))
        print("Damage: " + str(Moves[i][0]) + " Proration Value: " + str(Moves[i][1]))
        print("")
    print("-------------------------------------")

    print("")
    print("This tool checks to see if the move is in the proper position in the combo using the move before it. Type E to exit.")

    MoveToCheck = input()
    if(MoveToCheck.lower() == "e"):
        Main_Menu()
    if(is_integer(MoveToCheck)):
        MoveToCheck = int(MoveToCheck) - 1
        if(MoveToCheck <= 1):
            ClearScreen()
            print("No need to check moves that center around the first one, since the first move will be player- and situation-dependent.")
            print("")
            StartToCheck()
    else:
        ClearScreen()
        StartToCheck()

    try:
        MoveReturn = CheckMoves(Moves[MoveToCheck-1][0],Moves[MoveToCheck][0],Moves[MoveToCheck-1][1],Moves[MoveToCheck][1])
    except IndexError:
        ClearScreen()
        print("Not an existant move to check.")
        StartToCheck()

    if(MoveReturn == 0):
        ClearScreen()
        print("This move is an optimal move for continuing a combo.")
        StartToCheck()
    if(MoveReturn == 1):
        ClearScreen()
        print("You could switch the move with the previous move and it would do the same amount of damage and lead to the same damage scaling value.")
        StartToCheck()
    if(MoveReturn == 2):
        ClearScreen()
        print("It would be better if you used this move before the previous one if possible.")
        print("")
        StartToCheck()

#Scans the whole combo's moves to check if they are in the right order or should be removed.

def ComboCheck():
    DamageScaling = 100
    TotalDamagePre = 0
    TotalDamagePost = 0
    if(len(Moves) > 2):
        for i in range(1, len(Moves)):
            for x in range(0, i+1):
                TotalDamagePre += (Moves[x][0] * DamageScaling)//100
                DamageScaling = DamageScaling * Moves[x][1]
                DamageScaling = DamageScaling // 1
                if(DamageScaling < 1):
                    DamageScaling = 1
            DamageScaling = 100
            for x in range(0, i+1):
                if x != i-1:
                    TotalDamagePost += (Moves[x][0] * DamageScaling)//100
                    DamageScaling = DamageScaling * Moves[x][1]
                    DamageScaling = DamageScaling // 1
                    if(DamageScaling < 1):
                        DamageScaling = 1
            if TotalDamagePre < TotalDamagePost:
                print("Move " + str(i) + " is lowering the damage of your combo, would you like to remove it? This is recommended, unless the move is necessary to continue the other moves. (y/n)")
                print("Damage: " + str(Moves[i-1][0]) + " Proration Value: " + str(Moves[i-1][1]))
                print("")
                Response = input()
                if Response == "y":
                    del Moves[i-1]
                    print("")
                    ComboCheck()
                else:
                    i += 1
            else:
                DamageScaling = 100
                TotalDamagePre = 0
                TotalDamagePost = 0
    Main_Menu("Combo check complete.")

#Changes a move's position in the Moves array.

def ChangeMovePos():
    print("-------------------------------------")
    for i in range(0, len(Moves)):
        print("Move " + str(i+1))
        print("Damage: " + str(Moves[i][0]) + " Proration Value: " + str(Moves[i][1]))
        print("")
    print("-------------------------------------")
    print("")
    print("Which move would you like to move in the combo? Type E to return to the main menu.")
    print("")
    toMove = input()
    if(toMove.lower() == "e"):
        Main_Menu()
    if(is_integer(toMove)):
        try:
            print("")
            print("Which move do you want your selected move to be?")
            print("")
            moveTo = input()
            if(is_integer(moveTo)):
                if(moveTo < toMove):
                    Moves.insert(int(moveTo)-1, Moves[int(toMove)-1])
                    del Moves[int(toMove)]
                else:
                    Moves.insert(int(moveTo), Moves[int(toMove)-1])
                    del Moves[int(toMove)-1]
            Main_Menu()
        except IndexError:
            ClearScreen()
            print("Invalid index, please enter a whole number with no characters.")
            ChangeMovePos()
    else:
        ClearScreen()
        print("Please enter a whole number with no characters.")
        ChangeMovePos()


#Removes moves from the Moves list.

def RemoveMove():
    print("-------------------------------------")
    for i in range(0, len(Moves)):
        print("Move " + str(i+1))
        print("Damage: " + str(Moves[i][0]) + " Proration Value: " + str(Moves[i][1]))
        print("")
    print("-------------------------------------")
    print("Which move would you like to remove from the combo? Type E to return to the main menu.")
    print("")
    toRemove = input()
    if(toRemove.lower() == "e"):
        Main_Menu()
    if(is_integer(toRemove)):
        try:
            del Moves[int(toRemove)-1]
        except IndexError:
            ClearScreen()
            print("That move isn't available to remove, please try again.")
            RemoveMove()
    else:
        ClearScreen()
        print("Please enter a whole number with no characters.")
        RemoveMove()

#Main Menu GUI

def Main_Menu(message = None):
    ClearScreen()
    if(message != None):
            print(message)
    print("-------------------------------------")
    for i in range(0, len(Moves)):
        print("Move " + str(i+1))
        print("Damage: " + str(Moves[i][0]) + " Proration Value: " + str(Moves[i][1]))
        print("")
    print("-------------------------------------")
    print("")
    print("Welcome to the Main Menu!")
    print("To add a new move, type A")
    print("To check a move's status in the combo, type S")
    print("To check over your combo, type CC")
    print("To change your move's position, type M")
    print("To remove a move from the combo, type R")
    print("To exit the program, type E")
    user_input = input()
    if user_input.lower() == "a":
        ClearScreen()
        DamageAdd(0)
    if user_input.lower() == "s":
        ClearScreen()
        StartToCheck()
    if user_input.lower() == "cc":
        ClearScreen()
        ComboCheck()
    if user_input.lower() == "m":
        ClearScreen()
        ChangeMovePos()
    if user_input.lower() == "r":
        ClearScreen()
        RemoveMove()
    if user_input.lower() == "e":
        ClearScreen()
        print("Thanks for using RUOK!")
        sys.exit()
    else:
        Main_Menu()

#Begin Program

ClearScreen()
DamageAdd(0)
