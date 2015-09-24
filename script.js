$(document).ready(function() {

  $("#new-board").click(function() {
    var rows = prompt("How many rows?")
    render(rows);
  });

  function squareListener(event) {
    $(event.target).css('text-indent', '0');
    $(event.target).css("background-color", "#F1F1F1");
  }

  function render(rows) {
    $(".row").remove();

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
      var mineCount = 0;
      var mineDir = "";

      //if square doesn't have a mine, print 1
      if ( $(".square").eq(i).find("div").hasClass('mine') == false) {
        $(".square").eq(i).text('0');

        //if mine is touching square, add to count
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

});
