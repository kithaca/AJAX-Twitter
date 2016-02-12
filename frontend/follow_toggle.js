function FollowToggle (el) {
  this.$el = $(el);
  this.userId = this.$el.data("user-id");
  this.followState = this.$el.data("initial-follow-state");
  this.render();

  this.$el.on("click", this.handleClick.bind(this));
}

FollowToggle.prototype.render = function () {
  var text = this.followState === "unfollowed" ? "Follow!" : "Unfollow!";
  this.$el.html(text);
  if (this.followState === "following" || this.followState === "unfollowing") {
    this.$el.prop("disabled", true);
  } else {
    this.$el.prop("disabled", false);
  }
};

FollowToggle.prototype.handleClick = function (e) {
  e.preventDefault();
  var method = this.followState === "unfollowed" ? "POST" : "DELETE";
  var followTog = this;

  if (this.followState === "followed") {
    this.followState = "unfollowing";
  } else if (this.followState === "unfollowed"){
    this.followState = "following";
  }
  this.render();

  $.ajax({
    url: "/users/" + this.userId + "/follow",
    type: method,
    dataType: "json",
    success: function(resp) {
      followTog.changeToggleState();
      followTog.render();
    },
    error: function(resp) {
    }
  });
};

FollowToggle.prototype.changeToggleState = function () {
  if (this.followState === "following") {
    this.followState = "followed";
  } else if (this.followState === "unfollowing") {
    this.followState = "unfollowed";
  }
};

module.exports = FollowToggle;
