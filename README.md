# Gambling for Good

We worked on using DAO Casino to create a platform for gaming that results in profits automatically being donated to charity. Details below on the work that was done:


## Game / Frontend:
We created a virtual reality slots game using PlayCanvas, an HTML/JS graphics engine that is served to the user. The platform is very accesible, and means the game can be run on phones, computers, and can even be used with VR headsets. 

We utilized the PlayCanvas editor, for easy editing of the scene and graphics/menus. We utilized an open source solution:

https://github.com/whydoidoit/babel-playcanvas-template

to allow the use of the npm package manager to use the Dao-Casino SDK for development. By combining both, we got the advantage of easy graphical development, and the power to use npm to manage packages and write maintainable code.

Below is a link to the Dao Casino API used in our code:

https://github.com/DaoCasino/dc-webapi



## Solidity / Backend:
For development purposes, and to match the DAO Casino platfrom, our backend was run on a Node Docker container.

The main change is a new solidity contract that enables payouts to the player, the bankroller (i.e. casino owner), and a charity.

Adding the third party of a charity into the mix is what would make automatic charitable giving through the Dao Casino platform possible. We hope Dao Casino considers the posibility of officialy adding such an option into their SDK in the future!


## Other Work
In addition to the project, we worked on identifying problem areas and making suggestions to the Dao Casino team for future development. 
