import React, { Component } from 'react';
import { withFirebase } from '../../../utils/Firebase';
import Input from '../../atoms/Input';
import Textarea from '../../atoms/Textarea'
import Button from '../../atoms/Button';
import CheckBox from '../../atoms/CheckBox'
import Loading from '../../atoms/Loading';
import UploadImage from '../../atoms/UploadImage'
import { FiPlusCircle, FiXCircle } from "react-icons/fi";
import Switch from 'react-switch';
import DatePicker from 'react-datepicker';
import 'react-phone-number-input/style.css'
import PhoneInput from 'react-phone-number-input'

import "react-datepicker/dist/react-datepicker.css";


class Home extends Component {
  _initFirebase = false;

  state = {
    loading: true,
    pavillionName: '',
    pavilionBriefDescription: '',
    pavilionLongDescription: '',
    personNameContact: '',
    personEmailContact: '',
    isWillingToBeContactedByMedia: false,
    pavilionWebsite: '',
    pavilionPublicEmail: '',
    pavilionOtherContact: '',
    pavilionMailingAddress: '',
    pavilionFacebook: '',
    pavilionInstagram: '',
    pavilionTwitter: '',
    pavilionOtherSocialMedias: '',
    videoMaterial: '',
    audioMaterial: '',
    artists: [
      {
        name: '',
        artistLink: '',
        shortBio: '',
        workImage: null
      }
    ],
    curators: [],
    organizers: [],
    isVenueChecked: false,
    isVenueSecured: false,
    isJoinedSeekingVenues: false,
    venueLocation: '',
    streetAddress: '',
    googleMapLink: '',
    startDate: null,
    endDate: null,
    openningHours: null,
    closingHours: null,
    telephoneNumber: '',
    isOpenCalls: false,
    shortTextOpenCalls: '',
    longerTextOpenCalls: '',
    opencallsUrl: '',
    submissionRequirements: '',
    openCallsProvidingsList: [
      {
        openCallsProviding: ''
      }
    ],
    opencallsPublicEmail: '',
    opencallsPhoneNumber: '',
    openCallsOtherPublicContact: ''
  };

  firebaseInit = () => {
    if (this.props.firebase && !this._initFirebase) {
      this._initFirebase = true;
    }
  };

  componentDidMount() {
    this.firebaseInit();
  }

  componentDidUpdate() {
    this.firebaseInit();
  }

  handleSubmit = e => {
    e.preventDefault();
    const { title, description, posts } = this.state;
    const { firebase } = this.props;

    let slug =
      (title.match(/^[a-zA-Z0-9 ]*$/, '') &&
        title.match(/^[a-zA-Z0-9 ]*$/, '')[0]) ||
      '';

    const latestPost = {
      title,
      slug:
        slug
          .toLowerCase()
          .split(' ')
          .join('-') +
        Math.floor(Math.random() * 200) +
        1,
      description,
    };

    const newPosts = [latestPost, ...posts];

    this.setState({
      posts: newPosts,
      title: '',
      description: '',
    });

    firebase.posts().add({
      ...latestPost,
    });
  };

  handleChange = e => {
    const { name, value } = e.target;
    this.setState({
      [name]: value,
    });
  };

  handleDeepChange = (e) => {
    const { name, value } = e.target;
    const [key, deepKey, index] = name.split(',')
    this.setState(prevState => ({
      [key]: prevState[key].map((kv, i) => {
        if (parseInt(index) === i) {
          return {
            ...kv,
            [deepKey]: value
          }
        }

        return kv
      })
    }))
  }

  addMoreArtist = (e) => {
    e.preventDefault()
    this.setState((prevState) => ({
      artists: [
        ...prevState.artists,
        {
          name: '',
          artistLink: '',
          shortBio: '',
          workImage: null
        }
      ]
    }))
  }

  addMoreCurator = (e) => {
    e.preventDefault()
    this.setState((prevState) => ({
      curators: [
        ...prevState.curators,
        {
          name: '',
          curatorLink: '',
          shortBio: '',
        }
      ]
    }))
  }

  addMoreOrganizer = (e) => {
    e.preventDefault()
    this.setState((prevState) => ({
      organizers: [
        ...prevState.organizers,
        {
          name: '',
          link: '',
          shortBio: '',
        }
      ]
    }))
  }

  addMoreOpenCallsProviding = (e) => {
    e.preventDefault()
    this.setState((prevState) => ({
      openCallsProvidingsList: [
        ...prevState.openCallsProvidingsList,
        {
          openCallsProviding: ''
        }
      ]
    }))
  }

  removeArtist = (artistIndex) => {
    this.setState((prevState) => ({
      artists: prevState.artists.filter((artist, index) => index !== artistIndex)
    }))
  }

  removeCurator = (curatorIndex) => {
    this.setState((prevState) => ({
      curators: prevState.curators.filter((curator, index) => index !== curatorIndex)
    }))
  }

  removeOrganizer = (organizerIndex) => {
    this.setState((prevState) => ({
      organizers: prevState.organizers.filter((organizer, index) => index !== organizerIndex)
    }))
  }

  removeOpenCallsProviding = (openCallsProvidingIndex) => {
    this.setState((prevState) => ({
      openCallsProvidingsList: prevState.openCallsProvidingsList.filter((openCallsProviding, index) => index !== openCallsProvidingIndex)
    }))
  }

  handleToggleIsWillingToBeContactedByMedia = () => {
    this.setState((prevState) => ({
      isWillingToBeContactedByMedia: !prevState.isWillingToBeContactedByMedia
    }))
  }

  handleSwitchVenue = () => {
    this.setState((prevState) => ({
      isVenueChecked: !prevState.isVenueChecked,
      isVenueSecured: false
    }))
  }
  handleSwitchVenueSecured = () => {
    this.setState((prevState) => ({
      isVenueSecured: !prevState.isVenueSecured
    }))
  }

  handleToggleIsJoinedSeekingVenues = () => {
    this.setState((prevState) => ({
      isJoinedSeekingVenues: !prevState.isJoinedSeekingVenues
    }))
  }

  handleStartDate = (startDate) => {
    this.setState({
      startDate
    })
  }
  handleEndDate = (endDate) => {
    this.setState({
      endDate
    })
  }
  handleOpeningHours = (openningHours) => {
    this.setState({
      openningHours
    })
  }
  handleClosingHours = (closingHours) => {
    this.setState({
      closingHours
    })
  }
  handleChangeTelephoneNumber = (telephoneNumber) => {
    this.setState({
      telephoneNumber
    })
  }

  handleSubmit = () => {
    console.log(this.state)
  }

  handleSwitchOpenCalls = () => {
    this.setState((prevState) => ({
      isOpenCalls: !prevState.isOpenCalls,
      shortTextOpenCalls: '',
      longerTextOpenCalls: '',
      opencallsUrl: '',
      submissionRequirements: '',
      openCallsProvidingsList: [
        {
          openCallsProviding: ''
        }
      ],
      opencallsPublicEmail: '',
      opencallsPhoneNumber: '',
      openCallsOtherPublicContact: ''
    }))
  }

  render() {
    const {
      loading,
      pavillionName,
      pavilionBriefDescription,
      pavilionLongDescription,
      personNameContact,
      personEmailContact,
      isWillingToBeContactedByMedia,
      pavilionWebsite,
      pavilionPublicEmail,
      pavilionOtherContact,
      pavilionMailingAddress,
      pavilionFacebook,
      pavilionInstagram,
      pavilionTwitter,
      pavilionOtherSocialMedias,
      videoMaterial,
      audioMaterial,
      artists,
      curators,
      organizers,
      isVenueChecked,
      isVenueSecured,
      isJoinedSeekingVenues,
      venueLocation,
      streetAddress,
      googleMapLink,
      openningHours,
      closingHours,
      telephoneNumber,
      startDate,
      endDate,
      isOpenCalls,
      shortTextOpenCalls,
      longerTextOpenCalls,
      opencallsUrl,
      submissionRequirements,
      openCallsProvidingsList,
      opencallsPublicEmail,
      opencallsPhoneNumber,
      openCallsOtherPublicContact,
    } = this.state;

    if (loading) return <Loading />;

    return (
      <div className="home container">
        <div className="home__details">
          <h1 className="home__title">Register Form</h1>
        </div>

        <div className="home__register">
          <div className="home__register__form">
            <form onSubmit={this.handleSubmit}>
              <div className="home__register__form__title">The Pavillion</div>
              <Input
                name="pavillionName"
                type="text"
                value={pavillionName}
                labelName="Name of Pavillion"
                onChange={this.handleChange}
                required
              />
              <Input
                name="pavilionBriefDescription"
                type="text"
                value={pavilionBriefDescription}
                labelName="Brief description of the pavilion"
                onChange={this.handleChange}
                required
              />
              <Input
                name="pavilionLongDescription"
                type="text"
                value={pavilionLongDescription}
                labelName="Longer description of pavilion (curatorial statement, etc)"
                onChange={this.handleChange}
                required
              />

              <div className="home__register__form__title">Artists</div>
              <p className="home__register__form__paragraph">​Artist(s) involved</p>
              <div className="home__register__form__list__container">
                {
                  artists.map((artist, index) => (
                    <div className="home__register__form__list__element">
                      <div className="home__register__form__list__element__close">
                        <FiXCircle
                          onClick={() => this.removeArtist(index)}
                        />
                      </div>
                      <Input
                        name={`artists,name,${index}`}
                        type="text"
                        value={artist.name}
                        labelName="Name"
                        onChange={this.handleDeepChange}
                        required
                      />
                      <Input
                        name={`artists,artistLink,${index}`}
                        type="text"
                        value={artist.artistLink}
                        labelName="Individual artist’s links (website, portfolio, etc)"
                        onChange={this.handleDeepChange}
                      />
                      <Input
                        name={`artists,shortBio,${index}`}
                        type="textarea"
                        row={15}
                        column={10}
                        value={artist.shortBio}
                        labelName="​Short Bio of each artist (Max 250 words)"
                        onChange={this.handleDeepChange}
                        required
                      />
                      <div className="input__label__container">
                        <div className="input__label__asterisk">*</div>
                        <div className="home__register__form__label">One image of artist’s work</div>
                      </div>
                      <UploadImage
                        singleImage={true}
                      />
                    </div>
                  ))
                }
              </div>
              <Button
                onClick={this.addMoreArtist}
                type="button"
                className="home__register__form__add-btn"
                component={<span> <FiPlusCircle/> add more artist </span>}
              />

              <div className="home__register__form__title">Curators</div>
              <p className="home__register__form__paragraph">​Curator(s) involved (if applicable)</p>
              <div className="home__register__form__list__container">
                {
                  curators.map((curator, index) => (
                    <div className="home__register__form__list__element">
                      <div className="home__register__form__list__element__close">
                        <FiXCircle
                          onClick={() => this.removeCurator(index)}
                        />
                      </div>
                      <Input
                        name={`curators,name,${index}`}
                        type="text"
                        value={curator.name}
                        labelName="Name"
                        onChange={this.handleDeepChange}
                      />
                      <Input
                        name={`curators,artistLink,${index}`}
                        type="text"
                        value={curator.artistLink}
                        labelName="Individual artist’s links (website, portfolio, etc)"
                        onChange={this.handleDeepChange}
                      />
                      <Input
                        name={`curators,shortBio,${index}`}
                        type="textarea"
                        value={curator.shortBio}
                        labelName="​Short Bio of each artist (Max 250 words)"
                        onChange={this.handleDeepChange}
                      />
                    </div>
                  ))
                }
              </div>
              <Button
                onClick={this.addMoreCurator}
                type="button"
                className="home__register__form__add-btn"
                component={<span> <FiPlusCircle/> add more curator </span>}
              />

              <div className="home__register__form__title">Organizers</div>
              <p className="home__register__form__paragraph">​Organizations/Groups/Collectives/ Etc involved (if applicable)</p>
              <div className="home__register__form__list__container">
                {
                  organizers.map((organizer, index) => (
                    <div className="home__register__form__list__element">
                      <div className="home__register__form__list__element__close">
                        <FiXCircle
                          onClick={() => this.removeOrganizer(index)}
                        />
                      </div>
                      <Input
                        name={`organizers,name,${index}`}
                        type="text"
                        value={organizer.name}
                        labelName="Name"
                        onChange={this.handleDeepChange}
                      />
                      <Input
                        name={`organizers,link,${index}`}
                        type="text"
                        value={organizer.link}
                        labelName="Individual artist’s links (website, portfolio, etc)"
                        onChange={this.handleDeepChange}
                      />
                      <Input
                        name={`organizers,shortBio,${index}`}
                        type="textarea"
                        value={organizer.shortBio}
                        labelName="​Short Bio of each artist (Max 250 words)"
                        onChange={this.handleDeepChange}
                      />
                    </div>
                  ))
                }
              </div>
              <Button
                onClick={this.addMoreOrganizer}
                type="button"
                className="home__register__form__add-btn"
                component={<span> <FiPlusCircle/> add more organizer </span>}
              />

              <div className="home__register__form__title">Contacts</div>
              <Input
                name="personNameContact"
                type="text"
                value={personNameContact}
                labelName="Contact Person’s name"
                onChange={this.handleChange}
                required
              />
              <Input
                name="personEmailContact"
                type="text"
                value={personEmailContact}
                labelName="Contact Person’s Email (will not be made public)"
                onChange={this.handleChange}
                required
              />
              <CheckBox
                value={isWillingToBeContactedByMedia}
                labelName="Is the Contact Person willing to be contacted by the media for interviews or other information they may be interested in?"
                onClick={this.handleToggleIsWillingToBeContactedByMedia}
                required
              />
              <Input
                name="pavilionWebsite"
                type="text"
                value={pavilionWebsite}
                labelName="Pavilion website"
                onChange={this.handleChange}
              />
              <Input
                name="pavilionPublicEmail"
                type="text"
                value={pavilionPublicEmail}
                labelName="Public email"
                onChange={this.handleChange}
                required
              />
              <Input
                name="pavilionOtherContact"
                type="text"
                value={pavilionOtherContact}
                labelName="Other contacts (public)"
                onChange={this.handleChange}
                required
              />
              <Input
                name="pavilionMailingAddress"
                type="text"
                value={pavilionMailingAddress}
                labelName="Mailing address (private, only used if we need to send you materials such as posters or guidebooks, etc)"
                onChange={this.handleChange}
                required
              />

              <div className="home__register__form__title">Venue</div>
              <p className="home__register__form__paragraph">
                Will your pavilion have a physical location?
              </p>
              <Switch
                className="home__register__form__switch-container"
                onChange={this.handleSwitchVenue} 
                checked={isVenueChecked}
                onColor="#3fb557"
                offColor="#2F2E2E"
              />
              {
                isVenueChecked
                  ? <div>
                    <p className="home__register__form__paragraph">
                      Have you already secured your venue?
                    </p>
                    <div className="home__register__form__switch-container">
                      <Switch
                        onChange={this.handleSwitchVenueSecured} 
                        checked={isVenueSecured}
                        onColor="#3fb557"
                        offColor="#2F2E2E"
                      />
                    </div>
                    {
                      isVenueSecured
                        ? <>
                            <Input
                              name="venueLocation"
                              type="text"
                              value={venueLocation}
                              labelName="Venue/Location"
                              onChange={this.handleChange}
                              required
                            />
                            <Input
                              name="streetAddress"
                              type="text"
                              value={streetAddress}
                              labelName="Street Address"
                              onChange={this.handleChange}
                              required
                            />
                            <Input
                              name="googleMapLink"
                              type="text"
                              value={googleMapLink}
                              labelName="Google Maps link to venue"
                              onChange={this.handleChange}
                              required
                            />
                            <div className="input__label__container">
                              <div className="input__label__asterisk">*</div>
                              <div className="home__register__form__label">Dates</div>
                            </div>
                            <div className="home__register__form__date-container">
                              <div className="home__register__form__label__date">Start</div>
                              <DatePicker
                                selected={startDate} 
                                onChange={date => this.handleStartDate(date)}
                              />
                              <div className="home__register__form__label__date">End</div>
                              <DatePicker
                                selected={endDate} 
                                onChange={date => this.handleEndDate(date)}
                              />
                            </div>
                            <div className="input__label__container">
                              <div className="input__label__asterisk">*</div>
                              <div className="home__register__form__label">Opening Hour</div>
                            </div>
                            <div className="home__register__form__date-container">
                              <div className="home__register__form__label__date">Start</div>
                              <DatePicker
                                selected={openningHours} 
                                onChange={hour => this.handleOpeningHours(hour)}
                                showTimeSelect
                                showTimeSelectOnly
                                timeCaption="Time"
                                dateFormat="h:mm aa"
                              />
                              <div className="home__register__form__label__date">End</div>
                              <DatePicker
                                selected={closingHours} 
                                onChange={hour => this.handleClosingHours(hour)}
                                showTimeSelect
                                showTimeSelectOnly
                                timeCaption="Time"
                                dateFormat="h:mm aa"
                              />
                            </div>
                            <div className="input__label__container">
                              <div className="input__label__asterisk">*</div>
                              <div className="home__register__form__label">telephone number</div>
                            </div>
                            <PhoneInput
                              placeholder=""
                              value={telephoneNumber}
                              onChange={telephone => this.handleChangeTelephoneNumber(telephone)}
                              defaultCountry="TH"
                            />
                          </>
                        : <CheckBox
                            value={isJoinedSeekingVenues}
                            labelName="Would you like to be added to a register of Pavilions Seeking Venues?"
                            onClick={this.handleToggleIsJoinedSeekingVenues}
                            required
                          />
                    }
                  </div>
                  : null
              }

              
              <div className="home__register__form__title">Social Media</div>
              <p className="home__register__form__paragraph">
                Pavilions should create social media 
                identities specifically for the pavilion, 
                rather than using existing pages for your 
                previous/existing work (those pages 
                can be listed above in the curators/ 
                artists/organizers’s individual links).
              </p>
              <Input
                name="pavilionFacebook"
                type="text"
                value={pavilionFacebook}
                labelName="Facebook"
                onChange={this.handleChange}
              />
              <Input
                name="pavilionInstagram"
                type="text"
                value={pavilionInstagram}
                labelName="Instagram"
                onChange={this.handleChange}
              />
              <Input
                name="pavilionTwitter"
                type="text"
                value={pavilionTwitter}
                labelName="Twitter"
                onChange={this.handleChange}
              />
              <Input
                name="pavilionOtherSocialMedias"
                type="text"
                value={pavilionOtherSocialMedias}
                labelName="Others"
                onChange={this.handleChange}
              />

              <div className="home__register__form__title">Open Calls</div>
              <p className="home__register__form__paragraph">
                We encourage pavilions to use open calls to further
                broaden the reach and scope of the work within your
                pavilion and within the biennial. We will be actively
                promoting all of the various open calls from pavilions.
              </p>
              <div className="input__label__container">
                <div className="home__register__form__label">
                  Will your pavilion involve any kind of Open Call?
                </div>
              </div>
              <div className="home__register__form__switch-container">
                <Switch
                  className="home__register__form__switch-container"
                  onChange={this.handleSwitchOpenCalls} 
                  checked={isOpenCalls}
                  onColor="#3fb557"
                  offColor="#2F2E2E"
                />
              </div>
              {
                isOpenCalls
                  ? <>
                    <Input
                      name="shortTextOpenCalls"
                      type="text"
                      value={shortTextOpenCalls}
                      labelName="Short text for open call (maximum 250 characters)"
                      onChange={this.handleChange}
                      maxlength={250}
                    />
                    <Textarea
                      name="longerTextOpenCalls"
                      type="textarea"
                      value={longerTextOpenCalls}
                      labelName="Longer description of Open Call"
                      onChange={this.handleChange}
                    />
                    <Input
                      name="opencallsUrl"
                      type="text"
                      value={opencallsUrl}
                      labelName="URL for more information (website, social media link)"
                      onChange={this.handleChange}
                    />
                    <Textarea
                      name="submissionRequirements"
                      type="text"
                      value={submissionRequirements}
                      labelName="Describe the submission requirements and process in 250 words or less"
                      onChange={this.handleChange}
                    />
                    <div className="input__label__container">
                      <div className="home__register__form__label">
                        List what your pavilion will provide to selected artists
                      </div>
                    </div>
                    <div home__register__form__list__container>
                    {
                      openCallsProvidingsList.map((openCallsProviding, index) => (
                        <div className="home__register__form__list__thin-element">
                          {
                            index !== 0 && <div className="home__register__form__list__element__close">
                              <FiXCircle
                                onClick={() => this.removeOpenCallsProviding(index)}
                              />
                            </div>
                          }
                          <Input
                            name={`openCallsProvidingsList,openCallsProviding,${index}`}
                            type="text"
                            value={openCallsProviding.openCallsProviding}
                            labelName={`${index + 1}.`}
                            onChange={this.handleDeepChange}
                          />
                        </div>
                      ))
                    }
                    </div>
                    <Button
                      onClick={this.addMoreOpenCallsProviding}
                      type="button"
                      className="home__register__form__add-btn"
                      component={<span> <FiPlusCircle/> add </span>}
                    />
                    <Input
                      name="opencallsPublicEmail"
                      type="text"
                      value={opencallsPublicEmail}
                      labelName="Public Email"
                      onChange={this.handleChange}
                    />
                    <Input
                      name="opencallsPhoneNumber"
                      type="text"
                      value={opencallsPhoneNumber}
                      labelName="Phone Number"
                      onChange={this.handleChange}
                    />
                    <Input
                      name="openCallsOtherPublicContact"
                      type="text"
                      value={openCallsOtherPublicContact}
                      labelName="Other Public Contact"
                      onChange={this.handleChange}
                    />
                  </>
                  : null
              }
              

              <div className="home__register__form__title">Support Materials</div>
              <p className="home__register__form__paragraph">
                Upload 3-5 publicity images (without text). Permission must be granted
                to BB to use images for publicity, minimum file size 1 - 2 mb. 
                Label the images by <br/>
                BB2020_Pavilion_Artist_ Titleofwork.jpg
              </p>
              <UploadImage/>
              <p className="home__register__form__paragraph">
                Upload 1-2 poster images to represent the pavilion.
              </p>
              <UploadImage/>
              <Input
                name="videoMaterial"
                type="text"
                value={videoMaterial}
                labelName="Youtube or vimeo links for video material"
                onChange={this.handleChange}
                required
              />
              <Input
                name="audioMaterial"
                type="text"
                value={audioMaterial}
                labelName="Links for audio material (soundcloud, bandcamp, etc)"
                onChange={this.handleChange}
                required
              />

              <Button
                className="home__register__form__submit-btn"
                type="submit"
                onClick={this.handleSubmit}
              />
            </form>
          </div>

        </div>
      </div>
    );
  }
}

export default withFirebase(Home);
