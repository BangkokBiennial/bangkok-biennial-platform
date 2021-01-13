export const transformToPublicThumbnails = (
  firebasePublicPavilions,
) => {
  return firebasePublicPavilions.map((firebasePublicPavilion) => {
    return {
      website: firebasePublicPavilion.pavilionWebsite,
      name: firebasePublicPavilion.pavilionName,
      description: firebasePublicPavilion.pavilionBriefDescription,
      id: firebasePublicPavilion.id,
      user: firebasePublicPavilion.user
    }
  })
}
