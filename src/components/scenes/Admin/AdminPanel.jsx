import React, { useState, useEffect } from 'react'
import { Collapse } from 'react-collapse'
import { withFirebase } from '../../../utils/Firebase'
import { useToasts } from 'react-toast-notifications'
import Loading from '../../atoms/Loading'
import moment from 'moment'
import { omit } from 'lodash'
import { transformDateLaunchToReadable } from '../../../constants/dateLaunch'

const AdminPanel = ({ firebase }) => {
  const [_initFirebase, setInitFirebase] = useState(false)
  const [loading, setLoading] = useState(true)
  const [pavilion, setPavilion] = useState([])
  const [isOpen, setIsOpen] = useState([])

  const { addToast } = useToasts()

  const fetch = async () => {
    setLoading(true)
    try {
      const pavilionAdvanceInfoSnapshot = await firebase.getPavilionAdvanceInfo()
      const pavilionData = []
      pavilionAdvanceInfoSnapshot.forEach((pavilionAdvanceInfo) => {
        pavilionData.push({
          id: pavilionAdvanceInfo.id,
          ...pavilionAdvanceInfo.data(),
        })
      })
      const pd = await Promise.all(
        pavilionData.map(async (p) => {
          const userDataSnapshot = await firebase.getUser(p.id)
          return {
            ...p,
            userInformation: userDataSnapshot.data(),
          }
        }),
      )
      const finalPavilionData = await Promise.all(
        pd.map(async (pavilion) => {
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
          return {
            ...pavilion,
            artists: artistWithPics,
            posters: posterWithPics,
          }
        }),
      )
      setPavilion(finalPavilionData)
      setIsOpen(pavilionData.map(() => false))

      setLoading(false)
    } catch (error) {
      console.log(error)
      setLoading(false)
    }
  }

  const handleSetIsOpen = (index) => {
    const newIsOpen = isOpen.map((a, i) => (i === index ? !a : a))
    setIsOpen(newIsOpen)
  }

  const handleApprove = async (pavilionIndex) => {
    setLoading(true)
    try {
      const pavilionAdvanceInfoData = omit(pavilion[pavilionIndex], [
        'userInformation',
      ])
      const pavilionBasic = await firebase.getPavilionBasicInfoDetail(
        pavilionAdvanceInfoData.id,
      )
      await firebase.approvePavilion(
        { ...pavilionAdvanceInfoData, ...pavilionBasic.data() },
        pavilionAdvanceInfoData.id,
      )
      addToast('Successfully approved', { appearance: 'success' })
      setLoading(false)
      await fetch()
    } catch (error) {
      setLoading(false)
      addToast(`${error.message}`, {
        appearance: 'error',
        autoDismiss: false,
      })
    }
  }

  const handleDecline = async (pavilionIndex) => {
    setLoading(true)
    try {
      const pavilionData = pavilion[pavilionIndex]
      await firebase.declinePavilion(pavilionData.id)
      addToast('Successfully declined', { appearance: 'success' })
      setLoading(false)
    } catch (error) {
      setLoading(false)
      addToast(`${error.message}`, {
        appearance: 'error',
        autoDismiss: false,
      })
    }
  }

  useEffect(() => {
    if (firebase && !_initFirebase) {
      setInitFirebase(true)
      setLoading(false)
    }
  }, [firebase])

  useEffect(() => {
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
    <div className="admin-panel">
      {pavilion &&
        pavilion.map((proposal, pIndex) => {
          return (
            <>
              <div
                className="admin-panel__toggle"
                onClick={() => handleSetIsOpen(pIndex)}
              >
                <div className="admin-panel__toggle__label">
                  {isOpen[pIndex] ? '▼' : '►'}{' '}
                  {proposal.userInformation.username}:{' '}
                  {proposal.userInformation.email}
                </div>
                {proposal.status === 'approved' ? (
                  <div className="admin-panel__approved-text">
                    approved
                  </div>
                ) : proposal.status === 'declined' ? (
                  <div className="admin-panel__declined-text">
                    declined
                  </div>
                ) : (
                  <div className="admin-panel__toggle__action-btn">
                    <button onClick={() => handleApprove(pIndex)}>
                      Approve
                    </button>
                    <button onClick={() => handleDecline(pIndex)}>
                      Decline
                    </button>
                  </div>
                )}
              </div>
              <Collapse isOpened={isOpen[pIndex]}>
                <div
                  className="admin-panel__content"
                  key={`proposal-${proposal.id}`}
                >
                  {proposal.artists && (
                    <div className="admin-panel__container">
                      <h2>Artists</h2>
                      {proposal.artists.map((artist) => (
                        <div key={`poster-${artist.name}`}>
                          <p>
                            <b>Name</b> {artist.name}
                          </p>
                          <p>
                            <b>Short Bio</b> {artist.shortBio}
                          </p>
                          <p>
                            <b>Image name</b>{' '}
                            {artist.workImageUrl.name}
                          </p>
                          <img
                            height="400"
                            src={artist.workImageUrl.url}
                          />
                        </div>
                      ))}
                    </div>
                  )}
                  {proposal.organizers && (
                    <div className="admin-panel__container">
                      <p>
                        <b>organizers</b>
                      </p>
                      {proposal.organizers.map((organizer) => (
                        <p key={`organizer-${organizer.name}`}>
                          {organizer.name}
                        </p>
                      ))}
                    </div>
                  )}
                  {proposal.userInformation.dateLaunch && (
                    <div className="admin-panel__container">
                      <h2>Date launch</h2>
                      {proposal.userInformation.dateLaunch.map(
                        (launch) => (
                          <p>
                            {transformDateLaunchToReadable(launch)}
                          </p>
                        ),
                      )}
                    </div>
                  )}
                  <div className="admin-panel__container">
                    <h2>audio Material</h2>
                    <p>{proposal.audioMaterial}</p>
                  </div>
                  <div className="admin-panel__container">
                    <h2>longer TextOpenCalls</h2>
                    <p>{proposal.longerTextOpenCalls}</p>
                  </div>
                  <div className="admin-panel__container">
                    <h2>open Calls Other Public Contact</h2>
                    <p>{proposal.openCallsOtherPublicContact}</p>
                  </div>
                  <div className="admin-panel__container">
                    <h2>opencalls Phone Number</h2>
                    <p>{proposal.opencallsPhoneNumber}</p>
                  </div>
                  <div className="admin-panel__container">
                    <h2>opencalls Public Email</h2>
                    <p>{proposal.opencallsPublicEmail}</p>
                  </div>
                  <div className="admin-panel__container">
                    <h2>opencalls Url</h2>
                    <p>{proposal.opencallsUrl}</p>
                  </div>
                  <div className="admin-panel__container">
                    <h2>pavilion Facebook</h2>
                    <p>{proposal.pavilionFacebook}</p>
                  </div>
                  <div className="admin-panel__container">
                    <h2>pavilion Instagram</h2>
                    <p>{proposal.pavilionInstagram}</p>
                  </div>
                  <div className="admin-panel__container">
                    <h2>pavilion Long Description</h2>
                    <p>{proposal.pavilionLongDescription}</p>
                  </div>
                  <div className="admin-panel__container">
                    <h2>pavilion Mailing Address</h2>
                    <p>{proposal.pavilionMailingAddress}</p>
                  </div>
                  <div className="admin-panel__container">
                    <h2>pavilion Other Contact</h2>
                    <p>{proposal.pavilionOtherContact}</p>
                  </div>
                  <div className="admin-panel__container">
                    <h2>pavilion Other Social Medias</h2>
                    <p>{proposal.pavilionOtherSocialMedias}</p>
                  </div>
                  <div className="admin-panel__container">
                    <h2>pavilion Public Email</h2>
                    <p>{proposal.pavilionPublicEmail}</p>
                  </div>
                  <div className="admin-panel__container">
                    <h2>pavilion Twitter</h2>
                    <p>{proposal.pavilionTwitter}</p>
                  </div>
                  <div className="admin-panel__container">
                    <h2>pavilion Website</h2>
                    <p>{proposal.pavilionWebsite}</p>
                  </div>
                  <div className="admin-panel__container">
                    <h2>person Email Contact</h2>
                    <p>{proposal.personEmailContact}</p>
                  </div>
                  <div className="admin-panel__container">
                    <h2>person Name Contact</h2>
                    <p>{proposal.personNameContact}</p>
                  </div>
                  {proposal.posters && (
                    <div className="admin-panel__container">
                      <h2>Posters</h2>
                      {proposal.posters.map((poster) => {
                        return (
                          <div key={`poster-${poster.name}`}>
                            <p>
                              <b>Image Name</b> {poster.name}
                            </p>
                            <img height="400" src={poster.url} />
                          </div>
                        )
                      })}
                    </div>
                  )}
                  <div className="admin-panel__container">
                    <h2>short Text OpenCalls</h2>
                    <p>{proposal.shortTextOpenCalls}</p>
                  </div>
                  <div className="admin-panel__container">
                    <h2>street Address</h2>
                    <p>{proposal.streetAddress}</p>
                  </div>
                  <div className="admin-panel__container">
                    <h2>submission Requirements</h2>
                    <p>{proposal.submissionRequirements}</p>
                  </div>
                  {proposal.supportMaterials && (
                    <div className="admin-panel__container">
                      <h2>support Materials</h2>
                      {proposal.supportMaterials.map(
                        (supportMaterial) => (
                          <p
                            key={`supportMaterial-${supportMaterial.name}`}
                          >
                            {supportMaterial.name}
                          </p>
                        ),
                      )}
                    </div>
                  )}
                  <div className="admin-panel__container">
                    <h2>start date</h2>
                    <p>
                      {moment(proposal.startDate, 'x').format(
                        'DD MMM YYYY',
                      )}
                    </p>
                  </div>
                  <div className="admin-panel__container">
                    <h2>end date</h2>
                    <p>
                      {moment(proposal.endDate, 'x').format(
                        'DD MMM YYYY',
                      )}
                    </p>
                  </div>
                  <div className="admin-panel__container">
                    <h2>telephone Number</h2>
                    <p>{proposal.telephoneNumber}</p>
                  </div>
                  <div className="admin-panel__container">
                    <h2>venue Location</h2>
                    <p>{proposal.venueLocation}</p>
                  </div>
                  <div className="admin-panel__container">
                    <h2>video Material</h2>
                    <p>{proposal.videoMaterial}</p>
                  </div>
                </div>{' '}
              </Collapse>
            </>
          )
        })}
    </div>
  )
}

export default withFirebase(AdminPanel)
