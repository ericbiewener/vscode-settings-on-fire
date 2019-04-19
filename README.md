# Settings on 🔥!

Define groups of settings to be easily toggled on and off. These may be defined in either global
User Settings or your current Workspace settings. For example:

## Configuration
```json
"settingsOnFire.toggle": {
    "Color Theme": {
      "on": {
        "workbench.colorTheme": "Ayu Mirage"
        // Any additional settings
      },
      "off": {
        "workbench.colorTheme": "Ayu Light"
        // Any additional settings
      }
    },
    "Tests": {
      "on": {
        "files.exclude": {
          "**/__tests__": false,
          "**/__mocks__": false,
          "**/__fixtures__": false,
          "**/*.spec.js": false,
        }
        // Any additional settings
      },
      "off": {
        "files.exclude": {
          "**/__tests__": true,
          "**/__mocks__": true,
          "**/__fixtures__": true,
          "**/*.spec.js": true,
        }
        // Any additional settings
      }
    }
  }
```

The keys `Color Theme` and `Tests` will appear in your command pallete:

<img src="https://github.com/ericbiewener/settings-on-fire/tree/master/artwork/quickpick-onoff.png" />

The "on" or "off" that you see in the screenshot indicates the state that the setting will be
changed to if you select it. Before ever toggling a setting, it will be considered to be `off`.

You can specify any amount of settings inside the `on` or `off`
definitions. These settings will simply be written to your top-level settings object.

## Labels
You may also include a `_label` key to provide more clarity around what toggling the setting will
do:

```json
    "Color Theme": {
      "on": {
        "_label": "Dark",
        "workbench.colorTheme": "Ayu Mirage"
        // Any additional settings
      },
      "off": {
        "_label": "Light",
        "workbench.colorTheme": "Ayu Light"
        // Any additional settings
      }
```

<img src="https://github.com/ericbiewener/settings-on-fire/tree/master/artwork/quickpick-labeled.png" />

## Merging vs Overwriting Settings
Settings that are objects will be merged into existing settings, while any other type of value will
simply overwrite the previous setting. For example, the `Tests` settings above will merge the values
in `files.exclude` with whatever the current setting is for that key.