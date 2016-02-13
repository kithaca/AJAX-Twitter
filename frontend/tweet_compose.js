function TweetCompose (el) {
  this.$el = $(el);
  this.$content = this.$el('textarea');
  this.$mention = this.$el('select');
}

TweetCompose.prototype.submit = function (e) {
  e.preventDefault();
  this.$el(":input").prop("disabled", true);
  var tweet = this;
  $.ajax({
    url: "/tweets",
    type: "POST",
    dataType: "json",
    success: function(resp) {
    },
    error: function(resp) {

    }
  });
};
