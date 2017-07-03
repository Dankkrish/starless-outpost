A description of scenarios.

Currently, all the maps contain a fixed 1 tile border, and an unevenly distributed random set of other tiles.

* [followTest](#followTest)
* [crowdTest](#crowdTest)
* [giantMap](#giantMap)
* [strandedPeople](#strandedPeople)

# followTest

Makes two KatamoriBalls and sets the camera to follow the first one immediately.

# crowdTest

Defines a tilemap of 32x19 tiles (the smallest bug-free possibility) with several residents, all ordered to move to random directions.

Used for testing resident behaviour on crowded places.

# giantMap

Defines a tilemap of the allowed maximum size, shrunk by the automatic limit checking, and defines as many objects as the allowed maximum size.

Used for performance limit testing, in terms of both map size and number of active objects.

# strandedPeople

Generates a field of road and seven random residents to the middle of an average-sized map.