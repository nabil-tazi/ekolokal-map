import fairtrade from '../../assets/fairtrade.png'
import nobin from '../../assets/nobin.png'
import noplastic from '../../assets/noplastic.png'
import organic from '../../assets/organic.png'
import plantbased from '../../assets/plantbased.png'

export const CATEGORIES = {
    PLANTBASED: {
        ID: 'plant-based',
        IMG: plantbased,
        ENGLISH: 'Plant based',
        JAPANESE: 'Plant based',
    },
    ORGANIC: {
        ID: 'organic',
        IMG: organic,
        ENGLISH: 'Organic',
        JAPANESE: 'オーガニック',
    },
    FAIRTRADE: {
        ID: 'fairtrade',
        IMG: fairtrade,
        ENGLISH: 'Fair trade',
        JAPANESE: '公正取引',
    },
    ZEROWASTE: {
        ID: 'zero-waste',
        IMG: nobin,
        ENGLISH: 'Zero waste',
        JAPANESE: 'Zero waste',
    },
    TAKEOUT: {
        ID: 'take-out',
        IMG: nobin,
        ENGLISH: 'Take out',
        JAPANESE: 'テイクアウト',
    },
}
