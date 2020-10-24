export const transformToPublicThumbnails = (
  firebasePublicPavilions,
) => {
  return firebasePublicPavilions.map((firebasePublicPavilion) => {
    return {
      name: firebasePublicPavilion.pavilionWebsite,
    }
  })
}
