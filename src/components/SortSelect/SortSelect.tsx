import { useProductStore } from '../../stores/productStore'
import { Listbox } from '@headlessui/react'
import styles from './SortSelect.module.css'

export const SortSelect = () => {
  const { sortBy, setSort } = useProductStore()

  return (
    <Listbox value={sortBy} onChange={setSort}>
      <div className={styles.wrapper}>
        <Listbox.Button className={styles.button}>
          Sort by: {sortBy}
        </Listbox.Button>

        <Listbox.Options className={styles.options}>
          <Listbox.Option value="price" className={styles.option}>
            Price
          </Listbox.Option>
          <Listbox.Option value="name" className={styles.option}>
            Name
          </Listbox.Option>
        </Listbox.Options>
      </div>
    </Listbox>
  )
}