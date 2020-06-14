import React, { useEffect, useState } from 'react';
import { useToasts } from 'react-toast-notifications'
import { useForm, useFieldArray } from "react-hook-form";
import { withFirebase } from '../../../utils/Firebase';
import Input from '../../atoms/Input';
import Textarea from '../../atoms/Textarea';
import Button from '../../atoms/Button';
import { FiPlusCircle, FiXCircle } from "react-icons/fi";
import UploadImage from '../../atoms/UploadImage';
import { navigate } from 'gatsby';
import { PAVILION_DETAIL_REGISTER } from '../../../constants/routes'
import Loading from '../../atoms/Loading'

const PavilionInfoRegister = ({
  firebase,
}) => {

  const { addToast } = useToasts()
  const [loading, setLoading] = useState(true);

  const { handleSubmit, register, setError, errors, control, setValue, watch } = useForm({
    mode: 'onBlur',
    reValidateMode: 'onChange',
    defaultValues: {
      artists: [
        {
          name: '',
          artistLink: '',
          shortBio: '',
          workImageUrl: ''
        }
      ]
    }
  });

  const { fields, append, remove } = useFieldArray({
    control,
    name: 'artists',
  });

  const [_initFirebase, setInitFirebase] = useState(false)

  useEffect(() => {
    if (firebase && !_initFirebase) {
      setInitFirebase(true)
      setLoading(false)
    }
  }, [firebase])

  useEffect(() => {
    watch()
    fields.forEach((artist, index) => {
      register({
        name: `artists[${index}].workImageUrl`,
        required: 'this picture is required'
      })
    });
  }, [register, fields])

  const onSubmit = async (value, e) => {
    try {
      // workaround for validating artists' work image url
      value.artists.forEach((artist, index) => {
        if (!artist.workImageUrl) {
          setError(`artists[${index}].workImageUrl`, 'required', 'this file is required')
        }
      })

      if (value.artists.filter(artist => !artist.workImageUrl).length > 0) {
        await addToast('some fields are missing', { appearance: 'error', autoDismiss: false })
        return
      }

      e.preventDefault();

      setLoading(true)
      addToast('sending data ... please wait', { appearance: 'info' })
      await firebase.savePavilionBasicInfo(value, firebase.getCurrentUserId())
      await setLoading(false)
      navigate(PAVILION_DETAIL_REGISTER)
      addToast('Successfully submitted!', { appearance: 'success' })
    } catch (error) {
      console.log(error)
      await addToast(`${error.message}, ${JSON.stringify(value)}`, { appearance: 'error', autoDismiss: false })
      await setLoading(false)
    }
  }

  const addMoreArtist = () => {
    append({
      artists: {
        name: '',
        artistLink: '',
        shortBio: '',
        workImageUrl: ''
      }
    })
    addToast('Successfully artist added', { appearance: 'success' })
  }

  const removeArtist = (artistIndex) => {
    remove(artistIndex)
    addToast('Successfully artist removed', { appearance: 'info' })
  }

  const handleArtistWorkImage = (pictureFiles, pictureDataURLs, artistIndex) => {
    setValue(`artists[${artistIndex}].workImageUrl`, pictureDataURLs )
  }

  if (loading) {
    return (
      <div className="home container">
         <Loading />
      </div>
    )
  }

  return(
    <div className="home container">
      <div className="home__details">
        <h1 className="home__title">Register Form</h1>
      </div>

      <div className="home__register">
        <div className="home__register__form">
          <form onSubmit={handleSubmit(onSubmit)}>
            <div className="home__register__form__title">The Pavillion</div>
            <Input
              name="pavilionName"
              type="text" 
              labelName="Name of Pavillion"
              reference={
                register({
                  required: "This field is required",
                })
              }
              required
              errors={errors}
            />

            <Textarea
              name="pavilionBriefDescription"
              type="text"
              labelName="Brief description of the pavilion (maximum 250 characters)"
              required
              reference={
                register({
                  required: "This field is required",
                  maxLength: {
                    value: 250,
                    message: "messages is exceed 250 lengths"
                  }
                })
              }
              errors={errors}
              rows={5}
              cols={100}
            />

            <Textarea
              name="pavilionLongDescription"
              type="text"
              labelName="Longer description of pavilion (curatorial statement, etc)"
              required
              reference={
                register({
                  required: "This field is required",
                })
              }
              errors={errors}
              rows={8}
              cols={100}
            />

            <div className="home__register__form__title">Artists</div>
            <p className="home__register__form__paragraph">​Artist(s) involved</p>  
            <div className="home__register__form__list__container">
              {
                fields.map((field, index) => (
                  <div className="home__register__form__list__element" key={field.id}>
                    <div className="home__register__form__list__element__close">
                      <FiXCircle
                        onClick={() => removeArtist(index)}
                      />
                    </div>
                    <Input
                      name={`artists[${index}].name`}
                      type="text"
                      labelName="Name"
                      required
                      reference={
                        register({
                          required: "This field is required",
                          pattern: {
                            value: /^[a-zA-Z0-9_ ]*$/g,
                            message: "Invalid pavilion's name"
                          }
                        })
                      }
                      errors={errors}
                      fieldArrayTopic="artists"
                      fieldArrayName="name"
                      fieldArrayIndex={index}
                    />
                    <Input
                      name={`artists[${index}].artistLink`}
                      type="text"
                      labelName="Individual artist’s links (website, portfolio, etc)"
                      required
                      reference={
                        register({ 
                          required: "This field is required" 
                        })
                      }
                      errors={errors}
                      fieldArrayTopic="artists"
                      fieldArrayName="artistLink"
                      fieldArrayIndex={index}
                    />
                    <Textarea
                      name={`artists[${index}].shortBio`}
                      type="text"
                      labelName="Short Bio of each artist (Max 1000 characters)"
                      required
                      reference={
                        register({
                          required: "This field is required",
                          maxLength: {
                            value: 1000,
                            message: "messages is exceed 1000 lengths"
                          }
                        })
                      }
                      errors={errors}
                      fieldArrayTopic="artists"
                      fieldArrayName="shortBio"
                      fieldArrayIndex={index}
                      rows={8}
                      cols={100}
                    />
                    <div className="input__label__container">
                      <div className="input__label__asterisk">*</div>
                      <div className="home__register__form__label">One image of artist’s work</div>
                    </div>
                    <UploadImage
                      name={`artists[${index}].workImageUrl`}
                      fieldArrayTopic="artists"
                      fieldArrayName="workImageUrl"
                      fieldArrayIndex={index}
                      singleImage={true}
                      errors={errors}
                      onChange={(pictureFiles, pictureDataURLs) => handleArtistWorkImage(pictureFiles, pictureDataURLs, index)}
                    />
                  </div>
                ))
              }
            </div>
            <Button
              onClick={addMoreArtist}
              type="button"
              className="home__register__form__add-btn"
            >
              <FiPlusCircle/> &nbsp;&nbsp; add more artist
            </Button>

            <Button type="submit">submit</Button>
          </form>
        </div>
      </div>
    </div>
  )
}

export default withFirebase(PavilionInfoRegister)