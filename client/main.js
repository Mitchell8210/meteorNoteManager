import "../imports/ui/body.js";

import "../imports/startup/accounts-config.js";
import { Meteor } from "meteor/meteor";

if (Meteor.isClient) {
  Router.route("/", function() {
    this.render("body");
  });
  Router.route("/home", function() {
    this.render("home");
  });
}
