var FollowToggle = require("./follow_toggle.js");
var UsersSearch = require("./users_search.js");


$(function () {

    $("button.follow-toggle").each(
      function (index, el) {
        new FollowToggle(el);
      }
    );

    $("nav.users-search").each(
      function (index, el) {
        new UsersSearch (el);
      }
    );
});
