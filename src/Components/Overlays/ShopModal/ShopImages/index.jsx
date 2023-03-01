import styled from 'styled-components'

const ImagesWrapper = styled.div`
    margin: auto;
    /* margin-top: 10px;
    margin-bottom: 10px; */
    width: 100%;

    display: flex;
    max-height: 100%;
    overflow: hidden;
`
const ImageSingle = styled.img`
    width: 100%;
    object-fit: cover;
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

function ShopImages({ images }) {
    return (
        <ImagesWrapper>
            {images.length == 1 && (
                <ImageSingle src={images[0]}>
                    {/* <ImageOne src={images[0]} /> */}
                </ImageSingle>
            )}
            {images.length == 2 && (
                <ImageDuo>
                    <ImageOne src={images[0]} />
                    <ImageOne src={images[1]} />
                </ImageDuo>
            )}
            {images.length > 2 && (
                <ImageTrio>
                    <ImageLeft>
                        <ImageOne src={images[0]} />
                    </ImageLeft>
                    <ImageRight>
                        <ImageTwo src={images[1]} />
                        <ImageTwo src={images[2]} />
                    </ImageRight>
                </ImageTrio>
            )}
        </ImagesWrapper>
    )
}

export default ShopImages
