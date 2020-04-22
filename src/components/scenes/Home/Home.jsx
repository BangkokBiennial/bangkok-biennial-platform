import React, { Component } from 'react';
import { Link } from 'gatsby';
import { withFirebase } from '../../../utils/Firebase';
import Input from '../../atoms/Input';
import Button from '../../atoms/Button';
import Loading from '../../atoms/Loading';
import Image from '../../atoms/Image';
import UploadImage from '../../atoms/UploadImage'
import { FiPlusCircle } from "react-icons/fi";


class Home extends Component {
  _initFirebase = false;

  state = {
    loading: true,
    pavillionName: '',
    pavilionBriefDescription: '',
    pavilionLongDescription: '',
    personNameContact: '',
    personEmailContact: '',
    pavilionWebsite: '',
    pavilionPublicEmail: '',
    pavilionOtherContact: '',
    pavilionMailingAddress: '',
    pavilionFacebook: '',
    pavilionInstagram: '',
    pavilionTwitter: '',
    pavilionOtherSocialMedias: '',
    videoMaterial: '',
    audioMaterial: ''
  };

  firebaseInit = () => {
    if (this.props.firebase && !this._initFirebase) {
      this._initFirebase = true;

      this.getPosts();
    }
  };

  componentDidMount() {
    this.firebaseInit();
  }

  componentDidUpdate() {
    this.firebaseInit();
  }

  getPosts = () => {
    const { firebase } = this.props;

    firebase
      .posts()
      .get()
      .then(querySnapshot => {
        const data = querySnapshot.docs.map(item => item.data());
        this.setState({
          posts: data,
          loading: false,
        });
      });
  };

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

  render() {
    const {
      loading,
      pavillionName,
      pavilionBriefDescription,
      pavilionLongDescription,
      personNameContact,
      personEmailContact,
      pavilionWebsite,
      pavilionPublicEmail,
      pavilionOtherContact,
      pavilionMailingAddress,
      pavilionFacebook,
      pavilionInstagram,
      pavilionTwitter,
      pavilionOtherSocialMedias,
      videoMaterial,
      audioMaterial
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
              <Button
                className="home__register__form__add-artist-btn"
                component={<span> <FiPlusCircle/> add more artist </span>}
              />



              <div className="home__register__form__title">Curators</div>

              <div className="home__register__form__title">Organizers</div>

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
                className="home__register__form__btn"
                type="submit"
              />
            </form>
          </div>

        </div>
      </div>
    );
  }
}

export default withFirebase(Home);
