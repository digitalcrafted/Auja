---
layout: documentation
title: "Auja Docs"
---

Main Config
=====

- [Introduction](#introduction)
- [Configuration basics](#configuration-basics)

Introduction
-----

The config initializes Auja and shapes it. The file referenced on the body tag should return this config, .e.g `<body data-src="main.json"></body>`. The following config variables are present:

title | `string` | Title left upper corner 
authenticated | `boolean` | Will show the authentication form if true 
color | `Object` | Different colors used in the interface, see `Color` object definition
user | `Object` | In the right upper corner, name of the currenlty logged in user
buttons | `Array` | Of `Button` objects
menu | `Array` | Of `MainMenuItem` objects
routes | `Array` | Of `Route` objects
authentication | `Object` | A `Form` object

Configuration basics
-----

Within the main config, several variables are determined in Json such as the interfase's color, menu items and buttons.

###Color

Different colors used in the interface

main | `string`
secondary | `string`
alert | `string`


###Button

Object for in the right upper corner

text | `string` | Name on the button
target | `string` | Will be put inside of the `href` of the link

###MainMenuItem

Menu item on the left

title | `string`
icon | `string`
target | `string`

###Route

Routing rules, to target specific routing types.

type | `string` | target routing engine
target | `string` | [Crossroads.js](http://millermedeiros.github.io/crossroads.js/) compatible regex
action | `string` | Target url

###Json example
A Json example of a config is shown below.

```json
{
    "type": "main",
    "main": {
        "title": "Auja example",
        "authenticated": true,
        "colors": {
            "main": "#1ebab8",
            "secondary": "#EDEDED",
            "alert": "#e85840"
        },
        "user": {
            "name": "Joris Blaak"
        },
        "buttons": [
            {
                "text": "Logout",
                "target": "#logout"
            }
        ],
        "menu": [`
            {
                "title": "Clubs",
                "icon": "planet",
                "target": "example/clubs/menu"
            }
        ],
        "routes": [
            {
                "type": "http",
                "target": "example/clubs/{id}/edit",
                "action": "example/clubs_edit.json"
            }
        ],
        "authentication": /* See Form */
    }
}
```

###Icons

As seen in the example above, icons of menu and list items can be assigned. Icons are generated using the [Ionicons](http://ionicons.com/) icon font.See the Ionicons website for an overview of available icons.
	