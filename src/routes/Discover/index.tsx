import { useQuery } from 'react-query'
import { useEffect, useState } from 'react'
import { useRecoil } from 'hooks/state'
import { topTagDataState } from 'states/artwork'
import { getMostUsedTags, getArtworkList } from 'services/artwork/get'

import TagList from './TagList.tsx'
import ArtworkList from './ArtworkList'
import TopArtistSlider from './TopArtistSlider'
import Loading from 'components/Loading'
import styles from './Discover.module.scss'

const Discover = () => {
  const [tagId, setTagId] = useState<undefined | number>(undefined)
  const [, setTopTagData] = useRecoil(topTagDataState)

  const { isLoading: tagDataLoading } = useQuery(['tag', 'top'], () => {
    getMostUsedTags(setTopTagData)
  })

  const {
    data: artworkListData,
    isLoading: isLoadingArtworkList,
    isError: isErrorArtworkList,
  } = useQuery(['artwork', 'list', ['tag', tagId]], getArtworkList(tagId), {
    staleTime: 1 * 60 * 1000,
  })
  console.log(artworkListData)

  const isEmpty = artworkListData?.length === 0
  const emptyCheackResult = isEmpty ? (
    <div className={styles.empty}>Empty</div>
  ) : (
    <ArtworkList artworkListData={artworkListData} />
  )
  return (
    <div className={styles.discoverWrapper}>
      <section className={styles.topArtistBox}>
        <h1>Top Artist</h1>
        <TopArtistSlider />
      </section>
      <section className={styles.discoverBox}>
        <h1>Discover</h1>
        {tagDataLoading ? <Loading heightValue={undefined} /> : <TagList setTagId={setTagId} />}
        {isLoadingArtworkList ? <Loading heightValue='260px' /> : emptyCheackResult}
      </section>
    </div>
  )
}

export default Discover
