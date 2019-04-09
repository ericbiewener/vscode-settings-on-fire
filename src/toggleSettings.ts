import { ConfigurationTarget, ExtensionContext, window, workspace, QuickPickItem } from 'vscode'
import { RichQuickPickItem, ToggleConfig } from './types'

const CONFIG_SECTION = 'settingsOnFire.toggle'

export async function toggleSettings(context: ExtensionContext) {
  const config = workspace.getConfiguration()
  const toggleConfig = config.get(CONFIG_SECTION) as ToggleConfig | undefined

  if (!toggleConfig) {
    window.showErrorMessage('No Toggle configuration found.')
    return
  }

  const items = getQuickPickItems(context, toggleConfig)

  const selection = await window.showQuickPick(items)
  if (!selection) return

  const { name, state, store, configTarget } = selection
  const settings = toggleConfig[name][state]

  for (const key in settings) {
    const val = settings[key]
    const currentConfig = configValueForTarget(key, configTarget)
    let newConfig

    // Merge objects, overwrite other types
    if (val && typeof val === 'object' && !Array.isArray(val)) {
      if (!currentConfig || typeof currentConfig === 'object') {
        newConfig = { ...currentConfig, ...val }
      } else {
        window.showErrorMessage(
          'Settings on 🔥 error! Toggle configuration specified is a different type than the existing one.'
        )
        return
      }
    } else {
      newConfig = val
    }
    config.update(key, newConfig, configTarget)
    store.update(name, state)
  }
}

function configValueForTarget(configSection: string, target: ConfigurationTarget) {
  const data = workspace.getConfiguration().inspect(configSection)
  if (!data) return

  return target === ConfigurationTarget.Global
    ? data.globalValue
    : target === ConfigurationTarget.Workspace
    ? data.workspaceValue
    : data.workspaceFolderValue
}

function getConfigTargetForSection(configSection: string) {
  const data = workspace.getConfiguration().inspect(configSection)
  if (!data) return

  return data.workspaceValue !== undefined
    ? ConfigurationTarget.Workspace
    : ConfigurationTarget.Global
}

function getQuickPickItems(context: ExtensionContext, toggleConfig: ToggleConfig) {
  const items: RichQuickPickItem[] = []

  for (const name in toggleConfig) {
    const configTarget = getConfigTargetForSection(
      `${CONFIG_SECTION}.${name}`
    ) as ConfigurationTarget

    const store =
      configTarget === ConfigurationTarget.Workspace ? context.workspaceState : context.globalState

    const state = store.get(name) !== 'on' ? 'on' : 'off'

    items.push({
      label: name,
      description: state,
      name,
      state,
      configTarget,
      store,
    })
  }

  return items
}
