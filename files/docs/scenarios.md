A description of scenarios.

* [followTest](#followTest)
* [crowdTest](#crowdTest)
* [giantMap](#giantMap)

# followTest

Makes a KatamoriBall and sets the camera to follow it immediately.

# crowdTest

Defines a tilemap of 32x19 tiles (the smallest bug-free possibility) with 500 residents, all ordered to move to random directions.

Used for testing resident and physics behaviour on crowded places.

# giantMap

Defines a tilemap of 1024x1024 tiles, shrunk by the automatic limit checking, and defines 2000 objects. (currently 1000 Katamoriballs and 1000 residents, latter ordered to simple move)

Used for performance limit testing, in terms of both map size and number of active objects.