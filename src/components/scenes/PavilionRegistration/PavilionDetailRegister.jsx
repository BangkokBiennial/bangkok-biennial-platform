import React, { useEffect, memo, useState } from 'react'
import { useForm, useFieldArray, FormContext, useFormContext } from "react-hook-form"
import { withFirebase } from '../../../utils/Firebase'
import { FiPlusCircle, FiXCircle } from "react-icons/fi"
import Input from '../../atoms/Input'
import Button from '../../atoms/Button'
import CheckBox from '../../atoms/CheckBox'
import Switch from 'react-switch';
import DatePicker from 'react-datepicker'
import PhoneInput from 'react-phone-number-input'

import 'react-phone-number-input/style.css'
import 'react-datepicker/dist/react-datepicker.css'

const PavilionDetailRegister = () => {

  const { handleSubmit, register, errors, control, setValue, getValues, watch } = useForm({
    mode: 'onBlur',
    reValidateMode: 'onChange',
    defaultValues: {
      curators: [],
    }
  });

  const { fields, append, remove } = useFieldArray({
    control,
    name: 'curators',
  });

  const onSubmit = () => {}
  const addMoreCurator = () => {
    append({
      curators: {
        name: '',
        curatorLink: '',
        shortBio: '',
      }
    })
  }
  const removeCurator = (curatorIndex) => remove(curatorIndex)

  const addMoreOrganizer = () => {}

  const [isWillingToBeContactedByMedia, setIsWillingToBeContactedByMedia] = useState(true)
  const [isVenueChecked, setIsVenueChecked] = useState(true)
  const [isVenueSecured, setIsVenueSecured] = useState(true)
  const [isJoinedSeekingVenues, setIsJoinedSeekingVenues] = useState(true)
  
  useEffect(() => {
    console.log(watch())
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
  }, [fields, register, isVenueChecked, isVenueSecured])

  const handleToggleIsWillingToBeContactedByMedia = () => setIsWillingToBeContactedByMedia(!isWillingToBeContactedByMedia);
  const handleSwitchVenue = () => setIsVenueChecked(!isVenueChecked)
  const handleSwitchVenueSecured = () => setIsVenueSecured(!isVenueSecured)
  const handleToggleIsJoinedSeekingVenues = () => setIsJoinedSeekingVenues(!isJoinedSeekingVenues)

  const handleStartDate = (startDate) => setValue('startDate', startDate)
  const handleEndDate = (endDate) => setValue('endDate', endDate)
  const handleOpeningHours = (hours) => setValue('openingHours', hours)
  const handleClosingHours = (hours) => setValue('closingHours', hours)
  const handleChangeTelephoneNumber = (telephoneNumber) => setValue('telephoneNumber', telephoneNumber)
  

  const startDate = watch('startDate')
  const endDate = watch('endDate')
  const openingHours = watch('openingHours')
  const closingHours = watch('closingHours')
  const telephoneNumber = watch('telephoneNumber')

  return (
    <div className="home container">
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
                fields.map((curator, index) => (
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
                      reference={register}
                      errors={errors}
                    />
                    <Input
                      name={`curators[${index}].curatorLink`}
                      type="text"
                      labelName="Individual curators’s links (website, portfolio, etc)"
                      reference={register}
                      errors={errors}
                    />
                    <Input
                      name={`curators[${index}].shortBio`}
                      type="textarea"
                      labelName="​Short Bio of each artist (Max 250 words)"
                      reference={register}
                      errors={errors}
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
                      ? <>
                          <Input
                            name="venueLocation"
                            type="text"
                            labelName="Venue/Location"
                            required
                            reference={register({
                              required: 'this field is required'
                            })}
                          />
                          <Input
                            name="streetAddress"
                            type="text"
                            labelName="Street Address"
                            required
                            reference={register({
                              required: 'this field is required'
                            })}
                          />
                          <Input
                            name="googleMapLink"
                            type="text"
                            labelName="Google Maps link to venue"
                            required
                            reference={register({
                              required: 'this field is required'
                            })}
                          />
                          <div className="input__label__container">
                            <div className="input__label__asterisk">*</div>
                            <div className="home__register__form__label">Dates</div>
                          </div>
                          <div className="home__register__form__date-container">
                            <div className="home__register__form__label__date">Start</div>
                            <DatePicker
                              name="startDate"
                              selected={startDate} 
                              onChange={date => handleStartDate(date)}
                            />
                            <div className="home__register__form__label__date">End</div>
                            <DatePicker
                              name="endDate"
                              selected={endDate} 
                              onChange={date => handleEndDate(date)}
                            />
                          </div>
                          <div className="input__label__container">
                            <div className="input__label__asterisk">*</div>
                            <div className="home__register__form__label">Opening Hour</div>
                          </div>
                          <div className="home__register__form__date-container">
                            <div className="home__register__form__label__date">Start</div>
                            <DatePicker
                              name="openingHours"
                              selected={openingHours} 
                              onChange={hour => handleOpeningHours(hour)}
                              showTimeSelect
                              showTimeSelectOnly
                              timeCaption="Time"
                              dateFormat="h:mm aa"
                            />
                            <div className="home__register__form__label__date">End</div>
                            <DatePicker
                              name="closingHours"
                              selected={closingHours} 
                              onChange={hour => handleClosingHours(hour)}
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
                            name="telephoneNumber"
                            placeholder=""
                            value={telephoneNumber}
                            onChange={telephone => handleChangeTelephoneNumber(telephone)}
                            defaultCountry="TH"
                          />
                        </>
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
          </form>
        </div>
      </div>
    </div>
  )
}

export default withFirebase(PavilionDetailRegister)