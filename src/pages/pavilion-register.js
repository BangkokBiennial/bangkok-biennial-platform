import React from 'react';
import { compose } from 'recompose';
import Layout from '../utils/layout';
import { graphql } from 'gatsby';
import {
  withAuthorization,
  withEmailVerification,
} from '../utils/Session';
import PavilionInfoRegister from '../components/scenes/PavilionRegistration/PavilionInfoRegister';

// const condition = authUser => !!authUser;
const condition = () => false;
const PavilionInfoRegisterPage = compose(
  withEmailVerification,
  withAuthorization(condition),
)(PavilionInfoRegister);

export default () => {
  return (
    <Layout>
      <PavilionInfoRegisterPage />
    </Layout>
  );
};

export const query = graphql`
  query PavilionInfoRegisterPageSeo {
    site {
      siteMetadata {
        pavilionInfoRegister {
          defaultTitle: title
          titleTemplate
          defaultDescription: description
          siteUrl: url
          defaultImage: image
          twitterUsername
        }
      }
    }
  }
`;
