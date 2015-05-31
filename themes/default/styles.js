
import fontPairs from './font-pairs'
import colorSwatches from './color-swatches'

export default config => {
  if (config.fontPair) {
    config.fonts = fontPairs[config.fontPair]
  }
  if (config.colorSwatch) {
    config.colors = colorSwatches[config.colorSwatch]
  }
  const {fonts, colors} = config

  return {
    header: {
      container: {
        fontFamily: `${fonts.head.name}, sans-serif`,
        backgroundColor: colors.main,
        padding: '50px 20px 30px',
        textAlign: 'center',
      },
      title: {
        fontSize: '80px',
        color: 'white',
      },
      subTitle: {
        color: 'white',
        fontSize: '25px',
        margin: '-5px 0 10px',
        ':empty': {
          display: 'none',
        },
      },
      linkItem: {
        display: 'inline-block',
        listStyle: 'none',
      },
      links: {
        padding: 0,
        margin: 0,
        marginTop: '10px',
      },
      link: {
        padding: '5px 10px',
        margin: '0 5px',
        display: 'inline-block',
        backgroundColor: colors.accent,
        transition: 'background-color 0.1s ease',
        color: 'white',
        borderRadius: '5px',
        textDecoration: 'none',
        ':hover': {
          backgroundColor: colors.accentLight,
        }
      },
      linkCurrent: {
        backgroundColor: colors.accentLight,
        cursor: 'default',
      },
      linkActive: {
        backgroundColor: colors.accentLight,
      },
      linkExternal: {
        backgroundColor: colors.lightest,
        color: colors.accentLight,
        ':hover': {
          backgroundColor: colors.lightest,
          color: colors.accent,
        },
      },
    },

    footer: {
      container: {
        textAlign: 'center',
        fontSize: '.8em',
        marginTop: '30px',
        borderTop: '1px solid #ccc',
        paddingTop: '10px',
        paddingBottom: '20px',
      },
    },

    content: {
      container: {
        fontFamily: `${fonts.body.name}, serif`,
        maxWidth: '1000px',
        margin: '10px auto',
        fontSize: '22px',
        padding: '10px 20px 20px',
      },
    },

    utils: {
      noMargin: {
        margin: 0,
      },
    },
  }
}

