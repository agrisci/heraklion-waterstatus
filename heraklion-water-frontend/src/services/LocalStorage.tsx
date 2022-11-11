import { Preferences } from "@capacitor/preferences";

async function localStorageSet(key, value) {
  await Preferences.set({
    key: key,
    value: JSON.stringify(value),
  });
}

async function localStorageGet(key) {
  const item = await Preferences.get({ key: key });
  return JSON.parse(item.value);
}

async function localStorageRemove(key) {
  await Preferences.remove({
    key: key,
  });
}

export { localStorageSet, localStorageGet, localStorageRemove };
