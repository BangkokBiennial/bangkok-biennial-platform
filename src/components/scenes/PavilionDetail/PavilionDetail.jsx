import React, { useState, useEffect } from 'react'
import { withFirebase } from '../../../utils/Firebase'
import Loading from '../../atoms/Loading'
import {
  FaInstagramSquare,
  FaFacebookSquare,
  FaTwitterSquare,
} from 'react-icons/fa'
import DetailCard from './atoms/DetailCard'

const PavilionDetail = ({ firebase, id }) => {
  const [_initFirebase, setInitFirebase] = useState(false)
  const [loading, setLoading] = useState(true)
  const [pavilionDetail, setPavilionDetail] = useState({})

  const fetch = async () => {
    try {
      const result = await firebase.getPavilionPublicInfoDetail(id)
      const pavilion = result.data()
      console.log(pavilion)
      const posterWithPics = await Promise.all(
        pavilion.posters.map(async (poster) => {
          const url = await firebase.downloadImage(poster.fullPath)
          return {
            ...poster,
            url,
          }
        }),
      )
      const artistWithPics = await Promise.all(
        pavilion.artists.map(async (artist) => {
          const url = await firebase.downloadImage(
            artist.workImageUrl.fullPath,
          )
          return {
            ...artist,
            workImageUrl: {
              ...artist.workImageUrl,
              url,
            },
          }
        }),
      )
      const supportMaterialsWithPics = await Promise.all(
        pavilion.supportMaterials.map(async (supportMaterial) => {
          const url = await firebase.downloadImage(
            supportMaterial.fullPath,
          )
          return {
            ...supportMaterial,
            url,
          }
        }),
      )
      setPavilionDetail({
        ...pavilion,
        artists: artistWithPics,
        posters: posterWithPics,
        supportMaterials: supportMaterialsWithPics,
      })
      setLoading(false)
    } catch (error) {
      setLoading(false)
    }
  }

  useEffect(() => {
    if (firebase && !_initFirebase) {
      setInitFirebase(true)
      setLoading(false)
    }
  }, [firebase])

  useEffect(() => {
    setLoading(true)
    if (firebase) {
      fetch()
    }
  }, [firebase])

  if (loading) {
    return (
      <div className="home container">
        <Loading />
      </div>
    )
  }

  const renderPosters = () => {
    if (!pavilionDetail.posters) {
      return null
    }
    return (
      <div className="pavilion-detail__container">
        <div className="pavilion-detail__poster__container">
          {pavilionDetail.posters.map((poster) => {
            return (
              <div
                className="pavilion-detail__poster__content"
                key={`poster-${poster.name}`}
              >
                <img src={poster.url} />
              </div>
            )
          })}
        </div>
      </div>
    )
  }

  const renderArtists = () => {
    if (!pavilionDetail.artists) {
      return null
    }

    return (
      <div className="pavilion-detail__container">
        <h2>Artists</h2>
        <div className="pavilion-detail__artist__container">
          {pavilionDetail.artists.map((artist) => (
            <DetailCard
              name={artist.name}
              shortBio={artist.shortBio}
              link={artist.artistLink}
              imageUrl={artist.workImageUrl.url}
              key={`artist-${artist.name}`}
            />
          ))}
        </div>
      </div>
    )
  }

  const renderOrganizers = () => {
    if (!pavilionDetail.organizers) {
      return null
    }

    return (
      <div className="pavilion-detail__container">
        <h2>Organizers</h2>
        <div className="pavilion-detail__organizer__container">
          {pavilionDetail.organizers.map((organizer) => (
            <DetailCard
              name={organizer.name}
              shortBio={organizer.shortBio}
              link={organizer.organizerLink}
              key={`organiser-${organizer.name}`}
            />
          ))}
        </div>
      </div>
    )
  }

  const renderCurators = () => {
    if (!pavilionDetail.curators) {
      return null
    }

    return (
      <div className="pavilion-detail__container">
        <h2>Curators</h2>
        <div className="pavilion-detail__curator__container">
          {pavilionDetail.curators.map((curator) => (
            <DetailCard
              name={curator.name}
              shortBio={curator.shortBio}
              link={curator.artistLink}
              key={`curator-${curator.name}`}
            />
          ))}
        </div>
      </div>
    )
  }

  const renderMaterials = () => {
    const renderSupportMaterials = () => {
      if (!pavilionDetail.supportMaterials) {
        return null
      }

      return (
        <div className="pavilion-detail__container">
          <div className="pavilion-detail__support-material__container">
            {pavilionDetail.supportMaterials.map(
              (supportMaterial) => (
                <div
                  className="pavilion-detail__support-material__content"
                  key={`supportMaterial-${supportMaterial.name}}`}
                >
                  <img src={supportMaterial.url} />
                </div>
              ),
            )}
          </div>
        </div>
      )
    }

    return (
      <div className="pavilion-detail__container">
        <h2>Materials</h2>
        {renderSupportMaterials()}
      </div>
    )
  }

  const renderOpenCalls = () => {
    const isOpenCallsOpen = pavilionDetail.shortTextOpenCalls
      || pavilionDetail.longerTextOpenCalls
      || pavilionDetail.openCallsOtherPublicContact
      || pavilionDetail.opencallsPhoneNumber
      || pavilionDetail.opencallsPublicEmail
      || pavilionDetail.opencallsUrl
      || pavilionDetail.submissionRequirements

    if (!isOpenCallsOpen) {
      return null
    }

    return (
      <div className="pavilion-detail__container">
        <h2>Open Calls</h2>
        <p className="pavilion-detail__open-calls__text">{pavilionDetail.shortTextOpenCalls}</p>
        <p className="pavilion-detail__open-calls__text">{pavilionDetail.longerTextOpenCalls}</p>
        <p className="pavilion-detail__open-calls__text">{pavilionDetail.submissionRequirements}</p>
        <h3>Contacts</h3>
        <p className="pavilion-detail__open-calls__text">{pavilionDetail.opencallsPhoneNumber}</p>
        <p className="pavilion-detail__open-calls__text">{pavilionDetail.opencallsPublicEmail}</p>
        <a href={pavilionDetail.opencallsUrl} 
          target="_blank" 
          rel="noreferrer"
          className="pavilion-detail__open-calls__link">
          {pavilionDetail.opencallsUrl
        }</a>
        <p className="pavilion-detail__open-calls__text">{pavilionDetail.openCallsOtherPublicContact}</p>
      </div>
    )
  }

  const renderSocialMedias = () => {
    return (
      <div className="pavilion-detail__container">
        <h2>Social Medias</h2>
        <div className="pavilion-detail__social-media">
          {pavilionDetail.pavilionInstagram && (
            <FaInstagramSquare
              className="pavilion-detail__social-media__icon"
              size="40"
              onClick={() =>
                window.open(pavilionDetail.pavilionInstagram)
              }
            />
          )}
          {pavilionDetail.pavilionFacebook && (
            <FaFacebookSquare
              className="pavilion-detail__social-media__icon"
              size="40"
              onClick={() =>
                window.open(pavilionDetail.pavilionFacebook)
              }
            />
          )}
          {pavilionDetail.pavilionTwitter && (
            <FaTwitterSquare
              className="pavilion-detail__social-media__icon"
              size="40"
              onClick={() =>
                window.open(pavilionDetail.pavilionTwitter)
              }
            />
          )}
          {pavilionDetail.pavilionTwitter && (
            <FaTwitterSquare
              className="pavilion-detail__social-media__icon"
              size="40"
              onClick={() =>
                window.open(pavilionDetail.pavilionTwitter)
              }
            />
          )}
          
        </div>
      </div>
    )
  }

  const renderVenues = () => {
    return (
      <div className="pavilion-detail__container">
        <h2>Venues</h2>
        <p className="pavilion-detail__venues__text"><b>{pavilionDetail.venueLocation}</b></p>
        <p className="pavilion-detail__venues__text">{pavilionDetail.streetAddress}</p>
        <a className="pavilion-detail__venues__link" href={pavilionDetail.googleMapLink}>
          {pavilionDetail.googleMapLink}
        </a>
      </div>
    )
  }

  const renderContacts = () => {
    
  }

  return (
    <div className="pavilion-detail">
      <div className="pavilion-detail__container">
        <p className="pavilion-detail__content__title">
          {pavilionDetail.pavilionName}
        </p>
      </div>
      <div className="pavilion-detail__container">
        <p className="pavilion-detail__content__text">
          {pavilionDetail.pavilionBriefDescription}
        </p>
      </div>
      <div className="pavilion-detail__container">
        <p className="pavilion-detail__content__text">
          {pavilionDetail.pavilionLongDescription}
        </p>
      </div>
      {renderPosters()}
      {renderVenues()}
      {renderArtists()}
      {renderOrganizers()}
      {renderCurators()}
      {renderMaterials()}
      {renderOpenCalls()}
      {renderSocialMedias()}
    </div>
  )
}

export default withFirebase(PavilionDetail)
