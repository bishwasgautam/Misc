var deck = new Deck();
deck.shuffle();

var dealerHand = new Array();
var playerHand = new Array();

var overGame = false;

function Card(number, shape){
	this.number = number;
	this.shape = shape;
	this.fileName = fileName;
}

function fileName(){
	var tempText =this.number;
	
		switch (this.number){
			case 1:
				tempText = "a";
				break;
			case 11:
				tempText = "j";
				break;
			case 12:
				tempText = "q";
				break;
			case 13:
				tempText = "k";
				break;
		}
		return  tempText+ this.shape;
	} else{ 
		return this.number + this.shape;
	}
}

function Deck() {
   this.cards = new Array(52);
   this.next_card = 0;
   this.cards[0] = new Card(1, "c");
   this.cards[12] = new Card(1, "h");
   this.cards[25] = new Card(1, "s");
   this.cards[38] = new Card(1, "d");
   
   for (i=2; i<14; i++) {
	   if(i<11){   
		 this.cards[i-1] = new Card(i,"c");
		 this.cards[i+12] = new Card(i,"h");
		 this.cards[i+25] = new Card(i,"s");
		 this.cards[i+38] = new Card(i,"d");
	   }else if (i == 11){
         	this.cards[i-1] = new Card(i,"c");
		 this.cards[i+12] = new Card(i,"h");
		 this.cards[i+25] = new Card(i,"s");
		 this.cards[i+38] = new Card(i,"d"); 
	   } else if (i == 12){
         	this.cards[i-1] = new Card(i,"c");
		 this.cards[i+12] = new Card(i,"h");
		 this.cards[i+25] = new Card(i,"s");
		 this.cards[i+38] = new Card(i,"d"); 
	   } else if (i == 13){
         this.cards[i-1] = new Card(i,"c");
		 this.cards[i+12] = new Card(i,"h");
		 this.cards[i+25] = new Card(i,"s");
		 this.cards[i+38] = new Card(i,"d"); 
	   }
	 
   }
   this.shuffle = shuffle;
   this.dealCard = dealCard;
}

function shuffle() {
   for (i=1; i<1000; i++) {
      card1 = Math.floor( 52*Math.random() );
      card2 = Math.floor( 52*Math.random() );
      temp = this.cards[card2];
      this.cards[card2] = this.cards[card1];
      this.cards[card1] = temp;
   }
   this.next_card = 0;
}

function dealCard() {
   return this.cards[this.next_card++];
}

function dealButtonListener(){
	var _holder = document.getElementById("player_imagePlaceholder");
	if(_holder.hasChildNodes()){
		while(_holder.childNodes.length >=1){
			_holder.removeChild(_holder.firstChild);
		}
	}
	var _holder2 = document.getElementById("dealer_imagePlaceholder");
	
	if(_holder2.hasChildNodes()){
		while(_holder2.childNodes.length >=1){
			_holder2.removeChild(_holder2.firstChild);
		}
	}
	
	document.getElementById("player_score").innerHTML = "";
	document.getElementById("dealer_score").innerHTML = "";
	document.getElementById("result").innerHTML = "";
	dealerHand = new Array();
	playerHand = new Array();
	
	while((dealerHand[0] = deck.dealCard())==null);
	//alert(dealerHand[0].number+" with "+dealerHand[0].shape);
	showCardImage("dealerImage0", "back", "dealer_imagePlaceholder");
	while((dealerHand[1] = deck.dealCard())==null);
	showCardImage("dealerImage1", dealerHand[1].fileName(), "dealer_imagePlaceholder");

	while((playerHand[0] = deck.dealCard())==null);
	//alert(playerHand[0].number+" with "+playerHand[0].shape);
	showCardImage("playerImage0", playerHand[0].fileName(), "player_imagePlaceholder");
	while((playerHand[1] = deck.dealCard())==null);
	showCardImage("playerImage1", playerHand[1].fileName(), "player_imagePlaceholder");
	document.getElementById("player_score").innerHTML = findScore(playerHand);
		
	document.getElementById('standButton').disabled = false;
	document.getElementById('hitButton').disabled = false;
	document.getElementById('dealButton').disabled = true;
	
	overGame = false;
}

function hitButtonListener(){
	var totalScore = 0;
	var position = playerHand.length;
	if (overGame){
		alert("Please reload the page.");
	}else{
		
		while((playerHand[position] = deck.dealCard())== null);
		showCardImage("playerImage"+playerHand.length, playerHand[position].fileName(), "player_imagePlaceholder");
		totalScore = findScore(playerHand);
		
		if (totalScore > 21){		
			document.getElementById("player_score").innerHTML = totalScore+" busted!";
			document["dealerImage0"].src = "cards/"+dealerHand[0].fileName()+".png";
			document.getElementById("dealer_score").innerHTML = findScore(dealerHand);			
			winner();
			overGame = true;
		} else if (totalScore == 21){
			document.getElementById("player_score").innerHTML = totalScore;
			winner();
			overGame = true;
		} else{
			document.getElementById("player_score").innerHTML = totalScore;
		}
	}
}

function standButtonListener(){
	var total = 0;
	var position = 0;
	var c = 0;
	if(overGame){
		alert("Please reload the page.");
	}else {
		document["dealerImage0"].src = "cards/"+dealerHand[0].fileName()+".png";
		while((c = findScore(dealerHand)) < 17){
			document.getElementById("dealer_score").innerHTML = c;
			position = dealerHand.length;
			while((dealerHand[position] = deck.dealCard())== null);
			showCardImage("dealerHand"+position, dealerHand[position].fileName(), "dealer_imagePlaceholder");
		}
		
		total = findScore(dealerHand);
		if (total > 21){
			document.getElementById("dealer_score").innerHTML = total+" busted!";
		} else if (total == 21){
			document.getElementById("player_score").innerHTML = total;
			winner();
			overGame = true;
		} else{
			document.getElementById("dealer_score").innerHTML = total;
		}
	}
	
	winner();
	overGame = true;
	
}

function winner() {
   var player_total = findScore( playerHand );
   var dealer_total = findScore( dealerHand );
   if ( player_total == 21){
 		document.getElementById("result").innerHTML = "BlackJack!";
		alert("Blackjack!");
   }else if ( player_total > 21 ) {  // Busted
      document.getElementById("result").innerHTML = "Dealer wins";
	  
   } else {
      if ( dealer_total > 21 ) { // Busted
         document.getElementById("result").innerHTML = "You win!";
		 
      } else {
         if ( player_total  == dealer_total ) {
            document.getElementById("result").innerHTML = "Tie game";
			
         } else {
            if ( player_total  > dealer_total ) {
               document.getElementById("result").innerHTML = "You win!";
			   
            } else {
               document.getElementById("result").innerHTML = "Dealer wins";
			   
            }
         }
      }
   }
   hideButtons();
}

function hideButtons(){
		
	document.getElementById('standButton').disabled = true;
	document.getElementById('hitButton').disabled = true;
	document.getElementById('dealButton').disabled = false;
}

function findScore(hand){
	var total = 0;
	var soft = 0;
	var numberInHand = 0;
	
	for (i = 0; i < hand.length; i++){
		numberInHand = hand[i].number;
		if( numberInHand == 1){
			soft++;
			total += 11;
		} else {
			if (numberInHand == 11 || numberInHand == 12 || numberInHand == 13){
					total += 10;
			}else{
					total += numberInHand;
			}
		}
	}
	while( soft>0 && total > 21){
		total -= 10;
		soft -= 1;
	}
	
	return total;
}

function showCardImage(imageName, fileName, placeHolder){
	//alert("The file name "+fileName);
	var element = document.createElement("image");
	element.setAttribute("type", "image");
	//element.setAttribute("name", imageName);
	element.setAttribute("src", "cards/"+fileName+".png");
	document.getElementById(placeHolder).appendChild(element);

}