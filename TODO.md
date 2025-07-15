This project is a work in progress.  Here are some things to be considered for the future:

- What if a separationCharacter is in the uncaught filter?
- What if a separpationCharacter is in the optionsMap options?
- What if illegal characters are in the uncaught filters?  do i need to base64 compress or something?
- What if there are duplicates of a "selected" option?  compression vs decompression?
- What if an options map starts small, but then gets larger over time?  Will this work with the offset code?  For example, with only one option, it being selected is '1', but with 6+ options, having the first option selected is 'W' which means we will have lost backwards-compatibility with old links when people add new options, which isn't good.

- Is there a way we can reduce the size of long ones with tons of options where none are selected for a long stretch?
for example just the first option in 100 options is like W00000000000000.  Could we remove all the trailing 0s and interpret it as all 0s if it ends early?  Would this actually be valuable in real situations? Probably not? Seems like this already works in decompression so might be worth