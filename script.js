$(document).ready(function() {

  //new board prompt
  $("#new-board").click(function() {
    var rows = prompt("How many rows?")
    render(rows);
  });

  //listener for click on square
  function squareListener(event) {
    var square = $(event.target);
    var row = square.parent();
    square.css('text-indent', '0');
    square.css("background-color", "#F1F1F1");
    if (square.find("div").hasClass('mine')) {
      $(".board").append('<p>Game Over :(</p>');
      $(".mine").css('visibility', 'visible');
      $(".square").css('text-indent', '0');
      $(".square").css("background-color", "#F1F1F1");
    }
    if (square.hasClass('square') && square.text() == "") {
      var rightSquare = square.next();
      var leftSquare = square.prev();
      var upSquare = row.prev().find(".square").eq(square.index());
      var downSquare = row.next().find(".square").eq(square.index());

      if (row.attr('id') == rightSquare.parent().attr('id')) {

        //check right
        while (rightSquare.text() == "" && rightSquare.index() != 0) {
          rightSquare.css("background-color", "#F1F1F1");

          //update up and down with current right square
          var upSquare = row.prev().find(".square").eq(rightSquare.index());
          var downSquare = row.next().find(".square").eq(rightSquare.index());

          //check up
          while (upSquare.text() == "" && upSquare.parent().attr('id') < 8) {
            upSquare.css("background-color", "#F1F1F1");
            //check right from current up square
            var rightSquareNested = rightSquare;
            while (rightSquareNested.text() == "" && rightSquareNested.index() != 0) {
              rightSquareNested.css("background-color", "#F1F1F1");
              rightSquareNested = rightSquareNested.next()
            }
            //check left from current up square
            var leftSquareNested = leftSquare;
            while (leftSquareNested.text() == "" && leftSquareNested.index() != 0) {
              leftSquareNested.css("background-color", "#F1F1F1");
              leftSquareNested = leftSquareNested.prev()
            }
            //update up square to continue looping
            row = upSquare.parent();
            upSquare = row.prev().find(".square").eq(upSquare.index());
          }

          //check down
          while (downSquare.text() == "" && downSquare.parent().attr('id') >= 0) {
            downSquare.css("background-color", "#F1F1F1");

            //check right from current up square
            var rightSquareNested = rightSquare;
            while (rightSquareNested.text() == "" && rightSquareNested.index() != 0) {
              rightSquareNested.css("background-color", "#F1F1F1");
              rightSquareNested = rightSquareNested.next()
            }
            //check left from current up square
            var leftSquareNested = leftSquare;
            while (leftSquareNested.text() == "" && leftSquareNested.index() != 0) {
              leftSquareNested.css("background-color", "#F1F1F1");
              leftSquareNested = leftSquareNested.prev()
            }
            //update up square to continue looping
            row = downSquare.parent();
            downSquare = row.next().find(".square").eq(downSquare.index());
          }

          //update right square to continue looping
          rightSquare = rightSquare.next();
        }
      }
    }
  }

  //count touching mines (or black spaces)
  function adjacentMines(i, rows) {
    var mineCount = 0;
    var mineDir = "";

    if ($(".square").eq(i + rows).find("div").hasClass('mine') &&
        $(".square").eq(i + rows).parent().attr('id') != $(".row:first-of-type").attr('id')) {
      mineCount ++;
      mineDir += "s";
    }
    if ($(".square").eq((i + rows) + 1).find("div").hasClass('mine') &&
        $(".square").eq(i + rows).parent().attr('id') != $(".row:first-of-type").attr('id') &&
        $(".square").eq((i + rows) + 1).parent().attr('id') != $(".square").eq(i).parent().attr('id') &&
        $(".square").eq(i).index() != $(".square:last-of-type").index()) {
      mineCount ++;
      mineDir += "se";
    }
    if ($(".square").eq((i + rows) - 1).find("div").hasClass('mine') &&
        $(".square").eq(i + rows).parent().attr('id') != $(".row:first-of-type").attr('id') &&
        $(".square").eq((i + rows) - 1).parent().attr('id') != $(".square").eq(i).parent().attr('id') &&
        $(".square").eq(i).index() != $(".square:first-of-type").index()) {
      mineCount ++;
      mineDir += "sw";
    }
    if ($(".square").eq(i + 1).find("div").hasClass('mine') &&
        $(".square").eq(i + 1).parent().attr('id') == $(".square").eq(i).parent().attr('id')) {
      mineCount ++;
      mineDir += "e";
    }
    if ($(".square").eq(i - 1).find("div").hasClass('mine') &&
        $(".square").eq(i - 1).parent().attr('id') == $(".square").eq(i).parent().attr('id'))  {
      mineCount ++;
      mineDir += "w";
    }
    if ($(".square").eq(i - rows).find("div").hasClass('mine') &&
        $(".square").eq(i - rows).parent().attr('id') != $(".row:last-of-type").attr('id'))  {
      mineCount ++;
      mineDir += "n";
    }
    if ($(".square").eq((i - rows) + 1).find("div").hasClass('mine') &&
      $(".square").eq(i - rows).parent().attr('id') != $(".row:last-of-type").attr('id') &&
      $(".square").eq((i - rows) + 1).parent().attr('id') != $(".square").eq(i).parent().attr('id') &&
      $(".square").eq(i).index() != $(".square:last-of-type").index())  {
      mineCount ++;
      mineDir += "ne";
    }
    if ($(".square").eq((i - rows) - 1).find("div").hasClass('mine') &&
      $(".square").eq(i - rows).parent().attr('id') != $(".row:last-of-type").attr('id') &&
      $(".square").eq((i - rows) - 1).parent().attr('id') != $(".square").eq(i).parent().attr('id') &&
      $(".square").eq(i).index() != $(".square:first-of-type").index())  {
      mineCount ++;
      mineDir += "nw";
    }

    return mineCount;
  }

  //render new board
  function render(rows) {
    $(".row").remove();
    $("p").remove();

    //build empty board
    var rows = parseInt(rows);
    for (var i = 0; i < rows; i++) {
      $(".board").append("<div class='row' id='"+i+"'></div>");
        for (var i2 = 0; i2 < rows; i2++) {
          $(".row:last-of-type").append("<div class='square unclicked'></div>");
        }
    }

    //add listener to square
    $(".square").click(function(event) {
      squareListener(event);
    });

    //add mines
    for (var i = 0; i < (rows + 1); i++) {
      var randomNumer = Math.floor(Math.random() * (rows * rows));

      while ($(".square").eq(randomNumer).find("div").hasClass('mine')) {
        var randomNumer = Math.floor(Math.random() * (rows * rows));
      }

      $(".square").eq(randomNumer).append('<div class="mine"></div>');
    }

    //add numbers to safe tiles
    for (var i = 0; i < (rows * rows); i++) {

      //if square doesn't have a mine, print 1
      if ( $(".square").eq(i).find("div").hasClass('mine') == false) {
        $(".square").eq(i).text('0');

        //if mine is touching square, add to count
        var mineCount = adjacentMines(i, rows);

        //print number of touching mines
        if (mineCount > 0) {
          $(".square").eq(i).text(mineCount);
        }
        else {
          $(".square").eq(i).text("");
        }
      }

    }
  }

  //render default board
  render(9);

});
