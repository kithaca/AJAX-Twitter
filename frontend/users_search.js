var FollowToggle = require ('./follow_toggle.js');

function UsersSearch (el) {
  this.$el = $(el);
  this.$input = this.$el.find("input");
  this.$ul = this.$el.find("ul.users");
  this.$input.on('input', this.handleInput.bind(this));
}

UsersSearch.prototype.handleInput = function (e) {
  e.preventDefault();

  var search = this;

  $.ajax({
    url: "/users/search",
    type: "GET",
    dataType: "json",
    data: { query: this.$input.val() },
    success: function(resp) {
      // search.$ul.html(resp);
      // debugger;
      // console.log(this.$input.val());
      search.renderResults(resp);
    },
    error: function(resp) {
      console.log(resp);
    }
  });
};

UsersSearch.prototype.renderResults = function (response) {
  var ul = this.$ul;
  ul.empty();
  response.forEach(function (user) {
    var li = $('<li>' + user.username + '</li>');
    var button = $('<button></button>');
    button.addClass('follow-toggle');
    button.data('user-id', user.id);
    button.data('initial-follow-state', user.followed ? "followed" : "unfollowed");
    var followTog = new FollowToggle(button);

    li.append(button);
    ul.append(li);
  });
};

module.exports = UsersSearch;
