
        logo = _pixi.logo = new PIXI.Sprite(resources['logo'].texture)

        // Size logo
        let iw = resources['logo'].data.naturalWidth,
            ih = resources['logo'].data.naturalHeight,
            sfac = (2*WIDTH/3)/iw, // Scale to 2/3 pixi width
            x = WIDTH/6,
            y = HEIGHT/2-((ih/iw)*(WIDTH/3))
        logo.scale.set(sfac,sfac)
        logo.position.set(x,y)
        stage.addChild(logo)


        let spritesheet = loader.resources.spritesheet.textures;
        jar = _pixi.jar = new PIXI.Sprite(spritesheet['jar.png'])
        sfac = 10/(spritesheet['jar.png'].baseTexture.data.naturalWidth/SCALE) // Scale to pixel size = ~10m wide in b2World
        jar.scale.set(sfac,sfac)
        jar.position.set(56,80) //TODO avoid hardcoding?
        jar.visible = false
        stage.addChildAt(jar,0)

        coinTexture = spritesheet['coin.png'] ? spritesheet['coin.png'] : null
        if(coinTexture)
            _pixi.coinScaleFac = spritesheet['coin.png'].baseTexture.data.naturalWidth/SCALE

        interactive = _pixi.interactive = new PIXI.Sprite(spritesheet['interactive.png'])
        sfac = (WIDTH/8)/spritesheet['interactive.png'].baseTexture.data.naturalWidth // Scale to 8th width
        interactive.scale.set(sfac,sfac)
        interactive.position.set(WIDTH/8,HEIGHT-interactive.height*2)
        interactive.rotation = 30*Math.PI/180
        interactive.alpha = 0
        //interactive.visible = false
        stage.addChild(interactive)

        /////////////////////////////////////////////////

        

    

    ///////////
