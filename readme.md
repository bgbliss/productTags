
## Application created to update the tags for products in the shopify inventory 
    To Run application:
        add in .env file connected to account
        run command node update.js
        
## Use the config file to search to specific data

### Categorys
    thumbnail
    image
    name
    description
    yearpublished
    minplayers
    maxplayers
    playingtime
    minplaytime
    maxplaytime
    minage
    link

### Types for links
    boardgamecategory
    boardgamemechanic
    boardgamefamily
    boardgameexpansion
    boardgamedesigner
    boardgamepublisher

image, thumbnail, description, playingtime, minplaytime, maxplaytime, minage ,yearpublished, maxplayers & minplayers only gives one vlaue
    
    value of type would be none 
    example:
            "category": "maxplayers",
            "type": "none"
