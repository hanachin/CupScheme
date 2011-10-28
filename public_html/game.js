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
    
	function oneChoice(answer) {
		var choice = new MutableText(0, 0, 113, 16);
		choice.text = answer;
		choice.x = nodeXCenter(choice);
		choice.y = nodeYCenter(choice);
		choice.y = choice.y + 50;
		choice.addEventListener('touchstart', function () {             showResult(true);
		});
		return choice;
	}
	
	function twoChoice(answer, wrong) {
		var answer_choice = new MutableText(0, 0, 113, 16);
		var wrong_choice = new MutableText(0, 0, 113, 16);
		
		answer_choice.text = answer;
		wrong_choice.text = wrong;
		
		var both_width = answer_choice.width + wrong_choice.width + 20;	// 20px space
		
		answer_choice.x = 0;
		wrong_choice.x = answer_choice.width + 20;
		
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
	
    function fourChoice(answer, wrong1, wrong2, wrong3) {
		var answer_choice = new MutableText(0, 0, answer.length * 16 + 5, 16);
		var wrong_choice1 = new MutableText(0, 0, wrong1.length * 16 + 5, 16);
		var wrong_choice2 = new MutableText(0, 0, wrong2.length * 16 + 5, 16);
		var wrong_choice3 = new MutableText(0, 0, wrong3.length * 16 + 5, 16);
		
		answer_choice.text = answer;
		wrong_choice1.text = wrong1;
		wrong_choice2.text = wrong2;
		wrong_choice3.text = wrong3;
		
		var both_width1 = answer_choice.width + wrong_choice1.width + 20;	// 20px space
		var both_width2 = wrong_choice2.width + wrong_choice3.width + 20;	// 20px space
		var both_width = Math.max(both_width1, both_width2);
        
		answer_choice.x = 0;
		wrong_choice1.x = answer_choice.width + 20;
		wrong_choice2.x = 0;
		wrong_choice3.x = wrong_choice1.width + 20;
		
		answer_choice.y = 0;
		wrong_choice1.y = 0;
		wrong_choice2.y = 16;
		wrong_choice3.y = 16;
		
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
		
		var choice = new Group();
		choice.width = both_width;
		choice.height = answer_choice.height;
		
		choice.x = (game.width - both_width) / 2;
		choice.y = nodeYCenter(choice) + 50;
		
		choice.addChild(answer_choice);
		choice.addChild(wrong_choice1);
		choice.addChild(wrong_choice2);
		choice.addChild(wrong_choice3);
		
		return choice;
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
    		
    		var choice = twoChoice("(+ 1 2)", "(+ 2 2)");
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
            
            var choice = fourChoice("(+ 0 -3)", "(* 1 3)", "(+ 2 1)", "(/ 9 3)");
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
