import styles from './ActionMenu.module.scss'
import TrashIcon from 'assets/trash-icon.svg'
import AnchorLinkIcon from 'assets/anchor-link-icon.svg'

const MENU_WIDTH = 150
const MENU_HEIGHT = 40

export default function ActionMenu({ position, actions }) {
  const x = position.x - MENU_WIDTH / 2
  const y = position.y - MENU_HEIGHT - 10
  return (
    <div
      className={styles.menuWrapper}
      style={{
        top: y,
        left: x,
      }}
    >
      <div className={styles.menu}>
        <span
          id="anchor"
          className={styles.menuItem}
          role="button"
          tabIndex="1"
          onClick={() => actions.turnToLink()}
        >
          <AnchorLinkIcon className="w-5" />
        </span>
        <span
          id="turn-into"
          className={styles.menuItem}
          role="button"
          tabIndex="1"
          onClick={() => actions.turnInto()}
        >
          Turn into
        </span>
        <span
          id="delete"
          className={styles.menuItem}
          role="button"
          tabIndex="2"
          onClick={() => actions.deleteBlock()}
        >
          <TrashIcon className="w-5" />
        </span>
      </div>
    </div>
  )
}