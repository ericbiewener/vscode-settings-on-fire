import { ConfigurationTarget, QuickPickItem, Memento } from 'vscode'

export type OnOff = 'on' | 'off'

export type ToggleConfig = {
  [name: string]: {
    on: any
    off: any
  }
}

export type RichQuickPickItem = QuickPickItem & {
  name: string
  state: OnOff
  configTarget: ConfigurationTarget
  store: Memento
}
