import Slider from 'react-slick'
import 'slick-carousel/slick/slick.css'
import 'slick-carousel/slick/slick-theme.css'
import { useQuery } from 'react-query'
import { useState, useRef, useCallback } from 'react'
import { MdNavigateBefore, MdNavigateNext } from 'react-icons/md'
import { getTopCreators } from 'services/user/get'
import { IUserData } from 'types/user'

import Loading from 'components/Loading'
import Profile from './profile'
import styles from './TopArtistSlider.module.scss'

const TopArtistSlider = () => {
  const [isEnd, setIsEnd] = useState(false)
  const slickRef = useRef<Slider>(null)
  const { data: topUserData, isError, isLoading } = useQuery(['user', 'top'], getTopCreators())

  const initialSettings = {
    dots: false,
    infinite: false,
    speed: 700,
    slidesToShow: 10,
    slidesToScroll: 6,
    centerPadding: '0px',
    arrows: false,
  }

  const previous = useCallback(() => {
    slickRef?.current?.slickPrev()
    setIsEnd(false)
  }, [])

  const next = useCallback(() => {
    slickRef?.current?.slickNext()
    setIsEnd(true)
  }, [])

  return (
    <div className={styles.topArtistSliderWrapper}>
      <button onClick={previous} type='button' className={isEnd ? styles.beforeBtn : styles.endBtn}>
        <MdNavigateBefore size={35} />
      </button>
      <ul className={styles.sliderBox}>
        {isLoading ? (
          <Loading heightValue={undefined} />
        ) : (
          <Slider className={styles.slider} ref={slickRef} {...initialSettings}>
            {topUserData.map((userData: IUserData) => {
              return <Profile userData={userData} key={`profileKey${userData.name}`} />
            })}
          </Slider>
        )}
      </ul>
      <button onClick={next} type='button' className={isEnd ? styles.endBtn : styles.nextBtn}>
        <MdNavigateNext size={35} />
      </button>
    </div>
  )
}

export default TopArtistSlider
