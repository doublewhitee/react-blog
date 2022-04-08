// localStorage
const storage = window.localStorage

const f =  {
  save(name: string, value: any) {
    storage.setItem(name, JSON.stringify(value))
  },

  get(name: string) {
    return storage.getItem(name) || undefined
  },

  remove(name: string) {
    storage.removeItem(name)
  }
}

export default f;
