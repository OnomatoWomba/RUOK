This tool is in Pre-Alpha. There are still features I want to develop before this can be considered a "good tool". Please keep this in mind if you choose to use it.

This is a tool created to optimize combo damage in fighting games using damage values and proration values to calculate optimal move order.

I have plans for a replace feature which should be easy to implement given my current programming architecture and I also want to create a combo check feature which searches through the whole combo so you can find what moves are not in an optimized order so you can replace them with other moves if you so choose.

Problems with this tool are that they won't account for very niche mechanics such as Guts (Guilty Gear) or Repeating Move Proration (Under Night In-Birth). This means that they may be inaccurate if you do not take those mechanics into account.

There is also a problem with floating point number math that can result in some Damage Scaling Values being different as the combo continues. This means I have to account for those in the tool later on. This tool is basic and will only allow you to search move by move in a controlled vacuum. This may be fixed in the latest version of the tool, but further testing is required.

This tool's intended use is as follows:

1. Create a combo with your favorite character starting with a move you want to use for a specific situation.

2. Find the proration values of the moves you decide to use in the combo.

3. Input the data into the program.

4. Use the combo checker to remove moves that are taking damage from your future moves. If your game has consistent proration values for each move, use the status tool to see if you can flip the order of some of the moves you're doing to get more damage.

What is the purpose of the status tool vs. the combo checker?
  The purpose of the status tool is to find out what two moves you should use first in a sequence between two swappable moves to ensure you're doing them in the proper order. The way this works is by using a result that is the desired proration value of the second move and comparing it with the second move in a sequence. The combo checker, however, does not check sequences of moves. It looks for moves that will result in the combo doing less damage overall and asks if you want to remove them. Once comments are added for moves, you can add move names and things like [Do Not Remove] or anything similar to ensure your combos will continue working correctly.

How do I use the status tool?

  Type s then enter at the main menu, pick the latter move used in the combo sequence by inputting its move number, and it will give you the result that you should either swap the move order or keep it in the same place. It will also tell you in the rare event that either move can be used first. This tool is mostly for Under-Night, but if there are other games where this tool may be useful, have at it.

How do I use the combo checker?

  Simply type cc and press enter at the main menu. If your combo is not optimal, it will tell you and ask if you would like to remove moves that are taking damage away from your combo. This is one that should be used for most fighting games where the order of moves cannot be modified, but it's easy to remove moves that may be unnecessary.

Glossary:

--(Base) Damage Value: The amount of base damage a move will do without scaling.

--Damage Scaling Value: The value from which all moves are multiplied to get their effective damage value.

--Proration Value: The dividend between damage scaling values between moves.

For instance, in SFV, when the damage scaling value goes from 1.00 to 0.90, the proration value is 0.90. However, when the damage scaling value goes from 0.90 to 0.80, the proration value is 0.80/0.90, which is 0.88 repeating. You can either put multiple eights at the end of a period, or just use .88 in this case.

Some games have different proration values for each move (Under Night In-Birth), some games have consistent proration values for most moves (Them's Fightin' Herds), some have constant degradation in scaling 1.00 -> 0.90 -> 0.80 (SFV). As long as you have some way to find it, you can input them into this tool to find a good move order.
