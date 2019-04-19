import { ConfigurationTarget, QuickPickItem, Memento } from 'vscode'

export type OnOff = 'on' | 'off'

type Config = {
  _label: string
  [setting: string]: any
}

export type ToggleConfig = {
  [name: string]: {
    on: Config
    off: Config
  }
}

export type RichQuickPickItem = QuickPickItem & {
  name: string
  newState: OnOff
  configTarget: ConfigurationTarget
  store: Memento
}
