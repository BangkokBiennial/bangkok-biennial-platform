import React, { useState, useEffect } from 'react'
import { withFirebase } from '../../../utils/Firebase'
import Loading from '../../atoms/Loading'
import moment from 'moment'

const PavilionDetail = ({ firebase, id }) => {
  const [_initFirebase, setInitFirebase] = useState(false)
  const [loading, setLoading] = useState(true)
  const [pavilionDetail, setPavilionDetail] = useState({})

  const fetch = async () => {
    try {
      const result = await firebase.getPavilionPublicInfoDetail(id)
      const pavilion = result.data()
      const posterWithPics = await Promise.all(
        pavilion.posters.map(async (poster) => {
          const url = await firebase.downloadImage(
            poster.fullPath,
          )
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
            url
          }
        })
      )
      setPavilionDetail({
        ...pavilion,
        artists: artistWithPics,
        posters: posterWithPics,
        supportMaterials: supportMaterialsWithPics
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

  return (
    <div className="pavilion-detail">
      {pavilionDetail.artists && (
        <div className="pavilion-detail__container">
          <h2>Artists</h2>
          {pavilionDetail.artists.map((artist) => (
            <div key={`poster-${artist.name}`}>
              <p>
                <b>Name</b> {artist.name}
              </p>
              <p>
                <b>Short Bio</b> {artist.shortBio}
              </p>
              <img
                height="400"
                src={artist.workImageUrl.url}
              />
            </div>
          ))}
        </div>
      )}
      {pavilionDetail.organizers && (
        <div className="pavilion-detail__container">
          <p>
            <b>organizers</b>
          </p>
          {pavilionDetail.organizers.map((organizer) => (
            <p key={`organizer-${organizer.name}`}>
              {organizer.name}
            </p>
          ))}
        </div>
      )}
      <div className="pavilion-detail__container">
        <h2>audio Material</h2>
        <p>{pavilionDetail.audioMaterial}</p>
      </div>
      <div className="pavilion-detail__container">
        <h2>longer TextOpenCalls</h2>
        <p>{pavilionDetail.longerTextOpenCalls}</p>
      </div>
      <div className="pavilion-detail__container">
        <h2>open Calls Other Public Contact</h2>
        <p>{pavilionDetail.openCallsOtherPublicContact}</p>
      </div>
      <div className="pavilion-detail__container">
        <h2>opencalls Phone Number</h2>
        <p>{pavilionDetail.opencallsPhoneNumber}</p>
      </div>
      <div className="pavilion-detail__container">
        <h2>opencalls Public Email</h2>
        <p>{pavilionDetail.opencallsPublicEmail}</p>
      </div>
      <div className="pavilion-detail__container">
        <h2>opencalls Url</h2>
        <p>{pavilionDetail.opencallsUrl}</p>
      </div>
      <div className="pavilion-detail__container">
        <h2>pavilion Facebook</h2>
        <p>{pavilionDetail.pavilionFacebook}</p>
      </div>
      <div className="pavilion-detail__container">
        <h2>pavilion Instagram</h2>
        <p>{pavilionDetail.pavilionInstagram}</p>
      </div>
      <div className="pavilion-detail__container">
        <h2>pavilion Long Description</h2>
        <p>{pavilionDetail.pavilionLongDescription}</p>
      </div>
      <div className="pavilion-detail__container">
        <h2>pavilion Mailing Address</h2>
        <p>{pavilionDetail.pavilionMailingAddress}</p>
      </div>
      <div className="pavilion-detail__container">
        <h2>pavilion Other Contact</h2>
        <p>{pavilionDetail.pavilionOtherContac}</p>
      </div>
      <div className="pavilion-detail__container">
        <h2>pavilion Other Social Medias</h2>
        <p>{pavilionDetail.pavilionOtherSocialMedias}</p>
      </div>
      <div className="pavilion-detail__container">
        <h2>pavilion Public Email</h2>
        <p>{pavilionDetail.pavilionPublicEmail}</p>
      </div>
      <div className="pavilion-detail__container">
        <h2>pavilion Twitter</h2>
        <p>{pavilionDetail.pavilionTwitter}</p>
      </div>
      <div className="pavilion-detail__container">
        <h2>pavilion Website</h2>
        <p>{pavilionDetail.pavilionWebsite}</p>
      </div>
      <div className="pavilion-detail__container">
        <h2>person Email Contact</h2>
        <p>{pavilionDetail.personEmailContact}</p>
      </div>
      <div className="pavilion-detail__container">
        <h2>person Name Contact</h2>
        <p>{pavilionDetail.personNameContact}</p>
      </div>
      {pavilionDetail.posters && (
        <div className="pavilion-detail__container">
          <h2>Posters</h2>
          {pavilionDetail.posters.map((poster) => {
            return (
              <div key={`poster-${poster.name}`}>
                <img height="400" src={poster.url} />
              </div>
            )
          })}
        </div>
      )}
      <div className="pavilion-detail__container">
        <h2>short Text OpenCalls</h2>
        <p>{pavilionDetail.shortTextOpenCalls}</p>
      </div>
      <div className="pavilion-detail__container">
        <h2>street Address</h2>
        <p>{pavilionDetail.streetAddress}</p>
      </div>
      <div className="pavilion-detail__container">
        <h2>submission Requirements</h2>
        <p>{pavilionDetail.submissionRequirements}</p>
      </div>
      {pavilionDetail.supportMaterials && (
        <div className="pavilion-detail__container">
          <h2>support Materials</h2>
          {pavilionDetail.supportMaterials.map(
            (supportMaterial) => (
              <img height="400" src={supportMaterial.url} />
            ),
          )}
        </div>
      )}
      <div className="pavilion-detail__container">
        <h2>start date</h2>
        <p>
          {moment(pavilionDetail.startDate, 'x').format(
            'DD MMM YYYY',
          )}
        </p>
      </div>
      <div className="pavilion-detail__container">
        <h2>end date</h2>
        <p>
          {moment(pavilionDetail.endDate, 'x').format(
            'DD MMM YYYY',
          )}
        </p>
      </div>
      <div className="pavilion-detail__container">
        <h2>telephone Number</h2>
        <p>{pavilionDetail.telephoneNumber}</p>
      </div>
      <div className="pavilion-detail__container">
        <h2>venue Location</h2>
        <p>{pavilionDetail.venueLocation}</p>
      </div>
      <div className="pavilion-detail__container">
        <h2>video Material</h2>
        <p>{pavilionDetail.videoMaterial}</p>
      </div>
    </div>
  )
}

export default withFirebase(PavilionDetail)
