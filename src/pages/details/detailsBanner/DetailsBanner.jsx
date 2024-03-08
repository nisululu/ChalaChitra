import React, { useState } from 'react'
import './style.scss'
import useFetch from '../../../hooks/useFetch'
import { useLocation } from 'react-router-dom'
import ContentWrapper from '../../../components/contentWrapper/ContentWrapper'
import LazyLoadImg from '../../../components/lazyLoad/LazyLoadImg'
import Poster from '../../../assets/no-poster.png'
import dayjs from 'dayjs'
import Genres from '../../../components/genres/Genres'
import { CircularProgressbar, buildStyles } from 'react-circular-progressbar'
import 'react-circular-progressbar/dist/styles.css'
import { PlayIcon } from '../PlayIcon'
import VideoPopup from '../../../components/videoPopup/VideoPopup'

const DetailsBanner = ({ video, crew }) => {

    const location = useLocation()
    const { data, loading } = useFetch(`${location?.pathname}`)

    const [show, setShow] = useState(false)
    const [videoId, setVideoId] = useState(null)

    const genreID = data?.genres?.map((item) => item.id)
    const avg_vote = data?.vote_average?.toFixed(1)
    const color = avg_vote < 5 ? '#FF5C5C' : '#5CFFB8'
    const director = crew?.filter((item) => item.job === "Director")
    const writer = crew?.filter((item) => item.job === "Writer")

    const playVideo = () => {
        setShow(true)
        setVideoId(video?.key)
    }

    return (
        <div className='detailsBanner'>
            {!loading ? (
                <>
                    {
                        data && (
                            <>
                                <div className="backdropImg">
                                    <LazyLoadImg image={data.poster_path ? "https://image.tmdb.org/t/p/original" + data.backdrop_path : Poster} />
                                </div>
                                <div className="opacityLayer"></div>
                                <ContentWrapper>
                                    <div className="content">
                                        <div className="left">
                                            <LazyLoadImg className='posterImg' image={"https://image.tmdb.org/t/p/original" + data.poster_path || Poster} />
                                        </div>
                                        <div className="right">
                                            <div className="title">{`${data.name || data.title} (${dayjs(data.release_date).format("YYYY")})`}</div>
                                            <div className="subTitle">{data.tagline}</div>

                                            <Genres ids={genreID} />

                                            <div className="row">
                                                <CircularProgressbar
                                                    minValue={0}
                                                    maxValue={10}
                                                    value={avg_vote}
                                                    text={avg_vote}
                                                    strokeWidth={10}
                                                    className='rating'
                                                    styles={buildStyles({
                                                        pathColor: `${color}`,
                                                        textColor: '#FFFFFF',
                                                        trailColor: 'none',
                                                    })}
                                                />

                                                <div className="playBtn" onClick={playVideo}>
                                                    <PlayIcon />
                                                    <span className='text'>Watch Trailer</span>
                                                </div>
                                            </div>

                                            <div className="overview">
                                                <div className="heading">Overview</div>
                                                <div className="description">{data.overview}</div>
                                            </div>

                                            <div className="info">
                                                <div className='infoItem'>
                                                    <span className="text bold">Status: {" "}</span>
                                                    <span className='text'>{data.status}</span>
                                                </div>

                                                <div className='infoItem'>
                                                    <span className="text bold">Release Date: {" "}</span>
                                                    <span className='text'>{dayjs(data.release_date || data.first_air_date).format("MMM D, YYYY")}</span>
                                                </div>

                                                {
                                                    (data.runtime || data.episode_run_time[0]) && (
                                                        <div className='infoItem'>
                                                            <span className="text bold">Runtime: {" "}</span>
                                                            <span className='text'>{data.runtime || data.episode_run_time?.[0]} min</span>
                                                        </div>
                                                    )
                                                }
                                            </div>
                                            {director?.[0] && (
                                                <>
                                                    <hr />
                                                    <div className="info">
                                                        <div className="infoItem">
                                                            <span className="text bold">
                                                                Director:{" "}
                                                            </span>
                                                            <span className="text">
                                                                {director?.map((item, index) => (
                                                                    <span key={index}>
                                                                        {item.name}
                                                                        {director.length - 1 !== index && ", "}
                                                                    </span>
                                                                ))}
                                                            </span>
                                                        </div>
                                                    </div>
                                                </>
                                            )}

                                            {writer?.[0] && (
                                                <>
                                                    <hr />
                                                    <div className="info">
                                                        <div className="infoItem">
                                                            <span className="text bold">
                                                                Writer:{" "}
                                                            </span>
                                                            <span className="text">
                                                                {writer?.map((item, index) => (
                                                                    <span key={index}>
                                                                        {item.name}
                                                                        {writer.length - 1 !== index && ", "}
                                                                    </span>
                                                                ))}
                                                            </span>
                                                        </div>
                                                    </div>
                                                </>
                                            )}

                                            <VideoPopup videoId ={videoId} setVideoId={setVideoId} show={show} setShow={setShow} />

                                        </div>
                                    </div>
                                </ContentWrapper>
                            </>
                        )
                    }
                </>
            ) : (
                <div className="detailsBannerSkeleton">
                    <ContentWrapper>
                        <div className="left skeleton "></div>
                        <div className="right">
                            <div className='row skeleton'></div>
                            <div className='row skeleton'></div>
                            <div className='row skeleton'></div>
                            <div className='row skeleton'></div>
                            <div className='row skeleton'></div>
                            <div className='row skeleton'></div>
                            <div className='row skeleton'></div>
                        </div>
                    </ContentWrapper>
                </div>
            )}
        </div>
    )
}

export default DetailsBanner
