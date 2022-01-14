# Component Usage

## Overview

The nested-checkboxes component is comprised of a group of checkbox components that function as a unit. In its simplest form, the group is comprised of a single parent checkbox that and one or more child checkboxes. Toggling the parent checkbox will affect the child checkbox(es) and vice-versa.

A child checkbox has only two possible states:

- checked (when selected)
- unchecked (when deselected)

The parent checkbox, however, has three possible states:

- checked (when all child checkboxes are checked)
- unchecked (when all child checkboxes are unchecked)
- indeterminate (when there's at least one child checkbox that's checked and one child checkbox that's unchecked)

Clicking a child checkbox will toggle its own state and alter the parent checkbox's state. Clicking a parent checkbox will toggle its own state (if indeterminate, it will become checked) and all child checkbox states will be simultaneously altered to match the parent checkbox's state.

## Defining the data

The nested-checkboxes component does not require the consumer to conform to any specific shape when passing the data into the \`item\` binding. However, because the component is generic, there are two specific classes a consumer must define and pass into the component's bindings in order for the component to work correctly:

- **Required:** The \`treeProvider\` binding needs a class to understand how to traverse through the passed-in data structure
- **Optional:** The \`renderer\` binding needs a class to understand how to generate additional details in the UI

The classes that define the examples in this component library can be found here he one used in the component library examples can be found [here](https://github.com/johnnycopes/globetrotter/blob/master/src/stories/mock-data).

## Multiple levels

The nested-checkboxes component is recursive. There's no limit to the number of levels you can include in an instance of the component; you simply have to pass a nested data structure into the \`item\` binding and detail how to access each level of child items in your TreeProvider class. Every child item iterated over in the data structure will be rendered as its own nested-checkboxes component.
