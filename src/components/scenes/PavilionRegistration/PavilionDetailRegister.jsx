import React from 'react'
import { useForm, useFieldArray } from "react-hook-form";
import { withFirebase } from '../../../utils/Firebase';
import { FiPlusCircle, FiXCircle } from "react-icons/fi";
import Input from '../../atoms/Input';
import Button from '../../atoms/Button';

const PavilionDetailRegister = () => {

  const { handleSubmit, register, errors, control, setValue, watch } = useForm({
    mode: 'onBlur',
    reValidateMode: 'onChange',
    defaultValues: {
      curators: [
        {
          name: '',
          curatorLink: '',
          shortBio: ''
        }
      ]
    }
  });

  const { fields, append, remove } = useFieldArray({
    control,
    name: 'curators',
  });

  const onSubmit = () => {}
  const addMoreCurator = () => {
    append({
      name: '',
      curatorLink: '',
      shortBio: '',
    })
  }
  const removeCurator = (curatorIndex) => remove(curatorIndex)

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
                    />
                    <Input
                      name={`curators[{index}].curatorLink`}
                      type="text"
                      labelName="Individual curators’s links (website, portfolio, etc)"
                      reference={register}
                    />
                    <Input
                      name={`curators[${index}].shortBio`}
                      type="textarea"
                      labelName="​Short Bio of each artist (Max 250 words)"
                      reference={register}
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
          </form>
        </div>
      </div>
    </div>
  )
}

export default withFirebase(PavilionDetailRegister)