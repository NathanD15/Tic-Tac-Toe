// noprotect
var gameMode = -1;

var board = [ [0, 0, 0], [0, 0, 0], [0, 0, 0] ];

var w = 2;
var winner = [ ["O", "Tie", "X"],[" Game","  Wins"] ];
var turn = 0;
var  player = 1;


function setup() {
  var sign = random(-1, 1);
  if(sign != 0)
    player *=sign/abs(sign);

  while(gameMode != 0 && gameMode != 1 && gameMode != 2){
  gameMode = prompt("What Game Mode do you want?\n(0 human, 1 easy computer, 2 medium computer)", "0");
  }
  
  createCanvas(400, 500);
  angleMode(DEGREES);
}

function draw() {
  background(0);
  
  stroke(255);
  strokeWeight(7);
  line(150, 60, 150, 340);
  line(250, 60, 250, 340);
  
  line(340, 150, 60, 150);
  line(340, 250, 60, 250);
  
  
  for(r =0; r <3; r++){
    for(c =0; c <3; c++){
      if(board[r][c] == 1)
        draw_x(100+c*100, 100+r*100);
      else if(board[r][c] == -1)
        draw_o(100+c*100, 100+r*100);
    }
  }

  if(w != 2){
    //noLoop();
    win();
    noStroke();
    fill(255);
    textSize(40);
    text(winner[0][w+1] + winner[1][abs(w)], 130, 425);
  }
}

function draw_x(x, y){
  strokeWeight(5);
  stroke(255);
  line(x +cos(45)*25, y+sin(45)*25, x-cos(45)*25, y-sin(45)*25);
  line(x +cos(135)*25, y+sin(135)*25, x-cos(135)*25, y-sin(135)*25);
}
function draw_o(x, y){
  strokeWeight(5);
  noFill();
  stroke(255);
  ellipse(x,y,50,50);
}
function mousePressed() {
  if(w == 2){
  var xx = mouseX;
  var yy = mouseY;
    
  for(r =0; r <3; r++){
    for(c =0; c <3; c++){
      if(xx > 50+c*100 && xx < 50+(c+1)*100 && yy > 50+r*100 && yy < 50+(r+1)*100 && board[r][c]==0){
        
        board[r][c] = player;
        turn++;
        w = win();
        
        if(gameMode == 0 && w == 2){
          player*=-1;
        }else if(gameMode == 1 && w == 2){
          easy_computer();
        }else if(gameMode == 2 && w == 2){
          medium_computer();
        }
        return 0;
      }
    }
    
  }
  }else{
    
  board = [ [0, 0, 0], [0, 0, 0], [0, 0, 0] ];

  w = 2;
  winner = [ ["O", "Tie", "X"],[" Game","  Wins"] ];
  turn = 0;
  player = 1;

  }
}
function easy_computer(){
  let xx = round(random(0, 2) );
  let yy = round(random(0, 2) );
  
  
  while(true){
    
    if(board[xx][yy] == 0){
      board[xx][yy] = player*-1;
      turn++; 
      w = win();
      return;
    }else{
      xx = round( random(0, 2) );
      yy = round( random(0, 2) );
    }
     
  }
  
}
function medium_computer(){
    for(i =-1; i <2; i+=2){
      for(r =0; r <3; r++){
        if(board[r][0]+board[r][1]+board[r][2] == 2*i){    
          if(board[r][0] ==0){ board[r][0] = player*-1; turn++; w = win(); return 0;}
          if(board[r][1] ==0){ board[r][1] = player*-1; turn++; w = win(); return 0;}
          if(board[r][2] ==0){ board[r][2] = player*-1; turn++; w = win(); return 0;}
          
        }else if(board[0][r]+board[1][r]+board[2][r] == 2*i){
          if(board[0][r] ==0){ board[0][r] = player*-1; turn++; w = win(); return 0;}
          if(board[1][r] ==0){ board[1][r] = player*-1; turn++; w = win(); return 0;}
          if(board[2][r] ==0){ board[2][r] = player*-1; turn++; w = win(); return 0;}
        }
      }
    
      if(board[0][0]+board[1][1]+board[2][2] == 2*i){
          if(board[0][0] ==0){ board[0][0] = player*-1; turn++; w = win(); return 0;}
          if(board[1][1] ==0){ board[1][1] = player*-1; turn++; w = win(); return 0;}
          if(board[2][2] ==0){ board[2][2] = player*-1; turn++; w = win(); return 0;}
      }else if(board[2][0]+board[1][1]+board[0][2] == 2*i){
          if(board[2][0] ==0){ board[2][0] = player*-1; turn++; w = win(); return 0;}
          if(board[1][1] ==0){ board[1][1] = player*-1; turn++; w = win(); return 0;}
          if(board[0][2] ==0){ board[0][2] = player*-1; turn++; w = win(); return 0;}
      }
    } 
      easy_computer();
      return 0;
      
}
function win(){
  strokeWeight(25);
  stroke(0, 0, 255, 130);
  
  for(i =-1; i <2; i+=2){
    for(r =0; r <3; r++){
      if(board[r][0]+board[r][1]+board[r][2] == 3*i){    
        line(75, 100+r*100, 25+3*100, 100+r*100);
        return i;
      }else if(board[0][r]+board[1][r]+board[2][r] == 3*i){
        line(100+r*100, 75+0*100, 100+r*100, 25+3*100);
        return i;
      }
    }
    
      if(board[0][0]+board[1][1]+board[2][2] == 3*i){
        line(75, 75, 325, 325);
        return i;
      }else if(board[2][0]+board[1][1]+board[0][2] == 3*i){
        line(75, 325, 325, 75);
        return i;
      }
  }
  
  if(turn >= 9){
    return 0;
  }
  return 2;
}