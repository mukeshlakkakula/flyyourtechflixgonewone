const config = {
  appwriteUrl: String(process.env.REACT_APP_APPWRITE_URL),
  appwriteProjectId: String(process.env.REACT_APP_PROJECT_ID),
  appwriteDatabaseId: String(process.env.REACT_APP_DATABASE_ID),
  appwriteMovieDetailsCollectionId: String(
    process.env.REACT_APP_MOVIE_DETAILS_COLLECTION_ID
  ),
  appwriteQualityUrlsCollectionId: String(
    process.env.REACT_APP_QUALITY_URLS_COLLECTION_ID
  ),
  appwriteBucketId: String(process.env.REACT_APP_BUCKET_ID),
};

export default config;
