
import React from 'react'

export default sourceBase => pageData => ({
  blocks: {
    footer: styles => <p className={styles.utils.noMargin}>
      check out the <a href={sourceBase + pageData.fileName}>
        markdown source
      </a> for this page
    </p>
  },
})

