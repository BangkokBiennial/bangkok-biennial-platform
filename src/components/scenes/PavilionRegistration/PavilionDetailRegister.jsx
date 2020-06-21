import React, { useEffect, memo, useState } from 'react'
import { useForm, useFieldArray, FormContext, useFormContext } from "react-hook-form"
import { withFirebase } from '../../../utils/Firebase'
import { FiPlusCircle, FiXCircle } from "react-icons/fi"
import Input from '../../atoms/Input'
import Textarea from '../../atoms/Textarea'
import Button from '../../atoms/Button'
import CheckBox from '../../atoms/CheckBox'
import Switch from 'react-switch';
import DatePicker from 'react-datepicker'
import PhoneInput from 'react-phone-number-input'
import UploadImage from '../../atoms/UploadImage';
import { useToasts } from 'react-toast-notifications'
import { encodeFileToData, dataUrlToFileList } from '../../../utils/file'
import Loading from '../../atoms/Loading'

import 'react-phone-number-input/style.css'
import 'react-datepicker/dist/react-datepicker.css'

const PavilionDetailRegister = ({
  firebase
}) => {

  const [_initFirebase, setInitFirebase] = useState(false)

  const { addToast } = useToasts()
  const [loading, setLoading] = useState(true);
  const [fetched, setFetched] = useState(false);
  const [loadingPics, setLoadingPics] = useState({ 
    posters: [],
    supportMaterials: []
  })
  const [saving, setSaving] = useState(false)

  const { 
    handleSubmit, 
    register, 
    unregister,
    errors, 
    control, 
    setValue, 
    watch, 
    setError, 
    clearError
  } = useForm({
    mode: 'onBlur',
    reValidateMode: 'onChange',
  });

  useEffect(() => {
    if (firebase && !_initFirebase) {
      setInitFirebase(true)
    }
  }, [firebase])

  const Curators = useFieldArray({
    control,
    name: 'curators',
  });
  const addMoreCurator = () => {
    Curators.append({
      curators: {
        name: '',
        curatorLink: '',
        shortBio: '',
      }
    })
    addToast('Successfully curator added', { appearance: 'success' })
  }
  const removeCurator = (curatorIndex) => {
    Curators.remove(curatorIndex)
    addToast('Successfully curator removed', { appearance: 'info' })
  }

  const Organizers = useFieldArray({
    control,
    name: 'organizers'
  })
  const addMoreOrganizer = () => {
    Organizers.append({ 
      organizers: {
        name: '',
        organizerLink: '',
        shortBio: '',
      }
    })
    addToast('Successfully organizer added', { appearance: 'success' })
  }
  const removeOrganizer = (organizerIndex) => {
    Organizers.remove(organizerIndex)
    addToast('Successfully organizer removed', { appearance: 'info' })
  }

  useEffect(() => {
    if (firebase && firebase.auth && firebase.auth.currentUser) {
      const fetch = async () => {
        const savedPavilionInfo = await firebase
          .getTemporaryPavilionAdvanceInfo(firebase.getCurrentUserId())
        const data = savedPavilionInfo.data()
        if (data.curators && data.curators.length > 0 && !fetched) {
          data.curators.forEach(curator => {
            Curators.append({
              curators: {
                name: curator.name,
                curatorLink: curator.curatorLink,
                shortBio: curator.shortBio,
              }
            })
          })
        }
        if (data.organizers && data.organizers.length > 0 && !fetched) {
          data.organizers.forEach(organizer => {
            Organizers.append({
              organizers: {
                name: organizer.name,
                organizerLink: organizer.organizerLink,
                shortBio: organizer.shortBio,
              }
            })
          })
        }
        Object.keys(data).map(async key => {
          if (key === 'posters' || key === 'supportMaterials') {
            if (data[key].length > 0) {
              const urls = data[key].map(k => k.url)
              const names = data[key].map(k => k.name)
              const fileList = dataUrlToFileList(urls, names)
              const link = new DataTransfer();
              fileList.forEach(file => {
                link.items.add(file)
              })
              setValue(key, link.files)
              setLoadingPics({
                [key]: {
                  pictures: urls,
                  files: fileList
                }
              })
            }
          } else {
            setValue(key, data[key])
          }
        })
        setLoading(false)
      }
      fetch()
      setFetched(true)
    }
  }, [firebase && firebase.auth && firebase.auth.currentUser, fetched])

  const [isWillingToBeContactedByMedia, setIsWillingToBeContactedByMedia] = useState(true)
  const [isVenueChecked, setIsVenueChecked] = useState(true)
  const [isVenueSecured, setIsVenueSecured] = useState(true)
  const [isJoinedSeekingVenues, setIsJoinedSeekingVenues] = useState(true)
  const [isOpenCalls, setIsOpenCalls] = useState(true)
  
  useEffect(() => {
    if(isVenueChecked && isVenueSecured) {
      register({
        name: 'startDate',
        required: 'This field is required',
        defaultValues: ''
      })
      register({
        name: 'endDate',
        required: 'This field is required',
        defaultValues: ''
      })
      register({
        name: 'openingHours',
        required: 'This field is required',
        defaultValues: ''
      })
      register({
        name: 'closingHours',
        required: 'This field is required',
        defaultValues: ''
      })
      register({
        name: 'telephoneNumber',
        required: 'This field is required',
        defaultValues: ''
      })
    }

    return () => {
      unregister('startDate')
      unregister('endDate')
      unregister('openingHours')
      unregister('closingHours')
      unregister('telephoneNumber')
    }
  }, [register, isVenueChecked, isVenueSecured])

  const handleToggleIsWillingToBeContactedByMedia = () => setIsWillingToBeContactedByMedia(!isWillingToBeContactedByMedia);
  const handleSwitchVenue = () => setIsVenueChecked(!isVenueChecked)
  const handleSwitchVenueSecured = () => setIsVenueSecured(!isVenueSecured)
  const handleToggleIsJoinedSeekingVenues = () => setIsJoinedSeekingVenues(!isJoinedSeekingVenues)
  const handleSwitchOpenCalls = () => setIsOpenCalls(!isOpenCalls)

  const handleChangeTelephoneNumber = (telephoneNumber) => {
    setValue('telephoneNumber', telephoneNumber)
    clearError('telephoneNumber')
  }

  const startDate = watch('startDate')
  const endDate = watch('endDate')
  const openingHours = watch('openingHours')
  const closingHours = watch('closingHours')
  const telephoneNumber = watch('telephoneNumber')

  const handleDatePickerOnChange = (changedDate, name) => {
    setValue(name, changedDate)
    clearError(name)
  }
  const handleDatePickerOnBlur = (e) => {
    if (!watch(e.target.name)) {
      setError(e.target.name, 'required', 'this field is required')
    }
  }
  const handleOnBlurTelephoneNumber = () => {
    if (!telephoneNumber) {
      setError('telephoneNumber', 'required', 'this field is required')
    }
  }
  const handleUploadImage = (name, files, _urls) => {
    const link = new DataTransfer();
    files.forEach(file => {
      link.items.add(file)
    })
    setValue(name, link.files)
  }

  const handleOnClickSave = async (e) => {
    e.preventDefault()
    setSaving(true)
    const watchedData = watch({ nest: true })
    try { 
      const finalSupportedMaterials = watchedData.supportMaterials.length > 0
        ? await Promise.all(
          Array.from(watchedData.supportMaterials).map(async (supportMaterial) => {
            const dataUrl = await encodeFileToData(supportMaterial)
            return {
              url: dataUrl,
              name: supportMaterial.name
            }
          })
        )
        : ''
      const finalPosters = watchedData.posters.length > 0
        ? await Promise.all(
          Array.from(watchedData.posters).map(async (poster) => {
            const dataUrl = await encodeFileToData(poster)
            return { 
              url: dataUrl,
              name: poster.name
            }
          })
        )
        : ''
      const finalizedData = {
        ...watchedData,
        supportMaterials: finalSupportedMaterials,
        posters: finalPosters,
        telephoneNumber: watchedData.telephoneNumber || '',
        startDate: watchedData.startDate || '',
        endDate: watchedData.endDate || '',
        openingHours: watchedData.openingHours || '',
        closingHours: watchedData.closingHours || '',
      }
      console.log(finalizedData)
      await firebase.saveTemporaryPavilionAdvanceInfo(finalizedData, firebase.getCurrentUserId())
      setSaving(false)
      addToast('the information is saved successfully', { appearance: 'success' })
    } catch (error) {
      console.log(error)
      setSaving(false)
      await addToast(`${error.message}, ${JSON.stringify(watchedData)}`, { appearance: 'error', autoDismiss: false })
    }
  }

  const onSubmit = () => {}
 
  const errorStyle = { 
    color: '#FC0000',
    position: 'relative',
    margin: '0px',
    marginTop: '10px'
  }

  console.log(watch())

  if (loading) {
    return (
      <div className="home container">
         <Loading />
      </div>
    )
  }
  const opacity = saving ? '20%' : '100%'

  return (
    <>
      {
        saving && <Loading />
      }
      <div className="home container" style={{ opacity }}>
        <div className="home__details">
          <h1 className="home__title">More detail on Pavilion Registration</h1>
        </div>

        <div className="home__register">
          <div className="home__register__form">
            <form onSubmit={handleSubmit(onSubmit)}>
              <div className="home__register__form__title">Curators</div>
              <p className="home__register__form__paragraph">​Curator(s) involved (if applicable)</p>
              <div className="home__register__form__list__container">
                {
                  Curators.fields.map((curator, index) => (
                    <div className="home__register__form__list__element" key={curator.id}>
                      <div className="home__register__form__list__element__close">
                        <FiXCircle
                          onClick={() => removeCurator(index)}
                        />
                      </div>
                      <Input
                        name={`curators[${index}].name`}
                        type="text"
                        labelName="Name"
                        reference={register()}
                      />
                      <Input
                        name={`curators[${index}].curatorLink`}
                        type="text"
                        labelName="Individual curators’s links (website, portfolio, etc)"
                        reference={register()}
                      />
                      <Input
                        name={`curators[${index}].shortBio`}
                        type="textarea"
                        labelName="​Short Bio of each artist (Max 250 words)"
                        reference={register()}
                      />
                    </div>
                  ))
                }
              </div>
              <Button
                onClick={addMoreCurator}
                type="button"
                className="home__register__form__add-btn"
              >
                <FiPlusCircle/> add more curator
              </Button>

              <div className="home__register__form__title">Organizers</div>
              <p className="home__register__form__paragraph">​Organizations/Groups/Collectives/ Etc involved (if applicable)</p>
              <div className="home__register__form__list__container">
              {
                Organizers.fields.map((organizer, index) => (
                  <div className="home__register__form__list__element" key={organizer.id}>
                    <div className="home__register__form__list__element__close">
                      <FiXCircle
                        onClick={() => removeOrganizer(index)}
                      />
                    </div>
                    <Input
                      name={`organizers[${index}].name`}
                      type="text"
                      labelName="Name"
                      reference={register()}
                    />
                    <Input
                      name={`organizers[${index}].organizerLink`}
                      type="text"
                      labelName="Individual artist’s links (website, portfolio, etc)"
                      reference={register()}
                    />
                    <Input
                      name={`organizers[${index}].shortBio`}
                      type="textarea"
                      labelName="​Short Bio of each artist (Max 250 words)"
                      reference={register()}
                    />
                  </div>
                ))
              }
              </div>
              <Button
                onClick={addMoreOrganizer}
                type="button"
                className="home__register__form__add-btn"
              >
                <FiPlusCircle/> add more organizer
              </Button>

              <div className="home__register__form__title">Contacts</div>
              <Input
                name="personNameContact"
                type="text"
                labelName="Contact Person’s name"
                required
                reference={register({
                  required: "This field is required",
                })}
                errors={errors}
              />
              <Input
                name="personEmailContact"
                type="text"
                labelName="Contact Person’s Email (will not be made public)"
                required
                reference={register({
                  required: "This field is required",
                })}
                errors={errors}
              />
              <CheckBox
                value={isWillingToBeContactedByMedia}
                labelName="Is the Contact Person willing to be contacted by the media for interviews or other information they may be interested in? (default is yes)"
                onClick={handleToggleIsWillingToBeContactedByMedia}
                required
                errors={errors}
              />
              <Input
                name="pavilionWebsite"
                type="text"
                labelName="Pavilion website"
                reference={register()}
              />
              <Input
                name="pavilionPublicEmail"
                type="text"
                labelName="Public email"
                required
                reference={register({
                  required: "This field is required",
                })}
                errors={errors}
              />
              <Input
                name="pavilionOtherContact"
                type="text"
                labelName="Other contacts (public)"
                required
                reference={register({
                  required: "This field is required",
                })}
                errors={errors}
              />
              <Input
                name="pavilionMailingAddress"
                type="text"
                labelName="Mailing address (private, only used if we need to send you materials such as posters or guidebooks, etc)"
                required
                reference={register({
                  required: "This field is required",
                })}
                errors={errors}
              />

              <div className="home__register__form__title">Venue</div>
              <p className="home__register__form__paragraph">
                Will your pavilion have a physical location?
              </p>
              <Switch
                className="home__register__form__switch-container"
                onChange={handleSwitchVenue} 
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
                        onChange={handleSwitchVenueSecured} 
                        checked={isVenueSecured}
                        onColor="#3fb557"
                        offColor="#2F2E2E"
                      />
                    </div>
                    {
                      isVenueSecured
                        ? <div className="home__register__form__venue">
                            <Input
                              name="venueLocation"
                              type="text"
                              labelName="Venue/Location"
                              required
                              reference={register({
                                required: 'this field is required'
                              })}
                              errors={errors}
                            />
                            <Input
                              name="streetAddress"
                              type="text"
                              labelName="Street Address"
                              required
                              reference={register({
                                required: 'this field is required'
                              })}
                              errors={errors}
                            />
                            <Input
                              name="googleMapLink"
                              type="text"
                              labelName="Google Maps link to venue"
                              required
                              reference={register({
                                required: 'this field is required'
                              })}
                              errors={errors}
                            />
                            <div className="input__label__container">
                              <div className="input__label__asterisk">*</div>
                              <div className="home__register__form__label">Dates</div>
                            </div>
                            <div className="home__register__form__date-container">
                              <div className="home__register__form__label__date">Start</div>
                              <div className="home__register__form__datepicker">
                                <DatePicker
                                  name="startDate"
                                  selected={startDate} 
                                  onChange={(startDate) => handleDatePickerOnChange(startDate, 'startDate')}
                                  onBlur={handleDatePickerOnBlur}
                                  startDate={startDate}
                                  endDate={endDate}
                                />
                                {
                                  errors 
                                    && errors.startDate 
                                    && <p style={errorStyle}>{errors.startDate.message}</p>
                                }
                              </div>
                              
                              <div className="home__register__form__label__date">End</div>
                              <div className="home__register__form__datepicker">
                                <DatePicker
                                  name="endDate"
                                  selected={endDate} 
                                  onChange={(endDate) => handleDatePickerOnChange(endDate, 'endDate')}
                                  onBlur={handleDatePickerOnBlur}
                                  startDate={startDate}
                                  endDate={endDate}
                                  minDate={startDate}
                                />
                                {
                                  errors 
                                    && errors.endDate 
                                    && <p style={errorStyle}>{errors.endDate.message}</p>
                                }
                              </div>
                            </div>
                            <div className="input__label__container">
                              <div className="input__label__asterisk">*</div>
                              <div className="home__register__form__label">Opening Hour</div>
                            </div>
                            <div className="home__register__form__date-container">
                              <div className="home__register__form__label__date">Start</div>
                              <div className="home__register__form__datepicker">
                                <DatePicker
                                  name="openingHours"
                                  selected={openingHours} 
                                  onChange={(openingHours) => handleDatePickerOnChange(openingHours, 'openingHours')}
                                  showTimeSelect
                                  showTimeSelectOnly
                                  timeCaption="Time"
                                  dateFormat="h:mm aa"
                                  onBlur={handleDatePickerOnBlur}
                                />
                                {
                                  errors 
                                    && errors.openingHours 
                                    && <p style={errorStyle}>{errors.openingHours.message}</p>
                                }
                              </div>
                              <div className="home__register__form__label__date">End</div>
                              <div className="home__register__form__datepicker">
                                <DatePicker
                                  name="closingHours"
                                  selected={closingHours} 
                                  onChange={(closingHours) => handleDatePickerOnChange(closingHours, 'closingHours')}
                                  showTimeSelect
                                  showTimeSelectOnly
                                  timeCaption="Time"
                                  dateFormat="h:mm aa"
                                  onBlur={handleDatePickerOnBlur}
                                />
                                {
                                  errors 
                                    && errors.closingHours 
                                    && <p style={errorStyle}>{errors.closingHours.message}</p>
                                }
                              </div>
                            </div>
                            <div className="input__label__container">
                              <div className="input__label__asterisk">*</div>
                              <div className="home__register__form__label">telephone number</div>
                            </div>
                            <div className="home__register__form__datepicker">
                              <PhoneInput
                                name="telephoneNumber"
                                placeholder=""
                                value={telephoneNumber}
                                onChange={telephone => handleChangeTelephoneNumber(telephone)}
                                onBlur={handleOnBlurTelephoneNumber}
                                defaultCountry="TH"
                              />
                              {
                                errors 
                                  && errors.telephoneNumber 
                                  && <p style={errorStyle}>{errors.telephoneNumber.message}</p>
                              }
                            </div>
                          </div>
                        : <CheckBox
                            value={isJoinedSeekingVenues}
                            labelName="Would you like to be added to a register of Pavilions Seeking Venues?"
                            onClick={handleToggleIsJoinedSeekingVenues}
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
                  labelName="Facebook"
                  reference={register()}
                />
                <Input
                  name="pavilionInstagram"
                  type="text"
                  labelName="Instagram"
                  reference={register()}
                />
                <Input
                  name="pavilionTwitter"
                  type="text"
                  labelName="Twitter"
                  reference={register()}
                />
                <Input
                  name="pavilionOtherSocialMedias"
                  type="text"
                  labelName="Others"
                  reference={register()}
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
                    onChange={handleSwitchOpenCalls} 
                    checked={isOpenCalls}
                    onColor="#3fb557"
                    offColor="#2F2E2E"
                  />
                </div>
                {
                  isOpenCalls
                    ? <>
                      <Textarea
                        name="shortTextOpenCalls"
                        type="text"
                        labelName="Short text for open call (maximum 250 characters)"
                        reference={
                          register({
                            maxLength: {
                              value: 250,
                              message: 'Maximum 250 characters'
                            }
                          })
                        }
                      />
                      <Textarea
                        name="longerTextOpenCalls"
                        type="textarea"
                        labelName="Longer description of Open Call"
                        rows={8}
                        cols={100}
                        reference={register()}
                      />
                      <Input
                        name="opencallsUrl"
                        type="text"
                        labelName="URL for more information (website, social media link)"
                        reference={register()}
                      />
                      <Textarea
                        name="submissionRequirements"
                        type="text"
                        labelName="Describe the submission requirements and process in 250 words or less"
                        reference={register()}
                      />
                      <Input
                        name="opencallsPublicEmail"
                        type="text"
                        labelName="Public Email"
                        reference={register()}
                      />
                      <Input
                        name="opencallsPhoneNumber"
                        type="text"
                        labelName="Phone Number"
                        reference={register()}
                      />
                      <Input
                        name="openCallsOtherPublicContact"
                        type="text"
                        labelName="Other Public Contact"
                        reference={register()}
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
                <UploadImage
                  name="supportMaterials"
                  singleImage={false}
                  errors={errors}
                  reference={register({ required: 'file is required' })}
                  onChange={(files, urls) => handleUploadImage('supportMaterials', files, urls)}
                  loadingPictures={loadingPics.supportMaterials}
                />
                <p className="home__register__form__paragraph">
                  Upload 1-2 poster images to represent the pavilion.
                </p>
                <UploadImage
                  name="posters"
                  singleImage={false}
                  errors={errors}
                  reference={register({ required: 'file is required' })}
                  onChange={(files, urls) => handleUploadImage('posters', files, urls)}
                  loadingPictures={loadingPics.posters}
                />
                <Input
                  name="videoMaterial"
                  type="text"
                  labelName="Youtube or vimeo links for video material"
                  required
                  reference={
                    register({
                      required: 'this field is required'
                    })
                  }
                  errors={errors}
                />
                <Input
                  name="audioMaterial"
                  type="text"
                  labelName="Links for audio material (soundcloud, bandcamp, etc)"
                  required
                  reference={
                    register({
                      required: 'this field is required'
                    })
                  }
                  errors={errors}
                />
              <div className="home__register__form__footer">
                <Button
                  className="home__register__form__footer__button"
                  type="primary"
                  onClick={handleOnClickSave}
                >
                  Save
                </Button>
                <Button
                  className="home__register__form__footer__button"
                  type="submit"
                />
              </div>
            </form>
          </div>
        </div>
      </div>
    </>
  )
}

export default withFirebase(PavilionDetailRegister)
