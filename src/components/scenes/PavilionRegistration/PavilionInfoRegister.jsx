import React, { useEffect } from 'react';
import { useForm, useFieldArray } from "react-hook-form";
import { withFirebase } from '../../../utils/Firebase';
import Input from '../../atoms/Input';
import Textarea from '../../atoms/Textarea';
import Button from '../../atoms/Button';
import { FiPlusCircle, FiXCircle } from "react-icons/fi";
import UploadImage from '../../atoms/UploadImage';
import { navigate } from 'gatsby';
import { PAVILION_DETAIL_REGISTER } from '../../../constants/routes'

const PavilionInfoRegister = ({
  firebase,
}) => {

  const { handleSubmit, register, errors, control, setValue, watch } = useForm({
    mode: 'onBlur',
    reValidateMode: 'onChange',
    defaultValues: {
      artists: [
        {
          name: '',
          artistLink: '',
          shortBio: '',
          workImage: {
            file: '',
            url: ''
          }
        }
      ]
    }
  });

  const { fields, append, remove } = useFieldArray({
    control,
    name: 'artists',
  });

  useEffect(() => {
    watch()
    fields.forEach((artist, index) => {
      register({
        name: `artists[${index}].workImage`,
        required: "this picture is required"
      })
    });
  }, [register, fields])

  const onSubmit = async (value, e) => {
    try {
      e.preventDefault();
      await firebase.savePavilionBasicInfo(value, firebase.getCurrentUserId())
      navigate(PAVILION_DETAIL_REGISTER)
    } catch (error) {
      console.log(error)
    }
  }

  const addMoreArtist = () => {
    append({
      name: '',
      artistLink: ''
    })
  }

  const removeArtist = (artistIndex) => {
    remove(artistIndex)
  }

  const handleArtistWorkImage = (pictureFiles, pictureDataURLs, artistIndex) => {
    setValue(`artists[${artistIndex}].workImage`, { url: pictureDataURLs })
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
                      name={`artists[${index}].workImage`}
                      fieldArrayTopic="artists"
                      fieldArrayName="workImage"
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