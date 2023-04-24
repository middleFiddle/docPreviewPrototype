import { IndexedDBProps } from 'react-indexed-db'

export const DBConfig: IndexedDBProps
  = {
  name: "iDB",
  version: 1,
  objectStoresMeta: [
    {
      store: 'previews',
      storeConfig: { keyPath: 'id', autoIncrement: true },
      storeSchema: [
        { name: 'preview', keypath: 'preview', options: { unique: false } },
        { name: 'type', keypath: 'type', options: { unique: false } }
      ]
    }
  ]
}
