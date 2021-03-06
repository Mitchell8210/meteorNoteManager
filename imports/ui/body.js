import { Meteor } from "meteor/meteor";
import { Template } from "meteor/templating";
import { Tasks } from "../api/tasks.js";
import "./app_body.html";
import "./task.js";
import "./noTasks.js";
import "./home.js";
import { ReactiveDict } from "meteor/reactive-dict";
Template.body.onCreated(function bodyOnCreated() {
  this.state = new ReactiveDict();
  Meteor.subscribe("tasks");
});

Template.body.helpers({
  tasks() {
    const instance = Template.instance();
    if (instance.state.get("hideCompleted")) {
      // If hide completed is checked, filter tasks
      return Tasks.find(
        { checked: { $ne: true } },
        { sort: { createdAt: -1 } }
      );
    }
    // Otherwise, return all of the tasks
    return Tasks.find({}, { sort: { createdAt: -1 } });
  },
  incompleteCount() {
    const Num = Tasks.find({ checked: { $ne: true } }).count();
    return Num;
  }
});
Template.body.events({
  "submit .new-task"(event) {
    // Prevent default browser form submit
    event.preventDefault();

    // Get value from form element
    const target = event.target;
    const text = target.text.value;

    // Insert a task into the collection
    Meteor.call("tasks.insert", text);
    // Clear form
    target.text.value = "";
  },
  "change .hide-completed input"(event, instance) {
    instance.state.set("hideCompleted", event.target.checked);
  }
});
