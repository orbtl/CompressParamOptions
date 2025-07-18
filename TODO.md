This project is a work in progress.  Here are some things to be considered for the future:

- What if a separationCharacter is in the uncaught filter?

- What if a separationCharacter is in the optionsMap options?

- (done) Separation character should be an optional parameter users can set themselves if they want, with an error thrown if it collides with the character map

- What if illegal characters are in the uncaught filters?  do i need to base64 compress or something?

- (done) What if there are duplicates of a "selected" option?  compression vs decompression?

- (done) What if an options map starts small, but then gets larger over time?  Will this work with the offset code?  For example, with only one option, it being selected is '1', but with 6+ options, having the first option selected is 'W' which means we will have lost backwards-compatibility with old links when people add new options, which isn't good.
In decompression there already is padding handled via the "offset," but perhaps this can be fixed by simply adding padding during compression as well -- if we reach the end of the optionMap and are not at our full characterBitDepth, perhaps we padd end with 0s to get to the correct depth.  This would make a single option compression's binary representation `100000` instead of `1`, which would mean that it would not change when the number of options changes.  The extra edge case we need to account for with this, however, is ensuring in decompression we handle the case where the binary string is longer than the remaining options in the optionsMap.  UPDATE: it's actually more elegant to just remove the "offset" implementation which was clunky and complicated and pad 0s on both sides (compression and decompression) and then just ensure we aren't trying to access indices out of bounds

- (somewhat done) Is there a way we can reduce the size of long ones with tons of options where none are selected for a long stretch?
for example just the first option in 100 options is like W00000000000000.  Could we remove all the trailing 0s and interpret it as all 0s if it ends early?  Would this actually be valuable in real situations? Probably not? Seems like this already works in decompression so might be worth

- Does it make sense to be allowing users to uses just an array?  Would it be better to avoid down-the-road headache for them by forcing them to use key-value pairs?

- If we always use key-value pairs, would it make more sense for users to pass in keys in the selectedOptions collection instead of values, so that we could access them with better performance?  Or potentially do an operation on the values to create a reversed hashmap for quick lookup?