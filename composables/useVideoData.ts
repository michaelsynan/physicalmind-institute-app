export const useVideoData = () => {
  const client = useSupabaseClient(); // Supabase client instance

  const fetchVideoData = async () => {
    const { data, error } = await client
      .from("videos") // Replace 'videos' with your Supabase table name
      .select("*");

    if (error) {
      console.error("Error fetching video data:", error.message);
      return [];
    }

    return data;
  };

  return { fetchVideoData };
};
