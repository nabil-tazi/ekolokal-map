import fairtrade from '../../assets/fairtrade.png'
import nobin from '../../assets/nobin.png'
import takeout from '../../assets/take-away.png'

import noplastic from '../../assets/noplastic.png'
import organic from '../../assets/organic.png'
import plantbased from '../../assets/plantbased.png'

export const CATEGORIES = {
    PLANTBASED: {
        ID: 'plant-based',
        IMG: plantbased,
        ENGLISH: 'Plant based',
        JAPANESE: 'ヴィーガン',
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
        JAPANESE: 'ゼロウェイスト',
    },
    TAKEOUT: {
        ID: 'take-out',
        IMG: takeout,
        ENGLISH: 'Take out',
        JAPANESE: 'テイクアウト',
    },
}
