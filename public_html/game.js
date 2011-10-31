Array.prototype.shuffle = function() {
    var i = this.length;
    while(i){
        var j = Math.floor(Math.random()*i);
        var t = this[--i];
        this[i] = this[j];
        this[j] = t;
    }
    return this;
}

enchant();
//test
var game;
window.onload = function() {
	function nodeXCenter(node) {
		return game.width / 2 - node.width / 2;
	}
	
	function nodeYCenter(node) {
		return game.height / 2 - node.height/ 2;
	}
	
	function walkCenteredBear() {
		var bear = new Sprite(32, 32);
		bear.x = nodeXCenter(bear);
		bear.y = nodeYCenter(bear);
		bear.image = game.assets['chara1.gif'];
		bear.addEventListener('enterframe', function () {
				bear.frame = Math.floor(game.frame / 2) % 3;
		});
		return bear;
	}
	
    function showResult(ans_flag) {
        var scene = new Scene();         var ans = new Sprite(200, 200);
        
        ans.x = nodeXCenter(ans);
        ans.y = nodeYCenter(ans);
		ans.image = game.assets['ans.png'];
        if (ans_flag) {             ans.frame = 0;
        } else {
            ans.frame = 1;
        }
        
        ans.addEventListener('touchstart', function (e) {
            game.popScene();             if (ans_flag) {
                game.popScene();
            }
        });
        
        scene.addChild(ans);
        
        game.pushScene(scene);
    }

    function wrapInButton(choice) {
        var button = new Group();
        var w = choice.text.length * 16 + 8 + 8;
        var h = choice.height + 8 + 8;
        button.width = w;
        button.height = h;
        
        var pushed_color = 'lightgreen';
        var released_color = 'green';
        var bg = new Sprite(w, h);
        bg.backgroundColor = released_color;
        button.addChild(bg);
        
        button.addEventListener('touchstart', function (e) {             console.log('button touchstart');
            bg.backgroundColor = pushed_color;
        });
        
        button.addEventListener('touchend', function (e) {
            console.log('button touchend');
            bg.backgroundColor = released_color;
        });
        
        choice.x = 8;
        choice.y = 8;
        button.addChild(choice);
        
        return button;
    }
    
    function text(s) {
        var t = new MutableText(0, 0, 0, 0);
        t.text = s;
        return t;
    }
    
	function oneChoice(answer) {
		var choice = wrapInButton(text(answer));
		choice.x = nodeXCenter(choice);
		choice.y = nodeYCenter(choice);
		choice.y = choice.y + 50;
		choice.addEventListener('touchstart', function () {             showResult(true);
		});
		return choice;
	}

	function twoChoices(answer, wrong) {
		var answer_choice = wrapInButton(text(answer));
		var wrong_choice = wrapInButton(text(wrong));
		var both_width = answer_choice.width + wrong_choice.width + 20;
		
        if (Math.random() > 0.5) {
            answer_choice.x = 0;
            wrong_choice.x = answer_choice.width + 20;
        } else {
            wrong_choice.x = 0;
            answer_choice.x = wrong_choice.width + 20;
        }
		
		answer_choice.y = 0;
		wrong_choice.y = 0;
		
		answer_choice.addEventListener('touchstart', function () {
            showResult(true);
		});
		wrong_choice.addEventListener('touchstart', function () {
            showResult(false);
		});
		
		var choice = new Group();
		choice.width = both_width;
		choice.height = answer_choice.height;
		
		choice.x = (game.width - both_width) / 2;
		choice.y = nodeYCenter(choice) + 50;
		
		choice.addChild(answer_choice);
		choice.addChild(wrong_choice);
		
		return choice;
	}

    function fourChoices(answer, wrong1, wrong2, wrong3) {
		var answer_choice = wrapInButton(text(answer));
		var wrong_choice1 = wrapInButton(text(wrong1));
		var wrong_choice2 = wrapInButton(text(wrong2));
		var wrong_choice3 = wrapInButton(text(wrong2));
        
		answer_choice.addEventListener('touchstart', function () {
            showResult(true);
		});
		wrong_choice1.addEventListener('touchstart', function () {
            showResult(false);
		});
		wrong_choice2.addEventListener('touchstart', function () {
            showResult(false);
		});
		wrong_choice3.addEventListener('touchstart', function () {
            showResult(false);
		});
		
        var choices = [answer_choice, wrong_choice1, wrong_choice2, wrong_choice3];
        choices.shuffle();
        
        choices[0].x = 0;
		choices[1].x = 0;
		choices[2].x = 0;
		choices[3].x = 0;
		
		choices[0].y = 0;
		choices[1].y = 32;
		choices[2].y = 64;
		choices[3].y = 96;
		
		var ret = new Group();
        ret.x = 8;
		ret.y = 192;
        choices.forEach(function (x) {             ret.addChild(x);
        });
		return ret;
    }
    
	function question(q) {
		var label = new Label(q);
		label.x = 10;
		label.y = 10;
		label.width = 300;
		return label;
	}
	
	game = new Game(320, 320);
    game.fps = 24;
    game.preload('font.png', 'chara1.gif', 'ans.png');
    game.onload = function() {
    	function lesson1() {
    		var scene = new Scene();
    		
    		var bg = new Sprite(320, 320);
    		bg.backgroundColor = '#fff';
    		scene.addChild(bg);
    		
    		var bear = walkCenteredBear();
    		scene.addChild(bear);
    		
    		var q = question("次のうち足して3になるのはどれ?");
    		scene.addChild(q);
    		
    		var choice = oneChoice("(+ 1 2)");
    		scene.addChild(choice);
    		
    		return scene;
    	}
    	
    	function lesson2() {
    		var scene = new Scene();
    		
    		var bg = new Sprite(320, 320);
    		bg.backgroundColor = '#fff';
    		scene.addChild(bg);
    		
    		var bear = walkCenteredBear();
    		scene.addChild(bear);

    		var q = question("次のうち足して3になるのはどれ?");
    		scene.addChild(q);
    		
    		var choice = twoChoices("(+ 1 2)", "(+ 2 2)");
    		scene.addChild(choice);
    		return scene;
    	}
    	
        function lesson3() {
            var scene = new Scene();
            
            var bg = new Sprite(320, 320);
            scene.addChild(bg);
            
            var bear = walkCenteredBear();
            scene.addChild(bear);
            
            var q = question("次のうち3にならないのはどれ?");
            scene.addChild(q);
            
            var choice = fourChoices("(+ 0 -3)", "(* 1 3)", "(+ 2 1)", "(/ 9 3)");
            scene.addChild(choice);
            
            return scene;
        }
        
    	function init() {
            game.pushScene(lesson3());
    		game.pushScene(lesson2());
    		game.pushScene(lesson1());
    	}
    	
    	init();
    };
    game.start();
};
