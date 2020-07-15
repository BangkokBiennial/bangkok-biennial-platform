import React, { useState, useEffect } from 'react';
import { Collapse } from 'react-collapse';
import { withFirebase } from '../../../utils/Firebase'
import Loading from '../../atoms/Loading'
import Button from '../../atoms/Button'

const AdminPanel = ({ firebase }) => {

  const [_initFirebase, setInitFirebase] = useState(false)
  const [loading, setLoading] = useState(true)
  const [data, setData] = useState([])
  const [isOpen, setIsOpen] = useState([])

  const handleSetIsOpen = (index) => {
    const newIsOpen = isOpen.map((a, i) => i === index ? !a : a)
    setIsOpen(newIsOpen)
  }

  useEffect(() => {
    if (firebase && !_initFirebase) {
      setInitFirebase(true)
      setLoading(false)
    }
  }, [firebase])

  useEffect(() => {
    if (firebase) {
      const fetch = async () => {
        setLoading(true)
        try {
          const pavilionAdvanceInfoSnapshot = await firebase.getPavilionAdvanceInfo()
          const pavilionData = []
          pavilionAdvanceInfoSnapshot.forEach((pavilionAdvanceInfo => {     
            pavilionData.push({ id: pavilionAdvanceInfo.id, ...pavilionAdvanceInfo.data() })
          }))
          setData(pavilionData)
          setIsOpen(pavilionData.map(() => false))

          setLoading(false)
        } catch (error) {
          console.log(error)
          setLoading(false)
        }
      }

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
      {
        data && data.map((proposal, pIndex) => {
          return (<>
            <p className="admin-panel__toggle" onClick={() => handleSetIsOpen(pIndex)}>
              {isOpen[pIndex] ? '▼' : '►'} {proposal.id}
            </p>
            <Collapse isOpened={isOpen[pIndex]}>
              <div className="admin-panel__content" key={`proposal-${proposal.id}`}>
                {
                  proposal.artists && (
                    <div className="admin-panel__container">
                      <p><b>artists</b></p>
                      { proposal.artists.map((artist) => (<p key={`artist-${artist.name}`}>{artist.name}</p>)) }
                    </div>
                  )
                }
                {
                  proposal.organizers && (
                    <div className="admin-panel__container">
                      <p><b>organizers</b></p>
                      { proposal.organizers.map((organizer) => (<p key={`organizer-${organizer.name}`}>{organizer.name}</p>)) }
                    </div>
                  )
                } 
                <div className="admin-panel__container">
                  <p><b>audio Material</b></p>
                  <p>{proposal.audioMaterial}</p>
                </div>
                <div className="admin-panel__container">
                  <p><b>longer TextOpenCalls</b></p>
                  <p>{proposal.longerTextOpenCalls}</p>
                </div>
                <div className="admin-panel__container">
                  <p><b>open Calls Other Public Contact</b></p>
                  <p>{proposal.openCallsOtherPublicContact}</p>
                </div>
                <div className="admin-panel__container">
                  <p><b>opencalls Phone Number</b></p>
                  <p>{proposal.opencallsPhoneNumber}</p>
                </div>
                <div className="admin-panel__container">
                  <p><b>opencalls Public Email</b></p>
                  <p>{proposal.opencallsPublicEmail}</p>
                </div>
                <div className="admin-panel__container">
                  <p><b>opencalls Url</b></p>
                  <p>{proposal.opencallsUrl}</p>
                </div>
                <div className="admin-panel__container">
                  <p><b>pavilion Facebook</b></p>
                  <p>{proposal.pavilionFacebook}</p>
                </div>
                <div className="admin-panel__container">
                  <p><b>pavilion Instagram</b></p>
                  <p>{proposal.pavilionInstagram}</p>
                </div>
                <div className="admin-panel__container">
                  <p><b>pavilion Long Description</b></p>
                  <p>{proposal.pavilionLongDescription}</p>
                </div>
                <div className="admin-panel__container">
                  <p><b>pavilion Mailing Address</b></p>
                  <p>{proposal.pavilionMailingAddress}</p>
                </div>
                <div className="admin-panel__container">
                  <p><b>pavilion Other Contact</b></p>
                  <p>{proposal.pavilionOtherContact}</p>
                </div>
                <div className="admin-panel__container">
                  <p><b>pavilion Other Social Medias</b></p>
                  <p>{proposal.pavilionOtherSocialMedias}</p>
                </div>
                <div className="admin-panel__container">
                  <p><b>pavilion Public Email</b></p>
                  <p>{proposal.pavilionPublicEmail}</p>
                </div>
                <div className="admin-panel__container">
                  <p><b>pavilion Twitter</b></p>
                  <p>{proposal.pavilionTwitter}</p>
                </div>
                <div className="admin-panel__container">
                  <p><b>pavilion Website</b></p>
                  <p>{proposal.pavilionWebsite}</p>
                </div>
                <div className="admin-panel__container">
                  <p><b>person Email Contact</b></p>
                  <p>{proposal.personEmailContact}</p>
                </div>
                <div className="admin-panel__container">
                  <p><b>person Name Contact</b></p>
                  <p>{proposal.personNameContact}</p>
                </div>
                { 
                  proposal.posters && (
                    <div className="admin-panel__container">
                      <p>posters</p>
                      { proposal.posters.map(poster => (<p key={`poster-${poster.name}`}>{poster.name}</p>)) }
                    </div>
                  )
                }
                <div className="admin-panel__container">
                  <p><b>shortTextOpenCalls</b></p>
                  <p>{proposal.shortTextOpenCalls}</p>
                </div>
                <div className="admin-panel__container">
                  <p><b>streetAddress</b></p>
                  <p>{proposal.streetAddress}</p>
                </div>
                <div className="admin-panel__container">
                  <p><b>submissionRequirements</b></p>
                  <p>{proposal.submissionRequirements}</p>
                </div>
                {
                  proposal.supportMaterials && (
                    <div className="admin-panel__container">
                      <p><b>supportMaterials</b></p>
                      { proposal.supportMaterials.map(supportMaterial => (<p key={`supportMaterial-${supportMaterial.name}`}>{supportMaterial.name}</p>)) }
                    </div>
                  )
                }
                <div className="admin-panel__container">
                  <p><b>telephoneNumber</b></p>
                  <p>{proposal.telephoneNumber}</p>
                </div>
                <div className="admin-panel__container">
                  <p><b>venueLocation</b></p>
                  <p>{proposal.venueLocation}</p>
                </div>
                <div className="admin-panel__container">
                  <p><b>videoMaterial</b></p>
                  <p>{proposal.videoMaterial}</p>
                </div>
              </div>
            </Collapse>
          </>)
        })
      }
    </div>
  );
}

export default withFirebase(AdminPanel);
