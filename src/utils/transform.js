export const transformToPublicThumbnails = (
  firebasePublicPavilions,
) => {
  return firebasePublicPavilions.map((firebasePublicPavilion) => {
    return {
      website: firebasePublicPavilion.pavilionWebsite,
      name: firebasePublicPavilion.pavilionName,
      id: firebasePublicPavilion.id
    }
  })
}
