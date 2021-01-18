import styles from './ActionMenu.module.scss'
import TrashIcon from 'assets/trash-icon.svg'
import AnchorLinkIcon from 'assets/anchor-link-icon.svg'
import BrokenLinkIcon from 'assets/broken-link-icon.svg'

const MENU_WIDTH = 150
const MENU_HEIGHT = 40

export default function ActionMenu({ position, selection, html, actions }) {
  const x = position.x - MENU_WIDTH / 2
  const y = position.y - MENU_HEIGHT - 10
  // Check if selection is inside an anchor
  const { selectionStart, selectionEnd } = selection
  const anchorPositions = {
    start: html.indexOf("<a"),
    end: html.indexOf("/a>") > -1 ? html.indexOf("/a>") + 3 : -1
  }
  const insideLink = anchorPositions && selectionStart >= anchorPositions.start && selectionEnd <= anchorPositions.end
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
          onClick={() => actions.turnToLink(insideLink, anchorPositions)}
          title={insideLink ? "Remove link" : "Add link"}
        >
          {insideLink ? (
            <BrokenLinkIcon className="w-5" />
          ) : (
              <AnchorLinkIcon className="w-5" />
            )}
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