import styled from 'styled-components'
import { useState, useRef } from 'react'
import Lightbox from 'yet-another-react-lightbox'
import Thumbnails from 'yet-another-react-lightbox/plugins/thumbnails'

import 'yet-another-react-lightbox/styles.css'
import 'yet-another-react-lightbox/plugins/thumbnails.css'

const ImagesWrapper = styled.div`
    /* margin: auto; */

    width: 100%;
    height: 100%;
    /* background-color: grey; */
    display: flex;
    /* overflow: hidden; */
    position: relative;
`
// const ImageSingle = styled.img`
//     width: 100%;
//     object-fit: cover;
// `
const ImageSingle = styled.img`
    /* max-height: 100%; */
    /* object-fit: contain;
    position: relative;
    top: 50%; */
    max-height: 100%;
    margin: 0 auto;
    cursor: pointer;
`
const ImageDuo = styled.div`
    display: flex;
    gap: 10px;
    width: 50%;
`

const ImageTrio = styled.div`
    display: flex;
    justify-content: space-between;
    width: 100%;
`
const ImageLeft = styled.div`
    width: 60%;
    overflow: hidden;
`
const ImageRight = styled.div`
    width: 40%;
    margin-left: 2px;
    display: flex;
    flex-direction: column;
`
const ImageOne = styled.img``
const ImageTwo = styled.img`
    height: 50%;
    object-fit: cover;
    margin-bottom: 2px;
`

// function ShopImages({ images }) {
//     return (
//         <ImagesWrapper>
//             {images.length == 1 && (
//                 <ImageSingle src={images[0]}>
//                     {/* <ImageOne src={images[0]} /> */}
//                 </ImageSingle>
//             )}
//             {images.length == 2 && (
//                 <ImageDuo>
//                     <ImageOne src={images[0]} />
//                     <ImageOne src={images[1]} />
//                 </ImageDuo>
//             )}
//             {images.length > 2 && (
//                 <ImageTrio>
//                     <ImageLeft>
//                         <ImageOne src={images[0]} />
//                     </ImageLeft>
//                     <ImageRight>
//                         <ImageTwo src={images[1]} />
//                         <ImageTwo src={images[2]} />
//                     </ImageRight>
//                 </ImageTrio>
//             )}
//         </ImagesWrapper>
//     )
// }
function ShopImages({ images }) {
    const [isShadowBoxOpen, setShadowBoxOpen] = useState(false)
    // const [currentImageIndex, setCurrentImageIndex] = useState(0)
    const thumbnailsRef = useRef(null)

    function closeLightBox() {
        setShadowBoxOpen(false)
    }
    function openLightBox() {
        setShadowBoxOpen(true)
    }
    const imgs = images.map((img) => ({ src: img }))

    return (
        <>
            <ImagesWrapper>
                <ImageSingle
                    src={images[0]}
                    onClick={openLightBox}
                ></ImageSingle>
            </ImagesWrapper>
            <Lightbox
                open={isShadowBoxOpen}
                close={closeLightBox}
                slides={images.map((img) => ({ src: img }))}
                plugins={[Thumbnails]}
                thumbnails={{ ref: thumbnailsRef }}
                on={{
                    click: () => {
                        ;(thumbnailsRef.current?.visible
                            ? thumbnailsRef.current?.hide
                            : thumbnailsRef.current?.show)?.()
                    },
                }}
            />
        </>
    )
}

// function ShopImages({ images }) {
//     return (
//         <ImagesWrapper>
//             <Gallery
//                 images={[images.map((img) => ({ src: img }))[0]]}
//                 enableImageSelection={false}
//             />
//         </ImagesWrapper>
//     )
// }

export default ShopImages
