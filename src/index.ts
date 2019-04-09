import { commands, ExtensionContext, window } from 'vscode'
import { toggleSettings } from './toggleSettings'

export const activate = async function activate(context: ExtensionContext) {
  // TODO: make npm package
  // showNewVersionAlert(context) -- create npm picture

  context.subscriptions.push(
    commands.registerCommand('settingsOnFire.toggleSettings', () => toggleSettings(context))
  )
}
