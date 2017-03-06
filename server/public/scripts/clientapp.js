$(document).ready(function () {

  // get treats on load
  getTreats();

  /**---------- Event Handling ----------**/
  /** Save New Treat **/
  $('#saveNewButton').on('submit', function() {
    event.preventDefault();

    var treateName = $('#treatNameInput').val();
    var treatDescription = $('#treatDescriptionInput').val();
    var treateURL = $('#treatUrlInput').val();

    var newTreat = {
      name: treateName,
      description: treatDescription,
      url: treateURL
    };

    // postTreat(newTreat);
  });

  /**---------- AJAX Functions ----------**/

  // GET /treats
  function getTreats() {
    $.ajax({
      type: 'GET',
      url: '/treats/',
      success: function(response) {
      console.log('GET /treats returned ', response);
      console.log(response);
      $('#treats').empty();
        for (var i = 0; i < response.length; i++) {
          var currentTreat = response[i];
          var $newTreat = $('<div>');
          $newTreat.data('id', currentTreat.id);
          $newTreat.append('<div>' + currentTreat.name + '</div>');

          $newTreat.append('<div>' + currentTreat.name + '</div>');
          $('#treat-display').append($newTreat);
      };
    }
  })
};


  function postTreat(treat) {
    $.ajax({
      type: 'POST',
      url: '/treats/new',
      data: newTreat,
      success:function () {
      console.log('POST /treats sent ', newTreat);
      clearDom();
      getTreats();
    }
  })
}
  /** ---------- DOM Functions ----------**/

  var clearDom = function() {
    var $treats = $('#treat-display');
    $treats.empty();
  };

  function appendTreat(treat) {
    // append a treat to the DOM and add data attributes
    // treat-display -> treat row -> treat
    var $treats = $('#treat-display');

    var treatCount = $treats.children().children().length;

    if (treatCount % 2 === 0) {
      // add a treat row every 2 treats
      $treats.append('<div class="treat row"></div>');
    }

    var $treat = $('<div class="six columns individual-treat">' +
                  '<div class="image-wrap">' +
                  '<img src="' + treat.pic + '" class="u-max-full-width" />' +
                  '<div class="toggle row">' +
                  '<div class="six columns">' +
                  '<button class="edit u-full-width">Edit</button>' +
                  '</div>' +
                  '<div class="six columns">' +
                  '<button class="delete u-full-width">Delete</button>' +
                  '</div>' +
                  '</div>' +
                  '</div>' +
                  '<h3>' + treat.name + '</h3>' +
                  '<p>' + treat.description + '</p>' +
                  '</div>');

    $treat.data('id', treat.id);

    $('.treat:last-of-type').append($treat);

  };
});
