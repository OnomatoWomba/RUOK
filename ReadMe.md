This tool is in Pre-Alpha. There are still features I want to develop before this can be considered a "good tool". Please keep this in mind if you choose to use it.

This is a tool created to optimize combo damage in fighting games using damage values and proration values to calculate optimal move order.

Problems with this tool are that they won't account for very niche mechanics such as Guts (Guilty Gear) or Repeating Move Proration (Under Night In-Birth). This means that they may be inaccurate if you do not take those mechanics into account.

There is also a problem with floating point number math that can result in some Damage Scaling Values being different as the combo continues. The rounding option may also appear buggy with lower proration values. If they seem sketchy, rounding may be playing a part in that.

This tool's intended use is as follows:

1. Create a combo with your favorite character starting with a move you want to use for a specific situation.

2. Find the proration values of the moves you decide to use in the combo.

3. Input the data into the program.

4. Use the combo checker to remove moves that are taking damage from your future moves.

# How do I use the combo checker?

  Input your move's base damage values and proration values into the move slots created by pressing "Add Move" at the bottom. If something shows up red without you typing in the full combo, continue inputting the combo first. The combo checker will automatically look at each move and proration value and see what moves are making you do less damage over time and will highlight them red. Getting rid of all of the red moves will result in an optimal combo.

# What are you planning on doing next?

  I am planning on adding move locking which will stop moves from being deleted and mark them as green since they can't be removed and adding a minimum damage scaling value option so moves can't be prorated by more than a certain amount.

Glossary:

--(Base) Damage Value: The amount of base damage a move will do without scaling.

--Damage Scaling Value: The value from which all moves are multiplied to get their effective damage value.

--Proration Value: The dividend between damage scaling values between moves.

For instance, in SFV, when the damage scaling value goes from 1.00 to 0.90, the proration value is 0.90. However, when the damage scaling value goes from 0.90 to 0.80, the proration value is 0.80/0.90, which is 0.88 repeating. You can either put multiple eights at the end of a period, or just use .88 in this case.

Some games have different proration values for each move (Under Night In-Birth), some games have consistent proration values for most moves (Them's Fightin' Herds), some have constant degradation in scaling 1.00 -> 0.90 -> 0.80 (SFV). As long as you have some way to find it, you can input them into this tool to find a good move order.
